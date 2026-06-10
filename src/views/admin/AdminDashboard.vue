<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/config/supabase.js'

const router = useRouter()

// ── Submissions ──
const submissions  = ref([])
const adminLogs    = ref([])
const search       = ref('')
const sortDesc     = ref(true)
const showSubjects = ref(false)
const visitThis    = ref(null)
const visitLast    = ref(null)

// ── Session ──
const loginTime  = ref(sessionStorage.getItem('admin_login_time') || '—')
const loginUser  = ref('')
const lastAction = ref('')

// ── Tab ──
const activeTab = ref('submissions')

// ── Cases ──
const cases        = ref([])
const caseForm     = reactive({ title: '', tag: '刑事辯護', result: '', description: '' })
const caseLoading  = ref(false)
const caseError    = ref('')
const caseSuccess  = ref(false)
const editingCase  = ref(null)
const tagOptions   = ['民事糾紛', '刑事辯護', '家事案件', '非訟服務', '商業爭議', '法律顧問']

const subjectStats = [
  { label: '各類民事案件', color: '#198754' },
  { label: '各類刑事案件', color: '#b8860b' },
  { label: '警局陪偵',     color: '#dc3545' },
  { label: '非訟事件',     color: '#0d6efd' },
  { label: '法律顧問',     color: '#6f42c1' },
  { label: '其他法律諮詢', color: '#6c757d' },
]

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  loginUser.value = session?.user?.email || 'admin'
  await Promise.all([load(), loadVisits(), loadLogs(), loadCases()])
  stampAction('開啟後台')
})

async function load() {
  const { data } = await supabase.from('submissions').select('*').order('created_at', { ascending: false })
  if (data) submissions.value = data
}

async function loadVisits() {
  const now = new Date()
  const thisKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const last = new Date(now.getFullYear(), now.getMonth() - 1)
  const lastKey = `${last.getFullYear()}-${String(last.getMonth() + 1).padStart(2, '0')}`
  const [{ count: c1 }, { count: c2 }] = await Promise.all([
    supabase.from('visits').select('*', { count: 'exact', head: true }).eq('month', thisKey),
    supabase.from('visits').select('*', { count: 'exact', head: true }).eq('month', lastKey),
  ])
  visitThis.value = c1 ?? 0
  visitLast.value = c2 ?? 0
}

async function loadLogs() {
  const { data } = await supabase
    .from('admin_logs').select('*').eq('action', 'login')
    .order('created_at', { ascending: false }).limit(20)
  if (data) adminLogs.value = data
}

const defaultCases = [
  {
    title: '成功為當事人在二審爭取緩刑', tag: '刑事辯護',
    result: '二審獲緩刑，免於入獄服刑',
    description: '當事人因申辦貸款遭詐騙，被誤認為詐騙集團領款車手，一審被判處有期徒刑六月。本所介入後積極協助與被害人達成和解，並於二審提出完整辯護意見，成功爭取緩刑，使當事人得以免於入獄。',
  },
  {
    title: '轉讓禁藥案件成功爭取無罪判決', tag: '刑事辯護',
    result: '法院判決無罪，為當事人洗清冤名',
    description: '當事人遭友人指控轉讓第二級禁藥。本所深入分析證人證詞，找出陳述前後矛盾之關鍵瑕疵，透過嚴密的交互詰問質疑證人可信度，成功說服法院為當事人判決無罪。',
  },
  {
    title: '二十年有期徒刑第三審成功撤銷發回', tag: '刑事辯護',
    result: '最高法院撤銷原判決，發回重審',
    description: '當事人二審被判處二十年有期徒刑之貪汙重罪。本所在第三審提出原判決違背法令之論述，指出原審採證與事實認定之重大瑕疵，最終獲最高法院採納，撤銷原判決並發回高等法院重新審理。',
  },
]

async function loadCases() {
  const { data } = await supabase.from('cases').select('*').order('created_at', { ascending: false })
  if (data) cases.value = data
}

async function seedDefaultCases() {
  if (!confirm('將前台3筆預設案例匯入資料庫，之後可在後台管理。確定？')) return
  caseLoading.value = true
  await supabase.from('cases').insert(defaultCases)
  caseLoading.value = false
  await loadCases()
}

