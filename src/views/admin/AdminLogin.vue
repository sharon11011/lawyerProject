<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/config/supabase.js'

const router   = useRouter()
const email    = ref('')
const password = ref('')
const error    = ref('')
const loading  = ref(false)
const showPwd  = ref(false)

async function login() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = '請輸入帳號與密碼'
    return
  }
  loading.value = true

  const { data, error: authErr } = await supabase.auth.signInWithPassword({
    email:    email.value.trim(),
    password: password.value,
  })

  loading.value = false

  if (authErr || !data.session) {
    error.value = '帳號或密碼錯誤，請重新輸入'
    password.value = ''
    return
  }

  const now = new Date().toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })
  sessionStorage.setItem('admin_login_time', now)

  supabase.from('admin_logs').insert({
    username: data.user.email,
    action: 'login',
    detail: now,
  }).then(() => {})

  router.push('/admin')
}
</script>

<template>
  <div class="admin-login-bg d-flex align-items-center justify-content-center min-vh-100">
    <div class="admin-login-overlay"></div>

    <div class="position-relative" style="z-index:2;width:100%;max-width:420px;padding:1.5rem;">
      <div class="card border-0 shadow-lg rounded-4 overflow-hidden">
        <div class="card-header text-center py-4 border-0" style="background:#111c4e;">
          <i class="bi bi-scales fs-1 mb-2" style="color:#b8860b;display:block;"></i>
          <h5 class="text-white fw-bold mb-0">修律管理後台</h5>
          <p class="small mb-0" style="color:rgba(255,255,255,.55);">Xiu Law Admin Panel</p>
        </div>

        <div class="card-body p-4 p-md-5">
          <h6 class="fw-bold mb-4 text-center" style="color:#1a2a6c;">
            <i class="bi bi-shield-lock me-1" style="color:#b8860b;"></i>管理員登入
          </h6>

          <div v-if="error" class="alert alert-danger py-2 small d-flex align-items-center gap-2" role="alert">
            <i class="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
            {{ error }}
          </div>

          <form @submit.prevent="login" novalidate>
            <div class="mb-3">
              <label class="form-label fw-semibold small">管理員帳號</label>
              <div class="input-group">
                <span class="input-group-text" style="background:#f0f2f8;border-color:#dee2e6;">
                  <i class="bi bi-person-fill" style="color:#1a2a6c;"></i>
                </span>
                <input
                  v-model="email"
                  type="text"
                  class="form-control"
                  placeholder="請輸入管理員帳號"
                  autocomplete="username"
                  @keydown.enter="login"
                />
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-semibold small">密碼</label>
              <div class="input-group">
                <span class="input-group-text" style="background:#f0f2f8;border-color:#dee2e6;">
                  <i class="bi bi-lock-fill" style="color:#1a2a6c;"></i>
                </span>
                <input
                  v-model="password"
                  :type="showPwd ? 'text' : 'password'"
                  class="form-control"
                  placeholder="請輸入密碼"
                  autocomplete="current-password"
                  @keydown.enter="login"
                />
                <button
                  type="button"
                  class="input-group-text"
                  style="background:#f0f2f8;border-color:#dee2e6;cursor:pointer;"
                  @click="showPwd = !showPwd"
                >
                  <i :class="showPwd ? 'bi bi-eye-slash' : 'bi bi-eye'" style="color:#6c757d;"></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              class="btn w-100 py-2 fw-bold"
              style="background:#1a2a6c;color:#fff;border-radius:.5rem;"
              :disabled="loading"
            >
              <span v-if="loading">
                <span class="spinner-border spinner-border-sm me-2"></span>驗證中...
              </span>
              <span v-else>
                <i class="bi bi-box-arrow-in-right me-2"></i>登入後台
              </span>
            </button>
          </form>
        </div>

        <div class="card-footer text-center py-3 border-0" style="background:#f8f9fb;">
          <RouterLink to="/" class="small text-decoration-none" style="color:#b8860b;">
            <i class="bi bi-arrow-left me-1"></i>返回官網
          </RouterLink>
        </div>
      </div>

      <p class="text-center mt-3 small" style="color:rgba(255,255,255,.5);">
        © {{ new Date().getFullYear() }} 修律｜林仁修律師
      </p>
    </div>
  </div>
</template>

<style scoped>
.admin-login-bg {
  position: relative;
  background: linear-gradient(135deg, #0a1540 0%, #1a2a6c 60%, #2a3f8f 100%);
}
.admin-login-overlay {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><circle cx='160' cy='40' r='60' fill='rgba(184,134,11,0.06)'/><circle cx='20' cy='160' r='80' fill='rgba(255,255,255,0.03)'/></svg>");
  background-size: cover;
}
</style>
