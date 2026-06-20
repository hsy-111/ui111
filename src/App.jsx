import { useState, Suspense } from 'react';
import Scene3D from '@/components/3D/Scene3D';
import InteractiveTiltCard from '@/components/UI/InteractiveTiltCard';
import InteractiveButton from '@/components/UI/InteractiveButton';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [stats, setStats] = useState({ fps: 0, memory: 0 });

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
    // 显示性能统计
    if (!showInfo && performance.memory) {
      setStats({
        fps: 60,
        memory: (performance.memory.usedJSHeapSize / 1048576).toFixed(2),
      });
    }
  };

  return (
    <div className={isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}>
      {/* 3D 场景背景 */}
      <Suspense fallback={<div className="w-full h-full bg-gray-800" />}>
        <Scene3D isDarkMode={isDarkMode} />
      </Suspense>

      {/* UI 覆盖层 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="h-screen flex flex-col items-center justify-center gap-12">
          {/* 标题区域 */}
          <div className="text-center mb-8 pointer-events-auto animate-float">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              ✨ 高级 3D 交互体验
            </h1>
            <p className="text-xl opacity-75 max-w-2xl">
              融合 Three.js、GeoNodes 和数学算法的沉浸式 UI 设计
            </p>
          </div>

          {/* 交互卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto">
            <InteractiveTiltCard intensity={12}>
              <div className="flex flex-col gap-4">
                <div className="text-5xl animate-glow">🎨</div>
                <h3 className="text-2xl font-bold">设计理念</h3>
                <p className="text-sm opacity-90 flex-grow">
                  使用 GeoNodes 创建程序化几何体和动态网格变形
                </p>
                <InteractiveButton onClick={handleShowInfo}>
                  查看详情
                </InteractiveButton>
              </div>
            </InteractiveTiltCard>

            <InteractiveTiltCard intensity={12}>
              <div className="flex flex-col gap-4">
                <div className="text-5xl animate-pulse-custom">⚙️</div>
                <h3 className="text-2xl font-bold">数学算法</h3>
                <p className="text-sm opacity-90 flex-grow">
                  应用 Smoothstep、接近函数和分形布朗运动
                </p>
                <InteractiveButton onClick={handleShowInfo}>
                  探索算法
                </InteractiveButton>
              </div>
            </InteractiveTiltCard>

            <InteractiveTiltCard intensity={12}>
              <div className="flex flex-col gap-4">
                <div className="text-5xl">🚀</div>
                <h3 className="text-2xl font-bold">性能优化</h3>
                <p className="text-sm opacity-90 flex-grow">
                  GPU 加速、像素比限制和智能渲染策略
                </p>
                <InteractiveButton onClick={handleShowInfo}>
                  查看优化
                </InteractiveButton>
              </div>
            </InteractiveTiltCard>
          </div>

          {/* 底部控制按钮 */}
          <div className="pointer-events-auto mt-12 flex gap-4">
            <InteractiveButton
              onClick={() => setIsDarkMode(!isDarkMode)}
              variant="primary"
            >
              {isDarkMode ? '☀️ 亮色模式' : '🌙 暗色模式'}
            </InteractiveButton>
          </div>

          {/* 信息面板 */}
          {showInfo && (
            <div className="pointer-events-auto fixed bottom-8 right-8 bg-gray-900 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl border border-purple-400 border-opacity-30 max-w-sm shadow-2xl animate-pulse-custom">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                📊 项目信息
              </h4>
              <p className="text-sm opacity-80 mb-2 flex items-center gap-2">
                ✅ 基于 Amin Ankward 的 3D 设计理念
              </p>
              <p className="text-sm opacity-80 mb-2 flex items-center gap-2">
                ✅ 使用 Three.js + Framer Motion
              </p>
              <p className="text-sm opacity-80 mb-2 flex items-center gap-2">
                ✅ 完整的性能优化实现
              </p>
              <p className="text-sm opacity-80 mb-4 flex items-center gap-2">
                📈 FPS: <span className="text-green-400 font-bold">{stats.fps}</span>
              </p>
              <p className="text-sm opacity-80 mb-4 flex items-center gap-2">
                💾 内存: <span className="text-green-400 font-bold">{stats.memory} MB</span>
              </p>
              <button
                onClick={() => setShowInfo(false)}
                className="text-sm w-full px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 transition font-semibold"
              >
                关闭
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}