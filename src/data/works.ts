// 作品集資料。繁中 + 英文描述並存;分四類渲染（見 /works/）。
import type { Lang, UIKey } from '../i18n/ui';

export type WorkCategory = 'platform' | 'ai' | 'automation' | 'showcase';

interface WorkLink {
  /** 連結顯示文字（zh / en） */
  label: Record<Lang, string>;
  href: string;
}

export interface Work {
  title: string;
  desc: Record<Lang, string>;
  tags: string[];
  links: WorkLink[];
}

// i18n key（見 src/i18n/ui.ts）對應各分類標題,依此順序渲染。
export const workCategories: { id: WorkCategory; titleKey: UIKey }[] = [
  { id: 'platform', titleKey: 'works.cat.platform' },
  { id: 'ai', titleKey: 'works.cat.ai' },
  { id: 'automation', titleKey: 'works.cat.automation' },
  { id: 'showcase', titleKey: 'works.cat.showcase' },
];

const live = { zh: '↗ Live', en: '↗ Live' };
const gh = { zh: '↗ GitHub', en: '↗ GitHub' };
const config = { zh: '↗ Config', en: '↗ Config' };
const open = { zh: '↗ 開啟', en: '↗ Open' };
const slides = { zh: '↗ Slides', en: '↗ Slides' };
const demo = { zh: '↗ Demo', en: '↗ Demo' };

export const works: Record<WorkCategory, Work[]> = {
  platform: [
    {
      title: 'OKD4 Home Lab',
      desc: {
        zh: '兩台實體機 KVM/QEMU 跑生產級 OKD 4（OpenShift upstream）;自建 pfSense / HAProxy / BIND / NFS / FCOS 節點全流程。',
        en: 'A production-grade OKD 4 (OpenShift upstream) cluster on two bare-metal hosts via KVM/QEMU — self-built pfSense / HAProxy / BIND / NFS and FCOS nodes end to end.',
      },
      tags: ['SRE', 'Bare-metal'],
      links: [
        { label: live, href: 'https://jimc1682000.github.io/okd4_files/' },
        { label: config, href: 'https://github.com/jimc1682000/okd4_files' },
      ],
    },
  ],
  ai: [
    {
      title: 'CDN Traffic Report',
      desc: {
        zh: '瀏覽器自動化擷取 Akamai Control Center + CloudFront 流量;同時是 Claude Code Plugin,讓 AI agent 直接產週報。',
        en: 'Browser automation that pulls Akamai Control Center + CloudFront traffic — and a Claude Code plugin that lets an AI agent generate the weekly report directly.',
      },
      tags: ['AI', 'Automation'],
      links: [
        { label: live, href: 'https://jimc1682000.github.io/cdn-traffic-report/' },
        { label: gh, href: 'https://github.com/jimc1682000/cdn-traffic-report' },
      ],
    },
    {
      title: 'film-brain',
      desc: {
        zh: 'AI 片庫大腦 —— 語意搜尋 replay、除錯 case study、eval 迭代記錄的靜態作品集。',
        en: 'An AI "movie-library brain" — a static showcase of semantic-search replays, debugging case studies, and eval iteration logs.',
      },
      tags: ['AI', 'RAG'],
      links: [
        { label: open, href: '/film-brain/' },
        { label: gh, href: 'https://github.com/jimc1682000/film-brain' },
      ],
    },
    {
      title: '我與老婆 (Claude Code) 的一天',
      desc: {
        zh: '用 Claude Code 以人機協作（HITL）除錯 Gitea OOM 的實錄,含 14 條協作心得。',
        en: 'A play-by-play of debugging a Gitea OOM with Claude Code in a human-in-the-loop workflow, plus 14 lessons on collaborating with an agent.',
      },
      tags: ['AI 協作'],
      links: [
        { label: open, href: 'https://jimc1682000.github.io/a-day-with-my-ai-wife/' },
        { label: gh, href: 'https://github.com/jimc1682000/a-day-with-my-ai-wife' },
      ],
    },
    {
      title: 'AWS Bedrock Workshop',
      desc: {
        zh: 'AWS Bedrock 生成式 AI 實作練習。',
        en: 'Hands-on exercises with generative AI on AWS Bedrock.',
      },
      tags: ['AI', 'AWS'],
      links: [{ label: gh, href: 'https://github.com/jimc1682000/aws-bedrock-workshop' }],
    },
  ],
  automation: [
    {
      title: 'Akamai Reports',
      desc: {
        zh: '以 Akamai V2 API 自動化產出流量報表。',
        en: 'Automated traffic reporting built on the Akamai V2 API.',
      },
      tags: ['Automation'],
      links: [{ label: gh, href: 'https://github.com/jimc1682000/akamai-reports' }],
    },
    {
      title: 'fhr',
      desc: {
        zh: 'Python 出勤分析工具,支援台灣假日,計算遲到與加班。',
        en: 'A Python attendance-analysis tool with Taiwan-holiday support that computes lateness and overtime.',
      },
      tags: ['Python'],
      links: [{ label: gh, href: 'https://github.com/jimc1682000/fhr' }],
    },
  ],
  showcase: [
    {
      title: '以悟易物 — UnionPay 行動應用大賽',
      desc: {
        zh: '後端組長帶 3 人;UnionPay 金流 API + 性格測驗購物體驗,獲昕創 App 大賽前五名。',
        en: 'Led a 3-person backend team — a UnionPay payments API plus a personality-quiz shopping experience; a top-5 finalist in the app competition.',
      },
      tags: ['競賽'],
      links: [{ label: demo, href: 'https://youtu.be/1cPPJpAbw6g' }],
    },
    {
      title: 'Java 道場 — 重構套路',
      desc: {
        zh: '重構手法的技術分享。',
        en: 'A tech talk on refactoring techniques.',
      },
      tags: [],
      links: [{ label: slides, href: 'https://prezi.com/wrffukwxl_gp/' }],
    },
    {
      title: 'ZK 101',
      desc: {
        zh: 'ZK 框架入門教學分享。',
        en: 'An introductory talk on the ZK framework.',
      },
      tags: [],
      links: [{ label: slides, href: 'https://www.slideshare.net/secret/oLkuCFwBVSidag' }],
    },
  ],
};
