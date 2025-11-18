import type { AxiosRequestConfig, AxiosProxyConfig } from 'axios'

export interface Provider {
  baseUrl: string

  getSubgroups(): Promise<Subgroup[]>
  getTypes(): Promise<ResourceType[]>
  getResources(): Promise<Resource[]>
  getHasMore(): Promise<boolean>
  withListQuery(args: ProviderListQuery): Provider

  setAxiosConfig(axiosConfig: AxiosRequestConfig | undefined): Provider
  setDebug(debug: boolean): Provider
  setProxy(proxyConfig: AxiosProxyConfig | undefined): Provider
}

export interface Subgroup {
  Id: number
  Name: string
}

export interface ResourceType {
  Id: number
  Name: string
}

export interface Resource {
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

export interface ProviderListQuery {
  keyword: string
  subgroup?: number | string | null
  type?: number | string | null
  r?: number | string | null
}
