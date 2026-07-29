// vCard 3.0（RFC 2426）+ UTF-8。由 src/data/contact.ts 產生，不手寫。
//
// 為何 3.0 而非 4.0（2026-07-25 查證）：
//   3.0 近乎全平台可匯入（iCloud／Google Contacts／Outlook／Thunderbird／Android／iPhone），
//   也是 Apple 與 Outlook 自己匯出的版本；4.0 在舊 Android、舊 Outlook、iOS 16 以下可能
//   匯入失敗，而它新增的 KIND／MEMBER／GENDER／RELATED 對個人名片毫無用處。
//   名片唯一的工作是「對方的手機存得進去」，而對方的裝置我們控制不了 → 相容性優先。
//
// 中文亂碼與版本無關，來源是編碼與 Content-Type。故本檔：以 UTF-8 輸出、
// **不寫任何 CHARSET 參數**（3.0 允許但容易造成不一致），Content-Type 由
// public/_worker.js 對 /contact.vcf 補上 text/vcard; charset=utf-8
//（靜態輸出下 endpoint 的 header 不會被保留，且 advanced mode 停用 _headers）。
import { contact } from '../data/contact';

/** vCard 規格：, ; \ 與換行需轉義 */
function esc(v: string): string {
  return v.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export function GET() {
  const c = contact;
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    // N: 姓;名;中間名;前綴;後綴
    `N:${esc(c.familyName)};${esc(c.givenName)};;;`,
    `FN:${esc(`${c.nameZh} (${c.nameEn})`)}`,
    `NICKNAME:${esc(c.nameEn)}`,
    `TITLE:${esc(c.title)}`,
    `EMAIL;TYPE=INTERNET,PREF:${esc(c.email)}`,
    `URL:${esc(c.url)}`,
    // 以 URI 參照而非 base64 內嵌：檔案小、換圖只需換該路徑的內容。
    `PHOTO;VALUE=URI;TYPE=PNG:${esc(c.photo)}`,
    ...c.socials.map((s) => `X-SOCIALPROFILE;TYPE=${s.vcardType}:${esc(s.url)}`),
    // 只到城市層級：ADR 的 locality 欄，其餘留空
    `ADR;TYPE=intl:;;;${esc(c.locality)};;;`,
    `NOTE:${esc(c.noteZh)}`,
    // REV 用固定的內容版本日期而非 build 時間：避免每次 build 都產生 diff
    'REV:2026-07-25T00:00:00Z',
    'END:VCARD',
  ];
  // vCard 規格要求 CRLF 行尾
  return new Response(`${lines.join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="jimmy-chen.vcf"',
    },
  });
}
