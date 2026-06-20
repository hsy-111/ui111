/**
 * 接近函数集合（用于平滑过渡和动画）
 * 灵感来自 Amin Ankward 的设计理念
 */

export const approachFunctions = {
  // Smoothstep - 平滑阶跃函数
  smoothstep: (edge0, edge1, x) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  },

  // Smootherstep - 更平滑的阶跃函数
  smootherstep: (edge0, edge1, x) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * t * (t * (t * 6 - 15) + 10);
  },

  // 弹性缓动 - 逐出
  elasticEaseOut: (t) => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c5) + 1;
  },

  // 反弹缓动 - 逐出
  bounceOut: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },

  // 立方缓入
  cubicEaseIn: (t) => t * t * t,

  // 立方缓出
  cubicEaseOut: (t) => 1 - Math.pow(1 - t, 3),

  // 立方缓入出
  cubicEaseInOut: (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
};

/**
 * 几何节点相关函数（模拟 Blender GeoNodes）
 */
export const geoNodes = {
  // Perlin 噪声（简化版）
  perlinNoise: (x, y, seed = 0) => {
    const n = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
    return n - Math.floor(n);
  },

  // 分布采样 - 使用黄金螺旋
  distributePoints: (count, radius, seed = 0) => {
    const points = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const theta = i * goldenAngle + seed;
      const r = radius * Math.sqrt(i / count);
      points.push({
        x: r * Math.cos(theta),
        y: r * Math.sin(theta),
        z: (i / count) * 2 - 1,
      });
    }

    return points;
  },

  // 范围映射
  mapRange: (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  },

  // 分形布朗运动
  fractalBrownianMotion: (x, y, octaves = 4, persistence = 0.5) => {
    let value = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxValue = 0;

    for (let i = 0; i < octaves; i++) {
      value += amplitude * geoNodes.perlinNoise(x * frequency, y * frequency);
      maxValue += amplitude;
      amplitude *= persistence;
      frequency *= 2;
    }

    return value / maxValue;
  },

  // 波形生成
  wave: (x, amplitude = 1, frequency = 1, phase = 0) => {
    return amplitude * Math.sin(x * frequency + phase);
  },
};

/**
 * 向量操作
 */
export const vectorOps = {
  add: (a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }),
  subtract: (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }),
  multiply: (a, scalar) => ({ x: a.x * scalar, y: a.y * scalar, z: a.z * scalar }),
  length: (v) => Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z),
};