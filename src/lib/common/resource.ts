import { BootpaySingleton } from './singleton'
import axois, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { isPresent } from './support'
import { encryptJSON, generateUUID } from './encrypt'

export interface BootpaySdkCommonResponse<T = any> {
    status: Number
    code: Number
    message?: String
    data?: T
}

class BootpaySdkResource extends BootpaySingleton {
    $http: AxiosInstance

    constructor() {
        super()
        this.$http = axois
        this.$http.interceptors.request.use((config: AxiosRequestConfig) => {
            if (isPresent(config.data) && ['put', 'post'].indexOf(config.method as string) > -1) {
                config.data = encryptJSON(config.data, generateUUID())
            }
            // Do something before request is sent
            return config
        }, (error) => {
            // Do something with request error
            return Promise.reject(error)
        })
        this.$http.interceptors.response.use((response: AxiosResponse<BootpaySdkCommonResponse>): any => {
            if (isPresent(response.request) && isPresent(response.headers)) {
                return response.data as BootpaySdkCommonResponse
            } else {
                return {
                    code: -100,
                    status: 500,
                    message: `오류가 발생했습니다. ${response}`,
                    data: response
                } as BootpaySdkCommonResponse
            }
        }, function (error) {
            if (isPresent(error.response)) {
                return Promise.reject(error.response.data)
            } else {
                return Promise.reject({
                    code: -100,
                    message: `통신오류가 발생하였습니다. ${error.message}`,
                    status: 500
                })
            }
        })
        this.$http.defaults.headers.common['Content-Type'] = 'application/json'
        this.$http.defaults.headers.common['Accept'] = 'application/json'
    }
}

export const Resource = BootpaySdkResource.currentInstance<BootpaySdkResource>()