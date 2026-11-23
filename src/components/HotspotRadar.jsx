import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Search, 
  RefreshCw, 
  Compass, 
  CheckCircle,
  TrendingUp,
  Filter
} from 'lucide-react';

export default function HotspotRadar({ hotspots, onSelectHotspotForStudio }) {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = ['全部', 'AI 与一人创业', 'X与小红书打法', '产品踩坑与复盘'];

  const filteredHotspots = hotspots.filter(item => {
    const matchesCat = selectedCategory === '全部' || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* 顶部赛道雷达公告牌 (极美冬雪磨砂横幅) */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden shadow-frost border border-white">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-scarf-100/50 to-transparent pointer-events-none" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-scarf-50 text-scarf-600 text-xs font-semibold border border-scarf-200/60">
              <Sparkles className="w-3.5 h-3.5 text-scarf-500" />
              当前监听定位：小北专属 · AI与一人创业 · 踩坑复盘 · 跨平台搞钱
            </div>
            <h3 className="text-xl font-bold text-frost-900">
              今日热点风向：当代年轻人换道自救，微型出海与个人 IP 破局 ❄️
            </h3>
            <p className="text-xs text-frost-500 leading-relaxed">
              系统已根据 @kiYuanly 的真实定位与近期推文风格加权筛选。契合度 90%+ 的热点已置顶，可一键提取接地气的观点转化为高赞推文并秒发至 X。
            </p>
          </div>

          <div className="hidden lg:flex items-center space-x-6 bg-white/60 p-4 rounded-2xl border border-white/80 backdrop-blur-md">
            <div className="text-center">
              <p className="text-xs text-frost-400 font-medium">全网监听源</p>
              <p className="text-xl font-extrabold text-frost-900 mt-0.5">18 个</p>
            </div>
            <div className="w-px h-8 bg-frost-200" />
            <div className="text-center">
              <p className="text-xs text-frost-400 font-medium">高潜契合热点</p>
              <p className="text-xl font-extrabold text-scarf-600 mt-0.5">{hotspots.length} 条</p>
            </div>
            <div className="w-px h-8 bg-frost-200" />
            <div className="text-center">
              <p className="text-xs text-frost-400 font-medium">平均爆款指数</p>
              <p className="text-xl font-extrabold text-emerald-600 mt-0.5">91%</p>
            </div>
          </div>
        </div>
      </div>

      {/* 过滤与搜索控制栏 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'scarf-gradient text-white shadow-frost-glow'
                  : 'glass-card text-frost-600 hover:text-frost-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-frost-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索热点关键词..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white/70 border border-white text-xs text-frost-800 placeholder-frost-400 focus:outline-none focus:border-scarf-400 focus:bg-white transition shadow-sm"
            />
          </div>

          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-2xl glass-card text-frost-600 hover:text-scarf-600 transition"
            title="刷新热点"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-scarf-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* 热点卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredHotspots.map((item) => (
          <div 
            key={item.id}
            className="glass-panel rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-glass-hover hover:-translate-y-1 border border-white group"
          >
            <div className="space-y-3">
              {/* 顶部标签与指数 */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded-xl bg-frost-100 text-frost-700 font-medium border border-frost-200/50">
                  {item.category} · {item.source}
                </span>

                <div className="flex items-center space-x-2">
                  <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                    <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                    热度 {item.heatScore}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-scarf-600 bg-scarf-50 px-2 py-0.5 rounded-lg border border-scarf-200/60">
                    <TrendingUp className="w-3 h-3" />
                    契合度 {item.relevanceScore}%
                  </span>
                </div>
              </div>

              {/* 标题与摘要 */}
              <div>
                <h4 className="text-base font-bold text-frost-900 group-hover:text-scarf-600 transition leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-frost-500 mt-2 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* AI 提炼切入点 */}
              <div className="pt-2 border-t border-frost-100/80">
                <p className="text-[11px] font-semibold text-frost-400 mb-1.5 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-scarf-500" />
                  AI 推荐切入角度：
                </p>
                <div className="space-y-1">
                  {item.keyAngles.slice(0, 2).map((angle, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-frost-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-scarf-400 mt-1.5 flex-shrink-0" />
                      <span className="leading-tight">{angle}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 底部行动条 */}
            <div className="mt-5 pt-3 border-t border-frost-100 flex items-center justify-between">
              <span className="text-[11px] text-frost-400">{item.publishedAt}</span>
              <button
                onClick={() => onSelectHotspotForStudio(item)}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl scarf-gradient text-white text-xs font-semibold shadow-sm hover:shadow-frost-glow transition transform active:scale-95"
              >
                <span>生成爆款文案</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
