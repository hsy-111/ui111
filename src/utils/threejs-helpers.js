import * as THREE from 'three';

/**
 * Three.js 辅助函数
 */

// 创建程序化几何体
export const createProceduralGeometry = (type = 'icosahedron') => {
  let geometry;

  switch (type) {
    case 'icosahedron':
      geometry = new THREE.IcosahedronGeometry(2, 6);
      break;
    case 'octahedron':
      geometry = new THREE.OctahedronGeometry(2, 4);
      break;
    case 'box':
      geometry = new THREE.BoxGeometry(2, 2, 2, 32, 32, 32);
      break;
    default:
      geometry = new THREE.IcosahedronGeometry(2, 6);
  }

  // 应用变形效果
  const positionAttribute = geometry.getAttribute('position');

  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    const distance = Math.sqrt(x * x + y * y + z * z);
    const factor = smoothstep(0, 3, distance);

    positionAttribute.setXYZ(
      i,
      x * (1 + Math.sin(x * 2) * 0.2 * factor),
      y * (1 + Math.cos(y * 2) * 0.2 * factor),
      z * (1 + Math.sin(z * 2) * 0.2 * factor)
    );
  }

  positionAttribute.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
};

// Smoothstep 接近函数
function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// 创建环境光
export const setupLights = (scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x667eea, 1, 100);
  pointLight.position.set(-5, 5, 5);
  scene.add(pointLight);

  return { ambientLight, directionalLight, pointLight };
};

// 响应式处理
export const handleResize = (camera, renderer, container) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

// 鼠标追踪
export const setupMouseTracking = (mesh, container) => {
  const mouse = { x: 0, y: 0 };

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    mesh.rotation.x = mouse.y * 0.5;
    mesh.rotation.y = mouse.x * 0.5;
  };

  container.addEventListener('mousemove', onMouseMove);

  return () => {
    container.removeEventListener('mousemove', onMouseMove);
  };
};

// 发光效果
export const addGlowEffect = (mesh, color = 0x667eea) => {
  const glowGeometry = mesh.geometry.clone();
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: color,
    transparent: true,
    opacity: 0.1,
  });

  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  glow.scale.multiplyScalar(1.15);

  mesh.add(glow);
  return glow;
};