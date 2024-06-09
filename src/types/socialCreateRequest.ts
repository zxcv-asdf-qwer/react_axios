import { MemberRegisterTypes, UserTypes } from '@/types/type.ts'

export interface SocialCreateRequest {
  socialId?: string // 소셜 로그인 ID
  userNm: string // 사용자 이름
  email: string // 이메일
  memberRegisterType: MemberRegisterTypes // 소셜 로그인 타입
  userType: UserTypes // 유저 타입
  telNo?: string // 핸드폰 번호
  marketingAppPush?: boolean // 앱 푸시알림 수신동의 (optional)
}
