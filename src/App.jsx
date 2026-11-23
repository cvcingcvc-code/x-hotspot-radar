import React, { useState, useEffect } from 'react';
import SnowEffect from './components/SnowEffect';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HotspotRadar from './components/HotspotRadar';
import CopywritingStudio from './components/CopywritingStudio';
import SmartTaggingView from './components/SmartTaggingView';
import RepliesTracker from './components/RepliesTracker';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SettingsModal from './components/SettingsModal';
import AccountWizardModal from './components/AccountWizardModal';

import { 
  initialTaggedTweets, 
  initialReplies, 
  initialAnalytics 
} from './data/mockData';

import {
  loadStoredAccounts,
  saveStoredAccounts,
  loadCurrentAccountId,
  saveCurrentAccountId,
  generateHotspotsForNiche
} from './utils/accountEngine';

export default function App() {
  const [currentTab, setCurrentTab] = useState('radar');
  const [snowEnabled, setSnowEnabled] = useState(true);

  // 多账号状态管理
  const [allAccounts, setAllAccounts] = useState(() => loadStoredAccounts());
  const [currentAccountId, setCurrentAccountId] = useState(() => loadCurrentAccountId());
  
  // 当前激活的账号
  const activeAccount = allAccounts.find(a => a.id === currentAccountId) || allAccounts[0];
  const [account, setAccount] = useState(activeAccount);

  // 动态热点与内容状态
  const [hotspots, setHotspots] = useState(() => generateHotspotsForNiche(activeAccount.targetNiche, activeAccount.name));
  const [tweets, setTweets] = useState(initialTaggedTweets);
  const [replies, setReplies] = useState(initialReplies);
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // 弹窗状态
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // 当激活账号变更时，自动联动刷新热点雷达和偏好
  useEffect(() => {
    setAccount(activeAccount);
    setHotspots(generateHotspotsForNiche(activeAccount.targetNiche, activeAccount.name));
  }, [activeAccount]);

  // 保存所有账号至本地缓存
  useEffect(() => {
    saveStoredAccounts(allAccounts);
  }, [allAccounts]);

  // 切换激活账号
  const handleSwitchAccount = (accId) => {
    setCurrentAccountId(accId);
    saveCurrentAccountId(accId);
  };

  // 创建/接入新账号
  const handleCreateAccount = (newAcc) => {
    const updated = [newAcc, ...allAccounts.filter(a => a.id !== newAcc.id)];
    setAllAccounts(updated);
    setCurrentAccountId(newAcc.id);
    saveCurrentAccountId(newAcc.id);
  };

  // 从热点雷达跳转到文案工坊
  const handleSelectHotspotForStudio = (hotspot) => {
    setSelectedHotspot(hotspot);
    setCurrentTab('studio');
  };

  // 发布推文处理：追加到推文打标列表中
  const handlePublishTweet = ({ content, tags, category }) => {
    const newTweet = {
      id: `tw-${Date.now()}`,
      content,
      publishedAt: '刚刚',
      tags: tags && tags.length > 0 ? tags : account.targetNiche.slice(0, 2),
      category: category || '日常观点',
      stats: {
        impressions: 1,
        likes: 0,
        retweets: 0,
        replies: 0,
        bookmarks: 0,
        engagementRate: '0.0%'
      },
      aiTagReason: `针对【${account.name}】定位发布的实时推文，AI 已开启首发互动监听。`,
      sentiment: '高潜力'
    };

    setTweets([newTweet, ...tweets]);
    setAccount(prev => ({
      ...prev,
      tweetsCount: prev.tweetsCount + 1
    }));
  };

  // 发送回复
  const handleSendReply = (replyId, replyText) => {
    console.log(`Sent reply to ${replyId}: ${replyText}`);
  };

  return (
    <div className="relative min-h-screen text-frost-800 flex overflow-hidden">
      {/* 背景层 1: 冬雪美学插画大背景 */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none scale-105 transform filter blur-[2px] opacity-40 transition-all duration-1000"
        style={{ backgroundImage: `url('/assets/winter-anime-hero.jpg')` }}
      />

      {/* 背景层 2: 冷雾雪白磨砂渐变遮罩 */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-frost-100/90 via-frost-50/80 to-white/75 pointer-events-none" />

      {/* 飘雪粒子 Canvas 动画 */}
      <SnowEffect enabled={snowEnabled} />

      {/* 左侧固定侧边栏 */}
      <Sidebar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        account={account}
        allAccounts={allAccounts}
        onSwitchAccount={handleSwitchAccount}
        onOpenWizard={() => setIsWizardOpen(true)}
        snowEnabled={snowEnabled}
        setSnowEnabled={setSnowEnabled}
        unreadRepliesCount={replies.length}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* 右侧主工作区 */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto relative z-10">
        <Header 
          currentTab={currentTab}
          account={account}
          onQuickPost={() => {
            setSelectedHotspot(null);
            setCurrentTab('studio');
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenWizard={() => setIsWizardOpen(true)}
        />

        {/* 动态页面内容区 */}
        <div className="px-8 pb-12 flex-1">
          {currentTab === 'radar' && (
            <HotspotRadar 
              hotspots={hotspots}
              onSelectHotspotForStudio={handleSelectHotspotForStudio}
            />
          )}

          {currentTab === 'studio' && (
            <CopywritingStudio 
              selectedHotspot={selectedHotspot}
              onPublishTweet={handlePublishTweet}
              account={account}
            />
          )}

          {currentTab === 'tagging' && (
            <SmartTaggingView 
              tweets={tweets}
              analytics={analytics}
            />
          )}

          {currentTab === 'replies' && (
            <RepliesTracker 
              replies={replies}
              onSendReply={handleSendReply}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsDashboard 
              account={account}
              analytics={analytics}
            />
          )}
        </div>
      </main>

      {/* 账号接入向导弹窗 (任何访客均可自主接入) */}
      <AccountWizardModal 
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onCreateAccount={handleCreateAccount}
      />

      {/* 设置与 X 凭据接入弹窗 */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        account={account}
        onUpdateAccount={(updated) => {
          setAccount(updated);
          setAllAccounts(allAccounts.map(a => a.id === updated.id ? updated : a));
        }}
      />
    </div>
  );
}
