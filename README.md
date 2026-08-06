# LUMEN · 光影集 — 摄影作品集网站

一个时尚暗色风格的静态摄影作品集网站：全屏首页、滚动跑马灯、可筛选作品瀑布流、横向精选专题、大图灯箱查看器。

## 目录结构

```
lumen-gallery/
├── index.html      # 页面内容与文字
├── css/style.css   # 全部样式
├── js/main.js      # 交互效果
├── photos/         # 图片（替换成你自己的照片）
└── README.md
```

## 本地预览

直接双击 `index.html` 即可在浏览器中打开。

## 如何替换成自己的照片

1. 打开 `photos/` 文件夹，里面是占位样片（来自免费图库 Unsplash，仅供演示）。
2. 把同名文件替换成你的作品即可，例如把 `g01.jpg` 换成你的人像照片。
3. 如果照片数量不同，可以在 `index.html` 的作品区复制或删除整段 `<figure>...</figure>` 卡片代码，并修改 `data-category`（分类：`portrait` 人像 / `landscape` 风光 / `street` 街拍 / `architecture` 建筑）、`data-title`（灯箱标题）、`alt`（图片描述）和文件名。
4. 精选专题的图片在 `f01.jpg` ~ `f05.jpg`。

## 修改网站名称与文字

- 网站名：搜索 `LUMEN`，替换为你自己的名字或工作室名。
- 简介、邮箱：在 `index.html` 中直接修改，邮箱在联系区的 `mailto:` 链接里。
- 主题色：在 `css/style.css` 顶部的 `--accent`（金色点缀）与 `--bg` / `--ink`（背景与文字色）处调整。

## 部署到互联网（免费）

### 方式一：Netlify（最简单，拖拽即部署）

1. 打开 [app.netlify.com](https://app.netlify.com) 注册登录。
2. 把整个 `lumen-gallery` 文件夹拖进页面，几秒后就能拿到公网地址。
3. 在 Site settings 中可以绑定自己的域名。

### 方式二：Vercel

1. 打开 [vercel.com](https://vercel.com) 注册登录。
2. 点击 New Project → 上传或关联 Git 仓库，选择 `lumen-gallery` 目录部署。

### 方式三：GitHub Pages（需要 Git 基础）

1. 把 `lumen-gallery` 推送到 GitHub 仓库。
2. 仓库 Settings → Pages → Source 选择分支，即可生成 `https://你的用户名.github.io/仓库名/`。

三种方式都会自动配置 HTTPS，且都支持后续随时更新。
