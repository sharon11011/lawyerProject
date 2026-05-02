<script setup>
import ContactForm from '../components/ContactForm.vue'

const contactInfos = [
  { icon: 'bi-telephone-fill', title: '電話諮詢', lines: ['0976-390-669'] },
  { icon: 'bi-envelope-fill', title: '電子信箱', lines: ['lawyer.jasonlin@gmail.com'] },
  { icon: 'bi-chat-dots-fill', title: 'LINE 官方帳號', lines: ['ID：@xiu_law', '點擊下方按鈕加入好友'] },
  { icon: 'bi-instagram', title: 'Instagram', lines: ['@xiu_lawyer', '法律知識推廣、案例分享'] },
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
      <h1 class="text-white fw-bold">立即諮詢</h1>
      <p style="color:rgba(255,255,255,.7);" class="mb-0">面對法律問題，請讓修律幫助您找到最有利的解方</p>
    </div>
  </div>

  <section class="py-5 bg-light-custom">
    <div class="container">
      <div class="row g-5">

        <!-- Contact Info Column -->
        <div class="col-lg-4" data-aos="fade-right">
          <h3 class="section-title">聯絡方式</h3>

          <div class="d-flex flex-column gap-3 mb-4">
            <div
              v-for="(info, i) in contactInfos"
              :key="info.title"
              class="d-flex gap-3 align-items-start"
              data-aos="fade-up"
              :data-aos-delay="i * 80"
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
          <div class="card border-0 shadow-sm p-3 mb-4" data-aos="fade-up" data-aos-delay="320">
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
              href="https://line.me/R/ti/p/@xiu_law"
              target="_blank"
              class="btn fw-semibold d-flex align-items-center gap-2 justify-content-center"
              style="background:#06c755;color:#fff;border-radius:10px;"
            >
              <i class="bi bi-chat-dots-fill fs-5"></i>
              <div class="text-start">
                <div style="font-size:.75rem;opacity:.85;">LINE 加入好友</div>
                <div>@xiu_law</div>
              </div>
            </a>
            <a
              href="https://www.instagram.com/xiu_lawyer"
              target="_blank"
              class="btn fw-semibold d-flex align-items-center gap-2 justify-content-center text-white"
              style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);border-radius:10px;"
            >
              <i class="bi bi-instagram fs-5"></i>
              <div class="text-start">
                <div style="font-size:.75rem;opacity:.85;">Instagram 追蹤</div>
                <div>@xiu_lawyer</div>
              </div>
            </a>
            <a
              href="tel:0976390669"
              class="btn btn-outline-secondary fw-semibold d-flex align-items-center gap-2 justify-content-center"
              style="border-radius:10px;"
            >
              <i class="bi bi-telephone-fill fs-5" style="color:#1a2a6c;"></i>
              <div class="text-start">
                <div style="font-size:.75rem;color:#888;">直撥電話</div>
                <div style="color:#1a2a6c;">0976-390-669</div>
              </div>
            </a>
          </div>
        </div>

        <!-- Form Column -->
        <div class="col-lg-8" data-aos="fade-left" data-aos-delay="100">
          <div class="card border-0 shadow p-4 p-md-5">
            <h3 class="section-title mb-4">線上諮詢表單</h3>
            <p class="text-muted small mb-4">
              <i class="bi bi-star-fill me-1" style="color:#b8860b;"></i>
              填寫表單後，林律師將於一至兩個工作日內與您聯繫，安排進一步諮詢。
            </p>
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
