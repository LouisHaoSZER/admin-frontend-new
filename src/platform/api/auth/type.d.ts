/**
 * 登录参数
 */
export interface LoginParams {
  /** 用户名 */
  username?: string
  /** 手机号 */
  phoneNumber?: string
  /** 邮箱 */
  email?: string
  /** 密码 */
  password?: string
  /** 验证码 */
  verifyCode?: string
  /** 验证码标识 key */
  verifyCodeKey?: string
  /** 短信验证码 */
  smsCode?: string
  /** 邮箱验证码 */
  emailCode?: string
  /** 第三方登录 Oauth 授权对象 */
  oauth?: Oauth
}
/**
 * 登录响应
 */
export interface LoginResult {
  /** 访问token */
  accessToken?: string
  /** 刷新token */
  refreshToken?: string
  /** 过期时间(单位：毫秒) */
  expires?: string
}

/**
 * 刷新token参数
 */
export interface RefreshParams {
  /** 刷新Token */
  refreshToken: string
  /** 访问Token */
  accessToken: string
}
