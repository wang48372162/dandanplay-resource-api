const Provider = require('./Provider')
const { provider: defaultProvider } = require('./Config')

module.exports = class ProviderFactory {
  /**
   * @returns {Promise<Provider>} Provider instance
   */
  static async make() {
    const module = await require(`./Providers/${defaultProvider}`)

    return new module
  }
}
