import { httpGet, httpPost } from '@/libs/axios'
import { SocialLoginRequest } from '@/types/SocialLoginRequest.ts'
import { SocialCreateRequest } from '@/types/SocialCreateRequest.ts'
import { AdminMemberCreateRequest } from '@/types/AdminMemberCreateRequest.ts'

class AuthService {
  /**
   * 간편 로그인.
   *
   * @param request 간편 로그인 관련 정보.
   * @returns Promise<T>.
   */
  async signInWithSocial<T>(request: SocialLoginRequest) {
    return httpPost<T>('/pb/social-login', request)
  }

  /**
   * 소셜 회원가입.
   *
   * @param request 소셜 회원가입 관련 정보.
   * @returns Promise<T>.
   */
  async signUpWithSocial<T>(request: SocialCreateRequest) {
    return httpPost<T>('/pb/social', request)
  }

  /**
   * 관리자 회원가입.
   *
   * @param request 관리자 회원가입 관련 정보.
   * @returns Promise<T>.
   */
  async signUpForAdmin<T>(request: AdminMemberCreateRequest) {
    return httpPost<T>('/pb/admin', request)
  }
  /**
   * 관리자 로그인.
   *
   * @param request 관리자 로그인 관련 정보.
   * @returns Promise<T>.
   */
  async LoginForAdmin<T>(userId: string, password: string) {
    return httpPost<T>('/pb/admin-login', { userId: userId, userPw: password })
  }

  /**
   * 로그아웃.
   *
   * @returns Promise<T>.
   */
  async logout<T>() {
    return httpGet<T>('/users/logout', {
      refreshToken: localStorage.getItem('refresh_token'),
    })
  }
}

export default new AuthService()
