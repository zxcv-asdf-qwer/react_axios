import { GenderCodes, UserTypes } from '@/types/Type.ts'
import { GroupDto } from '@/types/GroupDto.ts'

export interface MemberUpdateRequest {
  userNm?: string // 사용자 명
  telNo?: string // 연락처
  gender?: GenderCodes // 성별
  userType?: UserTypes // 사용자 타입
  address1?: string // 주소
  address2?: string // 주소
  introduce?: string // 자기소개
  marketingAppPush?: boolean // 앱 푸시알림 수신동의
  groupKeys?: Set<GroupDto> // 그룹 정보
}
