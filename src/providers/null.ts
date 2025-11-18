import type { Provider, Subgroup, ResourceType, Resource, ProviderListQuery } from '../contracts/provider'
import { BaseProvider } from './base'

export class NullProvider extends BaseProvider implements Provider {
  public baseUrl = ''

  async getSubgroups(): Promise<Subgroup[]> {
    return []
  }

  async getTypes(): Promise<ResourceType[]> {
    return []
  }

  async getResources(): Promise<Resource[]> {
    return []
  }

  async getHasMore(): Promise<boolean> {
    return false
  }

  withListQuery(_: ProviderListQuery): Provider {
    return this
  }
}
