// 真实账号数据：小北 (@kiYuanly) 专属定制数据流

export const initialAccountProfile = {
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
  isConnected: true,
  authType: "real_linked", // "real_linked" or "api"
  apiKey: "",
  apiSecret: "",
  bearerToken: "",
  targetNiche: ["AI 与一人创业", "产品踩坑与复盘", "年轻人出路探索", "X与小红书打法"],
  toneStyle: "真诚接地气、不装逼、敢于暴露真实踩坑与思考、善用提问引发同行探讨",
};

export const initialHotspots = [
  {
    id: "hot-1",
    title: "“不上班的第 90 天”：当代年轻人如何用 AI 搭建一人公司的第一笔收入",
    category: "AI 与一人创业",
    source: "X 趋势 / 独立创作者热议",
    publishedAt: "30分钟前",
    heatScore: 97,
    relevanceScore: 98,
    summary: "讨论当代年轻人逃离一眼望到头的销售/打工岗，转向用 AI 工具自研产品或内容出海的真实心路与可行路径。",
    keyAngles: [
      "真实共鸣：从扫楼找工作的迷茫，到决定自己掌控时间的心态蜕变",
      "落地思路：普通人别碰大架构，先用 AI 做极简小产品解决 1 个小痛点",
      "反问互动：如果你有 3 个月自由时间，你最想用 AI 做个什么产品？"
    ],
    generatedTemplates: {
      deep: `很多人问我：为什么放着一眼望到头的工作不去，非要在出租屋死磕 AI 一人创业？

今天出门扫楼，看到写字楼里忙碌的身影，感触特别深：
大部分普通岗位是在用确定性换取低上限；
而一人创业是用前期的不确定性，去博一个未来完全属于自己的复利系统。

记录下我用 AI 做独立产品的 3 点真实体会：
1. 先不要想年入百万，先赚到用代码和AI带来的第一块钱。
2. 每天逼自己输出复盘，公开表达（Build in Public）是最好的引流。
3. 别自己憋大招，找身边朋友测最粗糙的 MVP。

你现在是在上班还是在摸索自己的路？👇`,
      sharp: `简历投了几十家全石沉大海，面试十个有八个是招销售。
这不是你的问题，是传统的打工飞轮转不动了。
与其在死胡同里耗尽青春，真不如早点出来学学 AI 和流量，给自己造一条退路。
认清现实的人早就换赛道了。`,
      casual: `今天出去走了走，换换气。都说城市是风水，走在路上思路忽然开阔了好多。❄️
一人创业虽然每天都有各种不确定，但至少每天睁眼都是为了自己的目标在奔跑。
兄弟们，别饿着自己，今天继续冲！🔥`
    }
  },
  {
    id: "hot-2",
    title: "同一套内容打法，从 X 复制到小红书到底能不能跑通？实操复盘",
    category: "X与小红书打法",
    source: "数字游民社区 / X 实战派",
    publishedAt: "1小时前",
    heatScore: 93,
    relevanceScore: 95,
    summary: "解析图文自媒体的跨平台流量互哺机制：X 上的真实创业碎碎念如何通过视觉化排版在小红书实现多倍曝光与转化。",
    keyAngles: [
      "内容平移：把 X 的犀利金句改造成小红书‘大字报/备忘录’风格",
      "受众差异：X 偏重硬核理性与技术共鸣，小红书更看重情绪价值与行动清单",
      "引流闭环：如何安全合规地把两端粉丝沉淀到个人微信或社群"
    ],
    generatedTemplates: {
      deep: `复盘一下最近很多朋友问我的问题：X 上的打法，到底能不能直接搬到小红书？

我测试了两周的真实结论：
核心逻辑相通，但‘外包装’必须换皮。
- 在 X：大家喜欢看你真实的挫折、思考和犀利吐槽（文字即力量）。
- 在小红书：必须把同一段观点做成‘极简手机备忘录截图’或‘冬日工作台实拍’，前 3 秒抓住眼球。

只要底层提供的是真实的搞钱/创业干货，换个视觉容器就能通吃。
正在做跨平台矩阵的朋友，评论区聊聊你们的爆文率！👇`,
      sharp: `天天有人纠结做 X 还是做小红书。
成年人不做单选题：好观点是水，平台只是装水的杯子。
只要你的内容能戳中普通人痛点，一鱼多吃才是最高效的打法。还在犹豫的人只能看着别人拿结果。`,
      casual: `不懂就问：如果我把每天在 X 上分享的 AI 踩坑日记，做成小红书风格的极简卡片，大家会愿意在小红书也关注我一份吗？✨
觉得靠谱的扣个 1，今晚我就去测！`
    }
  },
  {
    id: "hot-3",
    title: "AI 时代独立开发者的“小而美”哲学：不求融资，只求月入覆盖生活费",
    category: "产品踩坑与复盘",
    source: "Indie Hackers",
    publishedAt: "2小时前",
    heatScore: 90,
    relevanceScore: 93,
    summary: "分享无需融资、单人团队利用现有开源模型解决特定垂直需求，快速实现正向现金流的案例库。",
    keyAngles: [
      "心态摆正：不上班不是躺平，是把精力花在能直接产生现金流的事上",
      "产品选型：抓准打工人和自媒体人的高频痛点（如批量排版、热点追踪）",
      "成本控制：0 办公室租金、0 雇员成本，极致的轻资产运营"
    ],
    generatedTemplates: {
      deep: `‘不要总想着做改变世界的巨无霸，先做一个能帮你付房租的微型工具。’

这是我这几个月踩过无数坑后，刻在脑门上的教训：
以前总想搞个功能极其全的大产品，结果写了两个月根本没人用。
后来换了思路：只抓一个具体小痛点（比如帮创作者一键生成小红书封面文案），3天上线就能收到付费。

一人创业最怕死在宏大叙事里。接地气，才能活下来。`,
      sharp: `天天在网上看别人吹融资几个亿，不如看看自己银行卡余额多没多。
独立创业的核心目标就一个：活下去，然后实现自由。
少整那些虚的，能跑通商业闭环的就是好产品。`,
      casual: `煮了一杯热茶，又改完了一个小功能的 Bug。
虽然没有大厂的下午茶，但每一行代码都是为了自己的事业在添砖加瓦。
一步一步来，慢一点，但走得踏实。☕️❄️`
    }
  }
];

