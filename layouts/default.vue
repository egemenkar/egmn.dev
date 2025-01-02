<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-gray-300">
    <nav class="w-full p-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="{ 'bg-gray-900 bg-opacity-80 backdrop-blur-sm': isScrolled }">
      <div class="max-w-3xl mx-auto flex items-center justify-between px-4">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <UAvatar
            src="https://avatars.githubusercontent.com/u/85014459?v=4"
            alt="Egemen Kar"
            size="sm"
          />
          <span class="text-gray-200 text-lg font-semibold">{{ $t('name') }}</span>
        </NuxtLink>
        <!-- Desktop menu -->
        <nav class="hidden md:block bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <ul class="flex space-x-6">
            <li v-for="link in links" :key="link.to" class="relative group">
              <NuxtLink
                :to="localePath(link.to)"
                class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                :class="{ 'text-white': $route.path === localePath(link.to) }"
              >
                <UIcon :name="link.icon" class="mr-2" />
                <span>{{ $t(link.name) }}</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <!-- Hamburger menu button -->
        <button @click="toggleMenu" class="md:hidden text-gray-400 hover:text-gray-200">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </nav>
    <!-- Mobile menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-show="isMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center md:hidden z-40">
        <div class="bg-gray-900 w-full h-full flex flex-col items-center justify-center">
          <NuxtLink 
            :to="localePath('/')" 
            class="mb-8 flex flex-col items-center hover:opacity-80 transition-opacity duration-200"
            @click="isMenuOpen = false"
          >
            <UAvatar
      src="https://avatars.githubusercontent.com/u/85014459?v=4"
      :alt="$t('name')"
      size="3xl"
      class="mb-4"
      :ui="{
        size: {
          '3xl': 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56',
        },
      }"
    />
            <h1 class="mt-4 text-4xl font-bold text-gray-100">{{ $t('name') }}</h1>
            <p class="mt-2 text-xl text-gray-400">{{ $t('title') }}</p>
          </NuxtLink>
          <NuxtLink 
            v-for="link in links" 
            :key="link.to" 
            :to="localePath(link.to)" 
            class="text-gray-400 hover:text-gray-200 transition-colors duration-200 px-3 py-4 text-xl flex items-center"
            :class="{ 'text-gray-200': $route.path === localePath(link.to) }"
            @click="isMenuOpen = false"
          >
            <UIcon :name="link.icon" class="mr-3 text-2xl" />
            {{ $t(link.name) }}
          </NuxtLink>
        </div>
      </div>
    </transition>
    <main class="flex-grow flex justify-center mt-24">
      <div class="w-full max-w-3xl overflow-y-auto custom-scrollbar">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const links = [
  { name: 'about', to: '/about', icon: 'i-heroicons-user' },
  { name: 'projects.shortTitle', to: '/projects', icon: 'i-heroicons-code-bracket' },
  { name: 'bookmarks.title', to: '/bookmarks', icon: 'i-heroicons-bookmark' },
]

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const checkScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 3px;
}

.custom-scrollbar:hover {
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
}
</style>

