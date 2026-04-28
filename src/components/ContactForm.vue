<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  phone: '',
  subject: '',
  message: '',
})

const subjects = [
  '民事訴訟',
  '刑事辯護',
  '商務合約',
  '遺產繼承',
  '勞資糾紛',
  '其他法律諮詢',
]

const submitted = ref(false)
const loading = ref(false)
const errors = reactive({})

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.name.trim()) errors.name = '請輸入姓名'
  if (!form.phone.trim()) errors.phone = '請輸入聯絡電話'
  else if (!/^[\d\-\+\(\)\s]{8,}$/.test(form.phone)) errors.phone = '電話格式不正確'
  if (!form.subject) errors.subject = '請選擇諮詢事由'
  if (!form.message.trim()) errors.message = '請輸入問題說明'
  else if (form.message.trim().length < 20) errors.message = '說明至少需 20 個字'
  return Object.keys(errors).length === 0
}

async function submitForm() {
  if (!validate()) return
  loading.value = true
  // Simulate async API / EmailJS call
  await new Promise(r => setTimeout(r, 1500))
  loading.value = false
  submitted.value = true
}

function reset() {
  Object.assign(form, { name: '', phone: '', subject: '', message: '' })
  submitted.value = false
}
</script>

<template>
  <!-- Success State -->
  <div v-if="submitted" class="text-center py-5">
    <i class="bi bi-check-circle-fill fs-1 mb-3" style="color: #198754;"></i>
    <h4 class="fw-bold mb-2" style="color: #1a2a6c;">諮詢申請已送出！</h4>
    <p class="text-muted mb-1">感謝您的來信，我們將於一至兩個工作日內與您聯繫。</p>
    <p class="small text-muted mb-4">（確認信已模擬寄送至您的信箱）</p>
    <button class="btn btn-gold" @click="reset">再次諮詢</button>
  </div>

  <!-- Form -->
  <form v-else @submit.prevent="submitForm" novalidate>
    <div class="row g-3">
      <!-- Name -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">姓名 <span class="text-danger">*</span></label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          placeholder="您的大名"
        />
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <!-- Phone -->
      <div class="col-md-6">
        <label class="form-label fw-semibold">聯絡電話 <span class="text-danger">*</span></label>
        <input
          v-model="form.phone"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors.phone }"
          placeholder="0912-345-678"
        />
        <div class="invalid-feedback">{{ errors.phone }}</div>
      </div>

      <!-- Subject -->
      <div class="col-12">
        <label class="form-label fw-semibold">諮詢事由 <span class="text-danger">*</span></label>
        <select
          v-model="form.subject"
          class="form-select"
          :class="{ 'is-invalid': errors.subject }"
        >
          <option value="">請選擇...</option>
          <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
        </select>
        <div class="invalid-feedback">{{ errors.subject }}</div>
      </div>

      <!-- Message -->
      <div class="col-12">
        <label class="form-label fw-semibold">問題說明 <span class="text-danger">*</span></label>
        <textarea
          v-model="form.message"
          rows="5"
          class="form-control"
          :class="{ 'is-invalid': errors.message }"
          placeholder="請簡述您的法律問題或諮詢需求（至少 20 字）..."
        ></textarea>
        <div class="invalid-feedback">{{ errors.message }}</div>
        <div class="form-text">{{ form.message.length }} 字</div>
      </div>

      <!-- Privacy Note -->
      <div class="col-12">
        <p class="small text-muted mb-0">
          <i class="bi bi-shield-lock me-1"></i>
          您的個人資料將依個資法規定妥善保護，僅用於本次法律諮詢聯繫使用。
        </p>
      </div>

      <!-- Submit -->
      <div class="col-12">
        <button type="submit" class="btn btn-gold w-100 py-2 fs-6" :disabled="loading">
          <span v-if="loading">
            <span class="spinner-border spinner-border-sm me-2"></span>送出中...
          </span>
          <span v-else>
            <i class="bi bi-send-fill me-2"></i>送出諮詢申請
          </span>
        </button>
      </div>
    </div>
  </form>
</template>
