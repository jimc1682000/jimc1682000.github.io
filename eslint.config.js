// ESLint flat config。範圍刻意保守：抓真正的錯誤（未定義變數、未使用變數、
// 明顯的 bug pattern），不做風格主張——風格交給 prettier，兩者不重疊才不會互相打架。
import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  {
    // 產物與外部資料不 lint
    ignores: ['dist/**', 'node_modules/**', '.astro/**', 'migrations/**', 'content/**'],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  {
    // scripts/ 與 _worker.js 跑在 Node／Workers，不是瀏覽器
    files: ['scripts/**/*.mjs', 'public/_worker.js'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        fetch: 'readonly',
        Response: 'readonly',
        Request: 'readonly',
        Headers: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        AbortSignal: 'readonly',
      },
    },
  },
  {
    // .astro 的 is:inline script 刻意用 var：no-flash 主題切換必須在 hydration 與任何
    // 樣式套用之前執行（DESIGN §6），那段是原始 script、不經打包，var 是刻意的相容選擇。
    // 為了討好 linter 去改動這種在 paint 前執行的關鍵腳本，風險大於收益。
    // 註：eslint-plugin-astro 把 <script> 區塊當成虛擬檔案處理（*.astro/*.js），
    // 只寫 **/*.astro 不會套到那些區塊，故三個 pattern 都要列。
    files: ['**/*.astro', '**/*.astro/*.js', '**/*.astro/*.ts'],
    rules: { 'no-var': 'off' },
  },
  {
    rules: {
      // 未使用變數：_ 前綴代表刻意丟棄（如 for (const _ of matchAll()) 只為計數）。
      // caughtErrors: 'none' —— catch (e) 不用 e 是常見且合理的寫法。
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      // catch {} 是刻意的靜默降級（如圖片雜湊失敗就跳過該檔）
      'no-empty': ['error', { allowEmptyCatch: true }],
      // cond ? a++ : b++ 當語句雖然精簡，但語意清楚且是既有寫法，不強制改成 if
      '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
      // Astro 的 set:html 是刻意使用（Webmentions 顯示與 JSON-LD 都需要）
      'astro/no-set-html-directive': 'off',
    },
  },
];
