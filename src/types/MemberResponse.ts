import { DeptCodes, GenderCodes, MemberRegisterTypes, UserTypes, UseYn } from '@/types/Type.ts'
import { GroupDto } from '@/types/GroupDto.ts'

export interface MemberResponse {
  memberId: string // keycloak ID
  userId: string // user ID
  userNm: string // 사용자 명
  email: string // 이메일
  telNo: string // 연락처
  gender: GenderCodes // 성별
  useYn: UseYn // 사용유무
  userType: UserTypes // 사용자 타입
  deptCode: DeptCodes // 부서 구분
  memberRegisterType: MemberRegisterTypes // 회원가입 유형
  address1: string // 주소
  address2: string // 주소
  introduce: string // 자기소개
  marketingAppPush: boolean // 앱 푸시알림 수신동의
  groupKeys: Set<GroupDto> // 그룹 정보
}
export type MemberListResponse = {
  data: MemberResponse[]
  totalCount: number
}
