class Provider {
  constructor() {
    if (new.target === Provider) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
  }

  /**
   * @type {string}
   */
  baseUrl

  /**
   * @returns {string}
   */
  get typeAndSubgroupUrl() {}

  /**
   * @param {string} keyword
   * @param {string} type
   * @param {string} subgroup
   * @returns {string} list URL
   */
  listUrl(keyword, type, subgroup) {}

  /**
   * @returns {Promise<{
   *   Id: number
   *   Name: string
   * }>[]} Subgroups
   */
  async getSubgroups() {}

  /**
   * @returns {Promise<{
   *   Id: number
   *   Name: string
   * }>[]} Types
   */
  async getTypes() {}

  /**
   * @returns {Promise<{
   *   Title: string
   *   TypeId: number
   *   TypeName: string
   *   SubgroupId: number
   *   SubgroupName: string
   *   Magnet: string
   *   PageUrl: string
   *   FileSize: string
   *   PublishDate: string
   * }[]>} Resources
   */
  async getResources() {}

  /**
   * @returns {Promise<boolean>} Has more
   */
  async getHasMore() {}

  /**
   * @param {{
    *   keyword: string,
    *   subgroup?: (number|string),
    *   type?: (number|string),
    *   r?: (number|string)
    * }} argus
    * @returns {this}
    */
  withList(argus) {}
}

module.exports = Provider
