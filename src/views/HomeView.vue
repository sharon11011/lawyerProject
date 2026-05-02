<script setup>
import { RouterLink } from 'vue-router'
import lawyerProfile from '@/assets/lawyer-profile.avif'
import lawyerOffice from '@/assets/lawyer-office.avif'

const services = [
  { icon: 'bi-person-check', title: '各類民事案件', desc: '債務糾紛、侵權損害、房屋租賃、婚姻家事，全程代理保障您的民事權益。' },
  { icon: 'bi-shield-fill', title: '各類刑事案件', desc: '從偵查到審判全程陪同，提供最有力的辯護策略，守護您的自由與清白。' },
  { icon: 'bi-building', title: '警局陪偵', desc: '收到傳票或遭警方約談，第一時間陪同到場，確保您的陳述不因緊張而失誤。' },
  { icon: 'bi-file-earmark-text', title: '非訟事件', desc: '遺產繼承、公司登記、本票裁定、支付命令等非訴訟程序，快速有效處理。' },
  { icon: 'bi-briefcase-fill', title: '法律顧問', desc: '提供企業及個人長期法律諮詢，合約審閱、風險評估，預防勝於治療。' },
]

const whyUs = [
  { icon: 'bi-bullseye', t: '精準法律判斷', d: '深入分析案情，找出最關鍵的法律爭點，制定最有利的策略。' },
  { icon: 'bi-shield-check', t: '穩健風險控管', d: '事前評估法律風險，降低不確定性，讓您每一步都走得踏實。' },
  { icon: 'bi-chat-square-dots', t: '透明溝通', d: '每個階段主動回報進度，以白話文說明法律，不讓您在黑暗中等待。' },
  { icon: 'bi-clock', t: '快速響應', d: '警局陪偵、緊急法律事務優先處理，關鍵時刻不讓您獨自面對。' },
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
            <i class="bi bi-scales me-1"></i>修律｜Attorney at Law
          </p>
          <h1
            class="display-4 fw-bold text-white mb-3"
            style="line-height:1.25;"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            林仁修 律師<br>
            <span style="color:#b8860b;">您最堅實的法律後盾</span>
          </h1>
          <p
            class="lead mb-2"
            style="color:rgba(255,255,255,.9);max-width:540px;font-weight:500;"
            data-aos="fade-up"
            data-aos-delay="180"
          >
            精準法律判斷，穩健風險控管，
          </p>
          <p
            class="lead mb-4"
            style="color:rgba(255,255,255,.75);max-width:540px;"
            data-aos="fade-up"
            data-aos-delay="220"
          >
            為您打造最有利的解決方案。
          </p>
          <div
            class="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <RouterLink to="/contact" class="btn btn-gold btn-lg px-5">
              <i class="bi bi-chat-text me-2"></i>立即諮詢
            </RouterLink>
            <RouterLink to="/services" class="btn btn-outline-light btn-lg px-5">
              了解服務項目
            </RouterLink>
          </div>
        </div>
        <div class="col-lg-5 d-none d-lg-block" data-aos="zoom-in" data-aos-delay="200">
          <div class="rounded-4 shadow-lg overflow-hidden mx-auto" style="aspect-ratio:3/4;max-width:360px;border:3px solid rgba(184,134,11,.4);">
            <img
              :src="lawyerProfile"
              alt="林仁修律師"
              style="width:100%;height:100%;object-fit:cover;object-position:top;"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ── Services Overview ── -->
  <section class="py-5 bg-light-custom">
    <div class="container">
      <div class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold" style="color:#1a2a6c;">服務項目</h2>
        <div class="divider-gold"></div>
        <p class="text-muted">針對不同法律需求，提供量身訂製的專業解決方案</p>
      </div>
      <div class="row g-4 justify-content-center">
        <div
          v-for="(svc, i) in services"
          :key="svc.title"
          class="col-sm-6 col-lg-4"
          data-aos="fade-up"
          :data-aos-delay="i * 80"
        >
          <div class="card service-card p-4 text-center h-100">
            <i :class="['bi', svc.icon, 'service-icon', 'mb-3']"></i>
            <h5 class="fw-bold mb-2" style="color:#1a2a6c;">{{ svc.title }}</h5>
            <p class="text-muted small mb-0">{{ svc.desc }}</p>
          </div>
        </div>
      </div>
      <div class="text-center mt-4" data-aos="fade-up" data-aos-delay="400">
        <RouterLink to="/services" class="btn btn-outline-gold">查看完整服務說明 →</RouterLink>
      </div>
    </div>
  </section>

  <!-- ── Why Choose Us ── -->
  <section class="py-5">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-5" data-aos="fade-right">
          <div class="rounded-4 shadow overflow-hidden" style="aspect-ratio:3/4;">
            <img
              :src="lawyerOffice"
              alt="修律｜林仁修律師"
              style="width:100%;height:100%;object-fit:cover;object-position:top;"
            />
          </div>
        </div>
        <div class="col-lg-7" data-aos="fade-left">
          <h2 class="section-title">為何選擇修律？</h2>
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

  <!-- ── Contact Quick ── -->
  <section class="py-5 bg-light-custom" data-aos="fade-up">
    <div class="container">
      <div class="text-center mb-4">
        <h2 class="fw-bold" style="color:#1a2a6c;">多元聯繫方式</h2>
        <div class="divider-gold"></div>
      </div>
      <div class="row g-4 justify-content-center">
        <div class="col-sm-6 col-md-4" data-aos="zoom-in" data-aos-delay="0">
          <a href="tel:0976390669" class="card border-0 shadow-sm p-4 text-center text-decoration-none h-100 service-card">
            <i class="bi bi-telephone-fill service-icon mb-3"></i>
            <h6 class="fw-bold" style="color:#1a2a6c;">電話諮詢</h6>
            <p class="small text-muted mb-0">0976-390-669</p>
          </a>
        </div>
        <div class="col-sm-6 col-md-4" data-aos="zoom-in" data-aos-delay="100">
          <a href="https://line.me/R/ti/p/@xiu_law" target="_blank" class="card border-0 shadow-sm p-4 text-center text-decoration-none h-100 service-card">
            <i class="bi bi-chat-dots-fill service-icon mb-3"></i>
            <h6 class="fw-bold" style="color:#1a2a6c;">LINE 諮詢</h6>
            <p class="small text-muted mb-0">@xiu_law</p>
          </a>
        </div>
        <div class="col-sm-6 col-md-4" data-aos="zoom-in" data-aos-delay="200">
          <a href="mailto:lawyer.jasonlin@gmail.com" class="card border-0 shadow-sm p-4 text-center text-decoration-none h-100 service-card">
            <i class="bi bi-envelope-fill service-icon mb-3"></i>
            <h6 class="fw-bold" style="color:#1a2a6c;">Email 諮詢</h6>
            <p class="small text-muted mb-0">lawyer.jasonlin@gmail.com</p>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ── CTA Banner ── -->
  <section class="bg-navy py-5 text-center" data-aos="fade-up">
    <div class="container">
      <h3 class="text-white fw-bold mb-3">面臨法律困境？立即取得專業建議</h3>
      <p style="color:rgba(255,255,255,.75);" class="mb-1">Precise legal judgment, prudent risk management,</p>
      <p style="color:rgba(255,255,255,.75);" class="mb-4">delivering the most advantageous solutions for you.</p>
      <RouterLink to="/contact" class="btn btn-gold btn-lg px-5">
        <i class="bi bi-send me-2"></i>預約諮詢
      </RouterLink>
    </div>
  </section>
</template>
