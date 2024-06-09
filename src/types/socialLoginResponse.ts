export interface SocialLoginResponse {
  access_token: string
  expires_in: string
  refresh_expires_in: string
  refresh_token: string
  token_type: string
  session_state: string
  scope: string
}

export function isSocialLoginResponse(data: any): data is SocialLoginResponse {
  return (
    data &&
    typeof data.access_token === 'string' &&
    typeof data.expires_in === 'string' &&
    typeof data.refresh_expires_in === 'string' &&
    typeof data.refresh_token === 'string' &&
    typeof data.token_type === 'string' &&
    typeof data.session_state === 'string' &&
    typeof data.scope === 'string'
  )
}
