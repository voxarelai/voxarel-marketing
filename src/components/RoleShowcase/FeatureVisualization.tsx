"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid, Text } from "@react-three/drei";
import * as THREE from "three";
import { VisualizationType } from "./roleData";

// ============================================
// PACKAGE BOX - Exact pattern from production Voxarel
// Box with edges for visibility (from LoadingVisualization3D.tsx lines 96-114)
// ============================================
function PackageBox({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Subtle animation from production component
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} opacity={0.8} transparent roughness={0.5} metalness={0.2} />
      {/* Edges for better visibility - exact pattern from production */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(...size)]} />
        <lineBasicMaterial color="#1a202c" linewidth={2} />
      </lineSegments>
    </mesh>
  );
}

// ============================================
// CONTAINER BOX - From production (LoadingVisualization3D.tsx lines 33-47)
// Renders container outline as wireframe
// ============================================
function ContainerBox({
  length,
  width,
  height,
  color,
}: {
  length: number;
  width: number;
  height: number;
  color: string;
}) {
  return (
    <mesh position={[width / 2, height / 2, length / 2]}>
      <boxGeometry args={[width, height, length]} />
      <meshBasicMaterial color={color} wireframe opacity={0.3} transparent />
    </mesh>
  );
}

// ============================================
// PACKAGES SCENE - Scattered packages (Field Agent features)
// Uses production PackageBox pattern
// ============================================
function PackagesScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  // Color coding from production: accent, gray variants
  const packages = useMemo(
    () => [
      { position: [-1.0, 0.25, 0.5] as [number, number, number], size: [0.5, 0.4, 0.4] as [number, number, number], color: accentColor },
      { position: [0.8, 0.2, -0.6] as [number, number, number], size: [0.4, 0.35, 0.35] as [number, number, number], color: "#64748b" },
      { position: [0.2, 0.3, 0.8] as [number, number, number], size: [0.55, 0.45, 0.4] as [number, number, number], color: accentColor },
      { position: [-0.5, 0.15, -0.4] as [number, number, number], size: [0.35, 0.3, 0.35] as [number, number, number], color: "#94a3b8" },
      { position: [1.2, 0.25, 0.3] as [number, number, number], size: [0.4, 0.4, 0.35] as [number, number, number], color: accentColor },
      { position: [-0.8, 0.2, 0.9] as [number, number, number], size: [0.45, 0.35, 0.4] as [number, number, number], color: "#64748b" },
      { position: [0.5, 0.35, -0.2] as [number, number, number], size: [0.5, 0.5, 0.45] as [number, number, number], color: "#cbd5e1" },
    ],
    [accentColor]
  );

  return (
    <group ref={groupRef}>
      {packages.map((pkg, i) => (
        <PackageBox key={i} position={pkg.position} size={pkg.size} color={pkg.color} />
      ))}
    </group>
  );
}

// ============================================
// CONTAINER SCENE - 20ft container with packages
// Exact pattern from production LoadingVisualization3D
// ============================================
function ContainerScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  // 20ft container dimensions (scaled down): 5.89m x 2.35m x 2.39m
  const containerLength = 5.89;
  const containerWidth = 2.35;
  const containerHeight = 2.39;

  // Packages inside container - arranged like production
  const packages = useMemo(
    () => [
      // Bottom row
      { position: [0.3, 0.25, 0.5] as [number, number, number], size: [0.5, 0.4, 0.5] as [number, number, number], color: accentColor },
      { position: [0.9, 0.25, 0.5] as [number, number, number], size: [0.5, 0.4, 0.5] as [number, number, number], color: "#64748b" },
      { position: [1.5, 0.25, 0.5] as [number, number, number], size: [0.5, 0.4, 0.5] as [number, number, number], color: accentColor },
      { position: [0.3, 0.25, 1.2] as [number, number, number], size: [0.5, 0.4, 0.4] as [number, number, number], color: "#94a3b8" },
      { position: [0.9, 0.25, 1.2] as [number, number, number], size: [0.5, 0.4, 0.4] as [number, number, number], color: accentColor },
      { position: [1.5, 0.25, 1.2] as [number, number, number], size: [0.5, 0.4, 0.4] as [number, number, number], color: "#cbd5e1" },
      // Top row
      { position: [0.3, 0.7, 0.5] as [number, number, number], size: [0.5, 0.4, 0.5] as [number, number, number], color: "#64748b" },
      { position: [0.9, 0.7, 0.5] as [number, number, number], size: [0.5, 0.4, 0.5] as [number, number, number], color: accentColor },
      { position: [1.5, 0.7, 0.7] as [number, number, number], size: [0.5, 0.5, 0.8] as [number, number, number], color: "#94a3b8" },
    ],
    [accentColor]
  );

  return (
    <group ref={groupRef} position={[-containerWidth / 2, 0, -containerLength / 2]}>
      {/* Container wireframe - from production */}
      <ContainerBox
        length={containerLength}
        width={containerWidth}
        height={containerHeight}
        color={accentColor}
      />

      {/* Packages inside */}
      {packages.map((pkg, i) => (
        <PackageBox key={i} position={pkg.position} size={pkg.size} color={pkg.color} />
      ))}

      {/* Utilization label */}
      <Text
        position={[containerWidth / 2, containerHeight + 0.3, containerLength / 2]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        20ft Container - 78% Utilized
      </Text>
    </group>
  );
}

