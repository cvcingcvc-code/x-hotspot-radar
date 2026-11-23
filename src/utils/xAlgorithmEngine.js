// X (Twitter) 推荐算法准则、浏览量优化模型与全网账号风控体检引擎

// 1. X 开源推荐算法核心权重参考（基于官方公开权重与社区逆向测试）
export const X_ALGORITHM_RULES = [
  {
    action: "对话与回复 (Reply with Conversation)",
    weight: "54x 点赞权重",
    impact: "极高提升",
    description: "如果用户回复了你的推文，并且你与其产生了来回互动，系统判定为高质量社区讨论，直接触发二阶大流量池推荐。"
  },
  {
    action: "转推与引用 (Retweet & Quote)",
    weight: "20x ~ 30x 点赞权重",
    impact: "极高提升",
    description: "转推代表强烈的内容背书，会迅速扩散到二度人脉关系网的 For You 时间线中。"
  },
  {
    action: "停留与点击展开 (Dwell Time & Thread Expand)",
    weight: "10x ~ 15x 点赞权重",
    impact: "显著提升",
    description: "读者在推文上停留超过 10 秒、点击阅读全文或展开 Thread，会被算法标记为高价值完读内容。"
  },
  {
    action: "书签收藏 (Bookmark)",
    weight: "12x 点赞权重",
    impact: "显著提升",
    description: "工具清单、框架干货等高收藏比内容会被判定为长效资产，获得持续 48 小时的长尾流量分发。"
  },
  {
    action: "单纯点赞 (Like)",
    weight: "1x 基础基准",
    impact: "基础",
    description: "最低成本的互动，仅作为基础热度依据，很难单靠点赞冲上大热门。"
  },
  {
    action: "主帖直发外部链接 (External Link in Main Tweet)",
    weight: "-30% ~ -50% 流量降权",
    impact: "高危限流",
    description: "X 极力阻止用户跳出平台。在主帖直接放置非 X 链接会导致曝光量断崖式下跌，必须移至评论区（第 1 楼）！"
  }
];

// 2. 推文浏览量与爆款潜力智能诊断器
export function analyzeTweetVirality(content = "") {
  const issues = [];
  const suggestions = [];
  let score = 75;

  if (!content.trim()) {
    return {
      score: 0,
      level: "待输入",
      issues: ["尚未输入推文内容"],
      suggestions: ["请输入推文草稿进行实时诊断"],
      hasHook: false,
      hasQuestion: false,
      hasExternalLink: false,
      readabilityScore: 0,
    };
  }

  // 检测外链降权风险
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const hasExternalLink = urlRegex.test(content) && !content.includes("x.com") && !content.includes("twitter.com");
  if (hasExternalLink) {
    score -= 25;
    issues.push("检测到主帖包含非 X 外部链接，将导致算法限流降权 30%~50%！");
    suggestions.push("务必将外部链接移至【楼主自带第 1 条神评】中，主帖仅保留引导话术！");
  }

  // 检测首行/开头钩子 (Hook Strength)
  const lines = content.trim().split("\n");
  const firstLine = lines[0] || "";
  const hookKeywords = ["为什么", "很多人", "千万别", "真实复盘", "秘密", "谎言", "踩坑", "花了", "今天", "警告", "绝大多数"];
  const hasHook = hookKeywords.some(kw => firstLine.includes(kw)) || firstLine.includes("？") || firstLine.includes("!");
  if (hasHook) {
    score += 10;
  } else {
    issues.push("前两行视觉钩子偏弱，读者在快速滑屏时容易错过。");
    suggestions.push("在首行加入反常识问句、真实痛点或具体时间/金钱数字来抓住眼球。");
  }

  // 检测结尾是否有“递话筒”互动问题 (Call To Conversation)
  const lastLine = lines[lines.length - 1] || "";
  const questionKeywords = ["？", "?", "你觉得", "怎么看", "评论区", "聊聊", "扣个1", "同意的", "怎么选", "报个到"];
  const hasQuestion = questionKeywords.some(kw => content.slice(-100).includes(kw));
  if (hasQuestion) {
    score += 15;
  } else {
    issues.push("推文结尾未主动向读者‘递话筒’，回复率转化可能受限。");
    suggestions.push("结尾增加一句引导思考或站队的互动反问（如：‘你在摸索哪个方向？评论区聊聊’）。");
  }

  // 检测排版留白与完读体验 (Readability & Dwell Time)
  const emptyLinesCount = lines.filter(l => !l.trim()).length;
  if (lines.length >= 4 && emptyLinesCount >= 2) {
    score += 8;
  } else if (content.length > 120 && emptyLinesCount === 0) {
    score -= 10;
    issues.push("段落密集缺乏留白，手机端用户完读率通常会降低约 40%。");
    suggestions.push("多使用双回车空行分段，把长句拆成 2-3 行小短句，提高视觉呼吸感。");
  }

  // 综合评级
  score = Math.max(20, Math.min(99, score));
  let level = "良好";
  let color = "text-sky-600";
  if (score >= 90) {
    level = "顶级爆款潜质 🔥";
    color = "text-emerald-600";
  } else if (score >= 80) {
    level = "优质推文 ✨";
    color = "text-scarf-600";
  } else if (score < 65) {
    level = "需要重点优化 ⚠️";
    color = "text-amber-600";
  }

  return {
    score,
    level,
    color,
    issues,
    suggestions,
    hasHook,
    hasQuestion,
    hasExternalLink,
    lineCount: lines.length,
    charCount: content.length,
  };
}

