import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'aos/dist/aos.css'
import './assets/styles/main.css'
import App from './App.vue'
import router from './router/index.js'
import AOS from 'aos'
import { supabase } from '@/config/supabase.js'

router.afterEach((to) => {
  setTimeout(() => AOS.refresh(), 100)
  if (!to.path.startsWith('/admin')) {
    const now = new Date()
    const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    if (!sessionStorage.getItem(`xiu_v_${month}`)) {
      sessionStorage.setItem(`xiu_v_${month}`, '1')
      supabase.from('visits').insert({ month }).then(() => {})
    }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')

AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 60,
})
