import { Provider as ProviderContract } from './Contracts/Provider'
import { provider as defaultProvider } from './Config'
import DmhyProvider from './Providers/dmhy'
import DmhyanonekoProvider from './Providers/dmhyanoneko'

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
