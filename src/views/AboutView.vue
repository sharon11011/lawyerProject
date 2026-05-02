<script setup>
import lawyerProfile from '@/assets/lawyer-profile.avif'

const education = [
  { year: '學士', title: '法律學系 學士', note: '主修民事法、刑事法，奠定扎實法學根基' },
  { year: '律師', title: '通過中華民國律師高考', note: '取得正式律師資格，依法執業' },
  { year: '執業', title: '正式開業，創立修律', note: '秉持「精準判斷、穩健控管」理念服務每位委任人' },
]

const experience = [
  { period: '民事案件', org: '各類民事訴訟全程代理', role: '訴訟代理人', note: '處理債務糾紛、侵權損害、房地產爭議、婚姻家事等各類民事案件' },
  { period: '刑事案件', org: '刑事辯護及告訴代理', role: '辯護律師', note: '從偵查到審判全程護航，處理詐欺、傷害、妨害名譽等各類刑事案件' },
  { period: '警局陪偵', org: '偵查程序法律協助', role: '辯護人', note: '提供警局陪偵、搜索扣押協助，確保委任人的陳述權益受到完整保護' },
  { period: '法律顧問', org: '企業及個人長期諮詢', role: '法律顧問', note: '合約審閱、勞資關係、公司治理，提供預防性法律服務' },
]

const cases = [
  {
    title: '成功為當事人在二審爭取緩刑',
    tag: '刑事辯護',
    result: '二審獲緩刑，免於入獄服刑',
    desc: '當事人因申辦貸款遭詐騙，被誤認為詐騙集團領款車手，一審被判處有期徒刑六月。本所介入後積極協助與被害人達成和解，並於二審提出完整辯護意見，成功爭取緩刑，使當事人得以免於入獄。',
  },
  {
    title: '轉讓禁藥案件成功爭取無罪判決',
    tag: '刑事辯護',
    result: '法院判決無罪，為當事人洗清冤名',
    desc: '當事人遭友人指控轉讓第二級禁藥。本所深入分析證人證詞，找出陳述前後矛盾之關鍵瑕疵，透過嚴密的交互詰問質疑證人可信度，成功說服法院為當事人判決無罪。',
  },
  {
    title: '二十年有期徒刑第三審成功撤銷發回',
    tag: '刑事辯護',
    result: '最高法院撤銷原判決，發回重審',
    desc: '當事人二審被判處二十年有期徒刑之貪汙重罪。本所在第三審提出原判決違背法令之論述，指出原審採證與事實認定之重大瑕疵，最終獲最高法院採納，撤銷原判決並發回高等法院重新審理。',
  },
]

const memberships = [
  '中華民國律師公會 會員',
  '領有中華民國律師執照（正式執業）',
  'LINE 官方帳號認證律師：@xiu_law',
  'Instagram 法律知識推廣：@xiu_lawyer',
]
</script>

