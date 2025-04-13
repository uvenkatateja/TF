import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleProps {
  count: number;
  color: string;
}

const Particles = ({ count, color }: ParticleProps) => {
  return (
    <Sparkles
      count={count}
      scale={10}
      size={1}
      speed={0.3}
      color={color}
      opacity={0.5}
    />
  );
};

const FloatingObjects = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });
  
  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[-3, -1, -5]} scale={0.5}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            roughness={0.3} 
            metalness={0.8} 
            emissive="#D4AF37"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[3, 1, -3]} scale={0.3}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            roughness={0.3} 
            metalness={0.8} 
            emissive="#D4AF37"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh position={[0, -2, -4]} scale={0.4}>
          <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            roughness={0.3} 
            metalness={0.8} 
            emissive="#D4AF37"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  );
};

interface ThreeBackgroundProps {
  type?: 'particles' | 'objects' | 'both';
  intensity?: number;
  className?: string;
}

export function ThreeBackground({ 
  type = 'both', 
  intensity = 1,
  className = ''
}: ThreeBackgroundProps) {
  const particleCount = Math.floor(100 * intensity);
  
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance" 
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000000']} />
        
        {(type === 'particles' || type === 'both') && (
          <Particles count={particleCount} color="#D4AF37" />
        )}
        
        {(type === 'objects' || type === 'both') && (
          <FloatingObjects />
        )}
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
} 