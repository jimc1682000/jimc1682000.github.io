// 電子名片的單一資料源。h-card（名片頁）、vCard（.vcf）、QR 三個輸出都從這裡讀，
// 同一份聯絡資訊不重複出現在第二個地方。
//
// 刻意不放的欄位（決策見 DESIGN.md Decisions Log）：
//   - 電話：一律不放，vCard 不產生 TEL。
//   - 真實 Gmail：名片只用自有網域別名（可撤銷、可換信箱供應商而不必改名片）。
//   - 公司名／logo：職稱已傳達「做什麼」；任職資訊住在 /resume/。不放也就不需要
//     「非公司官方頁面」免責句。
//   - 地址：只到城市層級。

export interface ContactSocial {
  /** 顯示文字 */
  label: string;
  /** 完整 URL（vCard 的 X-SOCIALPROFILE 與頁面連結共用） */
  url: string;
  /** vCard X-SOCIALPROFILE 的 type 值 */
  vcardType: string;
}

const SITE = 'https://jimmychen.me';

export const contact = {
  /** vCard N 欄位用：姓、名（中文姓名分段） */
  familyName: '陳',
  givenName: '建豪',
  /** 顯示與 vCard FN */
  nameZh: '陳建豪',
  nameEn: 'Jimmy Chen',
  /** 職稱：與 resume 一致 */
  title: 'AI Engineer · DevOps / SRE',
  /** 一句自介：名片 p-note 與首頁 description 共用同一句 */
  noteZh: '與系統架構、自動化部署打交道的 DevOps／SRE，近年聚焦 AI／agentic 工作流。',
  noteEn:
    'A DevOps / SRE working with system architecture and deployment automation, lately focused on AI / agentic workflows.',
  /** 自有網域別名。需先在 Cloudflare Email Routing 設好轉寄才會活。 */
  email: 'hi@jimmychen.me',
  url: SITE,
  /**
   * h-card u-photo 與 vCard PHOTO。用 PNG 而非 SVG：手機通訊錄對 SVG 支援差。
   * 路徑刻意固定：換圖只換 public/avatar.png 的內容，不動路徑 —— 路徑一變，
   * fediverse／Bluesky 的頭像會斷到下次重新解析。
   * 注意 vCard 的特性：別人「已經存進通訊錄」的那張圖不會隨之更新（匯入即快照），
   * 換圖只影響之後才存的人。
   */
  photo: `${SITE}/avatar.png`,
  /** 只到城市層級，不放地址 */
  locality: 'Taipei / Tainan',
  /** 名片頁 URL（QR 與 vCard 的 URL 欄位都指這裡，兩者一致） */
  cardUrl: `${SITE}/contact`,
  socials: [
    { label: 'github.com/jimc1682000', url: 'https://github.com/jimc1682000', vcardType: 'github' },
    {
      label: 'linkedin.com/in/594jimmychen',
      url: 'https://www.linkedin.com/in/594jimmychen',
      vcardType: 'linkedin',
    },
    // Bluesky handle 就是網域本身（見 DESIGN.md：atproto 無 local part 概念）
    { label: '@jimmychen.me', url: 'https://bsky.app/profile/jimmychen.me', vcardType: 'bluesky' },
    // fediverse handle 由 h-card 的 acct: u-url 決定
    { label: '@jimmy@jimmychen.me', url: 'https://fed.brid.gy/web/jimmychen.me', vcardType: 'mastodon' },
  ] satisfies ContactSocial[],
} as const;
