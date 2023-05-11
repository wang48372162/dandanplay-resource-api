import { AxiosRequestConfig, AxiosProxyConfig } from 'axios'

export interface Provider {
  baseUrl: string

  getSubgroups(): Promise<Subgroup[]>
  getTypes(): Promise<ResourceType[]>
  getResources(): Promise<Resource[]>
  getHasMore(): Promise<boolean>
  withList(args: {
    keyword: string,
    subgroup?: number | string,
    type?: number | string,
    r?: number | string
  }): Provider

  setAxiosConfig(axiosConfig?: AxiosRequestConfig): Provider
  setDebug(debug: boolean): Provider
  setProxy(proxyConfig?: AxiosProxyConfig): Provider
}

export type Subgroup = {
  Id: number
  Name: string
}

export type ResourceType = {
  Id: number
  Name: string
}

export type Resource = {
  Title: string
  TypeId: number
  TypeName: string
  SubgroupId: number
  SubgroupName: string
  Magnet: string
  PageUrl: string
  FileSize: string
  PublishDate: string
}
