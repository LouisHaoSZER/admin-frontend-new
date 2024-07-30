import { AuditableEntity } from '../AuditableEntity'
import { UserInfoRepo } from '@/infra/user/UserInfoRepo'
import { useUserStore } from '@/ui/stores/user'

const ueserInfo = new UserInfoRepo()
const userStore = useUserStore()
export class UserInfo extends AuditableEntity {
  userid: number | undefined
  nickname: string | undefined
  avatar: string | undefined
  list: any

  constructor() {
    super()
    this.userid = userStore.userid
    this.nickname = userStore.nickname
    this.avatar = userStore.avatar
    this.list = {}
  }

  // 获取用户个人信息
  async getUserInfo() {
    if (!this.userid)
      throw new Error('用户未登录')
    const res = await ueserInfo.getUserInfo(this.userid)
    return res
  }

  // 更新用户信息
  async updateInfo(nickname: string, avatar: string) {
    this.nickname = nickname
    this.avatar = avatar
    // TODO: update info
  }

  // 获取用户列表
  async getUserList(start: number, size: number) {
    const list = await ueserInfo.getUserList(start, size)
    return list
  }
}
