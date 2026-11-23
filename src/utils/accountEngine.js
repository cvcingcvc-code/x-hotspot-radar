// 创作者账号与动态内容生成引擎

export const DEFAULT_PRESET_ACCOUNTS = [
  {
    id: "preset-kiyuanly",
    name: "小北",
    handle: "@kiYuanly",
    url: "https://x.com/kiYuanly",
    avatar: "/assets/kiYuanly-avatar.jpg",
    bio: "记录 AI 与一人创业的真实探索\n分享用 AI 做产品的尝试、踩坑和复盘\n从想法出发，寻找值得解决的问题",
    location: "香港",
    joinedDate: "2026年10月",
    followersCount: 2413,
    followingCount: 2245,
    tweetsCount: 88,
    monthlyImpressions: "38.6K",
    engagementRate: "5.4%",
    authType: "real_linked",
    targetNiche: ["AI 与一人创业", "产品踩坑与复盘", "年轻人出路探索", "X与小红书打法"],
    toneStyle: "真诚接地气、不装逼、敢于暴露真实踩坑与思考、善用提问引发同行探讨",
  },
  {
    id: "preset-demo-indie",
    name: "WinterDev ❄️",
    handle: "@winter_dev_ai",
    url: "https://x.com/winter_dev_ai",
    avatar: "/assets/winter-anime-hero.jpg",
    bio: "独立全栈开发者 / 探索轻量 Agent 架构与数字游民极简生活。",
    location: "Tokyo / Remote",
    joinedDate: "2025年12月",
    followersCount: 14820,
    followingCount: 382,
    tweetsCount: 642,
    monthlyImpressions: "428.5K",
    engagementRate: "4.8%",
    authType: "mock",
    targetNiche: ["AI 科技", "独立开发", "前沿工具", "数字游民"],
    toneStyle: "极客敏锐、干货密集、冷淡高级感、注重代码与架构复盘",
  }
];

