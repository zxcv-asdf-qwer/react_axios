import axios, { type AxiosRequestConfig, type ResponseType } from 'axios'
import { ApiResponse } from '@/types/ApiResponse.ts'

let isRefreshing = false
const failedQueue: {
  resolve: (value?: unknown) => void
  reject: (reaseon?: never) => void
}[] = []

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  withCredentials: true,
})

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    const status = response?.status

    if (status === 401 && !config.sent) {
      if (config.url == '/pb/social-login') {
        return Promise.reject(response.data)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => API(config))
          .catch((error) => Promise.reject(error))
      }

      config.sent = true
      isRefreshing = true

      try {
        const newToken = await refreshAuthToken() // 토큰 갱신 함수 호출
        setAuthorizationToken(newToken)
        processQueue(null, newToken)
        return API(config)
      } catch (err) {
        processQueue(err, null)
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    if (error.response && error.response.data && error.response.data.location) {
      window.location.href = error.response.data.location
    } else {
      return Promise.reject(error.response.data)
    }
  },
)
function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
}
// 토큰 갱신 함수 (예시)
async function refreshAuthToken(): Promise<string> {
  // 갱신된 토큰을 반환하는 로직을 구현합니다.
  // 예를 들어, refresh token을 사용해 새로운 access token을 받아올 수 있습니다.
  const response = await axios.post('/auth/refresh-token', {
    /* refresh token payload */
  })
  return response.data.accessToken
}
/**
 * Access token 헤더 설정.
 *
 * @param token Access token.
 */
function setAuthorizationToken(token?: string) {
  if (token) {
    API.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common.Authorization
  }
}

/**
 * API GET 통신.
 *
 * @param urlPath API url.
 * @param params GET 타입의 인수들.
 * @param responseType 원하는 응답 데이터(JSON 혹은 Blob).
 * @param withCredentials For session.
 * @returns Promise<T>.
 */
async function httpGet<T>(
  urlPath: string,
  params?: { [key: string]: unknown },
  responseType?: ResponseType,
): Promise<ApiResponse<T>> {
  const res = await API.get(urlPath, {
    params,
    responseType,
  })
  return { status: res.status, data: res.data.data }
}

/**
 * API POST 통신.
 *
 * @param urlPath API url.
 * @param data 요청에 필요한 데이터 모음.
 * @param contentType Content-Type 설정.
 * @returns Promise<T>.
 */
async function httpPost<T>(urlPath: string, data?: unknown, contentType?: string): Promise<ApiResponse<T>> {
  const options: AxiosRequestConfig = {
    withCredentials: true,
  }
  if (contentType) {
    options.headers = {
      'Content-Type': contentType,
    }
  }

  const res = await API.post(urlPath, data, options)
  return { status: res.status, data: res.data.data }
}

/**
 * API PUT 통신.
 *
 * @param urlPath API url.
 * @param data 요청에 필요한 데이터 모음.
 * @param contentType Content-Type 설정.
 * @returns Promise<T>.
 */
async function httpPut<T>(urlPath: string, data?: unknown, contentType?: string): Promise<ApiResponse<T>> {
  const options: AxiosRequestConfig = {
    withCredentials: true,
  }
  if (contentType) {
    options.headers = {
      'Content-Type': contentType,
    }
  }

  const res = await API.put(urlPath, data, options)
  return { status: res.status, data: res.data.data }
}

/**
 * API DELETE 통신.
 *
 * @param urlPath API url.
 * @param params DELETE 타입의 인수들.
 * @param responseType 원하는 응답 데이터(JSON 혹은 Blob).
 * @returns Promise<T>.
 */
async function httpDelete<T>(
  urlPath: string,
  params?: { [key: string]: unknown },
  responseType?: ResponseType,
): Promise<ApiResponse<T>> {
  const res = await API.delete(urlPath, {
    params,
    responseType,
  })
  return { status: res.status, data: res.data.data }
}

export { setAuthorizationToken, httpGet, httpPost, httpPut, httpDelete }
