import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { supabase } from '../config/supabase.js'

const SITE_URL = 'https://www.xiulawyer.com'
const SITE_NAME = '修律｜林仁修律師 Attorney at Law'

async function adminGuard(to, from, next) {
  const { data: { session } } = await supabase.auth.getSession()
  if (session) {
    next()
  } else {
    next('/admin/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: SITE_NAME,
      description: '修律｜林仁修律師——精準法律判斷，穩健風險控管。提供民事訴訟、刑事辯護、警局陪偵、非訟事件、法律顧問等全方位法律服務。免費線上諮詢，一至兩個工作日內回覆。',
    },
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/ServicesView.vue'),
    meta: {
      title: '服務項目｜修律 林仁修律師',
      description: '修律提供各類民事、家事、刑事案件代理，以及警局陪偵、非訟事件、法律顧問等全方位法律服務，依個案量身訂製最有利的解決方案。',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: {
      title: '關於律師｜修律 林仁修律師',
      description: '認識林仁修律師的專業背景與執業理念：精準法律判斷，穩健風險控管，為您打造最有利的解決方案。',
    },
  },
  {
    path: '/cases',
    name: 'Cases',
    component: () => import('../views/CasesView.vue'),
    meta: {
      title: '成功案例｜修律 林仁修律師',
      description: '修律精選代表性委任案件分享（已依規定去識別化），了解過往案件處理經驗與服務品質。',
    },
  },
  {
    path: '/qa',
    name: 'QA',
    component: () => import('../views/QAView.vue'),
    meta: {
      title: '法律知識 Q&A｜修律 林仁修律師',
      description: '常見法律問題解析，助您在面對民事、刑事、家事等法律困境前先做好準備。',
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: '立即諮詢｜修律 林仁修律師',
      description: '面對法律問題，歡迎線上填寫諮詢表單，修律將於一至兩個工作日內回覆，助您找到最有利的解方。',
    },
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/PrivacyView.vue'),
    meta: {
      title: '隱私權政策｜修律 林仁修律師',
      description: '修律個人資料保護聲明，說明本網站如何蒐集、處理及利用您的個人資料。',
    },
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/admin/AdminLogin.vue'),
    meta: {
      title: '管理員登入｜修律',
      robots: 'noindex, nofollow',
    },
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../views/admin/AdminDashboard.vue'),
    beforeEnter: adminGuard,
    meta: {
      title: '後台管理｜修律',
      robots: 'noindex, nofollow',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

function setMetaTag(attrName, attrValue, content) {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// 每次換頁時，同步更新 title / description / OG / canonical，
// 讓每個路由在瀏覽器分頁、搜尋結果、社群分享預覽中顯示各自的內容。
router.afterEach((to) => {
  const title = to.meta.title || SITE_NAME
  const description = to.meta.description || ''
  const canonicalUrl = SITE_URL + (to.path === '/' ? '/' : to.path)

  document.title = title
  setMetaTag('name', 'robots', to.meta.robots || 'index, follow')
  if (description) setMetaTag('name', 'description', description)
  setMetaTag('property', 'og:title', title)
  if (description) setMetaTag('property', 'og:description', description)
  setMetaTag('property', 'og:url', canonicalUrl)
  setMetaTag('name', 'twitter:title', title)
  if (description) setMetaTag('name', 'twitter:description', description)
  setCanonical(canonicalUrl)
})

export default router
