import { DeptCodes } from '@/types/Type.ts'

export interface AdminMemberCreateRequest {
  userNm?: string // 사용자 명
  userId?: string // 사용자 아이디
  email?: string // 이메일
  userPw?: string // 사용자 비밀번호
  telNo?: string // 핸드폰 번호
  deptCode?: DeptCodes // 부서코드
}
