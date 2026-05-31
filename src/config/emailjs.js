// ─────────────────────────────────────────────
// EmailJS 設定
// 請至 https://www.emailjs.com 完成以下步驟：
//  1. 註冊帳號 → Email Services → 連接 Gmail
//  2. Email Templates → 建立範本（見下方說明）
//  3. Account → General → 複製 Public Key
// ─────────────────────────────────────────────

export const EMAILJS = {
  PUBLIC_KEY: 'mhUjolo5FMXbfc9gb',   // Account > General > Public Key
  SERVICE_ID: 'service_7s6y87a',   // Email Services > Service ID
  TEMPLATE_ID: 'template_24nfidb',  // Email Templates > Template ID

  // 收件人清單（最多填三個）
  TO_EMAILS: [
    'sy.huang.9511@gmail.com',
    // 'second@email.com',
    // 'third@email.com',
  ],
}

// ─── EmailJS Template 建議內容 ───────────────
// Subject:  【修律】新諮詢申請 - {{subject}}
//
// Body:
//   姓名：{{from_name}}
//   電話：{{from_phone}}
//   諮詢事由：{{subject}}
//   送出時間：{{sent_at}}
//
//   ── 問題說明 ──
//   {{message}}
// ──────────────────────────────────────────────
