# ❄️ FuyuPulse (冬雪脉冲) | X Hotspot Radar & Content Studio

<div align="center">

![FuyuPulse Hero Banner](/public/assets/winter-anime-hero.jpg)

**专为一人创业者与独立创作者打造的 X (Twitter) 智能热点雷达、爆款文案工坊与互动分析看板**  
*A beautiful winter anime glassmorphism AI radar & copywriting studio for X creators.*

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-rose.svg)](LICENSE)
[![X Profile](https://img.shields.io/badge/X-@kiYuanly-black?logo=x)](https://x.com/kiYuanly)

</div>

---

## ✨ 核心特性

- ❄️ **冬雪动漫毛玻璃美学 (Frost Anime Glassmorphism)**：
  - 深度磨砂亚克力面板 (`backdrop-blur-xl`)、霜白与少女围巾豆沙绯红点缀
  - 纯原生 Canvas 飘雪粒子动态引擎（支持自由开启/调节）
- 🔥 **智能热点雷达 (AI Hotspot Radar)**：
  - 聚焦「AI 与一人创业」、「产品踩坑复盘」、「年轻人出路探索」与「X与小红书打法」
  - 自动全网加权计算热度值（Heat Score）与个人契合度（Relevance Score）
  - AI 提炼核心切入角度，支持一键将热点传递至文案工坊
- ✍️ **AI 爆款文案工坊 (Copywriting Studio)**：
  - 3 种定制人设风格裂变：**「🔥 扫楼深夜复盘 (心路共鸣)」**、**「💡 颠覆吃苦谎言 (认知金句)」**、**「📱 小红书实测 (互动探讨)」**
  - **💬 独家「楼主自带神评楼」功能**：自动生成发帖后紧随其下的第一条置顶评论，有效承接流量、抛出互动钩子
  - AI 强钩子开头润色、冬雪意境增色、推特 280 字符实时计算、AI 视觉配图建议
- 🚀 **双模发推机制 (Dual-mode Publishing)**：
  - **免 Key 直发 (Web Intent)**：一键调起 X 官方发帖窗口，自动携带文案与话题标签，无需申请繁琐 API 即可在已登录账号上秒发
  - **X Developer API 直连**：支持配置 Bearer Token 与 API Key 静默后台发帖与排期
- 🏷️ **推文智能打标与 ROI 洞察 (Smart Tagging)**：
  - 历史推文自动标签化分类（#年轻人出路、#认知觉醒、#扫楼求职等）
  - 量化统计各标签的平均曝光量、点赞数与互动率，直观呈现最吸粉的主题
- 💬 **推文互动雷达 · 谁回复了我 (Replies Tracker)**：
  - 实时捕获回复你的推文，展示回复者身份特征（大V/同行创作者/老粉）
  - 研判回复情绪（提问求助、深度赞同、干货支招）
  - AI 智能生成 3 条不同语气的回复草稿，点击一键秒回
- 📊 **账号数据看板 (Analytics Dashboard)**：
  - 30 天总曝光、全量互动率、粉丝净增走势图
  - 24 小时黄金发帖时段热力排行（如 20:30 - 23:00 深夜黄金档）

---

## 🛠️ 技术栈

- **框架**：React 18 + Vite 6
- **样式**：TailwindCSS 3.4 + 自定义毛玻璃与阴影预设
- **图标**：Lucide React
- **动效**：原生 HTML5 Canvas 飘雪粒子系统
- **接口集成**：Twitter Web Intent + X API v2 规范接口

---

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/cvcingcvc-code/x-hotspot-radar.git
cd x-hotspot-radar
```

### 2. 安装依赖

```bash
npm install
```

### 3. 本地启动

```bash
npm run dev
```

启动完成后，打开浏览器访问 `http://localhost:5173/` 即可体验。

### 4. 生产打包

```bash
npm run build
```

---

## ⚙️ 账号与 API 配置

- 系统默认搭载 **沙盒演示与直发模式**，无需配置任何密钥即可完整体验热点捕捉、文案生成与免 Key Web Intent 发推。
- 如需使用后台静默 API，可在系统内点击左下角 **「X 账号与接口设置」** 填入你的 Twitter Developer 凭证：
  - `Bearer Token`
  - `API Key & Secret`

---

## 👤 作者

- **小北** (@kiYuanly)
- X (Twitter)：[https://x.com/kiYuanly](https://x.com/kiYuanly)
- 记录 AI 与一人创业的真实探索，分享用 AI 做产品的尝试、踩坑和复盘。

---

## 📄 License

本项目采用 [MIT License](LICENSE) 开源协议。
