import { AxiosRequestConfig, AxiosProxyConfig } from 'axios'

export default abstract class Provider {
  protected debug: boolean = false
  protected axiosConfig?: AxiosRequestConfig

  setAxiosConfig(axiosConfig?: AxiosRequestConfig) {
    this.axiosConfig = axiosConfig
    return this
  }

  setDebug(debug: boolean) {
    this.debug = debug
    return this
  }

  setProxy(proxyConfig?: AxiosProxyConfig) {
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
