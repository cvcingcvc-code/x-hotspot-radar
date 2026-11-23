import React, { useState } from 'react';
import SnowEffect from './components/SnowEffect';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HotspotRadar from './components/HotspotRadar';
import CopywritingStudio from './components/CopywritingStudio';
import SmartTaggingView from './components/SmartTaggingView';
import RepliesTracker from './components/RepliesTracker';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SettingsModal from './components/SettingsModal';

import { 
  initialAccountProfile, 
  initialHotspots, 
  initialTaggedTweets, 
  initialReplies, 
  initialAnalytics 
} from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('radar');
  const [snowEnabled, setSnowEnabled] = useState(true);
  const [account, setAccount] = useState(initialAccountProfile);
  const [hotspots, setHotspots] = useState(initialHotspots);
  const [tweets, setTweets] = useState(initialTaggedTweets);
  const [replies, setReplies] = useState(initialReplies);
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
      tags: tags && tags.length > 0 ? tags : ['#AI科技', '#独立开发'],
      category: category || '日常观点',
      stats: {
        impressions: 1,
        likes: 0,
        retweets: 0,
        replies: 0,
        bookmarks: 0,
        engagementRate: '0.0%'
      },
      aiTagReason: '新发布推文，AI 正在监听首发互动脉冲并建立标签权重。',
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
      {/* 背景层 1: 用户参考图作为冬日雪景全局大背景 */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none scale-105 transform filter blur-[2px] opacity-40 transition-all duration-1000"
        style={{ backgroundImage: `url('/assets/winter-anime-hero.jpg')` }}
      />

      {/* 背景层 2: 冷雾与雪白渐变遮罩，确保内容可读性与高级毛玻璃质感 */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-frost-100/90 via-frost-50/80 to-white/75 pointer-events-none" />

      {/* 飘雪粒子 Canvas 动画 */}
      <SnowEffect enabled={snowEnabled} />

      {/* 左侧固定侧边栏 */}
      <Sidebar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        account={account}
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

      {/* 设置与 X 凭据接入弹窗 */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        account={account}
        onUpdateAccount={(updated) => setAccount(updated)}
      />
    </div>
  );
}