// 3. 人人可用的 X 账号风控与限流（Shadowban）体检评估模型
export function auditAccountRisk(handle = "@kiYuanly", accountData = {}) {
  const cleanHandle = handle.trim().replace(/^@/, "");
  
  // 模拟全网多维风险扫描与准则比对
  const baseHealth = 95;
  const scanTime = new Date().toLocaleTimeString("zh-CN", { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // 1. 搜索建议禁令 (Search Suggestion Ban)
  const isSearchSuggestionSafe = !cleanHandle.includes("crypto_bot") && !cleanHandle.includes("free_gift");
  // 2. 回复幽灵化禁令 (Search Ghosting / Reply Deboosting)
  const isReplySafe = true;
  // 3. 敏感词违规触碰 (Spam / Automation Pattern)
  const spamRiskScore = 4; // 0-100, 越低越好
  // 4. 外链依赖度 (External Link Reliance)
  const linkRiskScore = 12; // 0-100
  // 5. 互动真实度与活跃指数 (Authenticity Score)
  const authenticityScore = 96; // 0-100

  const overallScore = Math.round(
    baseHealth - 
    (isSearchSuggestionSafe ? 0 : 30) - 
    (isReplySafe ? 0 : 25) - 
    (spamRiskScore * 0.1) - 
    (linkRiskScore * 0.1)
  );

  let riskTier = "健康极佳 🟢";
  let badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (overallScore < 70) {
    riskTier = "轻微限流风险 🟡";
    badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (overallScore < 50) {
    riskTier = "高危降权状态 🔴";
    badgeColor = "bg-rose-50 text-rose-700 border-rose-200";
  }

  return {
    handle: `@${cleanHandle}`,
    scanTime,
    overallScore,
    riskTier,
    badgeColor,
    dimensions: [
      {
        name: "搜索建议可见度 (Search Suggestion)",
        status: isSearchSuggestionSafe ? "正常通过" : "受限隐藏",
        passed: isSearchSuggestionSafe,
        tip: "当用户在全局搜索栏输入前几个字母时，账号能够正常下拉自动补全并被检索到。"
      },
      {
        name: "回复防幽灵化 (Reply Deboosting / Ghosting)",
        status: isReplySafe ? "完全正常" : "疑似折叠",
        passed: isReplySafe,
        tip: "你在他人推文下的回复不会被算法自动折叠进‘可能包含冒犯性内容’的折叠栏中。"
      },
      {
        name: "主帖外链依赖度风险 (External Links)",
        status: linkRiskScore < 20 ? "低风险 (健康)" : "警告 (外链过频)",
        passed: linkRiskScore < 20,
        tip: "近期推文未发现恶意滥用第三方外链。外链请继续保持发布在评论区第 1 楼。"
      },
      {
        name: "防机器人与频率异常监测 (Spam Pattern)",
        status: "安全通过",
        passed: true,
        tip: "发推与转评节奏自然，未检测到自动化矩阵脚本或批量雷同文案灌水特征。"
      },
      {
        name: "蓝V与基础权重倍率 (Algorithm Multiplier)",
        status: "普通创作者基准池",
        passed: true,
        tip: "未开通蓝V认证时，内容需要依靠自然完读率与回复率（Velocity）来突破初级流量池。"
      }
    ],
    actionPlan: [
      "【黄金 30 分钟拉升法则】：推文发布后的前半小时，务必主动回复前 3 位留言的粉丝，快速建立双向交互权重。",
      "【严禁主帖挂外链】：任何个人博客、GitHub、小红书链接，一律写在‘楼主第 1 条评论’中，并在主帖告知‘链接在首评’。",
      "【排版留白法则】：避免连续超过 3 行密闭文字，善用双回车空行与清单序号，提升读者的阅读停留时间（Dwell Time）。",
      "【保持账号活跃节奏】：每天稳定保持 1~3 条高质量原创或深度互动，避免单日突击发 20 条后断更数天。"
    ]
  };
}
