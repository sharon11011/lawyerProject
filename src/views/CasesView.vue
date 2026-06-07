<script setup>
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
</script>

<template>
  <!-- Page Header -->
  <div class="bg-navy py-5 text-center" data-aos="fade-down">
    <div class="container">
      <i class="bi bi-trophy-fill fs-2 mb-2" style="color:#b8860b;"></i>
      <h1 class="text-white fw-bold">成功案例</h1>
      <p style="color:rgba(255,255,255,.7);" class="mb-0">精選代表性委任案件（已依規定去識別化）</p>
    </div>
  </div>

  <!-- Cases -->
  <section class="py-5 bg-light-custom">
    <div class="container">
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
  <section class="py-5">
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

            <h5 class="fw-bold mb-1" style="color:#1a2a6c;">《卡牌交易常見糾紛》</h5>
            <p class="small fw-semibold mb-3" style="color:#b8860b;">ft. 知名電競 YouTuber「不準上一動」</p>
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

            <div class="ratio ratio-16x9 rounded-3 overflow-hidden mb-4 shadow-sm">
              <iframe
                src="https://www.youtube.com/embed/Q4-ax-z2iy8"
                title="卡牌交易常見糾紛｜ft.林仁修律師"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>

            <div class="d-flex flex-wrap gap-2">
              <a
                href="https://www.youtube.com/watch?v=Q4-ax-z2iy8"
                target="_blank"
                class="btn btn-sm fw-semibold d-flex align-items-center gap-2"
                style="background:#ff0000;color:#fff;border-radius:8px;"
              >
                <i class="bi bi-youtube"></i>在 YouTube 觀看
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
      <p class="text-white fw-semibold fs-5 mb-3">需要法律協助？歡迎預約諮詢</p>
      <RouterLink to="/contact" class="btn btn-gold px-5">立即諮詢</RouterLink>
    </div>
  </section>
</template>
