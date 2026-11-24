import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  PlusCircle, 
  Check, 
  UserPlus, 
  Globe, 
  ShieldCheck, 
  Target,
  MessageSquare
} from 'lucide-react';
import { sanitizeHandle, sanitizeSafeUrl, sanitizeAccount } from '../utils/accountEngine';

const SUGGESTED_NICHES = [
  "AI 与一人创业",
  "独立出海产品",
  "年轻人出路探索",
  "X与小红书打法",
  "前沿工具评测",
  "数字游民生活",
  "商业与投资认知",
  "程序员效率提升"
];

const SUGGESTED_TONES = [
  "真诚接地气、反精英包装、敢于暴露踩坑",
  "极客敏锐、深度干货、代码与架构细节",
  "犀利锐评、直击痛点、金句反思",
  "温情治愈、烟火气日常、随笔思考"
];

export default function AccountWizardModal({ 
  isOpen, 
  onClose, 
  onCreateAccount 
}) {
  if (!isOpen) return null;

  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [selectedNiches, setSelectedNiches] = useState(["AI 与一人创业", "前沿工具评测"]);
  const [customNicheInput, setCustomNicheInput] = useState('');
  const [selectedTone, setSelectedTone] = useState(SUGGESTED_TONES[0]);

  // 处理添加自定义赛道
  const handleAddCustomNiche = () => {
    const val = customNicheInput.trim();
    if (val && !selectedNiches.includes(val)) {
      setSelectedNiches([...selectedNiches, val]);
      setCustomNicheInput('');
    }
  };

  // 切换已有赛道
  const toggleNiche = (niche) => {
    if (selectedNiches.includes(niche)) {
      if (selectedNiches.length > 1) {
        setSelectedNiches(selectedNiches.filter(n => n !== niche));
      }
    } else {
      setSelectedNiches([...selectedNiches, niche]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanHandle = sanitizeHandle(handle);
    const pureHandle = cleanHandle.replace(/^@/, '');
    const cleanName = (name.trim() || pureHandle).slice(0, 40);
    const safeAvatar = sanitizeSafeUrl(avatarUrl, '/assets/winter-anime-hero.jpg');

    const rawAccount = {
      id: `acc-${Date.now()}`,
      name: cleanName,
      handle: cleanHandle,
      url: `https://x.com/${pureHandle}`,
      avatar: safeAvatar,
      bio: (bio.trim() || `记录在 ${selectedNiches.join('、')} 赛道的探索与思考`).slice(0, 200),
      location: 'Online',
      joinedDate: '刚刚加入',
      followersCount: 100,
      followingCount: 150,
      tweetsCount: 0,
      monthlyImpressions: '1.2K',
      engagementRate: '5.0%',
      authType: 'real_linked',
      targetNiche: selectedNiches,
      toneStyle: selectedTone,
    };

    const finalAccount = sanitizeAccount(rawAccount);
    onCreateAccount(finalAccount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 border border-white/90 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-frost-200/60 text-frost-500 hover:text-frost-900 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 头部标题 */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl scarf-gradient flex items-center justify-center text-white shadow-frost-glow">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-frost-900">接入你的 X 账号，开启专属内容台</h3>
            <p className="text-xs text-frost-500">输入任意 X 主页，系统将根据你的定位自动生成热点雷达与爆款文案</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Handle 与 昵称 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-frost-700 font-semibold mb-1">
                你的 X 用户名或主页链接 <span className="text-scarf-600">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={40}
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@your_handle 或 https://x.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-white/80 border border-frost-200 focus:outline-none focus:border-scarf-400 text-frost-900 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-frost-700 font-semibold mb-1">展示昵称</label>
              <input
                type="text"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例如：阿杰、Emily"
                className="w-full px-3.5 py-2 rounded-xl bg-white/80 border border-frost-200 focus:outline-none focus:border-scarf-400 text-frost-900 shadow-sm"
              />
            </div>
          </div>

          {/* 定位赛道选择 (标签网格) */}
          <div className="space-y-1.5">
            <label className="block text-frost-700 font-semibold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-scarf-500" />
                选择你的关注定位与赛道（可多选）
              </span>
              <span className="text-[11px] text-frost-400 font-normal">已选 {selectedNiches.length} 个</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_NICHES.map(niche => {
                const isSelected = selectedNiches.includes(niche);
                return (
                  <button
                    key={niche}
                    type="button"
                    onClick={() => toggleNiche(niche)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                      isSelected
                        ? 'scarf-gradient text-white shadow-sm'
                        : 'bg-white/80 text-frost-700 border border-frost-200 hover:border-scarf-300'
                    }`}
                  >
                    {niche} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>

            {/* 自定义赛道输入 */}
            <div className="flex items-center space-x-2 pt-1.5">
              <input
                type="text"
                maxLength={25}
                value={customNicheInput}
                onChange={(e) => setCustomNicheInput(e.target.value)}
                placeholder="添加自定义赛道（如：跨境电商、摄影器材）"
                className="flex-1 px-3 py-1.5 rounded-xl bg-white/80 border border-frost-200 text-xs text-frost-800 placeholder-frost-400 focus:outline-none focus:border-scarf-400 shadow-sm"
              />
              <button
                type="button"
                onClick={handleAddCustomNiche}
                className="px-3 py-1.5 rounded-xl bg-frost-200 hover:bg-frost-300 text-frost-800 font-semibold transition"
              >
                + 添加
              </button>
            </div>
          </div>

          {/* 人设说话口吻 */}
          <div className="space-y-1.5">
            <label className="block text-frost-700 font-semibold flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-scarf-500" />
              人设与发推风格偏好
            </label>
            <div className="space-y-1.5">
              {SUGGESTED_TONES.map((tone, idx) => (
                <label 
                  key={idx}
                  className={`flex items-center space-x-2.5 p-2 rounded-xl border cursor-pointer transition ${
                    selectedTone === tone 
                      ? 'bg-scarf-50/70 border-scarf-300' 
                      : 'bg-white/70 border-frost-100 hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="tone"
                    checked={selectedTone === tone}
                    onChange={() => setSelectedTone(tone)}
                    className="accent-scarf-500"
                  />
                  <span className="text-frost-800 font-medium">{tone}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 头像链接可选 */}
          <div>
            <label className="block text-frost-700 font-semibold mb-1">
              自定义头像链接（可选，默认使用冬雪精选头像）
            </label>
            <input
              type="url"
              maxLength={250}
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://... 头像图片直链"
              className="w-full px-3.5 py-2 rounded-xl bg-white/80 border border-frost-200 focus:outline-none focus:border-scarf-400 text-frost-900 shadow-sm"
            />
          </div>

          {/* 隐私提示 */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-[11px] leading-relaxed flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>安全与隐私承诺</strong>：你的账号数据完全保存在你当前浏览器的本地存储中，不会上传至任何第三方服务器。你可以随时在此切换或删除账号。
            </span>
          </div>

          {/* 底部提交 */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-frost-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-frost-200/70 hover:bg-frost-200 text-frost-700 font-medium transition"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl scarf-gradient text-white font-bold shadow-frost-glow hover:opacity-95 transition transform active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>创建并激活我的内容台</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
