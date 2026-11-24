import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Key, 
  Check, 
  Sparkles, 
  ExternalLink,
  HelpCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { sanitizeHandle, sanitizeAccount } from '../utils/accountEngine';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  account, 
  onUpdateAccount 
}) {
  if (!isOpen) return null;

  const [authType, setAuthType] = useState(account?.authType || 'mock');
  const [apiKey, setApiKey] = useState(account?.apiKey || '');
  const [apiSecret, setApiSecret] = useState(account?.apiSecret || '');
  const [bearerToken, setBearerToken] = useState(account?.bearerToken || '');
  const [handle, setHandle] = useState(account?.handle || '@winter_dev_ai');
  const [name, setName] = useState(account?.name || 'WinterDev ❄️');
  const [niches, setNiches] = useState((account?.targetNiche || []).join(', '));
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const cleanNiches = niches
      .split(/[,，]/)
      .map(s => s.trim().slice(0, 30))
      .filter(Boolean);

    const updated = sanitizeAccount({
      ...account,
      authType,
      apiKey: apiKey.trim().slice(0, 128),
      apiSecret: apiSecret.trim().slice(0, 128),
      bearerToken: bearerToken.trim().slice(0, 256),
      handle: sanitizeHandle(handle),
      name: name.trim().slice(0, 40),
      targetNiche: cleanNiches.length > 0 ? cleanNiches : ['AI 科技', '一人创业']
    });

    onUpdateAccount(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 border border-white/90 shadow-2xl relative space-y-5">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-frost-200/60 text-frost-500 hover:text-frost-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 标题 */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl scarf-gradient flex items-center justify-center text-white shadow-frost-glow">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-frost-900">X 账号接入与偏好设置</h3>
            <p className="text-xs text-frost-500">配置 X Developer 官方接口或使用无门槛沙盒演示</p>
          </div>
        </div>

        {/* 模式切换 (沙盒 vs 真实 API) */}
        <div className="p-1 bg-frost-200/60 rounded-2xl flex items-center text-xs font-semibold">
          <button
            type="button"
            onClick={() => setAuthType('mock')}
            className={`flex-1 py-2 rounded-xl transition ${
              authType === 'mock' 
                ? 'bg-white text-frost-900 shadow-sm' 
                : 'text-frost-600 hover:text-frost-900'
            }`}
          >
            🌟 沙盒演示模式（免 API Key 极速体验）
          </button>
          <button
            type="button"
            onClick={() => setAuthType('api')}
            className={`flex-1 py-2 rounded-xl transition ${
              authType === 'api' 
                ? 'scarf-gradient text-white shadow-sm' 
                : 'text-frost-600 hover:text-frost-900'
            }`}
          >
            🔑 X Developer API 官方直连
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-frost-700 font-semibold mb-1">X 用户名 (Handle)</label>
              <input
                type="text"
                maxLength={40}
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@your_x_handle"
                className="w-full px-3.5 py-2 rounded-xl bg-white/80 border border-frost-200 focus:outline-none focus:border-scarf-400 text-frost-900"
              />
            </div>
            <div>
              <label className="block text-frost-700 font-semibold mb-1">展示昵称</label>
              <input
                type="text"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="你的昵称"
                className="w-full px-3.5 py-2 rounded-xl bg-white/80 border border-frost-200 focus:outline-none focus:border-scarf-400 text-frost-900"
              />
            </div>
          </div>

          {/* 定位与赛道 */}
          <div>
            <label className="block text-frost-700 font-semibold mb-1">
              账号关注定位 / 赛道标签 (逗号分隔)
            </label>
            <input
              type="text"
              maxLength={100}
              value={niches}
              onChange={(e) => setNiches(e.target.value)}
              placeholder="AI 科技, 独立开发, 前沿工具"
              className="w-full px-3.5 py-2 rounded-xl bg-white/80 border border-frost-200 focus:outline-none focus:border-scarf-400 text-frost-900"
            />
          </div>

          {/* 官方 API 凭据设置 */}
          {authType === 'api' ? (
            <div className="space-y-3 p-3.5 bg-frost-50 rounded-2xl border border-frost-200">
              <div className="flex items-center justify-between text-frost-600">
                <span className="font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-scarf-500" />
                  X API 凭据 (v2 Bearer Token)
                </span>
                <a 
                  href="https://developer.twitter.com/en/portal/dashboard" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-scarf-600 hover:underline flex items-center gap-0.5 text-[11px]"
                >
                  申请 Developer Key <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div>
                <label className="block text-frost-500 mb-0.5 text-[11px]">Bearer Token (读取分析/回复权限)</label>
                <input
                  type="password"
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  placeholder="AAAAAAAAAAAAAAAAAAAAA..."
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-frost-200 focus:outline-none focus:border-scarf-400 text-frost-900 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-frost-500 mb-0.5 text-[11px]">API Key</label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Consumer Key"
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-frost-200 focus:outline-none focus:border-scarf-400 text-frost-900 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-frost-500 mb-0.5 text-[11px]">API Secret</label>
                  <input
                    type="password"
                    value={apiSecret}
                    onChange={(e) => setApiSecret(e.target.value)}
                    placeholder="Consumer Secret"
                    className="w-full px-3 py-1.5 rounded-lg bg-white border border-frost-200 focus:outline-none focus:border-scarf-400 text-frost-900 font-mono"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-white/70 rounded-2xl border border-frost-200 text-frost-600 leading-relaxed text-[11px]">
              💡 <strong>沙盒模式说明</strong>：在此模式下，系统使用符合你“AI 科技 / 独立开发”定位的高拟真推文流、智能打标分析与回复监控，无需提供 API 凭证即可体验完整的智能搜索与自动化运营流程。随时可切换为真实 API 模式。
            </div>
          )}

          {/* 成功反馈 */}
          {saveSuccess && (
            <div className="p-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-center font-semibold flex items-center justify-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              配置已成功保存！
            </div>
          )}

          {/* 提交按钮 */}
          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-frost-200/70 hover:bg-frost-200 text-frost-700 font-medium transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl scarf-gradient text-white font-bold shadow-frost-glow hover:opacity-95 transition"
            >
              保存并应用
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
