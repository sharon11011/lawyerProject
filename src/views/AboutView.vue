<script setup>
const education = [
  { year: '2002', title: '政治大學法律學系 學士', note: '主修民商法，以優等成績畢業' },
  { year: '2005', title: '美國哥倫比亞大學 法學碩士（LL.M.）', note: '專研國際商事仲裁與比較法' },
  { year: '2006', title: '通過中華民國律師高考', note: '首次應考，一次通過' },
]

const experience = [
  { period: '2006 – 2012', org: '理律法律事務所（LEES & LI）', role: '資深律師', note: '主責企業併購、商務合約及訴訟業務' },
  { period: '2012 – 2018', org: '眾達國際法律事務所（Jones Day）', role: '合夥律師', note: '帶領六人團隊，處理跨國商務糾紛與仲裁' },
  { period: '2018 – 至今', org: '陳建宏律師事務所', role: '主持律師', note: '獨立執業，服務中小企業及個人客戶' },
]

const cases = [
  {
    title: '跨國電商平台智慧財產侵權案',
    tag: '商務合約 / IP',
    result: '成功為客戶取得新台幣 1,200 萬元損害賠償',
    desc: '代理本土品牌，向侵犯商標權的中國電商平台提起訴訟，歷時 18 個月取得勝訴判決，並完成跨境強制執行。',
  },
  {
    title: '上市公司董事背信刑事辯護',
    tag: '刑事辯護',
    result: '獲判無罪，維護委任人清白',
    desc: '被告遭控背信罪，面臨五年以上有期徒刑。本所深入分析財務文件，找出關鍵有利證據，最終獲一、二審均判無罪。',
  },
  {
    title: '家族企業遺產分割調解案',
    tag: '遺產繼承',
    result: '6 個月內達成庭外和解，節省訴訟費用逾百萬',
    desc: '四名繼承人就逾 3 億元的不動產及股份遺產產生嚴重爭議，本所擔任中立調解人，協助各方達成公平之分配協議。',
  },
  {
    title: '科技業非法解僱集體訴訟',
    tag: '勞資糾紛',
    result: '34 名員工全數獲得合法資遣費及補償',
    desc: '代理一間被外資收購科技公司的員工集體，成功舉證資方解僱程序違反勞基法，促使公司全額補發積欠薪資與退休金。',
  },
]

const memberships = [
  '台北律師公會 會員',
  '中華民國仲裁協會 認證仲裁人',
  '台灣公司治理協會 顧問委員',
  '美國紐約州律師協會 國際成員',
]
</script>

