import type { AxiosRequestConfig, AxiosProxyConfig } from 'axios'

export abstract class BaseProvider {
  protected debug: boolean = false
  protected axiosConfig?: AxiosRequestConfig

  setAxiosConfig(axiosConfig: AxiosRequestConfig | undefined) {
    this.axiosConfig = axiosConfig
    return this
  }

  setDebug(debug: boolean) {
    this.debug = debug
    return this
  }

  setProxy(proxyConfig: AxiosProxyConfig | undefined) {
    if (typeof this.axiosConfig !== 'object') {
      this.axiosConfig = {}
    }

    const proxy = Object.assign({}, this.axiosConfig.proxy, proxyConfig)

    if (Object.keys(proxy).length) {
      this.axiosConfig.proxy = proxy
    }

    return this
  }
}
