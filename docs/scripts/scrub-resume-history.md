# 清洗公開 git 歷史中的完整履歷（方案 3）

> **破壞性操作。** 執行前必須：  
>
> 1. 線上已改 L0、主站不再組裝完整 resume（方案 2 前半）  
> 2. `jimc1682000/resume` 已改 private、Pages 已關  
> 3. 使用者明確回覆同意 force push 的 repo 清單  
> 4. 所有相關 worktree／本機 clone 準備重抓
>

**做不到的事**：Wayback、別人已 clone／下載的複本、搜尋引擎快取 —— 改寫歷史無法收回。

## 前置

```bash
# 工具
command -v git-filter-repo

# 建議在 scratch 做 mirror clone，不要直接對日常 worktree 改寫
scratch="$(scratch resume-history-scrub)"
cd "$scratch"
```

## A. `jimc1682000/resume`（改 private 後仍建議洗，避免日後加 collaborator 看到舊 public 鏡像敘事）

完整內容會留在 **private 現況 tree**；若目標是「private 但歷史也乾淨」——通常 **不必** 對 resume 做 invert-path 刪正文（刪了 private 裡也沒履歷了）。

resume 的 3 較合理解釋：

1. **public → private**（方案 2）：匿名再也 clone 不到。  
2. 若曾 **fork** 到別人帳號：跟對方刪；force push 幫不了別人的 fork。  
3. 若曾把 resume **mirror 到別的 public remote**：一併 private／刪。

因此 resume 本體：**以 private 為主，不必 filter 掉 md/pdf**（否則你自己也沒源）。  
若仍想壓縮歷史：可 `git gc`／新 private repo 只推現行 tree（orphan main），那是「重建」而非 filter 刪檔。

### 可選：orphan 重建（只保留現行完整內容，丟掉舊 commit 訊息噪音）

```bash
git clone --mirror git@github.com:jimc1682000/resume.git resume.git
# 或一般 clone 後：
cd resume
git checkout --orphan clean-main
git add -A
git commit -m "chore(resume): private baseline after public unpublish"
# 確認內容無誤後：
# git branch -M main
# git push --force-with-lease origin main
```

## B. `jimc1682000/jimc1682000.github.io`（**必須** filter：站會維持 public）

主站 public 歷史含 split 前完整 VitePress 履歷與 PDF。

### 1. mirror clone

```bash
git clone --mirror git@github.com:jimc1682000/jimc1682000.github.io.git jimc1682000.github.io.git
cd jimc1682000.github.io.git
```

### 2. 移除履歷相關路徑（invert-paths）

以下路徑來自歷史盤點；**不要**刪現行的 `docs/TODO-phase2.md`、`docs/hidden-resume.md`（filter-repo 依 path 全歷史移除——若某 path 只在舊歷史出現則安全；若 path 名稱與現行檔衝突要小心）。

舊履歷路徑（應移除）：

```text
docs/.vitepress/
docs/detail.md
docs/index.md
docs/platform.md
docs/sre.md
docs/en/
docs/public/pdf/
docs/public/robots.txt
resume/
.github/workflows/resume-review.yml
```

注意：`docs/en/` 在 split 前是履歷英文變體；現行 blog 英文在 `content/blog/en/`，**不是** `docs/en/`。  
現行 `docs/TODO-phase2.md`、`docs/hidden-resume.md` 路徑不在上表，會保留。

```bash
git filter-repo \
  --path docs/.vitepress/ \
  --path docs/detail.md \
  --path docs/index.md \
  --path docs/platform.md \
  --path docs/sre.md \
  --path docs/en/ \
  --path docs/public/ \
  --path resume/ \
  --path .github/workflows/resume-review.yml \
  --invert-paths \
  --force
```

### 3. 驗證

```bash
# 不應再出現履歷 PDF blob 路徑
git log --all --name-only --pretty=format: | rg -i 'resume-.*\.pdf|docs/index\.md|resume/build' || true
# 現行必要檔仍在（對非 mirror 的 temporary checkout 驗證更直觀）
```

建議另 clone 改寫後的 mirror 到臨時目錄，確認：

- `content/blog/` 文章還在  
- `src/` Astro 還在  
- 沒有 `docs/public/pdf/resume-*.pdf`  
- `docs/hidden-resume.md` 若只存在於未合入 branch，以該 branch 為準另處理

### 4. 暫開 force push 後推送

主站 `master` protection：`allow_force_pushes: false`。

```bash
# 暫開（執行完立刻關回）
gh api -X PUT repos/jimc1682000/jimc1682000.github.io/branches/master/protection \
  --input - <<'JSON'
{ ... 保留其餘規則，僅 allow_force_pushes: true ... }
JSON

git push --force-with-lease origin --all
git push --force-with-lease origin --tags

# 關回 allow_force_pushes: false
```

（實際 protection JSON  extrude 時用 `gh api repos/.../branches/master/protection` 先导出再改，避免洗掉 review 規則。）

### 5. 所有本機 worktree／clone

force push 後舊 worktree 的 SHA 全失效：

```bash
# 每個 worktree / clone
git fetch origin
git checkout master
git reset --hard origin/master   # 僅在確認無未推送唯一工作後
```

或刪 worktree 重建。

## 執行順序（建議）

1. 合併並部署主站 L0（止血）  
2. `resume` → private + 刪／關 Pages  
3. 確認線上 PDF 404、完整 HTML 不再出現  
4. 使用者回覆：「同意 force push `jimc1682000.github.io`」  
5. 執行 B  
6. （可選）resume orphan 重建  
7. 通知所有本機環境重抓  

## 明確不要

- 不要在日常 orca worktree 直接 filter-repo  
- 不要 `git push --force` 不帶 lease（應用 `--force-with-lease`）  
- 不要假設 mirror.jimmychen.me／CF 快取立刻一致（部署後再 curl 驗證）  
- 不要 filter 掉 `content/blog/`  