<template>
  <!-- Page Header -->
  <div class="bg-navy py-5" data-aos="fade-down">
    <div class="container text-center">
      <i class="bi bi-person-badge-fill fs-2 mb-2" style="color:#b8860b;"></i>
      <h1 class="text-white fw-bold">關於律師</h1>
      <p style="color:rgba(255,255,255,.7);">精準法律判斷，穩健風險控管</p>
    </div>
  </div>

  <!-- Profile -->
  <section class="py-5">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-4 text-center" data-aos="zoom-in">
          <div class="rounded-4 shadow-lg overflow-hidden mb-3 mx-auto" style="aspect-ratio:3/4;max-width:300px;border:3px solid rgba(184,134,11,.35);">
            <img
              :src="lawyerProfile"
              alt="林仁修律師"
              style="width:100%;height:100%;object-fit:cover;object-position:top;"
            />
          </div>
          <h4 class="fw-bold mb-0" style="color:#1a2a6c;">林仁修 律師</h4>
          <p class="text-muted small">Attorney at Law｜修律</p>
          <div class="d-flex flex-wrap justify-content-center gap-2 mt-2">
            <span class="badge" style="background:#1a2a6c;">民事案件</span>
            <span class="badge" style="background:#b8860b;">刑事辯護</span>
            <span class="badge" style="background:#1a2a6c;">警局陪偵</span>
            <span class="badge" style="background:#b8860b;">法律顧問</span>
          </div>
          <div class="mt-3 d-flex justify-content-center gap-3">
            <a href="https://line.me/R/ti/p/@xiu_law" target="_blank" class="btn btn-sm fw-semibold" style="background:#06c755;color:#fff;border-radius:20px;">
              <i class="bi bi-chat-dots-fill me-1"></i>@xiu_law
            </a>
            <a href="https://www.instagram.com/xiu_lawyer" target="_blank" class="btn btn-sm fw-semibold text-white" style="background:linear-gradient(45deg,#f09433,#dc2743,#bc1888);border-radius:20px;">
              <i class="bi bi-instagram me-1"></i>@xiu_lawyer
            </a>
          </div>
        </div>
        <div class="col-lg-8" data-aos="fade-left" data-aos-delay="100">
          <h2 class="section-title">個人簡介</h2>
          <p style="line-height:1.9;" class="text-muted">
            林仁修律師，執業律師，創辦「修律」，致力於以清晰、直接的法律服務，
            幫助每一位面對法律問題的當事人找到最有利的出路。
          </p>
          <p style="line-height:1.9;" class="text-muted">
            秉持「精準法律判斷，穩健風險控管」的核心理念，
            林律師深信法律服務不應只是冷冰冰的條文與程序，
            而應讓每一位委任人都能真正理解自己的處境，
            並在每個關鍵決定點做出最有利於自身的選擇。
          </p>
          <p style="line-height:1.9;" class="text-muted">
            無論是民事糾紛、刑事案件、警局陪偵、非訟事件或長期法律顧問，
            修律均以高度的責任心與專業素養，全程陪伴您度過每一個法律難關。
          </p>
          <div class="mt-3">
            <h6 class="fw-bold mb-2" style="color:#1a2a6c;">資格與認證</h6>
            <ul class="list-unstyled">
              <li
                v-for="(m, i) in memberships"
                :key="m"
                class="d-flex align-items-center gap-2 mb-1 small text-muted"
                data-aos="fade-right"
                :data-aos-delay="i * 80"
              >
                <i class="bi bi-check2-circle" style="color:#b8860b;"></i>{{ m }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Experience -->
  <section class="py-5 bg-light-custom">
    <div class="container">
      <div class="row g-5">
        <!-- 執業歷程 -->
        <div class="col-lg-5" data-aos="fade-right">
          <h3 class="section-title">執業歷程</h3>
          <div class="position-relative">
            <div
              class="position-absolute top-0 bottom-0 start-0"
              style="width:2px;background:linear-gradient(to bottom,#1a2a6c,#b8860b);margin-left:12px;"
            ></div>
            <div
              v-for="(edu, i) in education"
              :key="edu.year"
              class="d-flex gap-3 mb-4 ps-4"
              data-aos="fade-up"
              :data-aos-delay="i * 120"
            >
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

        <!-- 服務範疇 -->
        <div class="col-lg-7" data-aos="fade-left">
          <h3 class="section-title">服務範疇</h3>
          <div
            v-for="(exp, i) in experience"
            :key="exp.period"
            class="card border-0 shadow-sm mb-3 p-4"
            data-aos="fade-up"
            :data-aos-delay="i * 100"
          >
            <div class="d-flex flex-wrap justify-content-between align-items-start mb-1">
              <h6 class="fw-bold mb-0" style="color:#1a2a6c;">{{ exp.org }}</h6>
              <span class="badge" style="background:rgba(26,42,108,.1);color:#1a2a6c;">{{ exp.period }}</span>
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
      <div class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold" style="color:#1a2a6c;">成功案例</h2>
        <div class="divider-gold"></div>
        <p class="text-muted">精選代表性委任案件（已依規定去識別化）</p>
      </div>
      <div class="row g-4">
        <div
          v-for="(c, i) in cases"
          :key="c.title"
          class="col-md-6"
          data-aos="fade-up"
          :data-aos-delay="(i % 2) * 150"
        >
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

  <!-- Media Collaboration -->
  <section class="py-5 bg-light-custom">
    <div class="container">
      <div class="text-center mb-5" data-aos="fade-up">
        <h2 class="fw-bold" style="color:#1a2a6c;">媒體合作 &amp; 法律推廣</h2>
        <div class="divider-gold"></div>
        <p class="text-muted">透過多元媒體管道，將法律知識傳遞給更多人</p>
      </div>

      <div class="row justify-content-center" data-aos="zoom-in">
        <div class="col-lg-8">
          <div class="card border-0 shadow p-4 p-md-5">
            <div class="d-flex flex-wrap align-items-center gap-3 mb-4">
              <div
                class="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                style="width:60px;height:60px;background:#ff0000;"
              >
                <i class="bi bi-youtube text-white fs-4"></i>
              </div>
              <div>
                <div class="fw-bold fs-5" style="color:#1a2a6c;">YouTube 訪談合作</div>
                <div class="small text-muted">知名電競 YouTuber ✕ 林仁修律師</div>
              </div>
              <span class="badge ms-auto" style="background:#b8860b;">特別企劃</span>
            </div>

            <h5 class="fw-bold mb-1" style="color:#1a2a6c;">
              《卡牌交易常見糾紛》
            </h5>
            <p class="small fw-semibold mb-3" style="color:#b8860b;">
              ft. 知名電競 YouTuber「不準上一動」
            </p>
            <p class="text-muted mb-4" style="line-height:1.9;">
              受知名電競 YouTuber「不準上一動」之邀，針對近年台灣卡牌玩家社群中頻繁發生的交易糾紛進行深度訪談。
              內容涵蓋：線上交易詐騙的法律認定、買賣糾紛如何蒐證、如何提出民事求償或刑事告訴，
              以及交易前應注意的法律眉角，協助廣大玩家了解自身的法律權益。
            </p>

            <div class="row g-3 mb-4">
              <div v-for="topic in [
                { icon: 'bi-shield-exclamation', text: '線上交易詐騙的刑事認定' },
                { icon: 'bi-camera', text: '糾紛發生時的蒐證方式' },
                { icon: 'bi-currency-dollar', text: '民事求償流程說明' },
                { icon: 'bi-file-earmark-check', text: '交易前應簽訂的書面約定' },
              ]" :key="topic.text" class="col-sm-6">
                <div class="d-flex align-items-center gap-2 small">
                  <i :class="['bi', topic.icon]" style="color:#b8860b;font-size:1.1rem;flex-shrink:0;"></i>
                  <span>{{ topic.text }}</span>
                </div>
              </div>
            </div>

            <div class="d-flex flex-wrap gap-2">
              <a
                href="https://www.youtube.com/@不準上一動"
                target="_blank"
                class="btn btn-sm fw-semibold d-flex align-items-center gap-2"
                style="background:#ff0000;color:#fff;border-radius:8px;"
              >
                <i class="bi bi-youtube"></i>前往頻道觀看
              </a>
              <RouterLink to="/contact" class="btn btn-sm btn-outline-gold">
                有卡牌交易糾紛？諮詢律師
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="bg-navy py-4 text-center" data-aos="fade-up">
    <div class="container">
      <p class="text-white fw-semibold fs-5 mb-3">期待成為您最堅實的法律夥伴</p>
      <RouterLink to="/contact" class="btn btn-gold px-5">預約諮詢</RouterLink>
    </div>
  </section>
</template>
