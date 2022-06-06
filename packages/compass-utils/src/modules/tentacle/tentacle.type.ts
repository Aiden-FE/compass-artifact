import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, Method} from "axios";

export interface RequestConfig extends AxiosRequestConfig {}

export interface ChainCoreConstructor {
  url: string
  axios: AxiosInstance
  method: Method
}

export type executionCallback<T = any> = (resp: T) => void

export type executionCatch = (resp: Error | AxiosError | any) => void

export type RequestInterceptorFn = (config: RequestConfig) => RequestConfig
/**
 * @param resp 上一个拦截器返回的值或尚未被修改的原始响应
 * @param originResp 原始的响应
 * @todo 原始响应不建议直接修改
 */
export type ResponseInterceptorFn = <T = any>(resp: any, originResp: AxiosResponse<T>) => any
/**
 * @param error 上一个拦截器返回的error或尚未被修改的原始error
 * @param originError 原始的error
 * @todo 原始error不建议直接修改
 */
export type ErrorInterceptorFn = (error: any, originError: any) => any

export interface ApiConstructor {
  config?: RequestConfig
  interceptors?: {
    request?: RequestInterceptorFn | RequestInterceptorFn[]
    response?: ResponseInterceptorFn | ResponseInterceptorFn[]
    error?: ErrorInterceptorFn | ErrorInterceptorFn[]
  }
}
