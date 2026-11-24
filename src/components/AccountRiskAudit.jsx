import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  RefreshCw, 
  Sparkles, 
  Zap, 
  ExternalLink,
  BookOpen,
  ArrowRight,
  TrendingUp,
  FileText,
  Lock
} from 'lucide-react';
import { auditAccountRisk, X_ALGORITHM_RULES } from '../utils/xAlgorithmEngine';
import { sanitizeHandle } from '../utils/accountEngine';

export default function AccountRiskAudit({ currentAccount }) {
  const [handleInput, setHandleInput] = useState(currentAccount?.handle || '@kiYuanly');
  const [isScanning, setIsScanning] = useState(false);
  const [auditReport, setAuditReport] = useState(() => auditAccountRisk(currentAccount?.handle, currentAccount));

  const handleStartScan = (e) => {
    e.preventDefault();
    if (!handleInput.trim()) return;
    const clean = sanitizeHandle(handleInput);
    setHandleInput(clean);
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setAuditReport(auditAccountRisk(clean, currentAccount));
    }, 900);
  };

  return (
    <div className="space-y-6">
      {/* 顶部输入与扫描操作横幅 */}
      <div className="glass-panel rounded-3xl p-6 relative overflow-hidden shadow-frost border border-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              人人可用的 X 账号风控与限流（Shadowban）体检引擎
            </div>
            <h3 className="text-xl font-bold text-frost-900">
              全面体检账号健康分，排查隐形降权与流量锁死风险 🛡️
            </h3>
            <p className="text-xs text-frost-500">
              接入 X 官方开源推荐算法规则与风控模式，全方位检测搜索可见度、回复幽灵化与外链降权。
            </p>
          </div>

          {/* 实时体检输入表单 */}
          <form onSubmit={handleStartScan} className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-frost-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                maxLength={30}
                value={handleInput}
                onChange={(e) => setHandleInput(e.target.value)}
                placeholder="@any_x_handle"
                className="pl-9 pr-4 py-2.5 rounded-2xl bg-white/80 border border-frost-200 text-xs text-frost-800 placeholder-frost-400 focus:outline-none focus:border-scarf-400 focus:bg-white shadow-sm w-44 sm:w-56 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl scarf-gradient text-white text-xs font-bold shadow-frost-glow hover:opacity-95 transition transform active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? '正在深度体检...' : '开始体检'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* 体检得分仪表板与核心诊断状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：总分大卡 */}
        <div className="glass-panel rounded-3xl p-6 border border-white flex flex-col justify-between shadow-frost relative overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-frost-400">体检账号目标</span>
              <span className="font-mono font-bold text-frost-700 bg-white/70 px-2 py-0.5 rounded-md border border-frost-100">
                {auditReport.handle}
              </span>
            </div>

            <div className="pt-4 text-center space-y-1">
              <div className="inline-flex items-baseline justify-center">
                <span className="text-6xl font-black text-frost-900 tracking-tight">
                  {auditReport.overallScore}
                </span>
                <span className="text-xl font-bold text-frost-400 ml-1">/ 100</span>
              </div>
              <p className="text-xs font-bold text-frost-600">综合健康指数</p>
            </div>
          </div>

          <div className="pt-4 border-t border-frost-100 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-frost-500 font-medium">当前风控评级</span>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border ${auditReport.badgeColor}`}>
                {auditReport.riskTier}
              </span>
            </div>
            <p className="text-[11px] text-frost-400 text-center">
              体检完成时间：{auditReport.scanTime} · 本地算法离线校验
            </p>
          </div>
        </div>

        {/* 右侧：5大维度检测清单 (占 2 列) */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-white space-y-3.5 shadow-frost">
          <div className="flex items-center justify-between pb-2 border-b border-frost-100">
            <h4 className="text-sm font-bold text-frost-900 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-scarf-500" />
              5 大核心风控维度逐项排查
            </h4>
            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
              无幽灵化隐患
            </span>
          </div>

          <div className="space-y-2.5">
            {auditReport.dimensions.map((dim, idx) => (
              <div 
                key={idx}
                className="bg-white/60 p-3 rounded-2xl border border-frost-100/90 hover:border-scarf-200 transition text-xs space-y-1 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-frost-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    {dim.name}
                  </span>
                  <span className="font-semibold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[11px]">
                    {dim.status}
                  </span>
                </div>
                <p className="text-[11px] text-frost-500 pl-5 leading-relaxed">
                  {dim.tip}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 针对该账号的提权与破局行动方案 */}
      <div className="glass-panel rounded-3xl p-6 border border-white space-y-3.5 shadow-frost">
        <div className="flex items-center space-x-2 pb-2 border-b border-frost-100">
          <Sparkles className="w-4 h-4 text-scarf-500" />
          <h4 className="text-sm font-bold text-frost-900">
            AI 算法提权与避免限流实操指南（建议立即执行）
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {auditReport.actionPlan.map((plan, idx) => (
            <div 
              key={idx}
              className="bg-white/70 p-3.5 rounded-2xl border border-frost-100 flex items-start space-x-2.5 shadow-sm"
            >
              <span className="w-5 h-5 rounded-full scarf-gradient text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-frost-700 leading-relaxed font-normal">
                {plan}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 底部附注：X 官方推荐算法权重与准则速查表 */}
      <div className="glass-panel rounded-3xl p-6 border border-white space-y-4 shadow-frost">
        <div className="flex items-center justify-between pb-2 border-b border-frost-100">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-scarf-500" />
            <h4 className="text-sm font-bold text-frost-900">X 官方推荐算法核心权重参考准则 (Playbook)</h4>
          </div>
          <span className="text-xs text-frost-400">公开开源推荐引擎比对</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {X_ALGORITHM_RULES.map((rule, idx) => (
            <div 
              key={idx}
              className="bg-white/60 p-3.5 rounded-2xl border border-frost-100 space-y-1.5 shadow-sm hover:border-scarf-200 transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-frost-900">{rule.action}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  rule.weight.includes('-') 
                    ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  {rule.weight}
                </span>
              </div>
              <p className="text-[11px] text-frost-500 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
