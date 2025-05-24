import { useFetch, type UseFetchOptions } from '#app'

export const useFetchAPI = async <T = any>(
  path: string,
  options: UseFetchOptions<T> = {}
) => {
  const baseUrl = 'http://localhost:8080/api/v1'
  const token = localStorage.getItem('authToken')

  if (!token) {
    throw new Error('No token found')
  }

  const url = `${baseUrl}${path}`

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  // Use await to access result immediately
  const result = await useFetch<T>(url, options as any)

  if (result.error.value) {
    throw result.error.value // 👈 manually throw the error so .catch() works
  }

  return result
}
