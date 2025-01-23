import { Provider } from "@supabase/supabase-js"

export interface UserInfo {
  id: string // keycloak ID
  email: string // user ID
  user_name: string // 사용자 명
  image_url: string // 연락처
  providers: Provider[] // 소셜로그인
  // groups: Set<GroupDto> // 그룹 정보
}
export type MemberListResponse2 = {
  data: UserInfo[]
  count: number
}