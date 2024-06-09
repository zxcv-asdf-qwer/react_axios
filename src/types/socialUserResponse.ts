import { MemberRegisterTypes } from '@/types/type.ts'

export interface SocialUserResponse {
  memberRegisterType: MemberRegisterTypes
  socialId?: string
  email?: string
  name?: string
  gender?: string
  birthday?: string
}

export function isSocialUserResponse(data: any): data is SocialUserResponse {
  return data && typeof data.memberRegisterType === 'object'
}
