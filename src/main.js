import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'aos/dist/aos.css'
import './assets/styles/main.css'
import App from './App.vue'
import router from './router/index.js'
import AOS from 'aos'

router.afterEach(() => {
  setTimeout(() => AOS.refresh(), 100)
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
