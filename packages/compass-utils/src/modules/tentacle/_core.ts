import Axios, {
  AxiosInstance, AxiosResponse, CancelTokenSource, Method,
} from 'axios';
import { merge } from 'lodash-es';
import {
  ChainCoreConstructor, ExecutionCallback, ExecutionCatch, RequestConfig,
} from './tentacle.type';

export default class ApiChainCore {
  /** axios 创建后的实例 */
  private axios: AxiosInstance;

  private url: string;

  private method: Method;

  private queryData: any;

  private paramsData: any;

  private requestConfig: RequestConfig;

  private cancelSource: CancelTokenSource;

  constructor(options: ChainCoreConstructor) {
    this.axios = options.axios;
    this.url = options.url;
    this.method = options.method;
    this.cancelSource = Axios.CancelToken.source();
    this.requestConfig = {
      cancelToken: this.cancelSource.token,
    };
  }

  /** 指定query匹配条件 */
  public query(query?: any) {
    if (query) {
      this.queryData = query;
    }
    return this;
  }

  /** 设置body参数 */
  public body(params?: any) {
    if (params) {
      this.paramsData = params;
    }
    return this;
  }

  /** 本次请求配置更新 */
  public config(config: RequestConfig) {
    if (config) {
      this.requestConfig = merge({}, this.requestConfig, config);
    }
    return this;
  }

  /** 执行本次请求 */
  public subscribe <T = any>(
    thenCallback?: ExecutionCallback<T>,
    catchCallback?: ExecutionCatch,
    complete?: () => void,
  ) {
    this.request({
      url: this.url,
      method: this.method,
      query: this.queryData,
      params: this.paramsData,
      config: this.requestConfig,
    }).then((resp) => {
      if (thenCallback) {
        thenCallback(resp as any);
      }
    }).catch((err) => {
      if (catchCallback) {
        catchCallback(err);
      }
    }).finally(() => {
      if (complete) {
        complete();
      }
    });
    return {
      unsubscribe: this.cancelSource.cancel,
    };
  }

  /** 提交请求 */
  private request <T = any>({
    url, method, query, params, config,
  }: {
    query: any,
    params: any,
    config: RequestConfig
  } & Omit<ChainCoreConstructor, 'axios'>): Promise<AxiosResponse<T>> {
    return this.axios(merge({}, config, {
      url,
      method,
      // url 参数
      params: query,
      // body 参数
      data: params,
    }));
  }
}
