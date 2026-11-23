import React, { useState } from 'react';
import { 
  Tags, 
  Sparkles, 
  Eye, 
  Heart, 
  Repeat, 
  MessageSquare, 
  Bookmark, 
  TrendingUp,
  BrainCircuit,
  Filter
} from 'lucide-react';

export default function SmartTaggingView({ tweets, analytics }) {
  const [selectedTagFilter, setSelectedTagFilter] = useState('全部');

  const allTags = ['全部', ...Array.from(new Set(tweets.flatMap(t => t.tags)))];

  const filteredTweets = tweets.filter(t => {
    if (selectedTagFilter === '全部') return true;
    return t.tags.includes(selectedTagFilter);
  });

  return (
    <div className="space-y-6">
      {/* 顶部标签 ROI 表现透视网格 */}
      <div className="glass-panel rounded-3xl p-6 border border-white space-y-4 shadow-frost">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-xl bg-scarf-100 flex items-center justify-center text-scarf-600">
              <BrainCircuit className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-frost-900">推文智能打标与主题 ROI 洞察</h3>
              <p className="text-xs text-frost-500">AI 自动为每条推文提取主题意图，并量化不同内容标签的吸粉与互动效率</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            已打标 {tweets.length} 条推文
          </span>
        </div>

        {/* 标签效果横向柱状展示 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {analytics.tagPerformance.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white/60 p-3.5 rounded-2xl border border-frost-100 hover:border-scarf-300 transition shadow-sm space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-scarf-600">{item.tag}</span>
                <span className="text-[10px] text-frost-400 font-medium">{item.count} 篇</span>
              </div>
              <p className="text-lg font-extrabold text-frost-900">
                {(item.avgImpressions / 1000).toFixed(1)}k
                <span className="text-[10px] font-normal text-frost-500 ml-1">均曝光</span>
              </p>
              <div className="flex items-center justify-between text-[11px] text-frost-500 pt-1 border-t border-frost-100/60">
                <span>均赞 {item.avgLikes}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  高效
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 标签过滤选择器 */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-xs text-frost-400 flex items-center gap-1 font-medium mr-1">
          <Filter className="w-3.5 h-3.5" />
          标签筛选:
        </span>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTagFilter(tag)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
              selectedTagFilter === tag
                ? 'scarf-gradient text-white shadow-sm'
                : 'glass-card text-frost-600 hover:text-frost-900'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 推文打标记录信息流 */}
      <div className="space-y-4">
        {filteredTweets.map((tweet) => (
          <div 
            key={tweet.id}
            className="glass-panel rounded-3xl p-5 border border-white hover:border-scarf-200 transition shadow-sm space-y-4"
          >
            {/* 顶部打标与发布信息 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-frost-100">
              <div className="flex flex-wrap items-center gap-1.5">
                {tweet.tags.map((tag, i) => (
                  <span 
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-scarf-50 text-scarf-600 border border-scarf-200/60"
                  >
                    {tag}
                  </span>
                ))}
                <span className="text-[11px] text-frost-500 bg-frost-100 px-2 py-0.5 rounded-lg">
                  {tweet.category}
                </span>
              </div>

              <span className="text-xs text-frost-400 font-medium">
                {tweet.publishedAt}
              </span>
            </div>

            {/* 推文内容 */}
            <p className="text-sm text-frost-900 leading-relaxed font-normal whitespace-pre-wrap">
              {tweet.content}
            </p>

            {/* AI 智能归因与打标理由 */}
            <div className="bg-white/50 p-3 rounded-2xl border border-frost-100/80 flex items-start space-x-2.5 text-xs text-frost-600">
              <Sparkles className="w-4 h-4 text-scarf-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-frost-800">AI 智能打标与爆款归因：</span>
                <span className="text-frost-600 ml-1">{tweet.aiTagReason}</span>
              </div>
            </div>

            {/* 底部数据指标卡片 */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-frost-600 border-t border-frost-100/60">
              <div className="flex items-center space-x-4">
                <span className="flex items-center gap-1 font-semibold text-frost-800">
                  <Eye className="w-3.5 h-3.5 text-sky-500" />
                  {tweet.stats.impressions.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 font-semibold text-rose-600">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  {tweet.stats.likes.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                  <Repeat className="w-3.5 h-3.5" />
                  {tweet.stats.retweets.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 font-semibold text-indigo-600">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {tweet.stats.replies.toLocaleString()}
                </span>
                <span className="flex items-center gap-1 font-semibold text-amber-600">
                  <Bookmark className="w-3.5 h-3.5" />
                  {tweet.stats.bookmarks.toLocaleString()}
                </span>
              </div>

              <div className="text-xs font-bold text-scarf-600 bg-scarf-50 px-2.5 py-1 rounded-xl border border-scarf-100">
                互动率 {tweet.stats.engagementRate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
