<script setup>
import Navbar from './components/Navbar.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div id="app-wrapper">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <FooterSection />
  </div>
</template>
