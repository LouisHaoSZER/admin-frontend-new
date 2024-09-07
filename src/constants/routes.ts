/**
 * 路由常量类
 */
export class RouteConstant {
  /**
   * 路由守卫白名单
   */
  public static readonly GUARD_LIST_WHITELIST = ['/login', '/oauth-redirect']
  /**
   *  路由首页路径
   */
  public static readonly HOME_PATH = '/home'
  /**
   * 路由登录路径
   */
  public static readonly LOGIN_PATH = '/login'
  /**
   * 路由404路径
   */
  public static readonly NOT_FOUND_PATH = '/404'
}
