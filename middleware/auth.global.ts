import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { jwtDecode } from 'jwt-decode';

export default defineNuxtRouteMiddleware((to) => {
  // Only protect admin routes
  if (to.path.startsWith('/') && to.path !== '/login' && to.path !== '/register') {
    const token = localStorage.getItem('authToken');

    if (!isTokenValid()) {
      return navigateTo('/login');
    } else if (to.path === '/') {
      return navigateTo('/leagues');
    }
  } 
});


const isTokenValid = () => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return false;
  }
  const now = new Date();
  const decodedToken = jwtDecode(token);
  const expirationDate = new Date(decodedToken.exp! * 1000);
  return expirationDate > now;
}
