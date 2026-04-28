<script setup>
import ContactForm from '../components/ContactForm.vue'

const contactInfos = [
  { icon: 'bi-geo-alt-fill', title: '事務所地址', lines: ['台北市信義區忠孝東路五段 100 號', '8 樓 803 室'] },
  { icon: 'bi-telephone-fill', title: '聯絡電話', lines: ['(02) 2345-6789', '緊急線：0912-345-678'] },
  { icon: 'bi-envelope-fill', title: '電子信箱', lines: ['contact@chenlawyer.com.tw'] },
]

const hours = [
  { day: '週一至週五', time: '09:00 – 18:00', available: true },
  { day: '週六', time: '10:00 – 15:00', available: true },
  { day: '週日 & 國定假日', time: '休息', available: false },
]
</script>

<template>
  <!-- Page Header -->
  <div class="bg-navy py-5 text-center" data-aos="fade-down">
    <div class="container">
      <i class="bi bi-envelope-fill fs-2 mb-2" style="color:#b8860b;"></i>
      <h1 class="text-white fw-bold">聯繫我們</h1>
      <p style="color:rgba(255,255,255,.7);" class="mb-0">面對法律問題，請讓我們幫助您找到最佳解方</p>
    </div>
  </div>

  <section class="py-5 bg-light-custom">
    <div class="container">
      <div class="row g-5">

        <!-- Contact Info Column -->
        <div class="col-lg-4" data-aos="fade-right">
          <h3 class="section-title">聯絡資訊</h3>

          <div class="d-flex flex-column gap-3 mb-4">
            <div
              v-for="(info, i) in contactInfos"
              :key="info.title"
              class="d-flex gap-3 align-items-start"
              data-aos="fade-up"
              :data-aos-delay="i * 100"
            >
              <div
                class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style="width:44px;height:44px;background:#1a2a6c;"
              >
                <i :class="['bi', info.icon, 'text-white']"></i>
              </div>
              <div>
                <div class="fw-semibold small mb-1" style="color:#1a2a6c;">{{ info.title }}</div>
                <div v-for="line in info.lines" :key="line" class="text-muted small">{{ line }}</div>
              </div>
            </div>
          </div>

          <!-- Business Hours -->
          <div class="card border-0 shadow-sm p-3 mb-4" data-aos="fade-up" data-aos-delay="300">
            <h6 class="fw-bold mb-3" style="color:#1a2a6c;">
              <i class="bi bi-clock-fill me-2" style="color:#b8860b;"></i>服務時間
            </h6>
            <div
              v-for="h in hours"
              :key="h.day"
              class="d-flex justify-content-between small py-1 border-bottom"
            >
              <span>{{ h.day }}</span>
              <span :style="h.available ? 'color:#1a2a6c;font-weight:600;' : 'color:#b8860b;'">{{ h.time }}</span>
            </div>
          </div>

          <!-- Social Links -->
          <div class="d-flex flex-column gap-2" data-aos="fade-up" data-aos-delay="400">
            <a
              href="https://line.me/R/ti/p/@chenlawyer"
              target="_blank"
              class="btn btn-sm fw-semibold d-flex align-items-center gap-2"
              style="background:#06c755;color:#fff;border-radius:8px;"
            >
              <i class="bi bi-chat-dots-fill"></i>LINE 加入好友 @chenlawyer
            </a>
            <a
              href="https://instagram.com/chenlawyer_tw"
              target="_blank"
              class="btn btn-sm fw-semibold d-flex align-items-center gap-2"
              style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);color:#fff;border-radius:8px;"
            >
              <i class="bi bi-instagram"></i>追蹤 Instagram @chenlawyer_tw
            </a>
          </div>
        </div>

        <!-- Form Column -->
        <div class="col-lg-8" data-aos="fade-left" data-aos-delay="100">
          <div class="card border-0 shadow p-4 p-md-5">
            <h3 class="section-title mb-4">線上諮詢申請</h3>
            <p class="text-muted small mb-4">
              <i class="bi bi-star-fill me-1" style="color:#b8860b;"></i>
              首次諮詢（電話）30 分鐘免費，送出表單後我們將於一至兩個工作日與您聯繫確認時間。
            </p>
            <ContactForm />
          </div>
        </div>

      </div>

      <!-- Google Maps Placeholder -->
      <div class="mt-5" data-aos="fade-up">
        <h4 class="fw-bold mb-3" style="color:#1a2a6c;">
          <i class="bi bi-map-fill me-2" style="color:#b8860b;"></i>位置地圖
        </h4>
        <div
          class="rounded-4 overflow-hidden shadow-sm d-flex align-items-center justify-content-center"
          style="height:360px;background:#e8eaf0;border:2px dashed #1a2a6c;"
        >
          <div class="text-center">
            <i class="bi bi-map fs-1 mb-3" style="color:#1a2a6c;"></i>
            <p class="fw-semibold mb-1" style="color:#1a2a6c;">Google 地圖嵌入區域</p>
            <p class="small text-muted">台北市信義區忠孝東路五段 100 號 8 樓</p>
            <a href="https://maps.google.com" target="_blank" class="btn btn-sm btn-outline-secondary">
              在 Google 地圖開啟
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
