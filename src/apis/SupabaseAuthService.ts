import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { SupabaseMemberCreateRequest } from '@/types/SupabaseMemberCreateRequest';
import { UserInfo } from '@/types/UserInfo';
import { SocialLoginRequest } from '@/types/SocialLoginRequest';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

class SupabaseAuthService {
  /**
  * supabase 회원가입.
  *
  * @param request supabase 회원가입 관련 정보.
  * @returns Promise<T>.
  */
  async signUp(request: SupabaseMemberCreateRequest): Promise<{ user: any; error: any }> {
    const { data, error } = await supabase.auth.signUp({
      email: request.email,
      password: request.userPw,
      options: {
        data: {
          user_name: request.userNm,
          image_url: request.imageUrl
        }
      }
    })

    if (data) {
      return { user: data.user, error: null }
    }

    return { user: null, error: error }
  }

  /**
   * supabase 로그인.
   *
   * @param request 관리자 로그인 관련 정보.
   * @returns Promise<T>.
   */
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (data) {
      return { data: data, error: null }
    }

    return { data: null, error: error }
  }

  /**
   * supabase 로그아웃.
   *
   * @param request 관리자 로그인 관련 정보.
   * @returns Promise<T>.
   */
  async signOut() {
    return await supabase.auth.signOut()
  }

  /**
  * supabase 회원조회 목록.
  *
  * @param request supabase 회원조회 관련 정보.
  * @returns Promise<T>.
  */
  async getUserInfo<T>(page: number, size: number) {
    const start = page * size;
    const end = start + size - 1;

    const { data, count, error } = await supabase
      .from('userinfo')
      .select('*', { count: 'exact' })
      .range(start, end)

    if (error) {
      throw error; // 또는 에러 처리 로직을 추가할 수 있습니다.
    }

    return {
      data: data as UserInfo[],
      totalCount: count || 0
    }
  }


  /**
  * supabase 소셜 로그인.
  *
  * @param request supabase 소셜 로그인.
  * @returns Promise<T>.
  */
  async signInWithSocial<T>(request: SocialLoginRequest) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: request.provider,
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      throw error; // 또는 에러 처리 로직을 추가할 수 있습니다.
    }

    return {data, error: null}
  }
}

export default new SupabaseAuthService()
