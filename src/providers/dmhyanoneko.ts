import dmhy from './dmhy'

export default class dmhyanoneko extends dmhy {
  public baseUrl = 'https://dmhy.anoneko.com'
  public typeAndSubgroupUrl = () => `${this.baseUrl}/topics/advanced-search?team_id=0&sort_id=0&orderby=`
  public listUrl = (keyword: string, type: string, subgroup: string) => `${this.baseUrl}/topics/list/page/1?keyword=${keyword}&sort_id=${type}&team_id=${subgroup}&order=date-desc`
}
