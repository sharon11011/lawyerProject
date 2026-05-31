<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const STORAGE_KEY = 'xiu_submissions'
const router = useRouter()

const submissions = ref([])
const search      = ref('')
const sortDesc    = ref(true)

const subjectStats = [
  { label: '各類民事案件', color: '#198754' },
  { label: '各類刑事案件', color: '#b8860b' },
  { label: '警局陪偵',     color: '#dc3545' },
  { label: '非訟事件',     color: '#0d6efd' },
  { label: '法律顧問',     color: '#6f42c1' },
  { label: '其他法律諮詢', color: '#6c757d' },
]

onMounted(() => {
  load()
})

function load() {
  submissions.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

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

function deleteOne(id) {
  submissions.value = submissions.value.filter(s => s.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions.value))
}

function clearAll() {
  if (!confirm('確定要清除所有紀錄？此操作無法復原。')) return
  submissions.value = []
  localStorage.removeItem(STORAGE_KEY)
}

function logout() {
  sessionStorage.removeItem('admin_token')
  router.push('/admin/login')
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
        <span class="text-white-50 small d-none d-md-inline">
          共 {{ submissions.length }} 筆諮詢紀錄
        </span>
        <button class="btn btn-sm btn-outline-light" @click="logout">
          <i class="bi bi-box-arrow-right me-1"></i>登出
        </button>
      </div>
    </nav>

    <!-- Content -->
    <div class="container-fluid px-3 px-md-4 py-4">
      <!-- Stats cards -->
      <div class="row g-3 mb-3">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-body text-center py-3">
              <div class="fs-1 fw-bold" style="color:#1a2a6c;">{{ submissions.length }}</div>
              <div class="small text-muted">總諮詢數</div>
            </div>
          </div>
        </div>
      </div>
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

      <!-- Toolbar -->
      <div class="card border-0 shadow-sm mb-3">
        <div class="card-body py-3">
          <div class="row g-2 align-items-center">
            <div class="col-12 col-md-6">
              <div class="input-group">
                <span class="input-group-text bg-white border-end-0">
                  <i class="bi bi-search text-muted"></i>
                </span>
                <input
                  v-model="search"
                  type="text"
                  class="form-control border-start-0 ps-0"
                  placeholder="搜尋姓名、電話、事由..."
                />
              </div>
            </div>
            <div class="col-auto ms-md-auto d-flex gap-2">
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="sortDesc = !sortDesc"
                :title="sortDesc ? '目前：最新在上' : '目前：最舊在上'"
              >
                <i :class="sortDesc ? 'bi bi-sort-down' : 'bi bi-sort-up'"></i>
                {{ sortDesc ? '最新' : '最舊' }}
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="clearAll" :disabled="!submissions.length">
                <i class="bi bi-trash3 me-1"></i>清除全部
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!filtered.length" class="card border-0 shadow-sm">
        <div class="card-body text-center py-5">
          <i class="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
          <p class="text-muted mb-0">
            {{ search ? '找不到符合的紀錄' : '尚無諮詢紀錄' }}
          </p>
        </div>
      </div>

      <!-- Desktop table -->
      <div v-else class="card border-0 shadow-sm d-none d-lg-block">
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
                <th class="fw-semibold text-muted small text-center" style="width:5rem;">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in filtered" :key="item.id">
                <td class="ps-4 text-muted small">{{ idx + 1 }}</td>
                <td class="fw-semibold">{{ item.name }}</td>
                <td>
                  <a :href="`tel:${item.phone}`" class="text-decoration-none" style="color:#1a2a6c;">
                    {{ item.phone }}
                  </a>
                </td>
                <td>
                  <span class="badge rounded-pill px-2 py-1 small" style="background:#e8ecf8;color:#1a2a6c;font-weight:500;">
                    {{ item.subject }}
                  </span>
                </td>
                <td class="text-muted small" style="max-width:320px;">
                  <div style="white-space:pre-wrap;word-break:break-word;max-height:4.5em;overflow:hidden;">{{ item.message }}</div>
                </td>
                <td class="small text-muted">{{ item.sentAt }}</td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-link text-danger p-0"
                    title="刪除"
                    @click="deleteOne(item.id)"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-footer text-muted small py-2 px-4 border-0" style="background:#f8f9fb;">
          顯示 {{ filtered.length }} / {{ submissions.length }} 筆
        </div>
      </div>

      <!-- Mobile cards -->
      <div class="d-lg-none">
        <div
          v-for="(item, idx) in filtered"
          :key="item.id"
          class="card border-0 shadow-sm mb-3"
        >
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <span class="fw-bold me-2">{{ item.name }}</span>
                <span class="badge rounded-pill small px-2" style="background:#e8ecf8;color:#1a2a6c;">
                  {{ item.subject }}
                </span>
              </div>
              <button class="btn btn-sm btn-link text-danger p-0" @click="deleteOne(item.id)">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
            <div class="small text-muted mb-1">
              <i class="bi bi-telephone me-1"></i>
              <a :href="`tel:${item.phone}`" class="text-decoration-none text-muted">{{ item.phone }}</a>
            </div>
            <div class="small text-muted mb-2" style="white-space:pre-wrap;word-break:break-word;">
              {{ item.message }}
            </div>
            <div class="small text-muted border-top pt-2 mt-1">
              <i class="bi bi-clock me-1"></i>{{ item.sentAt }}
            </div>
          </div>
        </div>
        <div class="text-center small text-muted py-2">
          顯示 {{ filtered.length }} / {{ submissions.length }} 筆
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-bg {
  background: #f0f3fa;
}
</style>
