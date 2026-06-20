import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function InteractiveTiltCard({ children, intensity = 15 }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shadow, setShadow] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 旋转计算
    const rotX = ((y - centerY) / centerY) * intensity;
    const rotY = ((x - centerX) / centerX) * -intensity;

    // 位置偏移
    const posX = (x - centerX) * 0.05;
    const posY = (y - centerY) * 0.05;

    // 阴影偏移
    const shadowX = ((x - centerX) / centerX) * 20;
    const shadowY = ((y - centerY) / centerY) * 20;

    setRotation({ x: rotX, y: rotY });
    setPosition({ x: posX, y: posY });
    setShadow({ x: shadowX, y: shadowY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setShadow({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        x: position.x,
        y: position.y,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 60 }}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
        boxShadow: `${shadow.x}px ${shadow.y}px 60px rgba(102, 126, 234, 0.4), 0 0 40px rgba(255, 255, 255, 0.1)`,
      }}
      className="w-80 h-96 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-2xl p-8 text-white cursor-pointer relative overflow-hidden hover:scale-105 transition-transform"
    >
      {/* 背景光效 */}
      <div className="absolute inset-0 rounded-2xl opacity-30 bg-gradient-to-br from-white to-transparent pointer-events-none" />

      {/* 边框闪烁效果 */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white opacity-20 pointer-events-none" />

      {/* 内容 */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}