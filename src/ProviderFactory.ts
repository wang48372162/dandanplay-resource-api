import { Provider as AbstractProvider } from './Provider'
import { provider as defaultProvider } from './Config'

class ProviderFactory {
  static async make(): Promise<AbstractProvider> {
    return await import(`./Providers/${defaultProvider}`)
      .then(module => new module.default)
  }
}

export default ProviderFactory
