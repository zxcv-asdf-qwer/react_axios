import { MemberRegisterTypes, OauthTypes } from '@/types/Type.ts'
import { Provider } from '@supabase/supabase-js'

export interface SocialLoginRequest {
  code?: string
  token: string
  provider: Provider
  oauthType?: OauthTypes // 만약 필요하다면 추가
}
