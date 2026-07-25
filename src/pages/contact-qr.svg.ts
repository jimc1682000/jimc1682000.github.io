// 名片 QR 的可下載 SVG（供印刷／NFC 卡面設計用）。頁面上顯示的 QR 是 inline SVG，
// 兩者由同一個 contact.cardUrl 產生，內容必然一致。
//
// 自行產生而非用外部 QR 服務：CSP 不允許外部資源，且離線／服務關站時仍可用。
// qrcode 為 devDependency，只在 build 時執行，不進 client bundle。
import QRCode from 'qrcode';
import { contact } from '../data/contact';

export async function GET() {
  const svg = await QRCode.toString(contact.cardUrl, {
    type: 'svg',
    margin: 1,
    errorCorrectionLevel: 'M',
  });
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' },
  });
}
