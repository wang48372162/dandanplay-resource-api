import type { Provider } from './contracts/provider'
import { DmhyProvider } from './providers/dmhy'
import { DmhyanonekoProvider } from './providers/dmhyanoneko'
import { NullProvider } from './providers/null'

export function createProvider(provider: string): Provider {
  switch (provider) {
    case 'dmhy':
      return new DmhyProvider()
    case 'dmhyanoneko':
      return new DmhyanonekoProvider()
    default:
      return new NullProvider()
  }
}
