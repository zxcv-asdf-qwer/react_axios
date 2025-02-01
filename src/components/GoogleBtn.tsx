import GoogleSignIn from '@/assets/google_login.png'
import { SupabaseClient, createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

function GoogleBtn() {
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: import.meta.env.VITE_AUTH_CALLBACK_URL
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error logging in with Google:', error)
    }
  }

  return (
    <div className="flex justify-center">
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent"
        onClick={() => handleGoogleLogin()}>
        <img src={GoogleSignIn} alt="구글 로그인 버튼" className="login-img" />
      </button>
    </div>
  )
}

export default GoogleBtn