async function stampAction(label, detail = null) {
  const now = new Date().toLocaleString('zh-TW', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  })
  lastAction.value = `${label}｜${now}`
  await supabase.from('admin_logs').insert({ username: loginUser.value || 'admin', action: label, detail }).catch(() => {})
  await loadLogs()
}

const visitDiff = computed(() => {
  if (visitThis.value === null || visitLast.value === null) return null
  return visitThis.value - visitLast.value
})

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  let list = submissions.value
  if (q) {
    list = list.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.phone.includes(q) ||
      s.subject.toLowerCase().includes(q) ||
      s.message.toLowerCase().includes(q)
    )
  }
  return sortDesc.value ? list : [...list].reverse()
})

async function logout() {
  await supabase.auth.signOut()
  sessionStorage.removeItem('admin_login_time')
  router.push('/admin/login')
}

function formatLog(log) {
  try {
    return new Date(log.created_at).toLocaleString('zh-TW', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    })
  } catch { return '—' }
}

async function addCase() {
  if (!caseForm.title.trim() || !caseForm.tag.trim() || !caseForm.result.trim() || !caseForm.description.trim()) {
    caseError.value = '請填寫所有欄位'
    return
  }
  caseLoading.value = true
  caseError.value = ''
  caseSuccess.value = false
  const { error } = await supabase.from('cases').insert({
    title:       caseForm.title.trim(),
    tag:         caseForm.tag.trim(),
    result:      caseForm.result.trim(),
    description: caseForm.description.trim(),
  })
  caseLoading.value = false
  if (error) { caseError.value = '新增失敗：' + error.message; return }
  caseSuccess.value = true
  Object.assign(caseForm, { title: '', tag: '刑事辯護', result: '', description: '' })
  await loadCases()
  setTimeout(() => { caseSuccess.value = false }, 3000)
}

function startEditCase(c) {
  editingCase.value = c
  Object.assign(caseForm, { title: c.title, tag: c.tag, result: c.result, description: c.description })
  caseError.value = ''
  caseSuccess.value = false
}

function cancelEdit() {
  editingCase.value = null
  Object.assign(caseForm, { title: '', tag: '刑事辯護', result: '', description: '' })
  caseError.value = ''
}

async function updateCase() {
  if (!caseForm.title.trim() || !caseForm.tag.trim() || !caseForm.result.trim() || !caseForm.description.trim()) {
    caseError.value = '請填寫所有欄位'
    return
  }
  caseLoading.value = true
  caseError.value = ''
  const { error } = await supabase.from('cases').update({
    title:       caseForm.title.trim(),
    tag:         caseForm.tag.trim(),
    result:      caseForm.result.trim(),
    description: caseForm.description.trim(),
  }).eq('id', editingCase.value.id)
  caseLoading.value = false
  if (error) { caseError.value = '更新失敗：' + error.message; return }
  caseSuccess.value = true
  editingCase.value = null
  Object.assign(caseForm, { title: '', tag: '刑事辯護', result: '', description: '' })
  await loadCases()
  setTimeout(() => { caseSuccess.value = false }, 3000)
}

async function deleteCase(id) {
  if (!confirm('確定要刪除此案例？')) return
  await supabase.from('cases').delete().eq('id', id)
  if (editingCase.value?.id === id) cancelEdit()
  await loadCases()
}
</script>

