<script setup>
const services = [
  {
    icon: 'bi-person-check-fill',
    title: '民事訴訟',
    summary: '全程代理民事糾紛，從起訴到強制執行，保障您的民事權益。',
    details: [
      '侵權行為損害賠償（車禍、醫療糾紛、人身傷害）',
      '債務不履行、借貸糾紛、票據訴訟',
      '房屋買賣、租賃、地主租客爭議',
      '婚姻家事：離婚、贍養費、子女監護權',
      '強制執行、假扣押、假處分聲請',
    ],
  },
  {
    icon: 'bi-shield-fill',
    title: '刑事辯護',
    summary: '從偵查階段即全程陪同，制定最有力的辯護策略，守護您的自由與清白。',
    details: [
      '偵查中陪同偵訊、搜索扣押法律協助',
      '詐欺、背信、侵占等財產犯罪辯護',
      '妨害名譽、公然侮辱、毀謗案件',
      '毒品、公共危險（酒駕）案件',
      '上訴、再審、非常上訴聲請',
    ],
  },
  {
    icon: 'bi-briefcase-fill',
    title: '商務合約',
    summary: '為企業主及創業者提供完整商務法律服務，從公司設立到投資併購一手包辦。',
    details: [
      '公司設立、股份架構設計、股東協議',
      '商業合約起草、審閱、談判',
      '智慧財產權授權、保護策略',
      '勞動合約、競業禁止條款合規審查',
      '企業併購（M&A）盡職調查及法律文件',
    ],
  },
  {
    icon: 'bi-house-heart-fill',
    title: '遺產繼承',
    summary: '協助您妥善規劃財富傳承，避免遺產糾紛，讓家人在最艱難的時刻得到保障。',
    details: [
      '遺囑撰擬、公證、法定繼承分析',
      '遺產稅規劃與節稅策略',
      '繼承登記、拋棄繼承申報',
      '遺產分割協議書起草',
      '遺產糾紛調解與訴訟代理',
    ],
  },
  {
    icon: 'bi-people-fill',
    title: '勞資糾紛',
    summary: '熟悉勞動法規，協助勞資雙方化解爭議，維護合法權益。',
    details: [
      '違法解僱、資遣費、退休金請求',
      '職場霸凌、性騷擾申訴代理',
      '勞動調解、仲裁及訴訟代理',
      '工作規則、員工手冊合規審查',
      '職業傷害、工傷保險理賠',
    ],
  },
  {
    icon: 'bi-building',
    title: '不動產法律',
    summary: '房地產交易、都更、地上權等複雜不動產法律事務，為您把關每一步。',
    details: [
      '買賣契約審閱、斡旋金糾紛處理',
      '建商履約爭議、交屋瑕疵求償',
      '都市更新、地上權設定',
      '抵押權、典權等擔保物權設定',
      '鄰地紛爭、地界、越界建築',
    ],
  },
]

const steps = [
  { icon: 'bi-telephone', label: '初步諮詢', desc: '來電或填單，30 分鐘免費評估' },
  { icon: 'bi-file-earmark-text', label: '案情評估', desc: '詳細說明法律策略及費用' },
  { icon: 'bi-pen', label: '簽約委任', desc: '明確委任範圍，透明計費' },
  { icon: 'bi-person-workspace', label: '全力執行', desc: '積極代理、定期回報進度' },
]
</script>

<template>
  <!-- Page Header -->
  <div class="bg-navy py-5 text-center" data-aos="fade-down">
    <div class="container">
      <i class="bi bi-grid-3x3-gap-fill fs-2 mb-2" style="color:#b8860b;"></i>
      <h1 class="text-white fw-bold">專業服務領域</h1>
      <p style="color:rgba(255,255,255,.7);" class="mb-0">精通多元法律領域，提供您全方位的法律防護網</p>
    </div>
  </div>

  <!-- Services Grid -->
  <section class="py-5 bg-light-custom">
    <div class="container">
      <div class="row g-4">
        <div
          v-for="(svc, i) in services"
          :key="svc.title"
          class="col-md-6 col-xl-4"
          data-aos="fade-up"
          :data-aos-delay="(i % 3) * 100"
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
          <div class="position-relative">
            <div
              class="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center"
              style="width:72px;height:72px;background:#1a2a6c;color:#b8860b;font-size:1.8rem;"
            >
              <i :class="['bi', step.icon]"></i>
            </div>
            <span class="badge mb-2" style="background:#b8860b;">Step {{ i + 1 }}</span>
            <h6 class="fw-bold" style="color:#1a2a6c;">{{ step.label }}</h6>
            <p class="small text-muted">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-navy py-4 text-center" data-aos="fade-up">
    <div class="container">
      <p class="text-white fw-semibold mb-3 fs-5">不確定您的案件屬於哪個類別？歡迎直接聯繫我們。</p>
      <RouterLink to="/contact" class="btn btn-gold px-5">立即諮詢</RouterLink>
    </div>
  </section>
</template>
