export {}

declare module '#app' {
  interface NuxtApp {
    $toast: (message: string, type?: 'success' | 'error' | 'info', position?: 'top' | 'bottom', duration?: number) => void
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: (message: string, type?: 'success' | 'error' | 'info', position?: 'top' | 'bottom', duration?: number) => void
  }
}