<template>
  <div class="admin-bg min-vh-100">

    <!-- Top bar -->
    <nav class="navbar px-3 px-md-4 py-2" style="background:#111c4e;">
      <span class="navbar-brand text-white fw-bold fs-6 mb-0 d-flex align-items-center gap-2">
        <i class="bi bi-scales" style="color:#b8860b;"></i>修律 後台管理
      </span>
      <div class="d-flex align-items-center gap-3">
        <span class="text-white-50 small d-none d-md-inline">共 {{ submissions.length }} 筆諮詢紀錄</span>
        <button class="btn btn-sm btn-outline-light" @click="logout">
          <i class="bi bi-box-arrow-right me-1"></i>登出
        </button>
      </div>
    </nav>

    <!-- Session info -->
    <div class="px-3 px-md-4 py-2 d-flex flex-wrap gap-3"
      style="background:#1a2a6c;font-size:.78rem;color:rgba(255,255,255,.65);">
      <span><i class="bi bi-person-fill me-1" style="color:#b8860b;"></i>{{ loginUser }}</span>
      <span><i class="bi bi-clock me-1" style="color:#b8860b;"></i>登入時間：{{ loginTime }}</span>
      <span v-if="lastAction"><i class="bi bi-activity me-1" style="color:#b8860b;"></i>最後操作：{{ lastAction }}</span>
    </div>

    <!-- Tab nav -->
    <div style="background:#fff;border-bottom:2px solid #e8ecf8;" class="px-3 px-md-4">
      <ul class="nav nav-tabs border-0 mb-0">
        <li class="nav-item">
          <button
            class="nav-link px-4 py-3 fw-semibold border-0"
            :class="activeTab === 'submissions' ? 'active' : 'text-muted'"
            style="background:none;border-radius:0;"
            @click="activeTab = 'submissions'"
          >
            <i class="bi bi-inbox me-2"></i>諮詢管理
            <span class="badge ms-1 rounded-pill" style="background:#1a2a6c;font-size:.65rem;">{{ submissions.length }}</span>
          </button>
        </li>
        <li class="nav-item">
          <button
            class="nav-link px-4 py-3 fw-semibold border-0"
            :class="activeTab === 'cases' ? 'active' : 'text-muted'"
            style="background:none;border-radius:0;"
            @click="activeTab = 'cases'"
          >
            <i class="bi bi-trophy me-2"></i>案例管理
            <span class="badge ms-1 rounded-pill" style="background:#b8860b;font-size:.65rem;">{{ cases.length }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div class="container-fluid px-3 px-md-4 py-4">

      <!-- ── 諮詢管理 ── -->
      <template v-if="activeTab === 'submissions'">

        <!-- Stats -->
        <div class="row g-3 mb-3">
          <div class="col-6 col-md-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center py-3">
                <div class="fs-2 fw-bold" style="color:#1a2a6c;">
                  <span v-if="visitThis === null" class="spinner-border spinner-border-sm"></span>
                  <span v-else>{{ visitThis }}</span>
                </div>
                <div class="small text-muted">本月造訪次數</div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center py-3">
                <div class="fs-2 fw-bold text-muted">
                  <span v-if="visitLast === null" class="spinner-border spinner-border-sm"></span>
                  <span v-else>{{ visitLast }}</span>
                </div>
                <div class="small text-muted">上月造訪次數</div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center py-3">
                <div class="fs-2 fw-bold">
                  <span v-if="visitDiff === null" class="spinner-border spinner-border-sm"></span>
                  <template v-else>
                    <span :style="visitDiff >= 0 ? 'color:#198754' : 'color:#dc3545'">
                      {{ visitDiff >= 0 ? '+' : '' }}{{ visitDiff }}
                    </span>
                  </template>
                </div>
                <div class="small text-muted">與上月相比</div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body text-center py-3">
                <div class="fs-2 fw-bold" style="color:#1a2a6c;">{{ submissions.length }}</div>
                <div class="small text-muted">總諮詢數</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 事由統計（手機折疊） -->
        <div class="d-md-none mb-2">
          <button class="btn btn-sm w-100 fw-semibold" style="background:#e8ecf8;color:#1a2a6c;"
            @click="showSubjects = !showSubjects">
            <i :class="showSubjects ? 'bi bi-chevron-up' : 'bi bi-chevron-down'" class="me-1"></i>
            各類案件數量{{ showSubjects ? '（收合）' : '（展開）' }}
          </button>
        </div>
        <div :class="{ 'd-none': !showSubjects }" class="d-md-block">
          <div class="row g-3 mb-4">
            <div v-for="sub in subjectStats" :key="sub.label" class="col-6 col-md-4">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body text-center py-3">
                  <div class="fs-3 fw-bold" :style="`color:${sub.color};`">
                    {{ submissions.filter(s => s.subject === sub.label).length }}
                  </div>
                  <div class="small text-muted">{{ sub.label }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row g-3 mb-4">
          <!-- 諮詢紀錄 -->
          <div class="col-lg-8">
            <div class="card border-0 shadow-sm mb-3">
              <div class="card-body py-3">
                <div class="row g-2 align-items-center">
                  <div class="col-12 col-md-7">
                    <div class="input-group">
                      <span class="input-group-text bg-white border-end-0">
                        <i class="bi bi-search text-muted"></i>
                      </span>
                      <input v-model="search" type="text" class="form-control border-start-0 ps-0"
                        placeholder="搜尋姓名、電話、事由..."
                        @input="stampAction('搜尋紀錄', search)" />
                    </div>
                  </div>
                  <div class="col-auto ms-md-auto">
                    <button class="btn btn-sm btn-outline-secondary"
                      @click="sortDesc = !sortDesc; stampAction(sortDesc ? '排序：最新' : '排序：最舊')">
                      <i :class="sortDesc ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                      {{ sortDesc ? '最新' : '最舊' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="!filtered.length" class="card border-0 shadow-sm">
              <div class="card-body text-center py-5">
                <i class="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                <p class="text-muted mb-0">{{ search ? '找不到符合的紀錄' : '尚無諮詢紀錄' }}</p>
              </div>
            </div>

            <!-- Desktop table -->
            <div v-else class="card border-0 shadow-sm d-none d-md-block">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead style="background:#f0f3fa;">
                    <tr>
                      <th class="ps-4 fw-semibold text-muted small" style="width:3rem;">#</th>
                      <th class="fw-semibold text-muted small" style="width:7rem;">姓名</th>
                      <th class="fw-semibold text-muted small" style="width:9rem;">電話</th>
                      <th class="fw-semibold text-muted small" style="width:8rem;">諮詢事由</th>
                      <th class="fw-semibold text-muted small">問題說明</th>
                      <th class="fw-semibold text-muted small" style="width:12rem;">送出時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, idx) in filtered" :key="item.id">
                      <td class="ps-4 text-muted small">{{ idx + 1 }}</td>
                      <td class="fw-semibold">{{ item.name }}</td>
                      <td>
                        <a :href="`tel:${item.phone}`" class="text-decoration-none" style="color:#1a2a6c;">{{ item.phone }}</a>
                      </td>
                      <td>
                        <span class="badge rounded-pill px-2 py-1 small" style="background:#e8ecf8;color:#1a2a6c;font-weight:500;">
                          {{ item.subject }}
                        </span>
                      </td>
                      <td class="text-muted small" style="max-width:260px;">
                        <div style="white-space:pre-wrap;word-break:break-word;max-height:4.5em;overflow:hidden;">{{ item.message }}</div>
                      </td>
                      <td class="small text-muted">{{ item.sent_at }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer text-muted small py-2 px-4 border-0" style="background:#f8f9fb;">
                顯示 {{ filtered.length }} / {{ submissions.length }} 筆
              </div>
            </div>

            <!-- Mobile cards -->
            <div v-if="filtered.length" class="d-md-none">
              <div v-for="item in filtered" :key="item.id" class="card border-0 shadow-sm mb-3">
                <div class="card-body">
                  <div class="mb-2">
                    <span class="fw-bold me-2">{{ item.name }}</span>
                    <span class="badge rounded-pill small px-2" style="background:#e8ecf8;color:#1a2a6c;">{{ item.subject }}</span>
                  </div>
                  <div class="small text-muted mb-1">
                    <i class="bi bi-telephone me-1"></i>
                    <a :href="`tel:${item.phone}`" class="text-decoration-none text-muted">{{ item.phone }}</a>
                  </div>
                  <div class="small text-muted mb-2" style="white-space:pre-wrap;word-break:break-word;">{{ item.message }}</div>
                  <div class="small text-muted border-top pt-2 mt-1">
                    <i class="bi bi-clock me-1"></i>{{ item.sent_at }}
                  </div>
                </div>
              </div>
              <div class="text-center small text-muted py-2">顯示 {{ filtered.length }} / {{ submissions.length }} 筆</div>
            </div>
          </div>

          <!-- 登入紀錄 -->
          <div class="col-lg-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header border-0 py-3" style="background:#f0f3fa;">
                <h6 class="fw-bold mb-0" style="color:#1a2a6c;">
                  <i class="bi bi-person-badge me-2" style="color:#b8860b;"></i>登入紀錄
                </h6>
              </div>
              <div class="card-body p-0">
                <div v-if="!adminLogs.length" class="text-center py-4 text-muted small">尚無紀錄</div>
                <ul v-else class="list-group list-group-flush">
                  <li v-for="log in adminLogs" :key="log.id" class="list-group-item px-3 py-2">
                    <div class="d-flex align-items-center gap-2">
                      <i class="bi bi-box-arrow-in-right text-success fs-6"></i>
                      <div>
                        <div class="small fw-semibold" style="color:#1a2a6c;">
                          登入
                          <span class="ms-1 badge rounded-pill" style="background:#e8ecf8;color:#1a2a6c;font-weight:500;font-size:.7rem;">{{ log.username }}</span>
                        </div>
                        <div class="text-muted" style="font-size:.72rem;">{{ formatLog(log) }}</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </template>

      <!-- ── 案例管理 ── -->
      <template v-else>
        <div class="row g-4">

          <!-- 新增表單 -->
          <div class="col-lg-5">
            <div class="card border-0 shadow-sm">
              <div class="card-header border-0 py-3 px-4 d-flex align-items-center justify-content-between" style="background:#f0f3fa;">
                <h6 class="fw-bold mb-0" style="color:#1a2a6c;">
                  <i :class="editingCase ? 'bi bi-pencil-fill' : 'bi bi-plus-circle-fill'" class="me-2" style="color:#b8860b;"></i>
                  {{ editingCase ? '編輯案例' : '新增案例' }}
                </h6>
                <button v-if="editingCase" class="btn btn-sm btn-outline-secondary py-0" @click="cancelEdit">
                  <i class="bi bi-x-lg me-1"></i>取消編輯
                </button>
              </div>
              <div class="card-body px-4 py-4">

                <div v-if="caseError" class="alert alert-danger py-2 small mb-3">
                  <i class="bi bi-exclamation-triangle me-1"></i>{{ caseError }}
                </div>
                <div v-if="caseSuccess" class="alert alert-success py-2 small mb-3">
                  <i class="bi bi-check-circle me-1"></i>案例已成功新增！
                </div>

                <!-- 案件標題 -->
                <div class="mb-3">
                  <label class="form-label small fw-semibold">案件標題</label>
                  <input v-model="caseForm.title" type="text" class="form-control"
                    placeholder="例：成功為當事人在二審爭取緩刑" />
                </div>

                <!-- 案件標籤 -->
                <div class="mb-3">
                  <label class="form-label small fw-semibold">案件標籤</label>
                  <div class="d-flex flex-wrap gap-2 mb-2">
                    <button
                      v-for="t in tagOptions" :key="t" type="button"
                      class="btn btn-sm"
                      :style="caseForm.tag === t
                        ? 'background:#1a2a6c;color:#fff;'
                        : 'background:#e8ecf8;color:#1a2a6c;'"
                      @click="caseForm.tag = t"
                    >{{ t }}</button>
                  </div>
                  <input v-model="caseForm.tag" type="text" class="form-control form-control-sm"
                    placeholder="或自行輸入..." />
                </div>

                <!-- 判決結果 -->
                <div class="mb-3">
                  <label class="form-label small fw-semibold">
                    判決結果
                    <span class="text-muted fw-normal">（顯示為金色副標）</span>
                  </label>
                  <input v-model="caseForm.result" type="text" class="form-control"
                    placeholder="例：二審獲緩刑，免於入獄服刑" />
                </div>

                <!-- 案件描述 -->
                <div class="mb-4">
                  <label class="form-label small fw-semibold">案件描述</label>
                  <textarea v-model="caseForm.description" rows="4" class="form-control"
                    placeholder="詳細說明案件經過與成果..."></textarea>
                  <div class="form-text">{{ caseForm.description.length }} 字</div>
                </div>

                <!-- 預覽 -->
                <div class="mb-4">
                  <p class="small fw-semibold mb-2" style="color:#6c757d;">
                    <i class="bi bi-eye me-1"></i>預覽效果
                  </p>
                  <div class="rounded-3 p-3" style="border-left:4px solid #b8860b;background:#f8f9fb;border:1px solid #e8ecf8;border-left:4px solid #b8860b;">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                      <h6 class="fw-bold mb-0" style="color:#1a2a6c;font-size:.88rem;line-height:1.4;flex:1;">
                        {{ caseForm.title || '案件標題' }}
                      </h6>
                      <span class="badge ms-2 flex-shrink-0" style="background:#1a2a6c;font-size:.68rem;">
                        {{ caseForm.tag || '標籤' }}
                      </span>
                    </div>
                    <div class="d-flex align-items-center gap-2 mb-2">
                      <i class="bi bi-trophy-fill" style="color:#b8860b;font-size:.85rem;"></i>
                      <span class="fw-semibold" style="color:#b8860b;font-size:.82rem;">
                        {{ caseForm.result || '判決結果將顯示於此' }}
                      </span>
                    </div>
                    <p class="text-muted mb-0" style="font-size:.78rem;line-height:1.6;">
                      {{ caseForm.description || '案件描述將顯示於此...' }}
                    </p>
                  </div>
                </div>

                <button
                  class="btn w-100 fw-bold py-2"
                  style="background:#1a2a6c;color:#fff;border-radius:.5rem;"
                  :disabled="caseLoading"
                  @click="editingCase ? updateCase() : addCase()"
                >
                  <span v-if="caseLoading">
                    <span class="spinner-border spinner-border-sm me-2"></span>{{ editingCase ? '更新中...' : '新增中...' }}
                  </span>
                  <span v-else>
                    <i :class="editingCase ? 'bi bi-check-circle' : 'bi bi-plus-circle'" class="me-2"></i>
                    {{ editingCase ? '確認更新' : '新增案例' }}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- 現有案例清單 -->
          <div class="col-lg-7">
            <div class="card border-0 shadow-sm">
              <div class="card-header border-0 py-3 px-4" style="background:#f0f3fa;">
                <h6 class="fw-bold mb-0" style="color:#1a2a6c;">
                  <i class="bi bi-list-ul me-2" style="color:#b8860b;"></i>
                  現有案例（{{ cases.length }} 筆）
                </h6>
              </div>
              <div class="card-body p-3">
                <div v-if="!cases.length" class="text-center py-5 text-muted">
                  <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                  <p class="small mb-2">尚無案例，請在左方新增</p>
                  <button class="btn btn-sm fw-semibold" style="background:#e8ecf8;color:#1a2a6c;" @click="seedDefaultCases" :disabled="caseLoading">
                    <i class="bi bi-cloud-upload me-1"></i>匯入前台預設3筆案例
                  </button>
                </div>
                <div
                  v-for="c in cases" :key="c.id"
                  class="p-3 mb-3 rounded-3"
                  style="background:#fff;border:1px solid #e8ecf8;border-left:4px solid #b8860b;"
                >
                  <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="fw-bold mb-0" style="color:#1a2a6c;font-size:.9rem;line-height:1.4;flex:1;">
                      {{ c.title }}
                    </h6>
                    <div class="d-flex align-items-center gap-2 ms-2 flex-shrink-0">
                      <span class="badge" style="background:#1a2a6c;font-size:.68rem;">{{ c.tag }}</span>
                      <button
                        class="btn btn-sm btn-outline-primary py-0 px-2"
                        style="font-size:.75rem;"
                        @click="startEditCase(c)"
                        title="編輯"
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger py-0 px-2"
                        style="font-size:.75rem;"
                        @click="deleteCase(c.id)"
                        title="刪除"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                  <div class="d-flex align-items-center gap-2 mb-2">
                    <i class="bi bi-trophy-fill" style="color:#b8860b;font-size:.8rem;"></i>
                    <span class="fw-semibold" style="color:#b8860b;font-size:.8rem;">{{ c.result }}</span>
                  </div>
                  <p class="text-muted mb-0" style="font-size:.78rem;line-height:1.6;">{{ c.description }}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>
.admin-bg { background: #f0f3fa; }
.nav-tabs .nav-link.active {
  color: #1a2a6c !important;
  border-bottom: 3px solid #b8860b !important;
  font-weight: 700;
}
</style>
