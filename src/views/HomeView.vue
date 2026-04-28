<script setup>
import { RouterLink } from 'vue-router'

const services = [
  { icon: 'bi-person-check', title: '民事訴訟', desc: '婚姻、侵權、債務糾紛，全程代理訴訟程序。' },
  { icon: 'bi-shield-fill', title: '刑事辯護', desc: '從偵查到審判，提供最堅實的辯護策略。' },
  { icon: 'bi-briefcase-fill', title: '商務合約', desc: '合約審閱、公司設立、M&A 交易法律把關。' },
  { icon: 'bi-house-heart-fill', title: '遺產繼承', desc: '遺產規劃、繼承分配、遺囑撰擬一條龍服務。' },
]

const stats = [
  { num: '18+', label: '執業年資' },
  { num: '500+', label: '成功案例' },
  { num: '98%', label: '客戶滿意度' },
  { num: '24h', label: '緊急諮詢響應' },
]

const whyUs = [
  { icon: 'bi-award', t: '深厚法學底蘊', d: '政治大學法律系學士、美國哥倫比亞大學法學碩士，學術根基扎實。' },
  { icon: 'bi-chat-square-dots', t: '透明溝通', d: '每個階段主動更新案件進度，杜絕資訊不對稱。' },
  { icon: 'bi-currency-dollar', t: '合理收費', d: '明確報價、無隱藏費用，首次諮詢 30 分鐘免費。' },
  { icon: 'bi-clock', t: '快速響應', d: '緊急法律事務 24 小時內安排會面，守護您的第一時間。' },
]
</script>

<template>
  <!-- ── Hero ── -->
  <section class="hero-section">
    <div class="container position-relative">
      <div class="row align-items-center py-5" style="min-height:88vh;">
        <div class="col-lg-7">
          <p
            class="text-uppercase small mb-2 fw-semibold"
            style="color:#b8860b;letter-spacing:.15em;"
            data-aos="fade-down"
            data-aos-delay="0"
          >
            <i class="bi bi-scales me-1"></i>專業・誠信・守護
          </p>
          <h1
            class="display-4 fw-bold text-white mb-3"
            style="line-height:1.25;"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            陳建宏 律師<br>
            <span style="color:#b8860b;">您最堅實的法律後盾</span>
          </h1>
          <p
            class="lead mb-4"
            style="color:rgba(255,255,255,.8);max-width:520px;"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            擁有 18 年豐富執業經驗，專精民事、刑事及商務法律。
            我們以嚴謹的法律素養，為每位客戶爭取最大權益。
          </p>
          <!-- 手機置中、桌機靠左 -->
          <div
            class="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <RouterLink to="/contact" class="btn btn-gold btn-lg px-5">
              <i class="bi bi-chat-text me-2"></i>免費線上諮詢
            </RouterLink>
            <RouterLink to="/services" class="btn btn-outline-light btn-lg px-5">
              了解服務範疇
            </RouterLink>
          </div>
        </div>
        <div class="col-lg-5 d-none d-lg-block text-center" data-aos="zoom-in" data-aos-delay="200">
          <img
            src="https://placehold.co/420x480/1a2a6c/b8860b?text=陳建宏+律師"
            alt="陳建宏律師"
            class="img-fluid rounded-4 shadow-lg"
            style="border:3px solid rgba(184,134,11,.4);"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- ── Stats ── -->
  <section class="py-4" style="background:#b8860b;">
    <div class="container">
      <div class="row text-center g-3">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          class="col-6 col-md-3"
          data-aos="zoom-in"
          :data-aos-delay="i * 80"
        >
          <div class="text-white">
            <div class="display-6 fw-bold">{{ s.num }}</div>
            <div class="small opacity-90 fw-semibold">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Services Overview ── -->
  <section class="py-5 bg-light-custom">
    <div class="container">
      <div class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold" style="color:#1a2a6c;">核心專業領域</h2>
        <div class="divider-gold"></div>
        <p class="text-muted">針對不同法律需求，提供量身訂製的專業解決方案</p>
      </div>
      <div class="row g-4">
        <div
          v-for="(svc, i) in services"
          :key="svc.title"
          class="col-sm-6 col-lg-3"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
        >
          <div class="card service-card p-4 text-center h-100">
            <i :class="['bi', svc.icon, 'service-icon', 'mb-3']"></i>
            <h5 class="fw-bold mb-2" style="color:#1a2a6c;">{{ svc.title }}</h5>
            <p class="text-muted small mb-0">{{ svc.desc }}</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-4" data-aos="fade-up" data-aos-delay="400">
        <RouterLink to="/services" class="btn btn-outline-gold">查看全部服務 →</RouterLink>
      </div>
    </div>
  </section>

  <!-- ── Why Choose Us ── -->
  <section class="py-5">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-5" data-aos="fade-right">
          <img
            src="https://placehold.co/480x400/f8f9fb/1a2a6c?text=專業律師團隊"
            alt="律師辦公室"
            class="img-fluid rounded-4 shadow"
          />
        </div>
        <div class="col-lg-7" data-aos="fade-left">
          <h2 class="section-title">為何選擇我們？</h2>
          <div class="row g-3 mt-2">
            <div
              v-for="(item, i) in whyUs"
              :key="item.t"
              class="col-sm-6"
              data-aos="fade-up"
              :data-aos-delay="i * 100"
            >
              <div class="d-flex gap-3">
                <i :class="['bi', item.icon, 'fs-3 flex-shrink-0']" style="color:#b8860b;"></i>
                <div>
                  <h6 class="fw-bold mb-1" style="color:#1a2a6c;">{{ item.t }}</h6>
                  <p class="small text-muted mb-0">{{ item.d }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── CTA Banner ── -->
  <section class="bg-navy py-5 text-center" data-aos="fade-up">
    <div class="container">
      <h3 class="text-white fw-bold mb-3">面臨法律困境？立即取得專業建議</h3>
      <p style="color:rgba(255,255,255,.75);" class="mb-4">首次電話諮詢免費，讓我們一起評估您的法律處境。</p>
      <RouterLink to="/contact" class="btn btn-gold btn-lg px-5">
        <i class="bi bi-telephone me-2"></i>預約免費諮詢
      </RouterLink>
    </div>
  </section>
</template>
