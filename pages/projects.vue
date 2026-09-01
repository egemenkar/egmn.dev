<template>
  <div class="container mx-auto space-y-4 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
      {{ t("projects.title") }}
    </h1>
    <TransitionGroup name="project-list" tag="div" class="grid gap-4 sm:gap-6">
      <div
        v-for="project in visibleProjects"
        :key="project.id"
        class="project-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-4 sm:p-6 text-left col-span-full"
      >
        <a
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block h-full relative z-10"
        >
          <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 pr-8">
            {{ t(project.titleKey) }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ t(project.descriptionKey) }}
          </p>
          <div class="flex items-center justify-between">
            <div
              class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400"
            >
              <a
                v-for="tool in project.tools"
                :key="tool.name"
                :href="tool.url"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white transition-colors duration-200"
                :title="tool.name"
                @click.stop
              >
                <UIcon v-if="tool.icon" :name="tool.icon" class="w-6 h-6" />
                <img
                  v-else
                  :src="tool.logo"
                  alt="Tool Logo"
                  class="w-6 h-6 hover:brightness-200 transition-all duration-200"
                />
              </a>
            </div>
            <div class="flex items-center space-x-2">
              <span
                v-if="project.inDevelopment"
                class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200"
              >
                <span
                  class="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500"
                ></span>
                {{ t("projects.inDevelopment") }}
              </span>
              <a
                v-if="project.url"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors duration-200"
                @click.stop
              >
                <UIcon
                  :name="
                    project.url.includes('apps.apple.com')
                      ? 'i-simple-icons-appstore'
                      : project.url.includes('github.com')
                      ? 'i-simple-icons-github'
                      : 'i-heroicons-globe-alt'
                  "
                  class="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </a>
      </div>
      <div
        v-if="showComingSoon"
        :key="'coming-soon'"
        class="project-card coming-soon bg-transparent dark:bg-transparent rounded-lg overflow-hidden text-left col-span-full"
      >
        <div
          class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 sm:p-6 h-full"
        >
          <h2
            class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-gray-500 dark:text-gray-400"
          >
            {{ t("projects.comingSoon") }}
          </h2>
          <p class="text-gray-400 dark:text-gray-500">
            {{ t("projects.comingSoonMessage") }}
          </p>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const showProjects = ref(false);
const showComingSoon = ref(false);

