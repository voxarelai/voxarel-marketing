"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { VisualizationType } from "./roleData";

// ============================================
// FLOATING BOX - Used in packages scene
// ============================================
function FloatingBox({
  position,
  size,
  color,
  floatSpeed,
  floatHeight,
  rotationSpeed,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  floatSpeed: number;
  floatHeight: number;
  rotationSpeed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y =
        initialY + Math.sin(state.clock.elapsedTime * floatSpeed) * floatHeight;
      // Independent rotation
      meshRef.current.rotation.y += rotationSpeed * 0.01;
      meshRef.current.rotation.x += rotationSpeed * 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.3}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// ============================================
// PACKAGES SCENE - Floating scattered boxes with glow
// ============================================
function PackagesScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const boxes = useMemo(
    () => [
      {
        position: [-1.2, 0.5, 0.3] as [number, number, number],
        size: [0.5, 0.4, 0.4] as [number, number, number],
        color: accentColor,
        floatSpeed: 1.5,
        floatHeight: 0.2,
        rotationSpeed: 2,
      },
      {
        position: [1.0, 0.2, -0.5] as [number, number, number],
        size: [0.4, 0.5, 0.35] as [number, number, number],
        color: "#64748b",
        floatSpeed: 2.0,
        floatHeight: 0.3,
        rotationSpeed: 1.5,
      },
      {
        position: [0, 0.8, 0.5] as [number, number, number],
        size: [0.55, 0.35, 0.45] as [number, number, number],
        color: accentColor,
        floatSpeed: 1.2,
        floatHeight: 0.25,
        rotationSpeed: 3,
      },
      {
        position: [-0.6, -0.2, -0.7] as [number, number, number],
        size: [0.35, 0.35, 0.35] as [number, number, number],
        color: "#94a3b8",
        floatSpeed: 1.8,
        floatHeight: 0.15,
        rotationSpeed: 2.5,
      },
      {
        position: [0.8, 0.6, 0.6] as [number, number, number],
        size: [0.3, 0.45, 0.3] as [number, number, number],
        color: accentColor,
        floatSpeed: 2.2,
        floatHeight: 0.35,
        rotationSpeed: 1,
      },
      {
        position: [-0.3, 0, 0.8] as [number, number, number],
        size: [0.4, 0.3, 0.4] as [number, number, number],
        color: "#cbd5e1",
        floatSpeed: 1.6,
        floatHeight: 0.2,
        rotationSpeed: 2,
      },
      {
        position: [0.5, -0.4, -0.2] as [number, number, number],
        size: [0.35, 0.25, 0.35] as [number, number, number],
        color: "#64748b",
        floatSpeed: 1.9,
        floatHeight: 0.18,
        rotationSpeed: 1.8,
      },
    ],
    [accentColor]
  );

  return (
    <group ref={groupRef}>
      {/* Ambient glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color={accentColor} opacity={0.03} transparent side={THREE.BackSide} />
      </mesh>

      {boxes.map((box, i) => (
        <FloatingBox key={i} {...box} />
      ))}

      {/* Ground reflection plane */}
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#1e293b" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

// ============================================
// CONTAINER SCENE - Shipping container with loading animation
// ============================================
function ContainerScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const boxRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }

    // Animate boxes sliding into container
    boxRefs.current.forEach((box, i) => {
      if (box) {
        const targetX = -0.9 + (i % 3) * 0.6;
        const progress = Math.sin(state.clock.elapsedTime * 0.5 + i * 0.3) * 0.5 + 0.5;
        box.position.x = targetX + (1 - progress) * 2;
        box.material = box.material as THREE.MeshStandardMaterial;
        (box.material as THREE.MeshStandardMaterial).opacity = 0.5 + progress * 0.5;
      }
    });
  });

  // 20ft container proportions: 6.06m x 2.44m x 2.59m (L x W x H)
  const containerLength = 3;
  const containerWidth = 1.2;
  const containerHeight = 1.3;

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Container wireframe */}
      <lineSegments>
        <edgesGeometry
          args={[new THREE.BoxGeometry(containerLength, containerHeight, containerWidth)]}
        />
        <lineBasicMaterial color={accentColor} linewidth={2} />
      </lineSegments>

      {/* Container floor */}
      <mesh position={[0, -containerHeight / 2 + 0.02, 0]}>
        <boxGeometry args={[containerLength - 0.1, 0.04, containerWidth - 0.1]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Container back wall (semi-transparent) */}
      <mesh position={[-containerLength / 2 + 0.02, 0, 0]}>
        <boxGeometry args={[0.04, containerHeight - 0.1, containerWidth - 0.1]} />
        <meshStandardMaterial color={accentColor} opacity={0.2} transparent />
      </mesh>

      {/* Boxes loading into container */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) boxRefs.current[i] = el;
          }}
          position={[
            -0.9 + (i % 3) * 0.6,
            -containerHeight / 2 + 0.25 + Math.floor(i / 3) * 0.45,
            i % 2 === 0 ? 0.2 : -0.2,
          ]}
        >
          <boxGeometry args={[0.5, 0.4, 0.35]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? accentColor : "#64748b"}
            roughness={0.3}
            metalness={0.1}
            transparent
          />
        </mesh>
      ))}

      {/* Progress indicator bar */}
      <mesh position={[0, -containerHeight / 2 - 0.15, 0]}>
        <boxGeometry args={[containerLength, 0.08, 0.08]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[-0.5, -containerHeight / 2 - 0.15, 0]}>
        <boxGeometry args={[containerLength * 0.65, 0.06, 0.06]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} />
      </mesh>

      {/* Fill percentage text indicator (simplified as small sphere) */}
      <mesh position={[1.2, -containerHeight / 2 - 0.15, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// ============================================
// ANALYTICS SCENE - 3D bar chart with floating data
// ============================================
function AnalyticsScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const barRefs = useRef<THREE.Mesh[]>([]);
  const sphereRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }

    // Animate bars pulsing
    barRefs.current.forEach((bar, i) => {
      if (bar) {
        const pulse = Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.05;
        bar.scale.y = 1 + pulse;
      }
    });

    // Animate floating spheres orbiting
    sphereRefs.current.forEach((sphere, i) => {
      if (sphere) {
        const angle = state.clock.elapsedTime * (0.5 + i * 0.1) + i * (Math.PI / 3);
        const radius = 1.5 + i * 0.2;
        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.z = Math.sin(angle) * radius;
        sphere.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.3 + 0.5;
      }
    });
  });

  const bars = [
    { x: -1.2, height: 0.8, color: "#64748b" },
    { x: -0.7, height: 1.4, color: accentColor },
    { x: -0.2, height: 1.0, color: "#94a3b8" },
    { x: 0.3, height: 1.8, color: accentColor },
    { x: 0.8, height: 1.2, color: "#64748b" },
    { x: 1.3, height: 2.0, color: accentColor },
  ];

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Grid floor */}
      <gridHelper args={[4, 8, "#334155", "#1e293b"]} position={[0, 0, 0]} />

      {/* Glowing floor plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial
          color={accentColor}
          opacity={0.05}
          transparent
          emissive={accentColor}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* 3D Bars */}
      {bars.map((bar, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) barRefs.current[i] = el;
          }}
          position={[bar.x, bar.height / 2, 0]}
        >
          <boxGeometry args={[0.35, bar.height, 0.35]} />
          <meshStandardMaterial
            color={bar.color}
            roughness={0.2}
            metalness={0.4}
            emissive={bar.color}
            emissiveIntensity={bar.color === accentColor ? 0.2 : 0.05}
          />
        </mesh>
      ))}

      {/* Floating data spheres */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) sphereRefs.current[i] = el;
          }}
          position={[0, 0.5, 0]}
        >
          <sphereGeometry args={[0.08 + i * 0.02, 16, 16]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? accentColor : "#94a3b8"}
            emissive={i % 2 === 0 ? accentColor : "#94a3b8"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Central axis line */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
        <meshStandardMaterial color="#475569" opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

// ============================================
// WORKFLOW SCENE - Conveyor belt with moving packages
// ============================================
function WorkflowScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const packageRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }

    // Animate packages moving along conveyor
    packageRefs.current.forEach((pkg, i) => {
      if (pkg) {
        // Move from left to right, then reset
        const speed = 0.3;
        const startX = -2;
        const endX = 2;
        const range = endX - startX;

        const offset = ((state.clock.elapsedTime * speed + i * 0.8) % 1) * range;
        pkg.position.x = startX + offset;

        // Slight bounce
        pkg.position.y = -0.15 + Math.abs(Math.sin(offset * 2)) * 0.1;
      }
    });
  });

  const stages = [
    { x: -1.5, label: "IN", color: accentColor },
    { x: 0, label: "PROCESS", color: "#64748b" },
    { x: 1.5, label: "OUT", color: accentColor },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Conveyor belt base */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[4.5, 0.15, 0.8]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Conveyor belt surface (moving texture effect) */}
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[4.2, 0.02, 0.6]} />
        <meshStandardMaterial color="#374151" roughness={0.8} />
      </mesh>

      {/* Conveyor side rails */}
      {[-0.35, 0.35].map((z, i) => (
        <mesh key={i} position={[0, -0.25, z]}>
          <boxGeometry args={[4.5, 0.1, 0.05]} />
          <meshStandardMaterial color="#475569" metalness={0.5} />
        </mesh>
      ))}

      {/* Stage platforms with glow */}
      {stages.map((stage, i) => (
        <group key={i} position={[stage.x, 0, 0]}>
          {/* Platform */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.5, 0.55, 0.12, 24]} />
            <meshStandardMaterial
              color={stage.color}
              emissive={stage.color}
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Glowing ring */}
          <mesh position={[0, -0.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.52, 0.03, 8, 32]} />
            <meshStandardMaterial
              color={stage.color}
              emissive={stage.color}
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Vertical beam */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
            <meshStandardMaterial color="#475569" opacity={0.6} transparent />
          </mesh>
        </group>
      ))}

      {/* Animated flow arrows */}
      {[-0.75, 0.75].map((x, i) => (
        <group key={i} position={[x, -0.15, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh>
            <coneGeometry args={[0.12, 0.25, 3]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}

      {/* Moving packages on conveyor */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) packageRefs.current[i] = el;
          }}
          position={[-2 + i * 1.2, -0.15, 0]}
        >
          <boxGeometry args={[0.3, 0.25, 0.25]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? accentColor : "#94a3b8"}
            roughness={0.3}
            metalness={0.1}
          />
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

  // Different camera positions for each scene type
  const cameraPosition: [number, number, number] = useMemo(() => {
    switch (type) {
      case "packages":
        return [0, 1.5, 4.5];
      case "containers":
        return [2, 1.5, 3.5];
      case "analytics":
        return [0, 2.5, 4];
      case "workflow":
        return [0, 2, 4.5];
      default:
        return [0, 1, 4];
    }
  }, [type]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 3, -5]} intensity={0.4} />
        <pointLight position={[0, 2, 0]} intensity={0.3} color={accentColor} />
        {renderScene()}
      </Canvas>
    </div>
  );
}
