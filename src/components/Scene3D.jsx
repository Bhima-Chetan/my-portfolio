/* File: src/components/Scene3D.jsx
  This component creates the 3D canvas and the animated shapes.
*/
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MathUtils } from 'three';

// Component for a single floating shape
function Shape({ shape, position, color }) {
  const ref = useRef();
  
  // Animate the shape's rotation on every frame
  useFrame((state, delta) => {
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.y += delta * 0.2;
  });

  // Use useMemo to create the geometry only once, improving performance
  const geometry = useMemo(() => {
    switch (shape) {
      case 'box':
        return <boxGeometry />;
      case 'sphere':
        return <sphereGeometry args={[0.8, 32, 32]} />;
      case 'cone':
        return <coneGeometry args={[0.7, 1.2, 32]} />;
      default:
        return <icosahedronGeometry />;
    }
  }, [shape]);

  return (
    <mesh ref={ref} position={position}>
      {geometry}
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

// Main 3D scene component
const Scene3D = () => {
  // Create a memoized array of shapes to prevent re-creation on re-renders
  const shapes = useMemo(() => {
    const shapeTypes = ['box', 'sphere', 'cone', 'icosahedron'];
    const colors = ['#20C997', '#415A77', '#E0E1DD']; // Colors from your theme
    return Array.from({ length: 100 }, () => ({
      shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      position: [
        MathUtils.randFloatSpread(20), // x position
        MathUtils.randFloatSpread(20), // y position
        MathUtils.randFloatSpread(20), // z position
      ],
    }));
  }, []);

  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        {shapes.map((props, i) => (
          <Shape key={i} {...props} />
        ))}
      </Canvas>
    </div>
  );
};

export default Scene3D;
