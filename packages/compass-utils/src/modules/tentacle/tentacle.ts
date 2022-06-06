import qs from 'qs';
import Axios, { AxiosInstance, ResponseType } from 'axios';
import { merge } from 'lodash-es';
import {
  ApiConstructor,
  ErrorInterceptorFn,
  RequestConfig,
  RequestInterceptorFn,
  ResponseInterceptorFn,
} from './tentacle.type';
import ApiChainCore from './_core';

// 全局默认请求配置
const defaultGlobalRequestConfig = {
  timeout: 1000 * 15, // 默认15秒超时
  paramsSerializer: (params: any) => qs.stringify(params),
  responseType: 'json' as ResponseType,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  withCredentials: false, // 跨域是否携带凭据
};

/**
 * @description 构造请求实例
 * @constructor {ApiConstructor} options
 * @example
 *   const instance = new Tentacle()
 *   const instance1 = new Tentacle({
 *     config: {
 *       baseURL: '/api/v1',
 *     }, // config request on global
 *     interceptors: {
 *       request: [(requestConfig) => {
 *         requestConfig.headers['header_tag'] = getToken()
 *         return requestConfig
 *       }],
 *       response: [],
 *       error: []
 *     }
 *   })
 *  const instance2 = new Tentacle({
 *     interceptors: {
 *       request: (requestConfig) => {
 *         requestConfig.headers['header_tag'] = getToken()
 *         return requestConfig
 *       },
 *     }
 *   })
 *  instance.get('url') // 定义请求方法及请求地址
 *    .config({}) // 设置请求配置
 *    .query({test: 'test'}) // 设置url查询参数
 *    .body({test: 'test'}) // 设置请求body参数
 *    .subscribe(
 *      result => {}, // 正常返回时触发
 *      error => {}, // 发生异常时触发
 *      () => {} // complete 方法, 不管是否发生异常都会在结束后执行
 *    ) // 订阅数据
 *    .unsubscribe() // 取消请求
 */
export default class Tentacle {
  private axios: AxiosInstance;

  private globalRequestConfig: RequestConfig = defaultGlobalRequestConfig;

  private errorInterceptors: ErrorInterceptorFn[] = [];

  constructor(options?: ApiConstructor) {
    this.globalRequestConfig = merge({}, this.globalRequestConfig, options?.config);
    this.axios = Axios.create(this.globalRequestConfig);
    if (options?.interceptors?.request) {
      this.setRequestInterceptors(options.interceptors.request);
    }
    if (options?.interceptors?.response) {
      this.setResponseInterceptors(options.interceptors.response);
    }
    if (options?.interceptors?.error) {
      const errorCallback = [];
      if (Array.isArray(options.interceptors.error)) {
        errorCallback.push(...options.interceptors.error);
      } else errorCallback.push(options.interceptors.error);
      this.errorInterceptors.push(...errorCallback);
    }
  }

  public get(url: string) {
    return new ApiChainCore({
      url,
      method: 'GET',
      axios: this.axios,
    });
  }

  public post(url: string) {
    return new ApiChainCore({
      url,
      method: 'POST',
      axios: this.axios,
    });
  }

  public put(url: string) {
    return new ApiChainCore({
      url,
      method: 'PUT',
      axios: this.axios,
    });
  }

  public delete(url: string) {
    return new ApiChainCore({
      url,
      method: 'DELETE',
      axios: this.axios,
    });
  }

  public patch(url: string) {
    return new ApiChainCore({
      url,
      method: 'PATCH',
      axios: this.axios,
    });
  }

  public head(url: string) {
    return new ApiChainCore({
      url,
      method: 'HEAD',
      axios: this.axios,
    });
  }

  public options(url: string) {
    return new ApiChainCore({
      url,
      method: 'OPTIONS',
      axios: this.axios,
    });
  }

  public purge(url: string) {
    return new ApiChainCore({
      url,
      method: 'PURGE',
      axios: this.axios,
    });
  }

  public link(url: string) {
    return new ApiChainCore({
      url,
      method: 'LINK',
      axios: this.axios,
    });
  }

  public unlink(url: string) {
    return new ApiChainCore({
      url,
      method: 'UNLINK',
      axios: this.axios,
    });
  }

  private setResponseInterceptors(handleFn: ResponseInterceptorFn | ResponseInterceptorFn[]) {
    let interceptor: ResponseInterceptorFn[];
    if (handleFn instanceof Array) {
      interceptor = handleFn;
    } else interceptor = [handleFn];

    this.axios.interceptors.response.use((value) => {
      let resp: any = value;
      if (interceptor && interceptor.length) {
        for (let i = 0; i < interceptor.length; i += 1) {
          const fn = interceptor[i];
          resp = fn(resp, value);
        }
      }
      return resp;
    }, (error) => this.errorPipeInterceptors(error));
  }

  private errorPipeInterceptors(error?: any) {
    let err = error;
    if (this.errorInterceptors.length) {
      for (let i = 0; i < this.errorInterceptors.length; i += 1) {
        const fn = this.errorInterceptors[i];
        err = fn(err, error);
      }
    }
    return Promise.reject(err);
  }

  private setRequestInterceptors(handleFn: RequestInterceptorFn | RequestInterceptorFn[]) {
    let interceptor: RequestInterceptorFn[];
    if (handleFn instanceof Array) {
      interceptor = handleFn;
    } else interceptor = [handleFn];

    this.axios.interceptors.request.use((config) => {
      if (interceptor && interceptor.length) {
        for (let i = 0; i < interceptor.length; i += 1) {
          const reqInterceptor = interceptor[i];
          // eslint-disable-next-line no-param-reassign
          config = reqInterceptor(config);
        }
      }
      return config;
    }, (error) => this.errorPipeInterceptors(error));
  }
}