// 根据用户的定位与人设风格，动态生成匹配的热点雷达
export function generateHotspotsForNiche(niches = [], accountName = "创作者") {
  const primaryNiche = niches[0] || "一人创业";
  const secondNiche = niches[1] || "前沿探索";

  return [
    {
      id: `hot-dyn-1`,
      title: `“不上班的第 90 天”：关于【${primaryNiche}】真实破局与首笔收入复盘`,
      category: primaryNiche,
      source: "X 趋势 / 独立创作者热议",
      publishedAt: "20分钟前",
      heatScore: 98,
      relevanceScore: 99,
      summary: `全网正在热烈讨论如何打破打工死局，通过【${primaryNiche}】和极简自研产品搭建属于自己的数字资产。`,
      keyAngles: [
        `底层共鸣：从迷茫找工作到把时间买回来的心路蜕变`,
        `落地实操：普通人如何在 48 小时内完成第一个极简原型上线`,
        `反问递话筒：如果你有 3 个月自由时间，你最想解决哪个垂直痛点？`
      ],
      generatedTemplates: {
        deep: `很多人问我：为什么放着安稳的日子不过，非要跑来死磕【${primaryNiche}】？

今天走在路上，看着写字楼忙碌的身影，感触特别深：
打工是用确定性换取一眼望到头的低上限；
而探索【${primaryNiche}】再难，每迈出一步、每复盘一次踩坑，都是完全属于自己的复利系统。

记录下我这段时间的 3 点真实体会：
1. 别憋大招：先用最粗糙的 MVP 赚到第一块钱。
2. 保持公开输出（Build in Public）：真诚是最好的引流。
3. 离开消耗你的环境，去信息密度更高的地方。

今晚还在为自己的出路摸索的朋友，评论区报个到，我们绝不是一个人。👇`,
        sharp: `别再把时间浪费在毫无意义的重复消耗里了。
未来个人的核心竞争力只有两条：
① 独家真实的实操数据流
② 借助 AI 和超级工具把单人产能放大 10 倍。
认清现实的人早就换赛道了。还在犹豫的人只能看着别人拿结果。`,
        casual: `夜深了，又改完了一个小功能的细节。❄️
虽然没有大厂的福利，但每一分钟都是在为自己的未来铺路。
兄弟们，别饿着自己，今天继续冲！🔥`
      },
      comment: `很多人可能觉得我们这是“好高骛远”。但现实是传统的打工飞轮早就转不动了，给别人卖命换不来安全感。\n只要方向是对的，每一颗种子都有发芽的那天。兄弟们共勉！💪`
    },
    {
      id: `hot-dyn-2`,
      title: `同一套内容打法，从 X 复制到小红书/微信到底能不能跑通？实操拆解`,
      category: secondNiche,
      source: "数字游民社区 / 实战派精选",
      publishedAt: "1小时前",
      heatScore: 94,
      relevanceScore: 96,
      summary: `解析图文自媒体的跨平台流量互哺机制：如何将 X 上的真实认知碎碎念通过视觉化排版在全网实现多倍曝光。`,
      keyAngles: [
        `内容平移：把犀利金句改造成小红书‘大字报/备忘录截图’`,
        `受众洞察：公域抓情绪共鸣，私域交付高价值工具与服务`,
        `商业闭环：0 粉丝冷启动到第一批铁粉转化的实战路径`
      ],
      generatedTemplates: {
        deep: `复盘一下最近很多朋友问我的问题：在 X 上的这套内容打法，到底能不能直接搬到小红书/其他平台？

我实测两周后的结论：
核心逻辑相通，但‘容器外壳’必须换皮。
- 在 X：大家喜欢看你真实的挫折、反思和犀利吐槽（文字即力量）。
- 在小红书：必须做成极简备忘录截图或真实工位实拍，前 3 秒抓住眼球。

底层只要提供的是真实的搞钱与实操干货，换个视觉容器就能通吃。
正在做跨平台矩阵的朋友，评论区聊聊你们的转化率！👇`,
        sharp: `好观点是水，各个社交平台只是装水的杯子。
只要你的内容能戳中普通人痛点，一鱼多吃才是最高效的打法。
天天纠结选哪个平台的人，往往一个平台也做不起来。`,
        casual: `不懂就问：如果我把每天的实操踩坑日记做成图文卡片，大家会愿意在其他平台也关注我一份吗？✨
觉得靠谱的扣个 1，今晚我就去测！`
      },
      comment: `附：多平台真的很多年轻人在找副业和出路，对轻量工具的需求非常饥渴。\n如果有人感兴趣，我把我踩坑的几点逻辑整理在置顶群里，欢迎进来交流！`
    },
    {
      id: `hot-dyn-3`,
      title: `个人时代超级个体的“小而美”哲学：不求融资，只求月入覆盖生活费`,
      category: primaryNiche,
      source: "Indie Hackers Trending",
      publishedAt: "3小时前",
      heatScore: 91,
      relevanceScore: 93,
      summary: `分享单人团队利用现有 AI 工具解决特定垂直场景需求，快速跑通正向现金流的真实案例库。`,
      keyAngles: [
        `心态摆正：不上班不是躺平，是把精力花在能直接产生现金流的事上`,
        `极简轻资产：0 办公室租金、0 雇员成本，极限敏捷`,
        `执行力差距：把每一个想法在 48 小时内落地成可用产品`
      ],
      generatedTemplates: {
        deep: `‘不要总想着做改变世界的巨无霸，先做一个能帮你付房租的微型工具。’

这是我这几个月踩过无数坑后，刻在脑门上的教训：
以前总想搞个功能极其全的大产品，结果写了两个月根本没人用。
后来换了思路：只抓一个具体小痛点（比如帮创作者一键生成排版文案），3天上线就能收到付费。

做属于自己的内容和产品，接地气才能活下来。👇`,
        sharp: `天天看别人吹融资几个亿，不如看看自己银行卡余额多没多。
超级个体的核心目标就一个：活下去，然后拿回人生的自主权。
少整那些虚的，能跑通正向闭环的就是好项目。`,
        casual: `煮了一杯热茶，又改完了一个小功能的细节。
虽然室外寒风凛冽，但看着自己的产品一点点成型，心里特别踏实。☕️❄️`
      },
      comment: `前几年我也陷入过自我感动的怪圈，直到跳出那个环境，逼自己去接触商业闭环，才发现世界原来这么大。认知破局是第一步，后面就是拼执行力了！`
    }
  ];
}

// 本地存储键名
const STORAGE_KEY_ACCOUNTS = "fuyupulse_user_accounts";
const STORAGE_KEY_CURRENT_ID = "fuyupulse_current_account_id";

// 获取存储的账号列表
export function loadStoredAccounts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load accounts from storage", e);
  }
  return DEFAULT_PRESET_ACCOUNTS;
}

// 保存账号列表
export function saveStoredAccounts(accounts) {
  try {
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  } catch (e) {
    console.error("Failed to save accounts to storage", e);
  }
}

// 获取当前选中的账号 ID
export function loadCurrentAccountId() {
  return localStorage.getItem(STORAGE_KEY_CURRENT_ID) || DEFAULT_PRESET_ACCOUNTS[0].id;
}

// 保存当前选中的账号 ID
export function saveCurrentAccountId(id) {
  localStorage.setItem(STORAGE_KEY_CURRENT_ID, id);
}
