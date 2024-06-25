import {httpGetList} from '@/libs/axios'

class MemberManagerService {
  /**
   * 회원목록 가져오기.
   *
   * @returns Promise<T>.
   */
  async getMemberList<T>(page: number, size: number) {
    return httpGetList<T>('/admin/members', { page: page, size: size })
  }
}

export default new MemberManagerService()
