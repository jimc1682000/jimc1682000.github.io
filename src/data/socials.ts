// 社群平台清單:列出全部平台,只有填了 url 的才會被 render（見 SocialLinks.astro）。
// 預留平台先留空 url,將來補上即自動亮起,不產生死連結。

export interface Social {
  /** 顯示名稱 / aria-label 用 */
  label: string;
  /** Icon.astro 的 name;未知會落到 generic link icon */
  icon: string;
  /** 空字串代表預留,不 render */
  url: string;
}

export const socials: Social[] = [
  { label: 'GitHub', icon: 'github', url: 'https://github.com/jimc1682000' },
  { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/594jimmychen/' },
  // ---- 以下預留（url 留空,先不 render） ----
  { label: 'X', icon: 'link', url: '' },
  { label: 'Facebook', icon: 'link', url: '' },
  { label: 'Instagram', icon: 'link', url: '' },
  { label: 'Stack Overflow', icon: 'link', url: '' },
  { label: 'Dribbble', icon: 'link', url: '' },
  { label: 'Behance', icon: 'link', url: '' },
  { label: 'Website', icon: 'link', url: '' },
  { label: 'Blog', icon: 'link', url: '' },
  { label: 'Email', icon: 'mail', url: '' },
];

/** 只回傳有 url 的平台（給 render 用,保證無死連結）。 */
export const activeSocials = socials.filter((s) => s.url.length > 0);
