<script setup>
const services = [
  {
    icon: 'bi-person-check-fill',
    title: '各類民事案件',
    summary: '全程代理各類民事糾紛，從起訴策略規劃到強制執行，保障您的每一項民事權益。',
    details: [
      '侵權行為損害賠償（車禍、醫療糾紛、人身傷害）',
      '借貸、票據、債務不履行等金錢糾紛',
      '房屋買賣、租賃爭議、地主租客糾紛',
      '婚姻家事：離婚、贍養費、子女監護權、收養',
      '假扣押、假處分、強制執行聲請',
    ],
  },
  {
    icon: 'bi-shield-fill',
    title: '各類刑事案件',
    summary: '從偵查階段起全程陪同，制定最有力的辯護策略，守護您的自由、名譽與清白。',
    details: [
      '詐欺、背信、侵占等財產犯罪辯護',
      '妨害名譽、公然侮辱、毀謗案件',
      '毒品、公共危險（酒駕）案件',
      '傷害、妨害自由、性侵害等人身案件',
      '上訴、再審、非常上訴聲請',
    ],
  },
  {
    icon: 'bi-building',
    title: '警局陪偵',
    summary: '收到警察傳票或遭約談，第一時間安排律師陪同到場，避免因陳述失誤影響後續案情。',
    details: [
      '刑事案件偵查中陪同製作筆錄',
      '搜索扣押現場法律協助',
      '緊急拘提、逮捕後第一時間介入',
      '偵訊前完整行前說明與策略討論',
      '偵查庭出庭代理及陳述策略規劃',
    ],
  },
  {
    icon: 'bi-file-earmark-text',
    title: '非訟事件',
    summary: '不需要打官司也能解決的法律問題，透過非訟程序快速有效地達成目的，節省您的時間與費用。',
    details: [
      '本票裁定、支付命令聲請',
      '遺產繼承、拋棄繼承、限定繼承申報',
      '公司設立、變更登記、解散清算',
      '調解、仲裁程序代理',
      '公證、認證及其他非訟聲請',
    ],
  },
  {
    icon: 'bi-briefcase-fill',
    title: '法律顧問',
    summary: '為企業及個人提供長期法律諮詢服務，合約把關、風險預防，讓您在行動前就掌握法律優勢。',
    details: [
      '商業合約起草、審閱、談判',
      '勞動合約、競業禁止條款合規審查',
      '智慧財產權申請、授權策略',
      '公司治理、股東糾紛預防',
      '定期法律風險評估與法律健診',
    ],
  },
]

const steps = [
  { icon: 'bi-telephone', label: '聯繫諮詢', desc: '電話、LINE 或填單，說明您的問題' },
  { icon: 'bi-file-earmark-text', label: '案情評估', desc: '分析法律爭點，說明策略與費用' },
  { icon: 'bi-pen', label: '簽約委任', desc: '確認委任範圍，透明計費無隱費' },
  { icon: 'bi-person-workspace', label: '全力執行', desc: '積極代理，定期回報案件進度' },
]
</script>

<template>
  <!-- Page Header -->
  <div class="bg-navy py-5 text-center" data-aos="fade-down">
    <div class="container">
      <i class="bi bi-grid-3x3-gap-fill fs-2 mb-2" style="color:#b8860b;"></i>
      <h1 class="text-white fw-bold">服務項目</h1>
      <p style="color:rgba(255,255,255,.7);" class="mb-0">精準法律判斷，穩健風險控管，為您打造最有利的解決方案</p>
    </div>
  </div>

  <!-- Services Grid -->
  <section class="py-5 bg-light-custom">
    <div class="container">
      <div class="row g-4">
        <div
          v-for="(svc, i) in services"
          :key="svc.title"
          class="col-md-6"
          data-aos="fade-up"
          :data-aos-delay="(i % 2) * 100"
        >
          <div class="card service-card h-100 p-4">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div
                class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style="width:52px;height:52px;background:rgba(26,42,108,.08);"
              >
                <i :class="['bi', svc.icon]" style="color:#1a2a6c;font-size:1.5rem;"></i>
              </div>
              <h5 class="fw-bold mb-0" style="color:#1a2a6c;">{{ svc.title }}</h5>
            </div>
            <p class="text-muted mb-3">{{ svc.summary }}</p>
            <ul class="list-unstyled mb-0">
              <li v-for="d in svc.details" :key="d" class="d-flex align-items-start gap-2 mb-2 small">
                <i class="bi bi-check-circle-fill mt-1 flex-shrink-0" style="color:#b8860b;"></i>
                <span>{{ d }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Process Section -->
  <section class="py-5">
    <div class="container">
      <div class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold" style="color:#1a2a6c;">委任服務流程</h2>
        <div class="divider-gold"></div>
      </div>
      <div class="row g-4 text-center">
        <div
          v-for="(step, i) in steps"
          :key="step.label"
          class="col-sm-6 col-lg-3"
          data-aos="zoom-in"
          :data-aos-delay="i * 120"
        >
          <div class="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
            style="width:72px;height:72px;background:#1a2a6c;color:#b8860b;font-size:1.8rem;">
            <i :class="['bi', step.icon]"></i>
          </div>
          <span class="badge mb-2" style="background:#b8860b;">Step {{ i + 1 }}</span>
          <h6 class="fw-bold" style="color:#1a2a6c;">{{ step.label }}</h6>
          <p class="small text-muted">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-navy py-4 text-center" data-aos="fade-up">
    <div class="container">
      <p class="text-white fw-semibold mb-3 fs-5">不確定您的問題適合哪項服務？直接聯繫，免費評估。</p>
      <RouterLink to="/contact" class="btn btn-gold px-5">立即諮詢</RouterLink>
    </div>
  </section>
</template>
