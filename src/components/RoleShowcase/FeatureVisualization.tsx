"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { VisualizationType } from "./roleData";

interface BoxData {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

// Single 3D box
function Box3D({ position, size, color }: BoxData) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </mesh>
  );
}

// Container wireframe
function ContainerFrame({ size, color }: { size: [number, number, number]; color: string }) {
  return (
    <lineSegments>
      <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
      <lineBasicMaterial color={color} opacity={0.4} transparent />
    </lineSegments>
  );
}

// Rotating group wrapper
function RotatingGroup({ children, speed = 0.2 }: { children: React.ReactNode; speed?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// Packages visualization - scattered boxes
function PackagesScene({ accentColor }: { accentColor: string }) {
  const boxes: BoxData[] = [
    { position: [-0.8, -0.3, 0.5], size: [0.5, 0.4, 0.3], color: accentColor },
    { position: [0.6, -0.2, -0.4], size: [0.4, 0.5, 0.4], color: "#64748b" },
    { position: [0, 0.2, 0.3], size: [0.6, 0.3, 0.5], color: accentColor },
    { position: [-0.5, 0.4, -0.5], size: [0.3, 0.3, 0.3], color: "#94a3b8" },
    { position: [0.7, 0.3, 0.2], size: [0.35, 0.4, 0.35], color: accentColor },
    { position: [-0.2, -0.5, -0.3], size: [0.45, 0.35, 0.4], color: "#cbd5e1" },
    { position: [0.3, -0.4, 0.6], size: [0.3, 0.25, 0.3], color: "#64748b" },
  ];

  return (
    <RotatingGroup speed={0.3}>
      {boxes.map((box, i) => (
        <Box3D key={i} {...box} />
      ))}
    </RotatingGroup>
  );
}

// Container visualization - boxes inside container
function ContainerScene({ accentColor }: { accentColor: string }) {
  const containerSize: [number, number, number] = [2.5, 1.4, 1.2];

  const boxes: BoxData[] = [
    { position: [-0.8, -0.4, 0.2], size: [0.5, 0.4, 0.5], color: accentColor },
    { position: [-0.2, -0.4, 0.2], size: [0.5, 0.4, 0.5], color: "#64748b" },
    { position: [0.4, -0.4, 0.2], size: [0.5, 0.4, 0.5], color: accentColor },
    { position: [-0.8, -0.4, -0.3], size: [0.5, 0.4, 0.4], color: "#94a3b8" },
    { position: [-0.2, -0.4, -0.3], size: [0.5, 0.4, 0.4], color: accentColor },
    { position: [0.4, -0.4, -0.3], size: [0.5, 0.4, 0.4], color: "#cbd5e1" },
    { position: [-0.8, 0.05, 0.2], size: [0.5, 0.4, 0.5], color: "#64748b" },
    { position: [-0.2, 0.05, 0.2], size: [0.5, 0.4, 0.5], color: accentColor },
    { position: [0.4, 0.05, 0], size: [0.5, 0.5, 0.8], color: "#94a3b8" },
  ];

  return (
    <RotatingGroup speed={0.15}>
      <ContainerFrame size={containerSize} color="#ffffff" />
      {boxes.map((box, i) => (
        <Box3D key={i} {...box} />
      ))}
    </RotatingGroup>
  );
}

// Analytics visualization - 3D bar chart
function AnalyticsScene({ accentColor }: { accentColor: string }) {
  const bars = [
    { x: -1.0, height: 0.6, color: "#64748b" },
    { x: -0.6, height: 1.0, color: accentColor },
    { x: -0.2, height: 0.8, color: "#94a3b8" },
    { x: 0.2, height: 1.2, color: accentColor },
    { x: 0.6, height: 0.9, color: "#64748b" },
    { x: 1.0, height: 1.4, color: accentColor },
  ];

  return (
    <RotatingGroup speed={0.2}>
      {/* Base platform */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
      </mesh>

      {/* Bars */}
      {bars.map((bar, i) => (
        <mesh key={i} position={[bar.x, bar.height / 2 - 0.5, 0]}>
          <boxGeometry args={[0.3, bar.height, 0.3]} />
          <meshStandardMaterial color={bar.color} roughness={0.2} metalness={0.3} />
        </mesh>
      ))}
    </RotatingGroup>
  );
}

// Workflow visualization - flowing packages
function WorkflowScene({ accentColor }: { accentColor: string }) {
  const stages = [
    { x: -1.2, label: "In", boxes: 3 },
    { x: 0, label: "Process", boxes: 2 },
    { x: 1.2, label: "Out", boxes: 1 },
  ];

  return (
    <RotatingGroup speed={0.25}>
      {/* Flow arrows (simplified as elongated boxes) */}
      <mesh position={[-0.6, -0.3, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.05]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>
      <mesh position={[0.6, -0.3, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.05]} />
        <meshStandardMaterial color={accentColor} />
      </mesh>

      {/* Stage platforms */}
      {stages.map((stage, i) => (
        <group key={i} position={[stage.x, 0, 0]}>
          {/* Platform */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.1, 16]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>

          {/* Stacked boxes */}
          {Array.from({ length: stage.boxes }).map((_, j) => (
            <mesh key={j} position={[0, -0.3 + j * 0.25, 0]}>
              <boxGeometry args={[0.25, 0.2, 0.25]} />
              <meshStandardMaterial
                color={j === 0 ? accentColor : "#64748b"}
                roughness={0.3}
                metalness={0.1}
              />
            </mesh>
          ))}
        </group>
      ))}
    </RotatingGroup>
  );
}

interface FeatureVisualizationProps {
  type: VisualizationType;
  accentColor: string;
}

export function FeatureVisualization({ type, accentColor }: FeatureVisualizationProps) {
  const renderScene = () => {
    switch (type) {
      case "packages":
        return <PackagesScene accentColor={accentColor} />;
      case "containers":
        return <ContainerScene accentColor={accentColor} />;
      case "analytics":
        return <AnalyticsScene accentColor={accentColor} />;
      case "workflow":
        return <WorkflowScene accentColor={accentColor} />;
      default:
        return <PackagesScene accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        {renderScene()}
      </Canvas>
    </div>
  );
}
