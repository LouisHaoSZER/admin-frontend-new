import type { User } from '@/infra/types/user/User'

export interface IUserInfoRepo {
  getUserInfo: (id: number | null) => Promise<User.Info.GetUserInfo.Response>
  updateInfo: (nickname: string, avatar: string) => Promise<void>
  getUserList: (start: number, size: number) => Promise<User.Info.GetUserListInfo.Response>
}