export const initialTaggedTweets = [
  {
    id: "tw-real-1",
    content: "现在的招聘网站很多都是招销售的，大部分投过的简历就石沉大海，当代年轻人这个工作很难找呀 然后今天去扫楼了，发现还可以，但是呃，特别适合的好像没有，大部分都是一眼望到头的工作。所以说这就是你们也不去上班的原因吗？",
    publishedAt: "4小时前",
    tags: ["#年轻人出路", "#扫楼求职", "#一人创业", "#真实日常"],
    category: "职场痛点与共鸣",
    stats: {
      impressions: 123,
      likes: 1,
      retweets: 0,
      replies: 3,
      bookmarks: 2,
      engagementRate: "4.8%"
    },
    aiTagReason: "直击当代年轻人的就业与生活现状痛点，结尾抛出互动反问，引发了同龄人的强烈共情与评论区探讨。",
    sentiment: "反思与探讨"
  },
  {
    id: "tw-real-2",
    content: "吃的苦中苦方为人上人 后来苦越吃越多还看不到方向，直到我来了x才发现现在可以看到方向了",
    publishedAt: "7小时前",
    tags: ["#认知觉醒", "#创业心路", "#X搞钱", "#破局思考"],
    category: "心路反思",
    stats: {
      impressions: 170,
      likes: 4,
      retweets: 1,
      replies: 7,
      bookmarks: 5,
      engagementRate: "10.0%"
    },
    aiTagReason: "打破传统‘吃苦’认知的金句型表达，引发强烈情绪共鸣，7 条互动评论充分证明了高质量观点的传播力。",
    sentiment: "积极觉醒"
  },
  {
    id: "tw-real-3",
    content: "不懂就问 这一套打法，换去小红书上是不是也可以拿到大结果，只要足够坚持",
    publishedAt: "7小时前",
    tags: ["#小红书打法", "#跨平台矩阵", "#流量探索", "#互动求助"],
    category: "运营探讨",
    stats: {
      impressions: 102,
      likes: 2,
      retweets: 0,
      replies: 1,
      bookmarks: 1,
      engagementRate: "3.9%"
    },
    aiTagReason: "经典的‘不懂就问’互动求助体，极易吸引有实操经验的同行前来留言传授经验。",
    sentiment: "探索求知"
  },
  {
    id: "tw-real-4",
    content: "都说城市是风水， 所以我打算出去找找机会。不能一直宅在出租屋里",
    publishedAt: "6小时前",
    tags: ["#走出出租屋", "#找机会", "#心态转变"],
    category: "行动随笔",
    stats: {
      impressions: 105,
      likes: 3,
      retweets: 0,
      replies: 2,
      bookmarks: 0,
      engagementRate: "4.7%"
    },
    aiTagReason: "充满真实生活气息的动态更新，展现了不甘于现状、主动出击的创业者心力。",
    sentiment: "行动派"
  },
  {
    id: "tw-real-5",
    content: "兄弟们别饿着自己 🍲",
    publishedAt: "6小时前",
    tags: ["#生活温情", "#真实日常", "#社区互动"],
    category: "暖心日常",
    stats: {
      impressions: 90,
      likes: 4,
      retweets: 0,
      replies: 1,
      bookmarks: 0,
      engagementRate: "5.5%"
    },
    aiTagReason: "高亲和力生活日常，拉近与粉丝之间的真实距离，建立‘活生生的人’的 IP 信任感。",
    sentiment: "温情治愈"
  }
];

