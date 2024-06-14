import { httpGet, httpPut } from '@/libs/axios'
import { MemberUpdateRequest } from '@/types/MemberUpdateRequest.ts'
import { LeaveRequest } from '@/types/LeaveRequest.ts'

class InfoService {
  /**
   * 내정보 가져오기.
   *
   * @returns Promise<T>.
   */
  async findMe<T>() {
    return httpGet<T>('/users', {})
  }
  /**
   * 내정보 수정.
   *
   * @param request 내정보 수정 관련 정보.
   * @returns Promise<T>.
   */
  async updateMyInfo<T>(request: MemberUpdateRequest) {
    return httpPut<T>('/users', request)
  }

  /**
   * 탈퇴.
   *
   * @param request 탈퇴 관련 정보.
   * @returns Promise<T>.
   */
  async revoke<T>(request: LeaveRequest) {
    return httpPut<T>('/users/leave', request)
  }
}

export default new InfoService()
