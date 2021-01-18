export interface Provider {
  baseUrl: string
  typeAndSubgroupUrl: () => string
  listUrl: (keyword: string, type: string, subgroup: string) => string

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
