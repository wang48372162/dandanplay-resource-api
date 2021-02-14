import { Provider as ProviderContract } from './Contracts/Provider'
import { provider as defaultProvider } from './Config'

class ProviderFactory {
  static async make(provider?: string): Promise<ProviderContract> {
    if (typeof provider !== 'string') {
      provider = defaultProvider
    }

    return await import(`./Providers/${provider}`)
      .then(module => new module.default)
  }
}

export default ProviderFactory
