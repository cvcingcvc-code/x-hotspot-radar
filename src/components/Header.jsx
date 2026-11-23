import React from 'react';
import { Sparkles, PenSquare, Radio, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Header({ 
  currentTab, 
  account, 
  onQuickPost, 
  onOpenSettings,
  onOpenWizard
}) {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'radar':
        return { title: '智能热点雷达', sub: '实时全网捕获，智能匹配 AI 科技与独立开发赛道爆款契机' };
      case 'studio':
        return { title: '文案工坊 & 发推', sub: '将热点一键转化为符合个人口吻的高赞 X 推文并直发' };
      case 'risk':
        return { title: 'X 账号风控与限流体检中心', sub: '人人可用：深度检测搜索可见度、回复幽灵化与 X 官方算法推荐准则' };
      case 'tagging':
        return { title: '推文智能打标与内容看板', sub: '历史推文自动标签化分类，透视最具吸引力的爆款话题' };
      case 'replies':
        return { title: '谁回复了我 · 互动追踪', sub: '实时监控最新回复、分析互动者身份、AI 辅助秒回' };
      case 'analytics':
        return { title: '账号数据分析看板', sub: '曝光量走势、互动转化率与最佳发帖时间窗口复盘' };
      default:
        return { title: 'FuyuPulse 枢纽', sub: 'X 自动化运营与热点创作中心' };
    }
  };

  const { title, sub } = getTabTitle();

  return (
    <header className="px-8 pt-6 pb-4 flex items-center justify-between select-none">
      <div>
        <div className="flex items-center space-x-3">
          <h2 className="text-2xl font-extrabold text-frost-900 tracking-tight">{title}</h2>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/70 border border-white text-xs font-semibold text-frost-600 shadow-sm backdrop-blur-md">
            <Radio className="w-3 h-3 text-scarf-500 animate-pulse" />
            热点引擎运转中
          </span>
        </div>
        <p className="text-xs text-frost-500 mt-1">{sub}</p>
      </div>

      <div className="flex items-center space-x-3">
        {/* 接入我自己的 X 账号按钮 */}
        <button
          onClick={onOpenWizard}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-white/80 hover:bg-white text-xs font-semibold text-scarf-700 border border-scarf-200 shadow-sm transition hover:shadow-frost-glow"
          title="输入你的 X 账号与定位，自动生成专属热点与文案台"
        >
          <Sparkles className="w-3.5 h-3.5 text-scarf-500" />
          <span>接入我的 X 账号</span>
        </button>

        {/* X 账号状态胶囊 */}
        <div className="flex items-center space-x-1">
          <a
            href={account.url || `https://x.com/${account.handle.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl glass-card text-xs font-medium text-frost-700 hover:border-scarf-300 transition"
            title="点击访问 X 个人主页"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-frost-800">{account.handle}</span>
            <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">当前台</span>
          </a>
        </div>

        {/* 快速发帖行动按钮 */}
        <button
          onClick={onQuickPost}
          className="flex items-center space-x-2 px-4 py-2 rounded-2xl scarf-gradient text-white text-xs font-bold shadow-frost-glow hover:opacity-95 transition transform active:scale-95"
        >
          <PenSquare className="w-4 h-4" />
          <span>快速拟稿发推</span>
        </button>
      </div>
    </header>
  );
}
