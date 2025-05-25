<template>
  <nav
    class="bg-gray-900 text-white py-4 shadow-md fixed top-0 left-0 right-0 z-50 w-full"
  >
    <div class="container mx-auto flex justify-between items-center px-4">
      <div class="text-2xl font-bold">El7areefa</div>
      <ul class="flex gap-6">
        <li><NuxtLink to="/user" class="hover:text-blue-400">Home</NuxtLink></li>
        <li><a href="#" class="hover:text-blue-400">Payments</a></li>
        <li>
          <NuxtLink to="/register" class="hover:text-blue-400"
            >Register</NuxtLink
          >
        </li>
        <li><a href="#" class="hover:text-blue-400">Standings</a></li>
        <li><a href="#" class="hover:text-blue-400">Transfer Market</a></li>
        <li><a href="#" class="hover:text-blue-400">Contact Us</a></li>
        <li><a href="#" class="hover:text-blue-400">Log In</a></li>
      </ul>
    </div>
  </nav>
</template>


<style lang="scss" scoped></style>
