export interface MemberResponse2 {
  id: string // keycloak ID
  email: string // user ID
  user_name: string // 사용자 명
  image_url: string // 연락처
  count: string
  // groups: Set<GroupDto> // 그룹 정보
}
export type MemberListResponse2 = {
  data: MemberResponse2[]
  totalCount: number
}
