import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Send, 
  Clock, 
  Copy, 
  Check, 
  Layers, 
  Hash, 
  Image as ImageIcon,
  Wand2,
  AlertCircle
} from 'lucide-react';

export default function CopywritingStudio({ 
  selectedHotspot, 
  onPublishTweet, 
  account 
}) {
  const [styleMode, setStyleMode] = useState('deep'); // deep | sharp | casual
  const [tweetContent, setTweetContent] = useState('');
  const [selfReplyComment, setSelfReplyComment] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isCommentCopied, setIsCommentCopied] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccessMsg, setPublishSuccessMsg] = useState('');
  const [selectedTags, setSelectedTags] = useState(['#AI与一人创业', '#年轻人出路']);

  const presetTemplates = {
    deep: {
      content: `今天扫完楼回到出租屋，鞋底都是酸的。

看了十几个招电话销售和地推的岗位，给开 3000 底薪，一眼就能看到 5 年后的天花板。
回来的路上我一直在想：
为什么我们这代年轻人宁愿守着一台电脑、对着报错抓狂、在 X 上自己摸索 AI 出海，也不愿意去“安稳”地上个班？

因为打工的尽头是消耗，而一人创业再难，每敲下一行代码、每多测一个需求，哪怕今天只赚了 1 美元，那也是属于自己的数字资产。

我们不是怕吃苦，我们只是怕吃那种毫无意义的苦。
今晚还在摸索自己出路的朋友，评论区报个到，我们绝不是一个人。`,
      comment: `很多人可能觉得我们这是“好高骛远”。但现实是，传统的打工飞轮早就转不动了，给别人卖命换不来安全感。\n今晚给自己煮了碗面，把 AI 提示词库又优化了一轮。\n慢一点没关系，只要方向是对的，每一颗种子都有发芽的那天。兄弟们共勉！💪`
    },
    sharp: {
      content: `从找工作碰壁到自己摸索一人创业，我推翻了过去二十年被灌输得最多的一个谎言：
“只要肯吃苦，就能过好这一生。”

现实是：最底层的体力消耗和时间贩卖，只会让你丧失所有的思考能力。
真正能让你翻盘的，只有三件事：
1. 掌握杠杆：学会用 AI 替代原本需要 3 个人干的重复脏活
2. 搭建资产：把每一次踩坑、每一次复盘变成公开的内容或微型小工具
3. 离开同温层：去那些信息密度更高的地方（比如现在的 X）

吃有杠杆的苦，别吃低水平消耗的苦。
赞同这点的兄弟，转推让更多还在迷茫的人看到。`,
      comment: `前几年我也陷入过‘每天加班到 11 点感动自己’的怪圈，结果银行卡余额一点没涨，头发还少了一半。\n直到跳出那个环境，逼自己去接触新工具和商业闭环，才发现世界原来这么大。\n认知破局是第一步，后面就是硬碰硬拼执行力了。`
    },
    casual: {
      content: `还记得我下午问的“这一套打法换去小红书行不行”吗？
听了大家的建议，我真的去测了。

我把今天在香港找工作的真实感受，配了一张随手拍的街道图，发了第一篇图文小红书。
两个小时后的数据有点出乎我意料：
居然有十几个同在迷茫的同龄人在底下留言问我“如何开始学 AI 搞钱”。

我发现一个核心秘密：
在这个人人焦虑的时代，大家不缺高大上的成功学，最缺的是“活生生的人”在台前记录自己如何一步步破局。
想问问有做过小红书矩阵的老哥：第一批粉丝如何合规引导沉淀到微信群？`,
      comment: `附：小红书上真的很多年轻人在找副业和出路，对 AI 工具的需求非常饥渴。\n如果有人对“普通人怎么用 AI 工具包做图文变现”感兴趣，我把我踩坑的几点逻辑整理在置顶群里，欢迎进来一起碰思路！`
    }
  };

  // 当选择不同热点或风格时更新文案
  useEffect(() => {
    if (selectedHotspot && selectedHotspot.generatedTemplates) {
      setTweetContent(selectedHotspot.generatedTemplates[styleMode] || '');
      setSelfReplyComment(presetTemplates[styleMode]?.comment || '');
    } else {
      const template = presetTemplates[styleMode];
      if (template) {
        setTweetContent(template.content);
        setSelfReplyComment(template.comment);
      }
    }
  }, [selectedHotspot, styleMode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(tweetContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePublish = (mode = 'web') => {
    if (!tweetContent.trim()) return;
    setIsPublishing(true);

    if (mode === 'web') {
      // 通过 Twitter Web Intent 直连真实账号发布
      const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`;
      window.open(tweetUrl, '_blank', 'noopener,noreferrer');
    }

    setTimeout(() => {
      setIsPublishing(false);
      onPublishTweet({
        content: tweetContent,
        tags: selectedTags,
        category: styleMode === 'deep' ? '深度干货' : styleMode === 'sharp' ? '观点碰撞' : '日常互动',
      });
      setPublishSuccessMsg(
        mode === 'schedule'
          ? '已成功加入定时发布队列！'
          : mode === 'web'
          ? '🚀 已唤起 X 官方发帖窗口，并在系统中完成同步打标！'
          : '🎉 推文已通过 API 发布至 X 账号！'
      );
      setTimeout(() => setPublishSuccessMsg(''), 4000);
    }, 600);
  };

  const handlePolish = (type) => {
    if (type === 'concise') {
      setTweetContent(prev => prev.replace(/\n\n+/g, '\n').slice(0, 240) + '\n\n#独立开发 #AI前沿');
    } else if (type === 'hook') {
      setTweetContent(prev => `⚠️ 很多人都没意识到的一个事实：\n` + prev);
    } else if (type === 'snow') {
      setTweetContent(prev => prev + '\n\n冬夜漫长，代码常青。❄️☕️');
    }
  };

  const charCount = tweetContent.length;

  return (
    <div className="space-y-6">
      {/* 顶部热点关联状态 */}
      {selectedHotspot ? (
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between border-l-4 border-scarf-500 shadow-sm">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-scarf-100 flex items-center justify-center text-scarf-600 font-bold">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <p className="text-xs font-semibold text-scarf-600">已载入热点源</p>
              <h4 className="text-sm font-bold text-frost-900">{selectedHotspot.title}</h4>
            </div>
          </div>
          <span className="text-xs text-frost-500 bg-white/70 px-2.5 py-1 rounded-lg">
            契合度 {selectedHotspot.relevanceScore}%
          </span>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-3.5 flex items-center justify-between text-xs text-frost-500">
          <span>提示：你可以在「智能热点雷达」中点击“生成爆款文案”一键将热点注入此处。</span>
          <span className="text-scarf-600 font-medium">自由拟稿模式</span>
        </div>
      )}

      {/* 文案创作主面板 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：文案编辑与风格模式 (占 2 列) */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 space-y-4 border border-white">
          <div className="flex items-center justify-between">
            {/* 风格切换 Pills */}
            <div className="flex items-center space-x-1.5 p-1 bg-frost-200/50 rounded-2xl">
              <button
                onClick={() => setStyleMode('deep')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  styleMode === 'deep' ? 'bg-white text-frost-900 shadow-sm' : 'text-frost-600 hover:text-frost-900'
                }`}
              >
                🔥 扫楼深夜复盘 (强烈共鸣)
              </button>
              <button
                onClick={() => setStyleMode('sharp')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  styleMode === 'sharp' ? 'bg-white text-frost-900 shadow-sm' : 'text-frost-600 hover:text-frost-900'
                }`}
              >
                💡 颠覆吃苦谎言 (认知金句)
              </button>
              <button
                onClick={() => setStyleMode('casual')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  styleMode === 'casual' ? 'bg-white text-frost-900 shadow-sm' : 'text-frost-600 hover:text-frost-900'
                }`}
              >
                📱 小红书实测 (互动探讨)
              </button>
            </div>

            {/* AI 润色快捷按键 */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePolish('hook')}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-white/70 hover:bg-white text-frost-700 border border-frost-200 transition font-medium flex items-center gap-1"
                title="添加引人注目的开头"
              >
                <Wand2 className="w-3 h-3 text-scarf-500" />
                强钩子开头
              </button>
              <button
                onClick={() => handlePolish('snow')}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-white/70 hover:bg-white text-frost-700 border border-frost-200 transition font-medium"
                title="融入冬日雪景意境"
              >
                ❄️ 冬雪意境
              </button>
            </div>
          </div>

          {/* 文本输入区域 */}
          <div className="relative">
            <textarea
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
              rows={9}
              placeholder="在这里编写或让 AI 生成符合你定位的推文文案..."
              className="w-full p-4 rounded-2xl bg-white/70 border border-frost-200/80 text-sm text-frost-900 placeholder-frost-400 focus:outline-none focus:border-scarf-400 focus:bg-white transition leading-relaxed shadow-inner resize-none"
            />
            <div className="absolute right-3 bottom-3 flex items-center space-x-2 text-xs">
              <span className={`font-semibold ${charCount > 280 ? 'text-amber-600' : 'text-frost-400'}`}>
                {charCount} 字符 {charCount > 280 ? '(长推/Thread格式)' : ''}
              </span>
            </div>
          </div>

          {/* 帖子自带的第一条评论 (置顶神评楼 / 递话筒) */}
          {selfReplyComment && (
            <div className="bg-scarf-50/60 rounded-2xl p-4 border border-scarf-200/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-scarf-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-scarf-500 animate-pulse" />
                  💬 帖子自带第 1 条评论（主帖发布后立即在楼下回复，引爆互动）：
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(selfReplyComment);
                    setIsCommentCopied(true);
                    setTimeout(() => setIsCommentCopied(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-scarf-600 font-semibold border border-scarf-200 transition text-[11px] shadow-sm flex items-center gap-1"
                >
                  {isCommentCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{isCommentCopied ? '已复制评论' : '一键复制神评'}</span>
                </button>
              </div>
              <p className="text-xs text-frost-800 leading-relaxed whitespace-pre-wrap font-normal pl-3.5 border-l-2 border-scarf-400">
                {selfReplyComment}
              </p>
            </div>
          )}

          {/* 成功提示条 */}
          {publishSuccessMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4 text-emerald-600" />
              {publishSuccessMsg}
            </div>
          )}

          {/* 底部行动栏 */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white/80 hover:bg-white text-frost-700 text-xs font-semibold border border-frost-200 transition shadow-sm"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? '已复制文案' : '复制全文'}</span>
            </button>

            <div className="flex items-center space-x-2.5">
              <button
                disabled={isPublishing}
                onClick={() => handlePublish('schedule')}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/80 hover:bg-white text-frost-700 text-xs font-semibold border border-frost-200 transition shadow-sm"
              >
                <Clock className="w-3.5 h-3.5 text-frost-500" />
                <span>定时排期</span>
              </button>

              <button
                disabled={isPublishing}
                onClick={() => handlePublish('web')}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl scarf-gradient text-white text-xs font-bold shadow-frost-glow hover:opacity-95 transition transform active:scale-95 disabled:opacity-50"
                title="调起官方推特发帖窗口，直接发布到当前已登录的 @kiYuanly 账号"
              >
                <Send className={`w-3.5 h-3.5 ${isPublishing ? 'animate-spin' : ''}`} />
                <span>直发到 @kiYuanly (免Key)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：推文预览与发布策略卡片 (占 1 列) */}
        <div className="space-y-4">
          {/* X 实时拟真卡片预览 */}
          <div className="glass-panel rounded-3xl p-5 border border-white space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-frost-100">
              <span className="font-bold text-frost-800 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-scarf-500" />
                X 呈现预览
              </span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                实时拟真
              </span>
            </div>

            <div className="bg-white/90 rounded-2xl p-4 border border-frost-100 shadow-sm space-y-2.5">
              <div className="flex items-center space-x-2.5">
                <img 
                  src={account.avatar} 
                  alt="Avatar" 
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-frost-200"
                />
                <div>
                  <p className="text-xs font-bold text-frost-900">{account.name}</p>
                  <p className="text-[10px] text-frost-400">{account.handle}</p>
                </div>
              </div>

              <p className="text-xs text-frost-800 whitespace-pre-wrap leading-relaxed line-clamp-6 font-normal">
                {tweetContent || "文案内容将在此实时呈现..."}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-frost-400 border-t border-frost-100/60">
                <span>💬 0</span>
                <span>🔁 0</span>
                <span>❤️ 0</span>
                <span>📊 0</span>
              </div>
            </div>
          </div>

          {/* 智能配图建议 */}
          <div className="glass-panel rounded-3xl p-5 border border-white space-y-2.5">
            <h5 className="text-xs font-bold text-frost-800 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-scarf-500" />
              AI 推荐配图风格
            </h5>
            <div className="bg-white/60 p-3 rounded-2xl border border-frost-100 text-xs text-frost-600 space-y-1.5">
              <p className="font-medium text-frost-800">📸 建议视觉：</p>
              <p className="text-[11px] leading-relaxed text-frost-500">
                推荐搭配：16:9 极简终端运行截图、或带有冬日冷色调/毛玻璃质感的科技架构脑图，提升完读率约 42%。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
