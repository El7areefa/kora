import { useFetch } from '#app';
type useFetchType = typeof useFetch;

export const useFetchAPI: useFetchType = (path , options = {}) => {

    const baseUrl = 'http://localhost:8080/api/v1';
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('No token found');
    }
    
    const url = `${baseUrl}${path}`;
    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
    return useFetch(url, options);
    
}