// ============================================
// ANALYTICS SCENE - 3D bar chart
// Uses production box pattern with edges
// ============================================
function AnalyticsScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  const bars = useMemo(
    () => [
      { x: -1.5, height: 1.2, color: "#64748b" },
      { x: -0.9, height: 2.0, color: accentColor },
      { x: -0.3, height: 1.5, color: "#94a3b8" },
      { x: 0.3, height: 2.5, color: accentColor },
      { x: 0.9, height: 1.8, color: "#64748b" },
      { x: 1.5, height: 2.8, color: accentColor },
    ],
    [accentColor]
  );

  return (
    <group ref={groupRef}>
      {/* 3D Bars with edges - production pattern */}
      {bars.map((bar, i) => (
        <mesh key={i} position={[bar.x, bar.height / 2, 0]}>
          <boxGeometry args={[0.4, bar.height, 0.4]} />
          <meshStandardMaterial color={bar.color} opacity={0.8} transparent roughness={0.5} metalness={0.2} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.4, bar.height, 0.4)]} />
            <lineBasicMaterial color="#1a202c" linewidth={2} />
          </lineSegments>
        </mesh>
      ))}

      {/* Axis labels */}
      <Text position={[0, 3.2, 0]} fontSize={0.2} color="#ffffff" anchorX="center">
        Revenue Analytics
      </Text>
      <Text position={[-1.5, -0.3, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        Jan
      </Text>
      <Text position={[-0.9, -0.3, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        Feb
      </Text>
      <Text position={[-0.3, -0.3, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        Mar
      </Text>
      <Text position={[0.3, -0.3, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        Apr
      </Text>
      <Text position={[0.9, -0.3, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        May
      </Text>
      <Text position={[1.5, -0.3, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        Jun
      </Text>
    </group>
  );
}

// ============================================
// WORKFLOW SCENE - Package flow through stages
// ============================================
function WorkflowScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const packageRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06;
    }

    // Animate packages moving along flow
    packageRefs.current.forEach((pkg, i) => {
      if (pkg) {
        const speed = 0.25;
        const offset = ((state.clock.elapsedTime * speed + i * 0.4) % 1);
        pkg.position.x = -2.5 + offset * 5;
        pkg.position.y = 0.2 + Math.sin(offset * Math.PI) * 0.3;
      }
    });
  });

  const stages = [
    { x: -2, label: "COLLECT" },
    { x: 0, label: "PROCESS" },
    { x: 2, label: "SHIP" },
  ];

  return (
    <group ref={groupRef}>
      {/* Stage platforms */}
      {stages.map((stage, i) => (
        <group key={i} position={[stage.x, 0, 0]}>
          {/* Platform base */}
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.6, 0.7, 0.2, 24]} />
            <meshStandardMaterial color={i === 1 ? accentColor : "#374151"} opacity={0.9} transparent />
          </mesh>
          {/* Platform glow ring */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.65, 0.03, 8, 32]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
          </mesh>
          {/* Stage label */}
          <Text position={[0, -0.4, 0]} fontSize={0.15} color="#ffffff" anchorX="center">
            {stage.label}
          </Text>
        </group>
      ))}

      {/* Flow arrows */}
      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x, 0.15, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <coneGeometry args={[0.1, 0.3, 3]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Conveyor line */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[5, 0.05, 0.4]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Moving packages */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) packageRefs.current[i] = el;
          }}
          position={[-2 + i * 2, 0.2, 0]}
        >
          <boxGeometry args={[0.3, 0.25, 0.25]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? accentColor : "#94a3b8"}
            opacity={0.8}
            transparent
            roughness={0.5}
            metalness={0.2}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.3, 0.25, 0.25)]} />
            <lineBasicMaterial color="#1a202c" linewidth={2} />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================
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

  // Camera positions optimized for each scene
  const cameraConfig = useMemo(() => {
    switch (type) {
      case "packages":
        return { position: [4, 3, 4] as [number, number, number], target: [0, 0.3, 0] as [number, number, number] };
      case "containers":
        return { position: [6, 4, 6] as [number, number, number], target: [0, 1, 0] as [number, number, number] };
      case "analytics":
        return { position: [4, 3, 4] as [number, number, number], target: [0, 1, 0] as [number, number, number] };
      case "workflow":
        return { position: [5, 3, 5] as [number, number, number], target: [0, 0, 0] as [number, number, number] };
      default:
        return { position: [4, 3, 4] as [number, number, number], target: [0, 0, 0] as [number, number, number] };
    }
  }, [type]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: cameraConfig.position, fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Lighting - exact pattern from production */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <directionalLight position={[-10, 10, -5]} intensity={0.4} />

        {/* Grid floor - from production drei */}
        <Grid
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#4b5563"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#374151"
          fadeDistance={15}
          fadeStrength={1}
          followCamera={false}
          position={[0, 0, 0]}
        />

        {/* Scene content */}
        {renderScene()}

        {/* OrbitControls - from production */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={12}
          target={cameraConfig.target}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
