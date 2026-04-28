<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Collapse } from 'bootstrap'

const route = useRoute()
const router = useRouter()

const navLinks = [
  { name: '首頁', to: '/' },
  { name: '專業領域', to: '/services' },
  { name: '關於律師', to: '/about' },
  { name: '法律知識 Q&A', to: '/qa' },
  { name: '聯繫我們', to: '/contact' },
]

function isActive(path) {
  return route.path === path
}

function collapseMenu() {
  const el = document.getElementById('mainNav')
  if (el) {
    const bsCollapse = Collapse.getInstance(el)
    if (bsCollapse) bsCollapse.hide()
  }
}

router.afterEach(collapseMenu)
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top" style="background-color: #111c4e; border-bottom: 2px solid #b8860b;">
    <div class="container">
      <!-- Brand -->
      <RouterLink class="navbar-brand navbar-brand-logo d-flex align-items-center gap-2" to="/">
        <i class="bi bi-scales"></i>
        <span><span style="color: #b8860b;">陳建宏</span> 律師事務所</span>
      </RouterLink>

      <!-- Hamburger -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
          <li v-for="link in navLinks" :key="link.to" class="nav-item">
            <RouterLink
              class="nav-link px-3 py-2"
              :class="{ 'nav-link-active': isActive(link.to) }"
              :to="link.to"
            >
              {{ link.name }}
            </RouterLink>
          </li>
          <li class="nav-item ms-lg-2">
            <RouterLink to="/contact" class="btn btn-gold btn-sm px-4">
              免費諮詢
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-link {
  font-weight: 500;
  letter-spacing: 0.03em;
  transition: color 0.2s;
  color: rgba(255, 255, 255, 0.85) !important;
  border-radius: 0.4rem;
}

.nav-link:hover,
.nav-link-active {
  color: #b8860b !important;
  background-color: rgba(184, 134, 11, 0.08);
}
</style>