<template>
  <!-- Page Header -->
  <div class="bg-navy py-5">
    <div class="container text-center">
      <i class="bi bi-person-badge-fill fs-2 mb-2" style="color:#b8860b;"></i>
      <h1 class="text-white fw-bold">關於律師</h1>
      <p style="color:rgba(255,255,255,0.7);">以法律守護公義，以誠信贏得信賴</p>
    </div>
  </div>

  <!-- Profile -->
  <section class="py-5">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-4 text-center">
          <img
            src="https://placehold.co/340x400/1a2a6c/b8860b?text=陳建宏+律師"
            alt="陳建宏律師"
            class="img-fluid rounded-4 shadow-lg mb-3"
            style="border:3px solid rgba(184,134,11,0.35);"
          />
          <h4 class="fw-bold mb-0" style="color:#1a2a6c;">陳建宏 律師</h4>
          <p class="text-muted small">Chen Chien-Hung, Attorney at Law</p>
          <div class="d-flex flex-wrap justify-content-center gap-2 mt-2">
            <span class="badge" style="background:#1a2a6c;">民事訴訟</span>
            <span class="badge" style="background:#b8860b;">刑事辯護</span>
            <span class="badge" style="background:#1a2a6c;">商務合約</span>
            <span class="badge" style="background:#b8860b;">遺產繼承</span>
          </div>
        </div>
        <div class="col-lg-8">
          <h2 class="section-title">個人簡介</h2>
          <p style="line-height:1.9;" class="text-muted">
            陳建宏律師擁有超過 18 年執業資歷，曾服務於國內外頂尖法律事務所，
            深厚的學術背景結合豐富的實務經驗，使其在處理複雜法律案件時，
            總能提出精準、有效的法律策略。
          </p>
          <p style="line-height:1.9;" class="text-muted">
            陳律師深信，法律不僅是工具，更是守護社會公義的最後防線。
            因此，無論案件大小，他均親力親為，以最高標準對待每一位委任人，
            並秉持透明溝通的原則，讓客戶在每個關鍵時刻都能充分掌握案件動態。
          </p>

          <!-- Memberships -->
          <div class="mt-3">
            <h6 class="fw-bold mb-2" style="color:#1a2a6c;">專業資格與會員資格</h6>
            <ul class="list-unstyled">
              <li
                v-for="m in memberships"
                :key="m"
                class="d-flex align-items-center gap-2 mb-1 small text-muted"
              >
                <i class="bi bi-check2-circle" style="color:#b8860b;"></i>{{ m }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Education & Experience -->
  <section class="py-5 bg-light-custom">
    <div class="container">
      <div class="row g-5">
        <!-- Education -->
        <div class="col-lg-5">
          <h3 class="section-title">學歷</h3>
          <div class="position-relative">
            <div
              class="position-absolute top-0 bottom-0 start-0"
              style="width:2px;background:linear-gradient(to bottom,#1a2a6c,#b8860b);margin-left:12px;"
            ></div>
            <div v-for="edu in education" :key="edu.year" class="d-flex gap-3 mb-4 ps-4">
              <div class="flex-shrink-0">
                <div
                  class="rounded-circle d-flex align-items-center justify-content-center"
                  style="width:28px;height:28px;background:#b8860b;margin-left:-26px;"
                >
                  <i class="bi bi-mortarboard-fill text-white" style="font-size:.7rem;"></i>
                </div>
              </div>
              <div>
                <span class="badge mb-1" style="background:#1a2a6c;">{{ edu.year }}</span>
                <h6 class="fw-bold mb-1" style="color:#1a2a6c;">{{ edu.title }}</h6>
                <p class="small text-muted mb-0">{{ edu.note }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Experience -->
        <div class="col-lg-7">
          <h3 class="section-title">執業經歷</h3>
          <div v-for="exp in experience" :key="exp.period" class="card border-0 shadow-sm mb-3 p-4">
            <div class="d-flex flex-wrap justify-content-between align-items-start mb-1">
              <h6 class="fw-bold mb-0" style="color:#1a2a6c;">{{ exp.org }}</h6>
              <span class="badge" style="background:rgba(26,42,108,0.1);color:#1a2a6c;">{{ exp.period }}</span>
            </div>
            <p class="small fw-semibold mb-1" style="color:#b8860b;">{{ exp.role }}</p>
            <p class="small text-muted mb-0">{{ exp.note }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Cases -->
  <section class="py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="fw-bold" style="color:#1a2a6c;">經典案例</h2>
        <div class="divider-gold"></div>
        <p class="text-muted">精選代表性委任案件（已依規定去識別化）</p>
      </div>
      <div class="row g-4">
        <div v-for="c in cases" :key="c.title" class="col-md-6">
          <div class="card border-0 shadow-sm h-100 p-4" style="border-left:4px solid #b8860b !important;">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h6 class="fw-bold mb-0" style="color:#1a2a6c;">{{ c.title }}</h6>
              <span class="badge ms-2 flex-shrink-0" style="background:#1a2a6c;">{{ c.tag }}</span>
            </div>
            <div class="d-flex align-items-center gap-2 mb-2">
              <i class="bi bi-trophy-fill" style="color:#b8860b;"></i>
              <span class="small fw-semibold" style="color:#b8860b;">{{ c.result }}</span>
            </div>
            <p class="small text-muted mb-0">{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-navy py-4 text-center">
    <div class="container">
      <p class="text-white fw-semibold fs-5 mb-3">期待成為您最堅實的法律夥伴</p>
      <RouterLink to="/contact" class="btn btn-gold px-5">預約初次諮詢</RouterLink>
    </div>
  </section>
</template>