export const initialReplies = [
  {
    id: "rep-real-1",
    tweetId: "tw-real-1",
    tweetSnippet: "现在的招聘网站很多都是招销售的，大部分投过的简历就石沉大海...",
    user: {
      name: "阿杰 | 独立出海中",
      handle: "@ajie_indie",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      followers: 1680,
      isVip: true,
      tag: "同行创业者"
    },
    content: "太真实了小北！上个月我也去扫过楼，全是催销电话和保险外包，根本学不到能沉淀的核心资产。现在自己在摸索 AI 工具出海，虽然苦但每天都是给自己干！",
    timeAgo: "2小时前",
    sentiment: "强烈共鸣 / 鼓励",
    aiReplySuggestions: [
      "阿杰懂我！确实，给别人打工一眼望到头，出来虽然有风浪但舵在自己手里。一起加油！💪",
      "真的一模一样，那种一眼望到底的消耗感太可怕了。你现在主攻哪个方向的工具？多交流！",
      "兄弟同道中人！苦是暂时的，积累下来的技能和产品才是真正带得走的！🔥"
    ]
  },
  {
    id: "rep-real-2",
    tweetId: "tw-real-2",
    tweetSnippet: "吃的苦中苦方为人上人 后来苦越吃越多还看不到方向，直到我来了x才发现...",
    user: {
      name: "Leo 探索中",
      handle: "@leo_growth",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      followers: 3200,
      isVip: true,
      tag: "优质创作者"
    },
    content: "X 上最棒的一点是能看到全世界各种普通人怎么用极简工具把产品做起来的，信息差真的能打破认知的墙。小北这条说到心坎上了！",
    timeAgo: "3小时前",
    sentiment: "深度赞同",
    aiReplySuggestions: [
      "Leo 说得太透彻了！以前被困在信息茧房里，在 X 上看到了太多真实的可能，瞬间不迷茫了！✨",
      "是的！信息差和认知差一旦抹平，剩下的就是纯粹拼执行力了！🤝",
      "谢谢 Leo 认可！每天看大家的推文都是一次充能，继续保持探索！"
    ]
  },
  {
    id: "rep-real-3",
    tweetId: "tw-real-3",
    tweetSnippet: "不懂就问 这一套打法，换去小红书上是不是也可以拿到大结果...",
    user: {
      name: "夏夏 | 流量操盘",
      handle: "@xiaxia_flow",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      followers: 8400,
      isVip: true,
      tag: "小红书玩家"
    },
    content: "完全可以！但是小红书切忌纯文字，你要把你的经历做成‘20多岁失业在香港做一人创业’这种人设图文，首图放一张真实的工位或扫楼照片，爆款概率至少提高 5 倍！",
    timeAgo: "4小时前",
    sentiment: "干货支招 / 传授经验",
    aiReplySuggestions: [
      "天呐感谢夏夏的宝贵实操建议！‘真实人设+痛点首图’这个思路太清晰了，今晚我就按这个框架做一组试试！🙏",
      "学到了！确实小红书视觉属性更重，我打算把扫楼的真实感受和照片结合起来排版！",
      "太受启发了！感谢大佬指路，等我跑出数据来向你汇报复盘！✨"
    ]
  }
];

export const initialAnalytics = {
  dailyImpressions: [
    { date: "11/17", value: 320 },
    { date: "11/18", value: 450 },
    { date: "11/19", value: 680 },
    { date: "11/20", value: 1120 },
    { date: "11/21", value: 1460 },
    { date: "11/22", value: 2150 },
    { date: "11/23", value: 2980 },
  ],
  followerGrowth: [
    { date: "11/17", net: 15, total: 2320 },
    { date: "11/18", net: 22, total: 2342 },
    { date: "11/19", net: 18, total: 2360 },
    { date: "11/20", net: 25, total: 2385 },
    { date: "11/21", net: 12, total: 2397 },
    { date: "11/22", net: 8, total: 2405 },
    { date: "11/23", net: 8, total: 2413 },
  ],
  tagPerformance: [
    { tag: "#认知觉醒", avgImpressions: 170, avgLikes: 4, count: 5 },
    { tag: "#年轻人出路", avgImpressions: 123, avgLikes: 2, count: 8 },
    { tag: "#小红书打法", avgImpressions: 102, avgLikes: 2, count: 6 },
    { tag: "#走出出租屋", avgImpressions: 105, avgLikes: 3, count: 4 },
    { tag: "#真实日常", avgImpressions: 90, avgLikes: 4, count: 12 },
  ],
  bestTimeSlots: [
    { slot: "08:00 - 09:30 通勤早报", score: 85, label: "职场痛点与清晨思考" },
    { slot: "12:00 - 13:30 午休共鸣", score: 89, label: "打工人吐槽与换道思考" },
    { slot: "18:00 - 19:30 下班时刻", score: 82, label: "扫楼/找机会的当日随笔" },
    { slot: "20:30 - 23:00 深夜复盘", score: 98, label: "深度心路、一人创业实操与搞钱干货（极高互动）" },
  ]
};