const projects = [
  {
    id: 1,
    titleKey: "projects.fomoFast.title",
    descriptionKey: "projects.fomoFast.description",
    url: "https://www.fomo.fast",
    tools: [
      {
        name: "Swift",
        icon: "i-simple-icons-swift",
        url: "https://developer.apple.com/swift/",
      },
      {
        name: "Next.js",
        icon: "i-simple-icons-nextdotjs",
        url: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        icon: "i-simple-icons-tailwindcss",
        url: "https://tailwindcss.com/",
      },
      {
        name: "Supabase",
        icon: "i-simple-icons-supabase",
        url: "https://supabase.com/",
      },
      {
        name: "Vercel",
        icon: "i-simple-icons-vercel",
        url: "https://vercel.com/",
      },
    ],
  },
  {
    id: 2,
    titleKey: "projects.rosterShift.title",
    descriptionKey: "projects.rosterShift.description",
    url: "https://apps.apple.com/us/app/shift-planner-rostershift/id6759160894",
    tools: [
      {
        name: "Swift",
        icon: "i-simple-icons-swift",
        url: "https://developer.apple.com/swift/",
      },
      {
        name: "Next.js",
        icon: "i-simple-icons-nextdotjs",
        url: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        icon: "i-simple-icons-tailwindcss",
        url: "https://tailwindcss.com/",
      },
      {
        name: "Supabase",
        icon: "i-simple-icons-supabase",
        url: "https://supabase.com/",
      },
      {
        name: "Vercel",
        icon: "i-simple-icons-vercel",
        url: "https://vercel.com/",
      },
    ],
  },
  {
    id: 3,
    titleKey: "projects.portfolioSite.title",
    descriptionKey: "projects.portfolioSite.description",
    url: "https://github.com/egemenkar/egmn.dev",
    tools: [
      {
        name: "Vue.js",
        icon: "i-simple-icons-vuedotjs",
        url: "https://vuejs.org/",
      },
      {
        name: "Nuxt.js",
        icon: "i-simple-icons-nuxtdotjs",
        url: "https://nuxt.com/",
      },
      {
        name: "Tailwind CSS",
        icon: "i-simple-icons-tailwindcss",
        url: "https://tailwindcss.com/",
      },
      {
        name: "Vercel",
        icon: "i-simple-icons-vercel",
        url: "https://vercel.com/",
      },
    ],
  },
  {
    id: 4,
    titleKey: "projects.flickMark.title",
    descriptionKey: "projects.flickMark.description",
    url: "https://apps.apple.com/app/id6747580843",
    tools: [
      {
        name: "Swift",
        icon: "i-simple-icons-swift",
        url: "https://developer.apple.com/swift/",
      },
      {
        name: "iOS",
        icon: "i-simple-icons-ios",
        url: "https://developer.apple.com/ios/",
      },
      {
        name: "Core ML",
        icon: "i-simple-icons-apple",
        url: "https://developer.apple.com/machine-learning/",
      },
      {
        name: "Xcode",
        icon: "i-simple-icons-xcode",
        url: "https://developer.apple.com/xcode/",
      },
    ],
  },
  /*{
      id: 4,
      titleKey: "projects.findepMoney.title",
    descriptionKey: "projects.findepMoney.description",
    url: null,
    tools: [
      {
        name: "Nuxt.js",
        icon: "i-simple-icons-nuxtdotjs",
        url: "https://nuxt.com/",
      },
      {
        name: "PrimeVue",
        icon: null,
        logo: "/images/primevue.svg",
        url: "https://primevue.org/",
      },
      {
        name: "PowerSync",
        icon: null,
        logo: "/images/powersync.svg",
        url: "https://www.powersync.com/",
      },
      {
        name: "Tailwind CSS",
        icon: "i-simple-icons-tailwindcss",
        url: "https://tailwindcss.com/",
      },
    ],
  },
  {
    id: 4,
    titleKey: "projects.teletextPage.title",
    descriptionKey: "projects.teletextPage.description",
    url: null,
    tools: [
      {
        name: "Next.js",
        icon: "i-simple-icons-nextdotjs",
        url: "https://nextjs.org/",
      },
      {
        name: "Tailwind CSS",
        icon: "i-simple-icons-tailwindcss",
        url: "https://tailwindcss.com/",
      },
    ],
  },
  {
    id: 5,
    titleKey: "projects.chargingStations.title",
    descriptionKey: "projects.chargingStations.description",
    url: null,
    tools: [
      {
        name: "React Native",
        icon: "i-simple-icons-react",
        url: "https://reactnative.dev/",
      },
      {
        name: "Expo",
        icon: "i-simple-icons-expo",
        url: "https://expo.dev/",
      },
      {
        name: "Nativewind",
        icon: "i-simple-icons-nativewind",
        url: "https://nativewind.dev/",
      },
    ],
  },*/
  // Add more projects here as needed
];

const visibleProjects = computed(() => (showProjects.value ? projects : []));

onMounted(() => {
  setTimeout(() => {
    showProjects.value = true;
  }, 100);

  setTimeout(() => {
    showComingSoon.value = true;
  }, 600); // Delay the appearance of the "Coming Soon" card
});
</script>

<style scoped>
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.5s ease;
}
.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.project-card {
  position: relative;
  transition: all 0.3s ease;
  display: inline-block;
  width: 100%;
  break-inside: avoid;
  cursor: pointer;
}

.project-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.05);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.project-card:hover::after {
  opacity: 1;
}

.coming-soon {
  cursor: default;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.coming-soon:hover {
  transform: none;
  box-shadow: none;
  opacity: 1;
}

.coming-soon::after {
  display: none;
}

.coming-soon > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
