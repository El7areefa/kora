<template>
  <div>
    <div class="min-h-screen bg-gray-100 py-10 px-4 overflow-y-auto">
      <div class="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-bold text-center mb-6">Register</h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <InputField
            label="First Name"
            v-model="form.firstName"
            required
            :validator="v$.firstName"
          />
          <InputField label="Second Name" v-model="form.secondName" />
          <InputField
            label="Email"
            v-model="form.email"
            type="email"
            required
            :validator="v$.email"
          />
          <InputField
            label="Password"
            v-model="form.password"
            type="password"
            required
            :validator="v$.password"
          />
          <InputField
            label="Phone Number"
            v-model="form.phoneNumber"
            type="tel"
            required
            :validator="v$.phoneNumber"
          />
          <InputField
            label="Date of Birth"
            v-model="form.dateOfBirth"
            type="date"
          />
          <InputField
            label="Position"
            v-model="form.position"
            type="select"
            :options="positionOptions"
          />

          <InputField
            label="Height (cm)"
            v-model="form.height"
            type="number"
            :validator="v$.height"
          />
          <InputField
            label="Weight (kg)"
            v-model="form.weight"
            type="number"
            :validator="v$.weight"
          />
          <button type="submit" class="btn btn-primary w-full">
            <i class="fas fa-user-plus mr-2"></i> Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { positions, type PlayerRegister } from "~/models/player";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, minValue, maxValue } from "@vuelidate/validators";

const toast = useNuxtApp().$toast;

const form = reactive<PlayerRegister>({
  firstName: "",
  secondName: "",
  email: "",
  password: "",
  phoneNumber: "",
  dateOfBirth: "",
  position: positions[0],
  height: 0,
  weight: 0,
});

// Validation rules
const rules = computed(() => ({
  firstName: { required },
  phoneNumber: { required, minLength: minLength(10) },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  height: { minValue: minValue(140), maxValue: maxValue(250) },
  weight: { minValue: minValue(60), maxValue: maxValue(200) }
}));

// Vuelidate instance
const v$ = useVuelidate(rules, form);

const router = useRouter();

const positionOptions = positions.map((p) => p.toUpperCase());

const handleRegister = async () => {
  useFetchAPI("/auth/register", {
    method: "POST",
    body: form,
  })
    .then((res) => {
      localStorage.setItem("authToken", (res.data as any).token);
      toast("Registration successful", "success");
      router.push("/admin/dashboard");
    })
    .catch((err) => {
      toast(err.message || "Registration error", "error");
    });
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
