import JSEncrypt from 'jsencrypt'
import { singleton } from 'tsyringe'
import JsSHA1 from 'jssha/sha1'
import { AbstractRepo } from '../AbstractRepo'
import type { User } from '../types/user/User'
import type { IUserAuthRepo } from '@/domain/user/IUserAuthRepo'

@singleton()
export class UserAuthRepo extends AbstractRepo implements IUserAuthRepo {
  private key: string | undefined
  private salt: string | undefined
  private timeStamps: number | undefined = Date.now().valueOf()
  private uuid: string | undefined

  constructor() {
    super('user')
    this.key = undefined
    this.salt = undefined
    this.uuid = undefined
  }
  // getChiperKey: () => Promise<{ key: string; salt: string }>

  async getChiperKey(): Promise<{ key: string, salt: string }> {
    const sKey = await this.get<User.Auth.GetChiperKey.Response>('chiper')
    this.key = sKey.data.key
    this.salt = sKey.data.salt
    return { key: this.key, salt: this.salt }
  }

  // 初始化加密信息并且返回加密后的密码
  private async rsaPwd(password: string) {
    await this.getChiperKey()
    if (!this.key || !this.salt)
      throw new Error('未获得公钥或盐值')
    this.timeStamps = Date.now()
    // TODO: generate uuid
    this.uuid = '123456'
    const encrypt = new JSEncrypt()
    this.key && encrypt.setPublicKey(this.key)
    const encryptedPassword = encrypt.encrypt(password + this.salt + this.timeStamps)
    if (encryptedPassword !== false)
      return encryptedPassword
    throw new Error('密码加密失败')
  }

  // sha1加密
  private sha1(password: string) {
    const shaObj = new JsSHA1('SHA-1', 'TEXT', { encoding: 'UTF8' })
    shaObj.update(password)
    return shaObj.getHash('HEX')
  }

  // 登录
  async login(username: string, password: string): Promise<User.Auth.Login.Response> {
    const encryptedPassword = this.sha1(password)
    return await this.post<User.Auth.Login.Response, User.Auth.Login.Request>('login', {
      username,
      password: encryptedPassword,
      // TODO: use real uuid
      uuid: this.uuid,
      timestamp: this.timeStamps,
    })
  }

  // 用户登出
  async logout(token: string): Promise<never> {
    return await this.post<User.Auth.Logout.Response, User.Auth.Logout.Request>('logout', {
      token,
    })
  }

  // TODO：修改用户个人信息
  async updateUserInfo() {

  }

  // 用户注册
  async register(username: string, password: string): Promise<User.Auth.Register.Response> {
    const encryptedPassword = await this.rsaPwd(password)
    return await this.post<User.Auth.Register.Response, User.Auth.Register.Request>('register', {
      username,
      password: encryptedPassword,
    })
  }
}
