import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Sparkles, 
  Send, 
  Check, 
  CornerDownRight, 
  ShieldCheck, 
  UserCheck, 
  HelpCircle,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';

export default function RepliesTracker({ replies, onSendReply }) {
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [customDrafts, setCustomDrafts] = useState({});
  const [sentReplies, setSentReplies] = useState({});

  const handleSelectSuggestion = (replyId, text) => {
    setCustomDrafts(prev => ({
      ...prev,
      [replyId]: text
    }));
    setActiveReplyId(replyId);
  };

  const handleSend = (replyId) => {
    const text = customDrafts[replyId];
    if (!text || !text.trim()) return;

    setSentReplies(prev => ({ ...prev, [replyId]: true }));
    onSendReply(replyId, text);

    setTimeout(() => {
      // 保持已发送状态
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* 顶部互动统计 */}
      <div className="glass-panel rounded-3xl p-6 border border-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-frost">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-scarf-100 flex items-center justify-center text-scarf-600">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-frost-900">推文互动雷达 · 谁回复了我</h3>
            <p className="text-xs text-frost-500">实时捕捉回复、分析互动者身份、AI 自动拟定高情商互动回复</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="px-3 py-1 rounded-xl bg-white/80 border border-frost-200 text-frost-600 font-medium">
            待处理互动: <strong className="text-scarf-600 font-bold ml-1">{replies.length - Object.keys(sentReplies).length}</strong>
          </span>
          <span className="px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium">
            AI 辅助率: 100%
          </span>
        </div>
      </div>

      {/* 回复卡片列表 */}
      <div className="space-y-5">
        {replies.map((item) => {
          const isSent = !!sentReplies[item.id];
          const currentDraft = customDrafts[item.id] || '';

          return (
            <div 
              key={item.id}
              className={`glass-panel rounded-3xl p-5 border transition-all duration-300 shadow-sm space-y-4 ${
                isSent ? 'border-emerald-200 bg-emerald-50/20' : 'border-white hover:border-scarf-200'
              }`}
            >
              {/* 原推文微缩上下文 */}
              <div className="bg-frost-100/70 px-3 py-1.5 rounded-xl text-[11px] text-frost-500 flex items-center gap-1.5">
                <CornerDownRight className="w-3 h-3 text-frost-400" />
                <span>针对你的推文：</span>
                <span className="text-frost-700 font-medium truncate max-w-md">{item.tweetSnippet}</span>
              </div>

              {/* 回复者信息与内容 */}
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <img 
                    src={item.user.avatar} 
                    alt={item.user.name} 
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm font-bold text-frost-900">{item.user.name}</span>
                      <span className="text-xs text-frost-400">{item.user.handle}</span>
                      {item.user.tag && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-scarf-50 text-scarf-600 border border-scarf-200/50 font-medium">
                          {item.user.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-frost-400 mt-0.5">
                      <span>粉丝: {item.user.followers.toLocaleString()}</span>
                      <span>·</span>
                      <span>{item.timeAgo}</span>
                    </div>
                  </div>
                </div>

                {/* 情绪 / 意向分析标签 */}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-white/80 border border-frost-200/80 text-frost-700 shadow-sm">
                  {item.sentiment}
                </span>
              </div>

              {/* 回复的正文 */}
              <p className="text-sm text-frost-800 leading-relaxed pl-13 font-normal">
                {item.content}
              </p>

              {/* AI 智能回复建议推荐 */}
              {!isSent && (
                <div className="pt-2 border-t border-frost-100/80 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs text-frost-500 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-scarf-500" />
                    <span>AI 推荐回复选项（点击直接应用）：</span>
                  </div>

                  <div className="space-y-1.5">
                    {item.aiReplySuggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSuggestion(item.id, sug)}
                        className="w-full text-left p-2.5 rounded-xl bg-white/70 hover:bg-white border border-frost-100 hover:border-scarf-300 transition text-xs text-frost-700 hover:text-frost-900 flex items-center justify-between group shadow-sm"
                      >
                        <span className="line-clamp-1">{sug}</span>
                        <span className="text-[10px] text-scarf-600 opacity-0 group-hover:opacity-100 font-semibold ml-2 flex-shrink-0 transition">
                          采纳此回复 ↵
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 回复输入框与发送 */}
              {isSent ? (
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Check className="w-4 h-4 text-emerald-600" />
                    已通过 X 成功回复："{currentDraft}"
                  </span>
                  <span className="text-[11px] text-emerald-600">已同步至 X 时间线</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="text"
                    value={currentDraft}
                    onChange={(e) => setCustomDrafts({ ...customDrafts, [item.id]: e.target.value })}
                    placeholder="输入或点击上方 AI 建议快速拟定回复..."
                    className="flex-1 px-4 py-2 rounded-2xl bg-white/80 border border-frost-200 text-xs text-frost-800 placeholder-frost-400 focus:outline-none focus:border-scarf-400 focus:bg-white transition shadow-sm"
                  />
                  <button
                    disabled={!currentDraft.trim()}
                    onClick={() => handleSend(item.id)}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl scarf-gradient text-white text-xs font-semibold shadow-sm hover:shadow-frost-glow transition transform active:scale-95 disabled:opacity-40"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>发送回复</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
