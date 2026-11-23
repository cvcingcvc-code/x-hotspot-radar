import React from 'react';
import { 
  Flame, 
  PenTool, 
  Tags, 
  MessageSquareHeart, 
  BarChart3, 
  Settings, 
  Snowflake, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  account, 
  allAccounts = [],
  onSwitchAccount,
  onOpenWizard,
  snowEnabled, 
  setSnowEnabled,
  unreadRepliesCount = 4,
  onOpenSettings
}) {
  const [showAccountDropdown, setShowAccountDropdown] = React.useState(false);

  const navItems = [
    { id: 'radar', name: '智能热点雷达', icon: Flame, badge: '实时热度' },
    { id: 'studio', name: '文案工坊 / 拟稿', icon: PenTool, badge: 'AI裂变' },
    { id: 'tagging', name: '推文智能打标', icon: Tags, badge: null },
    { id: 'replies', name: '谁回复了我', icon: MessageSquareHeart, badge: unreadRepliesCount > 0 ? `${unreadRepliesCount}条新互动` : null },
    { id: 'analytics', name: '账号数据看板', icon: BarChart3, badge: null },
  ];

  return (
    <aside className="w-72 flex-shrink-0 flex flex-col h-screen sticky top-0 z-30 select-none p-4">
      {/* 毛玻璃主体容器 */}
      <div className="glass-panel flex-1 rounded-3xl p-5 flex flex-col justify-between overflow-hidden relative shadow-frost border border-white/80">
        {/* 背景微光光晕 */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-scarf-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-16 w-32 h-32 bg-sky-200/30 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          {/* Logo 区域 */}
          <div className="flex items-center justify-between pb-3 border-b border-frost-200/60">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl scarf-gradient flex items-center justify-center text-white shadow-frost-glow">
                <Snowflake className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-frost-900 tracking-tight flex items-center gap-1.5">
                  FuyuPulse <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-scarf-100 text-scarf-600 border border-scarf-200">v1.0</span>
                </h1>
                <p className="text-xs text-frost-400">冬雪脉冲 · X 智能运营枢纽</p>
              </div>
            </div>
          </div>

          {/* 账号选择与多用户切换器 */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-frost-400 font-semibold text-[11px] uppercase tracking-wider">当前内容工作台</span>
              <button
                onClick={onOpenWizard}
                className="text-[11px] font-bold text-scarf-600 hover:text-scarf-700 transition flex items-center gap-1 hover:underline"
                title="接入属于你自己的 X 账号"
              >
                + 接入新账号
              </button>
            </div>

            {/* 账号卡片主体 */}
            <div className="relative group rounded-2xl border border-white/70 bg-white/40 p-3.5 backdrop-blur-md shadow-sm transition hover:bg-white/70">
              <div className="flex items-center space-x-3">
                <a 
                  href={account.url || `https://x.com/${account.handle.replace('@', '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="relative block group-hover:scale-105 transition"
                  title="点击在新窗口打开 X 主页"
                >
                  <img 
                    src={account.avatar} 
                    alt="Avatar" 
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-sm"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full ring-1 ring-white" title="在线" />
                </a>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-frost-900 truncate">{account.name}</p>
                    {allAccounts.length > 1 && (
                      <button
                        onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-frost-200/70 hover:bg-frost-200 text-frost-600 font-medium transition"
                        title="切换账号"
                      >
                        切换
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-frost-400 truncate">{account.handle}</p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>独立内容台已就绪</span>
                  </div>
                </div>
              </div>

              {/* 多账号下拉切换列表 */}
              {showAccountDropdown && (
                <div className="mt-3 pt-2.5 border-t border-frost-200/80 space-y-1">
                  <p className="text-[10px] text-frost-400 font-semibold px-1">点击切换工作台：</p>
                  {allAccounts.map(acc => (
                    <button
                      key={acc.id}
                      onClick={() => {
                        onSwitchAccount(acc.id);
                        setShowAccountDropdown(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition ${
                        acc.id === account.id 
                          ? 'bg-scarf-100 text-scarf-800 font-bold' 
                          : 'hover:bg-white/70 text-frost-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <img src={acc.avatar} className="w-6 h-6 rounded-lg object-cover" />
                        <span className="truncate">{acc.name} ({acc.handle})</span>
                      </div>
                      {acc.id === account.id && <span className="text-[10px]">当前</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* 定位标签展示 */}
              <div className="mt-2.5 pt-2 border-t border-frost-100/60 flex flex-wrap gap-1">
                {account.targetNiche.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="text-[10px] px-1.5 py-0.5 rounded-md bg-frost-100/90 text-frost-600 font-medium border border-frost-200/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 导航栏列表 */}
          <nav className="space-y-1.5">
            <div className="px-2 text-[11px] font-semibold text-frost-400 uppercase tracking-wider">
              功能导航
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'scarf-gradient text-white shadow-frost-glow'
                      : 'text-frost-600 hover:text-frost-900 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-frost-400 group-hover:text-scarf-500'
                    }`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-scarf-100 text-scarf-600 border border-scarf-200/50'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 底部功能区：雪花特效控制 & 设置 */}
        <div className="space-y-2 pt-4 border-t border-frost-200/60 relative z-10">
          <div className="flex items-center justify-between px-2 py-1 text-xs text-frost-500">
            <span className="flex items-center gap-1.5 font-medium">
              <Snowflake className="w-3.5 h-3.5 text-scarf-500" />
              飘雪背景动效
            </span>
            <button
              onClick={() => setSnowEnabled(!snowEnabled)}
              className={`w-9 h-5 rounded-full p-0.5 transition duration-200 flex items-center ${
                snowEnabled ? 'bg-scarf-500 justify-end' : 'bg-frost-300 justify-start'
              }`}
              title="切换雪花动效"
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          <button
            onClick={onOpenSettings}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-frost-600 hover:text-frost-900 hover:bg-white/60 transition group font-medium"
          >
            <div className="flex items-center space-x-3">
              <Settings className="w-4 h-4 text-frost-400 group-hover:text-scarf-500 group-hover:rotate-45 transition-transform" />
              <span>X 账号与接口设置</span>
            </div>
            <span className="text-[10px] text-frost-400">配置</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
