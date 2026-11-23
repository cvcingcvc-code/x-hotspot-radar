import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MessageSquare, 
  Clock, 
  Sparkles,
  ArrowUpRight,
  Flame
} from 'lucide-react';

export default function AnalyticsDashboard({ account, analytics }) {
  const maxImpression = Math.max(...analytics.dailyImpressions.map(d => d.value));

  return (
    <div className="space-y-6">
      {/* 4 维核心数据大卡 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-3xl p-5 border border-white space-y-2 shadow-frost hover:shadow-glass-hover transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-frost-500">30天总曝光</span>
            <span className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600">
              <Eye className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-black text-frost-900 tracking-tight">{account.monthlyImpressions}</h3>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +24.8%
            </span>
          </div>
          <p className="text-[11px] text-frost-400">平均单推曝光 28.4K</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white space-y-2 shadow-frost hover:shadow-glass-hover transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-frost-500">粉丝总数</span>
            <span className="w-8 h-8 rounded-xl bg-scarf-50 flex items-center justify-center text-scarf-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-black text-frost-900 tracking-tight">{account.followersCount.toLocaleString()}</h3>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +735
            </span>
          </div>
          <p className="text-[11px] text-frost-400">本周净增 +5.2%</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white space-y-2 shadow-frost hover:shadow-glass-hover transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-frost-500">全量互动率</span>
            <span className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Flame className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-black text-frost-900 tracking-tight">{account.engagementRate}</h3>
            <span className="text-xs font-bold text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +0.9%
            </span>
          </div>
          <p className="text-[11px] text-frost-400">行业基准值 1.8% (超常)</p>
        </div>

        <div className="glass-panel rounded-3xl p-5 border border-white space-y-2 shadow-frost hover:shadow-glass-hover transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-frost-500">已发布推文</span>
            <span className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-black text-frost-900 tracking-tight">{account.tweetsCount}</h3>
            <span className="text-xs font-medium text-frost-500">篇</span>
          </div>
          <p className="text-[11px] text-frost-400">本月新增发布 38 篇</p>
        </div>
      </div>

      {/* 曝光走势柱状图与黄金时段 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 近 7 天曝光柱状图 (占 2 列) */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-white space-y-4 shadow-frost">
          <div className="flex items-center justify-between pb-2 border-b border-frost-100">
            <div>
              <h4 className="text-sm font-bold text-frost-900">近 7 天曝光量动态走势</h4>
              <p className="text-xs text-frost-400 mt-0.5">配合热点追踪与智能标签优化后的流量飞跃</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-scarf-50 text-scarf-600 border border-scarf-200/60">
              峰值 89.6K (11/21)
            </span>
          </div>

          {/* 柱状可视化 */}
          <div className="pt-4 flex items-end justify-between h-52 px-2 gap-3">
            {analytics.dailyImpressions.map((item, idx) => {
              const heightPercent = Math.max(14, Math.round((item.value / maxImpression) * 100));
              const isPeak = item.value === maxImpression;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] font-bold text-frost-600 opacity-0 group-hover:opacity-100 transition">
                    {(item.value / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full max-w-[42px] bg-frost-200/60 rounded-2xl overflow-hidden p-0.5 flex flex-col justify-end h-full">
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-xl transition-all duration-500 ${
                        isPeak 
                          ? 'scarf-gradient shadow-frost-glow' 
                          : 'bg-frost-400/80 group-hover:bg-scarf-400'
                      }`}
                    />
                  </div>
                  <span className={`text-[11px] font-semibold ${isPeak ? 'text-scarf-600' : 'text-frost-500'}`}>
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 黄金发帖时间窗口推荐 (占 1 列) */}
        <div className="glass-panel rounded-3xl p-6 border border-white space-y-3.5 shadow-frost">
          <div className="flex items-center space-x-2 pb-2 border-b border-frost-100">
            <Clock className="w-4 h-4 text-scarf-500" />
            <h4 className="text-sm font-bold text-frost-900">AI 最佳发帖时段推荐</h4>
          </div>

          <div className="space-y-2.5">
            {analytics.bestTimeSlots.map((slot, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-2xl border transition ${
                  slot.score >= 90 
                    ? 'bg-scarf-50/70 border-scarf-200 shadow-sm' 
                    : 'bg-white/50 border-frost-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-frost-900">{slot.slot}</span>
                  <span className={`font-extrabold ${slot.score >= 90 ? 'text-scarf-600' : 'text-frost-500'}`}>
                    {slot.score}分
                  </span>
                </div>
                <p className="text-[11px] text-frost-500 mt-1 leading-snug">
                  {slot.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
