import { singleton } from 'tsyringe'
import { AbstractRepo } from '../AbstractRepo'
import type { User } from '../types/user/User'
import type { IUserInfoRepo } from '@/domain/user/IUserInfoRepo'

@singleton()
export class UserInfoRepo extends AbstractRepo implements IUserInfoRepo {
  constructor() {
    super('user')
  }

  // 获取用户个人信息
  async getUserInfo(id: number | null): Promise<User.Info.GetUserInfo.Response> {
    const res = await this.get<User.Info.GetUserInfo.Response>(`userInfo/${id}`)
    return res
  }

  // TODO：更新用户信息
  async updateInfo(): Promise<void> {

  }

  // 获取用户列表
  async getUserList(start: number, size: number): Promise<User.Info.GetUserListInfo.Response> {
    const res = await this.get<User.Info.GetUserListInfo.Response>(`userList/${start}/${size}`)
    return res
  }
}
