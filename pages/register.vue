<template>
  <div>
    <div class="min-h-screen bg-gray-100 py-10 px-4 overflow-y-auto">
      <div class="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-center mb-6">Register</h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block font-semibold mb-1 text-gray-700">First Name<span class="text-red-500">*</span></label>
            <input v-model="firstName" type="text" required class="w-full input" placeholder="Enter your first name" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Second Name</label>
            <input v-model="secondName" type="text" class="w-full input" placeholder="Enter your second name" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Email<span class="text-red-500">*</span></label>
            <input v-model="email" type="email" required class="w-full input" placeholder="Enter your email" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Password<span class="text-red-500">*</span></label>
            <input v-model="password" type="password" required class="w-full input" placeholder="Enter your password" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Phone Number<span class="text-red-500">*</span></label>
            <input v-model="phoneNumber" type="tel" required class="w-full input"
              placeholder="Enter your phone number" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Age</label>
            <input v-model.number="age" type="number" min="1" class="w-full input" placeholder="Enter your age" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Date of Birth</label>
            <input v-model="dateOfBirth" type="date" class="w-full input" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Position</label>
            <input v-model="position" type="text" class="w-full input" placeholder="e.g., Midfielder" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Height (cm)</label>
            <input v-model.number="height" type="number" class="w-full input" placeholder="Enter your height" />
          </div>

          <div>
            <label class="block font-semibold mb-1">Weight (kg)</label>
            <input v-model.number="weight" type="number" class="w-full input" placeholder="Enter your weight" />
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm">{{ errorMessage }}</div>

          <button type="submit" class="btn btn-primary w-full">
            <i class="fas fa-user-plus mr-2"></i> Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const firstName = ref('');
const secondName = ref('');
const email = ref('');
const password = ref('');
const phoneNumber = ref('');
const age = ref<number | null>(null);
const dateOfBirth = ref('');
const position = ref('');
const height = ref<number | null>(null);
const weight = ref<number | null>(null);

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
        firstName: firstName.value,
        secondName: secondName.value,
        email: email.value,
        password: password.value,
        phoneNumber: phoneNumber.value,
        age: age.value,
        dateOfBirth: dateOfBirth.value,
        position: position.value,
        height: height.value,
        weight: weight.value,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Registration failed');
    }

    const data = await res.json();
    localStorage.setItem('authToken', data.token);
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
