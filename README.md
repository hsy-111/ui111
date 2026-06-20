# 🎨 高级 3D 交互 UI - Amin Ankward 风格

基于 **Amin Ankward** 设计理念的沉浸式 3D 交互网站。融合 Three.js、GeoNodes 概念、数学算法和性能优化。

## ✨ 特性

- 🎯 **程序化几何体** - 使用数学算法动态生成 3D 形状
- 🔄 **高级交互** - 鼠标跟踪、3D 旋转、视差效果
- ⚡ **性能优化** - GPU 加速、像素比限制、智能渲染
- 🌈 **现代 UI** - Framer Motion 动画 + Tailwind CSS
- 📱 **响应式设计** - 完美适配各种屏幕尺寸
- 🎬 **平滑动画** - Smoothstep、弹性缓动等接近函数

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 开发模式
```bash
npm run dev
```

### 3. 生产打包
```bash
npm run build
```

### 4. 查看效果
```bash
npm run preview
```

## 📁 项目结构

```
src/
├── components/
│   ├── 3D/
│   │   └── Scene3D.jsx           # Three.js 3D 场景
│   └── UI/
│       ├── InteractiveTiltCard.jsx  # 3D 倾斜卡片
│       └── InteractiveButton.jsx    # 交互按钮
├── utils/
│   ├── math.js                   # 数学算法和接近函数
│   ├── performance.js            # 性能优化工具
│   └── threejs-helpers.js        # Three.js 辅助函数
├── styles/
│   └── index.css                 # 全局样式
└── App.jsx                       # 主应用
```

## 🎮 交互特性

### 鼠标跟踪
移动鼠标查看 3D 对象的实时旋转效果

### 3D 卡片倾斜
将鼠标悬停在卡片上，体验 3D 透视变换

### 动态阴影
根据鼠标位置动态调整阴影效果

## 🛠️ 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **Three.js** - 3D 图形库
- **Framer Motion** - 动画库
- **Tailwind CSS** - 样式框架
- **GSAP** - 高级动画

## 📊 性能指标

- ✅ FPS: 60+ (在现代设备上)
- ✅ 首屏加载: < 3s
- ✅ 内存占用: < 100MB
- ✅ GPU 使用率: 优化

## 🎨 核心概念

### 1. **GeoNodes（几何节点）**
模拟 Blender 的几何节点系统，生成程序化几何体

### 2. **接近函数（Approach Functions）**
平滑的数学过渡效果

### 3. **数学算法**
- Perlin 噪声
- 黄金螺旋分布
- 分形布朗运动

### 4. **性能优化**
- GPU 加速渲染
- 像素比限制
- 帧率监控

## 📝 许可证

MIT

---

**建于对 Amin Ankward 3D 设计理念的热爱 ❤️**
