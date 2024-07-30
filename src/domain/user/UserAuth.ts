import { container } from 'tsyringe'
import { AuditableEntity } from '../AuditableEntity'
import type { IUserAuthRepo } from './IUserAuthRepo'
import { UserAuthRepo } from '@/infra/user/UserAuthRepo'
import { useTokenStore } from '@/ui/stores/token'
import { router } from '@/ui/router'

const userAuth = new UserAuthRepo()
const userToken = useTokenStore()

export class UserAuth extends AuditableEntity {
  repo: IUserAuthRepo
  username: string | undefined
  password: string | undefined

  constructor(username?: string, password?: string) {
    super()
    this.username = username
    this.password = password
    this.repo = container.resolve(UserAuthRepo)
  }

  // 用户登录
  async login(username: string, password: string) {
    this.username = username
    this.password = password
    // TODO: login
    // return await this.repo.login(username, password)
    await userAuth.login(username, password).then((res) => {
      userToken.setToken(res.data.token)
      void router.push('/home')
    })
  }

  // 用户登出
  async logout(token: string) {
    // TODO: logout
    await userAuth.logout(token)
  }

  // 用户注册
  async register(username: string, password: string) {
    return await userAuth.post('register', {
      username,
      password,
    })
  }
}
