<template>
  <div class="space-y-4 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-200">
      About Me
    </h1>

    <UTabs :items="tabs" class="mt-4 sm:mt-6" @change="onTabsChange">
      <template #item="{ item }">
        <div class="space-y-4 py-2 sm:py-4">
          <template v-if="item.key === 'experience'">
            <TransitionGroup
              name="experience"
              tag="div"
              class="space-y-6 sm:space-y-10"
            >
              <div
                v-for="(job, index) in visibleJobs"
                :key="job.company"
                class="job-item"
              >
                <div class="flex justify-between items-start">
                  <h3 class="text-lg sm:text-xl font-medium text-gray-200">
                    {{ job.company }}
                  </h3>
                  <p class="text-gray-400">{{ job.period }}</p>
                </div>
                <p class="text-base sm:text-lg italic text-gray-300">
                  {{ job.position }}
                </p>
                <p class="text-gray-400 mb-1 sm:mb-2">{{ job.location }}</p>
                <ul
                  class="list-disc list-inside text-gray-300 text-xs sm:text-sm"
                >
                  <li
                    v-for="responsibility in job.responsibilities"
                    :key="responsibility"
                    class="mb-1"
                  >
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
            </TransitionGroup>
          </template>

          <template v-if="item.key === 'education'">
            <TransitionGroup
              name="education"
              tag="div"
              class="space-y-6 sm:space-y-10"
            >
              <div v-for="edu in visibleEducation" :key="edu.institution">
                <h3 class="text-lg sm:text-xl font-medium text-gray-200">
                  {{ edu.institution }}
                </h3>
                <p class="text-sm sm:text-base text-gray-300">
                  {{ edu.degree }}
                </p>
                <p class="text-gray-400">{{ edu.year }} | {{ edu.location }}</p>
              </div>
            </TransitionGroup>
          </template>
        </div>
      </template>
    </UTabs>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const tabs = [
  { key: "experience", label: "Work Experience" },
  { key: "education", label: "Education" },
];

const workExperience = [
  {
    company: "DESPATCH CLOUD",
    position: "Head of Frontend",
    period: "Feb 2025 – Present",
    location: "Driffield, England, United Kingdom - Remote",
    responsibilities: [
      "Led the development of user-facing web applications using modern frontend technologies like Vue.js and React.",
      "Collaborated with the design team to translate concepts into scalable, high-quality interfaces.",
      "Established coding standards and ensured best practices across the frontend codebase.",
      "Mentored and managed a team of frontend developers, fostering professional growth and innovation.",
      "Actively coded and contributed to key projects while shaping the technical direction of the platform.",
      "Ensured high performance, scalability, and reliability in all frontend applications.",
    ],
  },
  {
    company: "DESPATCH CLOUD",
    position: "Senior Frontend Developer",
    period: "Apr 2023 – Feb 2025",
    location: "Driffield, England, United Kingdom - Remote",
    responsibilities: [
      "Transformed Figma designs into fully functional web applications using Nuxt.js and Vue.js.",
      "Collaborated closely with the design team to ensure pixel-perfect implementation and maintain high UI/UX standards.",
      "Developed applications to enhance order processing and shipping workflows for e-commerce companies and warehouses.",
      "Integrated APIs and backend services to create seamless user experiences and improve order management.",
      "Built reusable components and optimized application performance for enhanced speed and responsiveness.",
    ],
  },
  {
    company: "RIGHTYON",
    position: "Frontend Developer",
    period: "Jan 2022 – Apr 2023",
    location: "Istanbul, Türkiye",
    responsibilities: [
      "Developed and maintained a complicated web application about vehicle tracking using Vue.js.",
      "Developed landing pages in line with SEO optimization using Nuxt.js and Tailwind CSS for marketing.",
      "Developed a CRM web app for tracking customers of another SAAS product of the company.",
      "Gained knowledge and practice on creating a mobile app about vehicle tracking using React Native.",
      "Gained experience in working with GraphQL queries and usage of the Apollo GraphQL library.",
      "Gained expertise in Google Map JavaScript API including Geolocation, Places, Directions API, etc.",
    ],
  },
  {
    company: "Freelance",
    position: "Full Stack Web Developer",
    period: "Apr 2018 – Jan 2022",
    location: "Istanbul, Türkiye - Remote",
    responsibilities: [
      "Collaborated with a diverse range of clients to troubleshoot and resolve complex coding issues, ensuring smooth project completion and client satisfaction.",
      "Successfully developed and deployed full-stack applications using the MERN (MongoDB, Express, React, Node.js) stack, focusing on performance, scalability, and user-friendly interfaces.",
      "Managed multiple projects simultaneously, ensuring timely delivery and high-quality standards.",
      "Designed and developed custom WordPress websites for various clients.",
    ],
  },
];

const education = [
  {
    institution: "Anadolu University",
    degree: "Bachelor of Science, Management Information Systems",
    year: "September, 2025",
    location: "Eskisehir, Turkey",
  },
  {
    institution: "Ataturk University",
    degree: "Associate of Science, Computer Programming",
    year: "September, 2023",
    location: "Erzurum, Turkey",
  },
  {
    institution: "Turkish National Defense University",
    degree: "Bachelor of Science, Naval Architecture and Marine Engineering",
    year: "September, 2010",
    location: "Istanbul, Turkey",
  },
];

const visibleJobs = ref([]);
const visibleEducation = ref([]);

const showNextSection = (key) => {
  if (key === "experience") {
    visibleJobs.value = [];
    showNextJob();
  } else if (key === "education") {
    visibleEducation.value = [];
    showNextEducation();
  }
};

const showNextJob = () => {
  if (visibleJobs.value.length < workExperience.length) {
    visibleJobs.value.push(workExperience[visibleJobs.value.length]);
  }
};

const showNextEducation = () => {
  if (visibleEducation.value.length < education.length) {
    visibleEducation.value.push(education[visibleEducation.value.length]);
  }
};

const startAnimation = (key) => {
  if (key === "experience") {
    showNextSection("experience");
    const interval = setInterval(() => {
      if (visibleJobs.value.length < workExperience.length) {
        showNextJob();
      } else {
        clearInterval(interval);
      }
    }, 500);
  } else if (key === "education") {
    showNextSection("education");
    const interval = setInterval(() => {
      if (visibleEducation.value.length < education.length) {
        showNextEducation();
      } else {
        clearInterval(interval);
      }
    }, 500);
  }
};

const onTabsChange = (index) => {
  if (tabs[index].key === "experience") {
    visibleJobs.value = [];
    startAnimation("experience");
  } else if (tabs[index].key === "education") {
    visibleEducation.value = [];
    startAnimation("education");
  }
};

onMounted(() => {
  startAnimation("experience");
});
</script>

<style scoped>
.experience-enter-active,
.experience-leave-active {
  transition: all 0.5s ease;
}
.experience-enter-from,
.experience-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.education-enter-active,
.education-leave-active {
  transition: all 0.5s ease;
}
.education-enter-from,
.education-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
