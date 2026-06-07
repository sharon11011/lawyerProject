<script setup>
import { ref, reactive, onMounted } from 'vue'
import emailjs from '@emailjs/browser'
import { EMAILJS } from '@/config/emailjs.js'
import { supabase } from '@/config/supabase.js'

const STORAGE_KEY = 'xiu_submissions'

const form = reactive({ name: '', phone: '', subject: '', message: '' })

const subjects = [
  '各類民事案件', '各類刑事案件', '警局陪偵', '非訟事件', '法律顧問', '其他法律諮詢',
]

const submitted = ref(false)
const loading   = ref(false)
const sendError = ref('')
const errors    = reactive({})

onMounted(() => {
  emailjs.init(EMAILJS.PUBLIC_KEY)
})

function validate() {
  Object.keys(errors).forEach(k => delete errors[k])
  if (!form.name.trim())    errors.name    = '請輸入姓名'
  if (!form.phone.trim())   errors.phone   = '請輸入聯絡電話'
  else if (!/^09\d{2}[\s\-]?\d{3}[\s\-]?\d{3}$/.test(form.phone.trim())) errors.phone = '請輸入正確的手機號碼（09 開頭，共 10 碼）'
  if (!form.subject)        errors.subject = '請選擇諮詢事由'
  if (!form.message.trim()) errors.message = '請輸入問題說明'
  return Object.keys(errors).length === 0
}

function saveToStorage(data) {
  const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  list.unshift(data)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

async function submitForm() {
  if (!validate()) return
  loading.value  = true
  sendError.value = ''

  const now = new Date()
  const sentAt = now.toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  })

  const submission = {
    id:        `${Date.now()}-${Math.random().toString(36).slice(2,7)}`,
    name:      form.name.trim(),
    phone:     form.phone.trim(),
    subject:   form.subject,
    message:   form.message.trim(),
    sentAt,
    timestamp: now.toISOString(),
  }

  // 儲存到 localStorage（本地備份）
  saveToStorage(submission)

  // 儲存到 Supabase
  supabase.from('submissions').insert({
    name:    submission.name,
    phone:   submission.phone,
    subject: submission.subject,
    message: submission.message,
    sent_at: submission.sentAt,
  }).catch(err => console.error('Supabase insert error:', err))

  // EmailJS 寄信（主收件人；其餘 email 請在 EmailJS 範本的 BCC 欄位設定）
  const templateParams = {
    from_name:  submission.name,
    from_phone: submission.phone,
    subject:    submission.subject,
    message:    submission.message,
    sent_at:    submission.sentAt,
    to_email:   EMAILJS.TO_EMAILS[0],
  }

  try {
    const configured = EMAILJS.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
    if (configured) {
      await emailjs.send(EMAILJS.SERVICE_ID, EMAILJS.TEMPLATE_ID, templateParams)
    }
    submitted.value = true
  } catch (err) {
    console.error('EmailJS error:', err)
    submitted.value = true
  } finally {
    loading.value = false
  }
}

function reset() {
  Object.assign(form, { name: '', phone: '', subject: '', message: '' })
  submitted.value  = false
  sendError.value  = ''
}
</script>

<template>
  <!-- Success -->
  <div v-if="submitted" class="text-center py-5">
    <i class="bi bi-check-circle-fill fs-1 mb-3" style="color:#198754;"></i>
    <h4 class="fw-bold mb-2" style="color:#1a2a6c;">諮詢申請已送出！</h4>
    <p class="text-muted mb-1">感謝您的來信，林律師將於一至兩個工作日內與您聯繫。</p>
    <p class="small text-muted mb-4">若急需協助，請直接撥打 0976-390-669</p>
    <button class="btn btn-gold" @click="reset">再次諮詢</button>
  </div>

  <!-- Form -->
  <form v-else @submit.prevent="submitForm" novalidate>
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label fw-semibold">姓名 <span class="text-danger">*</span></label>
        <input v-model="form.name" type="text" class="form-control"
          :class="{ 'is-invalid': errors.name }" placeholder="您的大名" />
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="col-md-6">
        <label class="form-label fw-semibold">聯絡電話 <span class="text-danger">*</span></label>
        <input v-model="form.phone" type="tel" class="form-control"
          :class="{ 'is-invalid': errors.phone }" placeholder="0912-345-678" />
        <div class="invalid-feedback">{{ errors.phone }}</div>
      </div>

      <div class="col-12">
        <label class="form-label fw-semibold">諮詢事由 <span class="text-danger">*</span></label>
        <select v-model="form.subject" class="form-select"
          :class="{ 'is-invalid': errors.subject }">
          <option value="">請選擇...</option>
          <option v-for="s in subjects" :key="s" :value="s">{{ s }}</option>
        </select>
        <div class="invalid-feedback">{{ errors.subject }}</div>
      </div>

      <div class="col-12">
        <label class="form-label fw-semibold">問題說明 <span class="text-danger">*</span></label>
        <textarea v-model="form.message" rows="5" class="form-control"
          :class="{ 'is-invalid': errors.message }"
          placeholder="請簡述您的法律問題或諮詢需求..."></textarea>
        <div class="invalid-feedback">{{ errors.message }}</div>
        <div class="form-text">{{ form.message.length }} 字</div>
      </div>

      <div class="col-12">
        <p class="small text-muted mb-0">
          <i class="bi bi-shield-lock me-1"></i>
          您的個人資料將依個資法規定妥善保護，僅用於本次法律諮詢聯繫使用。
        </p>
      </div>

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
