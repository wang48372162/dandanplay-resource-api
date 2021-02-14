import { AxiosRequestConfig, AxiosProxyConfig } from 'axios'

export default abstract class Provider {
  protected axiosConfig?: AxiosRequestConfig

  setAxiosConfig(axiosConfig?: AxiosRequestConfig) {
    this.axiosConfig = axiosConfig

    return this
  }

  setProxy(proxyConfig?: AxiosProxyConfig) {
    if (typeof this.axiosConfig !== 'object') {
      this.axiosConfig = {}
    }

    this.axiosConfig.proxy = Object.assign(
      {}, this.axiosConfig.proxy, proxyConfig
    )

    return this
  }
}
