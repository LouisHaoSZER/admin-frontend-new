import type { User } from '@/infra/types/user/User'

export interface IUserAuthRepo {
  getChiperKey: () => Promise<{
    key: string
    salt: string
  }>
  login: (username: string, password: string) => Promise<User.Auth.Login.Response>
  logout: (token: string) => Promise<User.Auth.Logout.Response>
  // TODO：添加更新用户信息的方法
  updateUserInfo: () => Promise<void>
  register: (username: string, password: string) => Promise<User.Auth.Register.Response>
}
