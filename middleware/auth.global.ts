import { defineNuxtRouteMiddleware, navigateTo } from '#app';

export default defineNuxtRouteMiddleware((to) => {
  // Only protect admin routes
  if (to.path.startsWith('/') && to.path !== '/login' && to.path !== '/register') {
    const token = localStorage.getItem('authToken');

    if (!token) {
      return navigateTo('/login');
    }
  }
});
