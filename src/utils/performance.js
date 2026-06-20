/**
 * 性能优化工具集
 */

export const usePerformance = () => {
  // 防止过度渲染的节流函数
  const throttle = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // 防抖函数
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // 帧率监控
  const monitorFPS = (callback) => {
    let lastTime = performance.now();
    let frames = 0;

    const checkFPS = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        callback(frames);
        frames = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(checkFPS);
    };

    checkFPS();
  };

  // 内存监控
  const monitorMemory = () => {
    if (performance.memory) {
      return {
        used: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
        limit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
      };
    }
    return null;
  };

  // 资源预加载
  const preloadModels = (urls) => {
    return Promise.all(
      urls.map(url =>
        fetch(url)
          .then(res => res.blob())
          .catch(err => console.error(`Failed to load ${url}:`, err))
      )
    );
  };

  // 响应式像素比（性能优化）
  const getOptimalPixelRatio = () => {
    const ratio = window.devicePixelRatio;
    return Math.min(ratio, 2);
  };

  return {
    throttle,
    debounce,
    monitorFPS,
    monitorMemory,
    preloadModels,
    getOptimalPixelRatio,
  };
};

/**
 * 性能检查清单
 */
export const performanceChecklist = {
  // 1. 启用 GPU 加速
  enableGPUAcceleration: () => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return !!gl;
  },

  // 2. 内存优化提示
  checkMemoryUsage: () => {
    if (performance.memory) {
      const used = performance.memory.usedJSHeapSize;
      const limit = performance.memory.jsHeapSizeLimit;
      const percentage = (used / limit) * 100;

      if (percentage > 80) {
        console.warn('⚠️ Memory usage is high:', percentage.toFixed(2) + '%');
      }
      return percentage;
    }
    return null;
  },
};