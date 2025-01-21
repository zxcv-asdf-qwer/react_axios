import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { SupabaseMemberCreateRequest } from '@/types/SupabaseMemberCreateRequest';

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

}

export default new SupabaseAuthService()
