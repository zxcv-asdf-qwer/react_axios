import { httpPost } from '@/libs/axios'
import { SocialLoginRequest } from '@/types/socialLoginRequest.ts'
import { SocialCreateRequest } from '@/types/socialCreateRequest.ts'

class AuthService {
  /**
   * 간편 로그인.
   *
   * @param socialData 간편 로그인 관련 정보.
   * @returns Promise<T>.
   */
  async signInWithSocial<T>(request: SocialLoginRequest) {
    return httpPost<T>('/pb/social/login', request)
  }

  /**
   * 간편 회원가입.
   *
   * @param socialData 간편 로그인 관련 정보.
   * @returns Promise<T>.
   */
  async signUpWithSocial<T>(request: SocialCreateRequest) {
    return httpPost<T>('/pb/social', request)
  }
}

export default new AuthService()
