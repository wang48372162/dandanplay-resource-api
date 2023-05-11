import { Provider as ProviderContract } from './contracts/provider'
import { provider as defaultProvider } from './config'
import DmhyProvider from './providers/dmhy'
import DmhyanonekoProvider from './providers/dmhyanoneko'

class ProviderFactory {
  static make(provider?: string): ProviderContract {
    if (typeof provider !== 'string') {
      provider = defaultProvider
    }

    if (provider === 'dmhy') return new DmhyProvider()
    if (provider === 'dmhyanoneko') return new DmhyanonekoProvider()
    return new DmhyProvider()
  }
}

export default ProviderFactory
