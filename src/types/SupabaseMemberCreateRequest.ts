export interface SupabaseMemberCreateRequest {
  email: string // 이메일
  userPw: string //비밀번호
  userNm?: string // 사용자 명
  imageUrl: string //s3 url
}
