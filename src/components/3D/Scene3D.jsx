import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  createProceduralGeometry,
  setupLights,
  handleResize,
  setupMouseTracking,
  addGlowEffect,
} from '@/utils/threejs-helpers';
import { usePerformance } from '@/utils/performance';

export default function Scene3D({ isDarkMode = true }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const animationRef = useRef(null);
  const { getOptimalPixelRatio, monitorFPS } = usePerformance();

  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDarkMode ? '#0f0f1e' : '#ffffff');
    scene.fog = new THREE.Fog(isDarkMode ? '#0f0f1e' : '#ffffff', 100, 1000);
    sceneRef.current = scene;

    // 相机设置
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // 渲染器配置（性能优化）
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(getOptimalPixelRatio());
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 设置灯光
    setupLights(scene);

    // 创建几何体
    const geometry = createProceduralGeometry('icosahedron');
    const material = new THREE.MeshStandardMaterial({
      color: 0x667eea,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0x667eea,
      emissiveIntensity: 0.2,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    meshRef.current = mesh;

    // 添加发光效果
    addGlowEffect(mesh, 0x667eea);

    // 鼠标追踪
    const removeMouseTracking = setupMouseTracking(mesh, containerRef.current);

    // 监控 FPS
    let fpsInterval = null;
    fpsInterval = monitorFPS((fps) => {
      console.log(`📊 FPS: ${fps}`);
    });

    // 动画循环
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (meshRef.current) {
        meshRef.current.rotation.x += 0.0005;
        meshRef.current.rotation.y += 0.001;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 窗口调整
    const handleWindowResize = () => {
      handleResize(camera, renderer, containerRef.current);
    };

    window.addEventListener('resize', handleWindowResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      cancelAnimationFrame(animationRef.current);
      removeMouseTracking();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    />
  );
}