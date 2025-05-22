export default defineNuxtPlugin((nuxtApp) => {
    // Create and reuse a single toast container
    let toastContainer = document.querySelector('#global-toast-container')
  
    if (!toastContainer) {
      toastContainer = document.createElement('div')
      toastContainer.id = 'global-toast-container'
      toastContainer.className = 'fixed z-[99999] flex flex-col gap-2 toast toast-bottom toast-end p-4'
      document.body.appendChild(toastContainer)
    }
  
    const showToast = (
      message: string,
      type: 'success' | 'error' | 'info' = 'success',
      position: 'top' | 'bottom' = 'bottom',
      duration: number = 3000
    ) => {
      // Adjust position classes
      toastContainer!.className = `fixed z-[99999] flex flex-col gap-2 toast toast-${position} toast-end p-4`
  
      const toast = document.createElement('div')
      toast.className = `alert alert-${type} shadow-lg transition-all duration-300`
      toast.innerHTML = `<span>${message}</span>`
  
      toastContainer!.appendChild(toast)
  
      setTimeout(() => {
        toast.remove()
      }, duration)
    }
  
    nuxtApp.provide('toast', showToast)
  })
  