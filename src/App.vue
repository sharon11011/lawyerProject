<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import FooterSection from './components/FooterSection.vue'

const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div id="app-wrapper">
    <template v-if="!isAdmin">
      <Navbar />
      <main><RouterView /></main>
      <FooterSection />
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>
