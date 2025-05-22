<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
  
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block font-semibold mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full input"
              placeholder="Enter your email"
            />
          </div>
  
          <div>
            <label class="block font-semibold mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full input"
              placeholder="Enter your password"
            />
          </div>
  
          <div v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</div>
  
          <button type="submit" class="btn btn-primary w-full">
            <i class="fas fa-user-plus mr-2"></i> Register
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  const router = useRouter();
  
  const handleRegister = async () => {
    errorMessage.value = '';
  
    try {
      const res = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
  
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Registration failed');
      }
  
      const data = await res.json();
      localStorage.setItem('authToken', data.token);
  
      // ✅ Redirect after successful registration
      router.push('/admin/dashboard');
    } catch (err: any) {
      errorMessage.value = err.message || 'Registration error';
    }
  };
  </script>
  
  <style scoped>
  .input {
    @apply border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300;
  }
  
  .btn-primary {
    @apply bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition;
  }
  </style>
  