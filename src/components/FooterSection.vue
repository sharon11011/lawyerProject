<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="pt-5 pb-3">
    <div class="container">
      <div class="row gy-4">

        <!-- Brand & Intro -->
        <div class="col-lg-4">
          <div class="d-flex align-items-center gap-2 mb-3">
            <i class="bi bi-scales fs-4" style="color: #b8860b;"></i>
            <span class="fw-bold fs-5" style="color: #b8860b;">修律｜林仁修律師</span>
          </div>
          <p class="small" style="color: rgba(255,255,255,0.65); line-height: 1.8;">
            精準法律判斷，穩健風險控管，<br>為您打造最有利的解決方案。
          </p>
          <div class="d-flex gap-3 mt-3">
            <a href="https://www.instagram.com/xiu_lawyer" target="_blank" aria-label="Instagram" class="fs-5"><i class="bi bi-instagram"></i></a>
            <a href="https://line.me/R/ti/p/@xiu_law" target="_blank" aria-label="LINE" class="fs-5"><i class="bi bi-chat-dots-fill"></i></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-sm-6 col-lg-2">
          <h6 class="text-white fw-semibold mb-3">快速連結</h6>
          <ul class="list-unstyled small">
            <li class="mb-2"><RouterLink to="/">首頁</RouterLink></li>
            <li class="mb-2"><RouterLink to="/services">服務項目</RouterLink></li>
            <li class="mb-2"><RouterLink to="/about">關於律師</RouterLink></li>
            <li class="mb-2"><RouterLink to="/qa">法律知識 Q&A</RouterLink></li>
            <li class="mb-2"><RouterLink to="/contact">立即諮詢</RouterLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="col-sm-6 col-lg-3">
          <h6 class="text-white fw-semibold mb-3">聯絡資訊</h6>
          <ul class="list-unstyled small" style="color: rgba(255,255,255,0.7); line-height: 2;">
            <li><i class="bi bi-telephone-fill me-2" style="color: #b8860b;"></i>0976-390-669</li>
            <li><i class="bi bi-envelope-fill me-2" style="color: #b8860b;"></i>lawyer.jasonlin@gmail.com</li>
            <li><i class="bi bi-chat-dots-fill me-2" style="color: #b8860b;"></i>LINE ID：@xiu_law</li>
            <li><i class="bi bi-instagram me-2" style="color: #b8860b;"></i>@xiu_lawyer</li>
          </ul>
        </div>

        <!-- Business Hours -->
        <div class="col-lg-3">
          <h6 class="text-white fw-semibold mb-3">服務時間</h6>
          <ul class="list-unstyled small" style="color: rgba(255,255,255,0.7); line-height: 2.2;">
            <li class="d-flex justify-content-between"><span>週一 ～ 週五</span><span>09:00 – 18:00</span></li>
            <li class="d-flex justify-content-between"><span>週六</span><span>10:00 – 15:00</span></li>
            <li class="d-flex justify-content-between"><span>週日 &amp; 國定假日</span><span style="color: #b8860b;">休息</span></li>
          </ul>
          <a
            href="https://line.me/R/ti/p/@xiu_law"
            target="_blank"
            class="btn btn-sm mt-2 fw-semibold"
            style="background: #06c755; color: #fff; border-radius: 20px;"
          >
            <i class="bi bi-chat-dots-fill me-1"></i>LINE 加入好友
          </a>
        </div>

      </div>

      <hr style="border-color: rgba(255,255,255,0.1); margin-top: 2rem;">
      <p class="text-center small mb-0" style="color: rgba(255,255,255,0.4);">
        &copy; {{ currentYear }} 修律｜林仁修律師 版權所有
      </p>
    </div>
  </footer>
</template>
