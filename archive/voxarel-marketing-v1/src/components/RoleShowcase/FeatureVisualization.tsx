"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { VisualizationType } from "./roleData";

// ============================================
// TOUR SYSTEM TYPES
// ============================================
interface TourStop {
  cameraPosition: [number, number, number];
  lookAt: [number, number, number];
  duration: number; // seconds to stay at this stop
  annotation: {
    position: [number, number, number];
    text: string;
    subtext?: string;
  } | null;
}

interface TourData {
  stops: TourStop[];
  transitionDuration: number; // seconds to transition between stops
}

// ============================================
// TOUR DATA FOR EACH SCENE
// ============================================
const tourDataMap: Record<string, TourData> = {
  dataflow: {
    transitionDuration: 1.5,
    stops: [
      {
        cameraPosition: [-6, 2, 4],
        lookAt: [-3, 0.5, 0],
        duration: 3,
        annotation: { position: [-3, 1.8, 0], text: "Customer Capture", subtext: "Mobile form with Google Maps auto-fill" },
      },
      {
        cameraPosition: [-2, 3, 5],
        lookAt: [0, 0.8, 0],
        duration: 2.5,
        annotation: { position: [0, 1.8, 0.5], text: "Real-time Sync", subtext: "Data flows instantly to package record" },
      },
      {
        cameraPosition: [2, 2.5, 5],
        lookAt: [0, 0.5, 0],
        duration: 2.5,
        annotation: { position: [0, 1.2, 0], text: "Package Created", subtext: "AWB generated automatically" },
      },
      {
        cameraPosition: [5, 2, 4],
        lookAt: [3, 0.5, 0],
        duration: 3,
        annotation: { position: [3, 1.5, 0], text: "Cloud Storage", subtext: "Secure database with instant access" },
      },
      {
        cameraPosition: [0, 4, 8],
        lookAt: [0, 0.5, 0],
        duration: 2,
        annotation: null,
      },
    ],
  },
  orbit: {
    transitionDuration: 1.5,
    stops: [
      {
        cameraPosition: [0, 5, 6],
        lookAt: [0, 0.3, 0],
        duration: 3,
        annotation: { position: [0, 1.2, 0], text: "Package Cart", subtext: "Multi-package shopping cart system" },
      },
      {
        cameraPosition: [5, 3, 3],
        lookAt: [0, 0.3, 0],
        duration: 3,
        annotation: { position: [2, 0.8, 0], text: "Orbiting Packages", subtext: "Drag-and-drop package management" },
      },
      {
        cameraPosition: [0, 2, 5],
        lookAt: [0, 0.3, 0],
        duration: 3,
        annotation: { position: [0, 0.8, 0], text: "Auto-Lock", subtext: "Packages lock into cart when ready" },
      },
      {
        cameraPosition: [5, 4, 5],
        lookAt: [0, 0.3, 0],
        duration: 2,
        annotation: null,
      },
    ],
  },
  awbtree: {
    transitionDuration: 1.5,
    stops: [
      {
        cameraPosition: [-4, 2, 4],
        lookAt: [-2.5, 0.3, 0],
        duration: 3,
        annotation: { position: [-2.5, 1, 0], text: "Label Printer", subtext: "Thermal printing at collection point" },
      },
      {
        cameraPosition: [0, 4, 5],
        lookAt: [0.5, 1.5, 0],
        duration: 3,
        annotation: { position: [0.5, 2.2, 0], text: "Master AWB", subtext: "S-DXB-00001 tracking number" },
      },
      {
        cameraPosition: [2, 2, 5],
        lookAt: [0.5, 0.3, 0],
        duration: 3,
        annotation: { position: [0.5, 0.9, 0], text: "Child AWBs", subtext: "Individual package tracking numbers" },
      },
      {
        cameraPosition: [0, 3, 6],
        lookAt: [0, 0.8, 0],
        duration: 2,
        annotation: null,
      },
    ],
  },
  offlinesync: {
    transitionDuration: 1.5,
    stops: [
      {
        cameraPosition: [0, 2, 5],
        lookAt: [0, 0.5, 0],
        duration: 3,
        annotation: { position: [0, 1.5, 0.5], text: "Mobile Device", subtext: "Offline-first data capture" },
      },
      {
        cameraPosition: [3, 2, 3],
        lookAt: [0, 1, 0],
        duration: 3,
        annotation: { position: [0.8, 0.8, 0], text: "Data Queue", subtext: "Packets stored locally when offline" },
      },
      {
        cameraPosition: [0, 4, 4],
        lookAt: [0, 2, 0],
        duration: 3,
        annotation: { position: [0, 3.5, 0], text: "Cloud Sync", subtext: "Auto-sync when connection restored" },
      },
      {
        cameraPosition: [3, 3, 5],
        lookAt: [0, 1.2, 0],
        duration: 2,
        annotation: null,
      },
    ],
  },
  labelattach: {
    transitionDuration: 1.5,
    stops: [
      {
        cameraPosition: [0, 4, 4],
        lookAt: [0, 2.5, -0.5],
        duration: 3,
        annotation: { position: [0, 3.2, 0], text: "Label Printer", subtext: "Stage 1 label generation" },
      },
      {
        cameraPosition: [2, 2, 4],
        lookAt: [0, 1.2, 0],
        duration: 3,
        annotation: { position: [0.5, 1.8, 0], text: "Label Descends", subtext: "Printed label floats to package" },
      },
      {
        cameraPosition: [3, 1.5, 3],
        lookAt: [0, 0.3, 0],
        duration: 3,
        annotation: { position: [0, 0.9, 0.5], text: "Scan Verification", subtext: "Barcode scan confirms attachment" },
      },
      {
        cameraPosition: [3, 3, 4],
        lookAt: [0, 1.0, 0],
        duration: 2,
        annotation: null,
      },
    ],
  },
  // Default tours for other scene types
  packages: {
    transitionDuration: 1.5,
    stops: [
      {
        cameraPosition: [4, 3, 4],
        lookAt: [0, 0.3, 0],
        duration: 3,
        annotation: { position: [0, 1, 0], text: "Package Collection", subtext: "Multiple packages ready for processing" },
      },
      {
        cameraPosition: [-3, 2, 4],
        lookAt: [0, 0.3, 0],
        duration: 3,
        annotation: null,
      },
      {
        cameraPosition: [4, 3, 4],
        lookAt: [0, 0.3, 0],
        duration: 2,
        annotation: null,
      },
    ],
  },
  containers: {
    transitionDuration: 1.5,
    stops: [
      {
        cameraPosition: [6, 4, 6],
        lookAt: [0, 1, 0],
        duration: 3,
        annotation: { position: [0, 3, 3], text: "20ft Container", subtext: "78% space utilization" },
      },
      {
        cameraPosition: [2, 2, 6],
        lookAt: [0, 1, 0],
        duration: 3,
        annotation: { position: [1, 0.8, 1], text: "Loaded Packages", subtext: "Optimized placement algorithm" },
      },
      {
        cameraPosition: [6, 4, 6],
        lookAt: [0, 1, 0],
        duration: 2,
        annotation: null,
      },
    ],
  },
  analytics: {
    transitionDuration: 1.5,
    stops: [
      {
        cameraPosition: [4, 3, 4],
        lookAt: [0, 1, 0],
        duration: 3,
        annotation: { position: [0, 3.5, 0], text: "Revenue Analytics", subtext: "Real-time performance metrics" },
      },
      {
        cameraPosition: [-3, 2, 4],
        lookAt: [0, 1, 0],
        duration: 3,
        annotation: { position: [1.5, 2, 0], text: "Growth Trend", subtext: "Month-over-month comparison" },
      },
      {
        cameraPosition: [4, 3, 4],
        lookAt: [0, 1, 0],
        duration: 2,
        annotation: null,
      },
    ],
  },
  workflow: {
    transitionDuration: 1.5,
    stops: [
      {
        cameraPosition: [-4, 3, 5],
        lookAt: [-2, 0, 0],
        duration: 3,
        annotation: { position: [-2, 0.8, 0], text: "Collect", subtext: "Field agent pickup" },
      },
      {
        cameraPosition: [0, 3, 5],
        lookAt: [0, 0, 0],
        duration: 3,
        annotation: { position: [0, 0.8, 0], text: "Process", subtext: "Warehouse handling" },
      },
      {
        cameraPosition: [4, 3, 5],
        lookAt: [2, 0, 0],
        duration: 3,
        annotation: { position: [2, 0.8, 0], text: "Ship", subtext: "Container loading" },
      },
      {
        cameraPosition: [5, 3, 5],
        lookAt: [0, 0, 0],
        duration: 2,
        annotation: null,
      },
    ],
  },
};

// ============================================
// ANNOTATION COMPONENT
// ============================================
function Annotation({
  position,
  text,
  subtext,
  visible
}: {
  position: [number, number, number];
  text: string;
  subtext?: string;
  visible: boolean;
}) {
  return (
    <Html
      position={position}
      center
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
        pointerEvents: "none",
      }}
    >
      <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 shadow-xl whitespace-nowrap">
        <p className="text-white text-sm font-semibold">{text}</p>
        {subtext && <p className="text-zinc-400 text-xs">{subtext}</p>}
      </div>
    </Html>
  );
}

// ============================================
// TOUR CAMERA CONTROLLER
// ============================================
function TourCamera({
  tourData,
  isManualMode,
  onAnnotationChange,
}: {
  tourData: TourData;
  isManualMode: boolean;
  onAnnotationChange: (annotation: TourStop["annotation"], visible: boolean) => void;
}) {
  const { camera } = useThree();
  const timeRef = useRef(0);
  const currentStopRef = useRef(0);
  const isTransitioningRef = useRef(false);

  // Pre-calculate total duration of tour
  const totalDuration = useMemo(() => {
    return tourData.stops.reduce((acc, stop) => acc + stop.duration + tourData.transitionDuration, 0);
  }, [tourData]);

  useFrame((_, delta) => {
    if (isManualMode) return;

    timeRef.current += delta;

    // Calculate current position in tour
    let accumulatedTime = 0;
    let currentStop = 0;
    let timeInCurrentSegment = timeRef.current % totalDuration;

    for (let i = 0; i < tourData.stops.length; i++) {
      const stopDuration = tourData.stops[i].duration;
      const transitionDuration = tourData.transitionDuration;
      const segmentDuration = stopDuration + transitionDuration;

      if (timeInCurrentSegment < accumulatedTime + segmentDuration) {
        currentStop = i;
        timeInCurrentSegment -= accumulatedTime;
        break;
      }
      accumulatedTime += segmentDuration;
    }

    const stop = tourData.stops[currentStop];
    const nextStop = tourData.stops[(currentStop + 1) % tourData.stops.length];
    const timeInStop = timeInCurrentSegment;

    // Determine if we're in transition or holding
    const isInTransition = timeInStop > stop.duration;
    const transitionProgress = isInTransition
      ? (timeInStop - stop.duration) / tourData.transitionDuration
      : 0;

    // Update annotation visibility
    if (currentStopRef.current !== currentStop || isTransitioningRef.current !== isInTransition) {
      currentStopRef.current = currentStop;
      isTransitioningRef.current = isInTransition;

      if (!isInTransition && stop.annotation) {
        onAnnotationChange(stop.annotation, true);
      } else {
        onAnnotationChange(null, false);
      }
    }

    // Smooth easing function
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Calculate camera position
    let targetPos: THREE.Vector3;
    let targetLookAt: THREE.Vector3;

    if (isInTransition) {
      const t = easeInOutCubic(transitionProgress);
      targetPos = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(...stop.cameraPosition),
        new THREE.Vector3(...nextStop.cameraPosition),
        t
      );
      targetLookAt = new THREE.Vector3().lerpVectors(
        new THREE.Vector3(...stop.lookAt),
        new THREE.Vector3(...nextStop.lookAt),
        t
      );
    } else {
      targetPos = new THREE.Vector3(...stop.cameraPosition);
      targetLookAt = new THREE.Vector3(...stop.lookAt);
    }

    // Smoothly interpolate camera
    camera.position.lerp(targetPos, 0.05);

    // Look at target
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    currentLookAt.lerp(targetLookAt, 0.05);
    camera.lookAt(targetLookAt);
  });

  return null;
}

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
// DATAFLOW SCENE - Customer data flowing to package to system
// For Customer Capture feature
// ============================================
function DataflowScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const particleRefs = useRef<THREE.Mesh[]>([]);
  const packageRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }

    // Animate particles flowing left to right
    particleRefs.current.forEach((particle, i) => {
      if (particle) {
        const speed = 0.4;
        const offset = ((state.clock.elapsedTime * speed + i * 0.15) % 1);

        // Flow from customer (-3) to system (+3)
        particle.position.x = -3 + offset * 6;

        // Arc path - rise up in middle
        particle.position.y = 0.8 + Math.sin(offset * Math.PI) * 0.8;

        // Slight z wobble
        particle.position.z = Math.sin(offset * Math.PI * 2 + i) * 0.2;

        // Pulse size
        const scale = 0.8 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2;
        particle.scale.setScalar(scale);
      }
    });

    // Package pulse effect when "receiving" data
    if (packageRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      packageRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef}>
      {/* CUSTOMER FIGURE (Left side) */}
      <group position={[-3, 0, 0]}>
        {/* Body - cylinder */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.8, 16]} />
          <meshStandardMaterial color={accentColor} opacity={0.9} transparent roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Head - sphere */}
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color={accentColor} opacity={0.9} transparent roughness={0.5} metalness={0.2} />
        </mesh>
        {/* Base platform */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.4, 0.45, 0.1, 16]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        {/* Label */}
        <Text position={[0, -0.2, 0]} fontSize={0.15} color="#94a3b8" anchorX="center">
          CUSTOMER
        </Text>
      </group>

      {/* PACKAGE (Center) */}
      <group position={[0, 0, 0]}>
        <mesh ref={packageRef} position={[0, 0.5, 0]}>
          <boxGeometry args={[0.6, 0.5, 0.5]} />
          <meshStandardMaterial color={accentColor} opacity={0.8} transparent roughness={0.5} metalness={0.2} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.6, 0.5, 0.5)]} />
            <lineBasicMaterial color="#1a202c" linewidth={2} />
          </lineSegments>
        </mesh>
        {/* Glow ring around package */}
        <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.02, 8, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} transparent opacity={0.6} />
        </mesh>
        {/* Base platform */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.5, 0.55, 0.1, 16]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        {/* Label */}
        <Text position={[0, -0.2, 0]} fontSize={0.15} color="#94a3b8" anchorX="center">
          PACKAGE
        </Text>
      </group>

      {/* SYSTEM/CLOUD (Right side) */}
      <group position={[3, 0, 0]}>
        {/* Cloud shape - stacked rounded elements */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.7, 0.5, 0.4]} />
          <meshStandardMaterial color="#64748b" opacity={0.9} transparent roughness={0.5} metalness={0.3} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.7, 0.5, 0.4)]} />
            <lineBasicMaterial color="#1a202c" linewidth={2} />
          </lineSegments>
        </mesh>
        {/* Server lights */}
        <mesh position={[-0.2, 0.7, 0.21]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0, 0.7, 0.21]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0.2, 0.7, 0.21]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1} />
        </mesh>
        {/* Base platform */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.5, 0.55, 0.1, 16]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
        {/* Label */}
        <Text position={[0, -0.2, 0]} fontSize={0.15} color="#94a3b8" anchorX="center">
          SYSTEM
        </Text>
      </group>

      {/* FLOWING DATA PARTICLES */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particleRefs.current[i] = el;
          }}
          position={[-3 + i * 0.8, 0.8, 0]}
        >
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? accentColor : "#94a3b8"}
            emissive={i % 2 === 0 ? accentColor : "#94a3b8"}
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Connection lines (subtle) */}
      <mesh position={[-1.5, 0.05, 0]}>
        <boxGeometry args={[3, 0.02, 0.1]} />
        <meshStandardMaterial color="#475569" opacity={0.5} transparent />
      </mesh>
      <mesh position={[1.5, 0.05, 0]}>
        <boxGeometry args={[3, 0.02, 0.1]} />
        <meshStandardMaterial color="#475569" opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

// ============================================
// ORBIT SCENE - Packages orbiting around cart hub
// For Package Cart feature
// ============================================
function OrbitScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbitingRefs = useRef<THREE.Group[]>([]);
  const lockedRefs = useRef<THREE.Mesh[]>([]);

  // Track which packages are "locked" into the cart
  const lockedIndices = useRef<Set<number>>(new Set());

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
    }

    // Animate orbiting packages
    orbitingRefs.current.forEach((orbitGroup, i) => {
      if (orbitGroup && !lockedIndices.current.has(i)) {
        const speed = 0.3 + i * 0.08;
        const radius = 1.8 + i * 0.3;
        const angle = state.clock.elapsedTime * speed + i * (Math.PI / 3);

        orbitGroup.position.x = Math.cos(angle) * radius;
        orbitGroup.position.z = Math.sin(angle) * radius;
        orbitGroup.position.y = 0.4 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.15;

        // Rotate package itself
        orbitGroup.rotation.y += delta * 0.5;
      }
    });

    // Periodically "lock" a package into the cart
    const lockCycle = Math.floor(state.clock.elapsedTime / 3) % 6;
    if (!lockedIndices.current.has(lockCycle)) {
      lockedIndices.current.add(lockCycle);

      // Move to locked position
      const orbitGroup = orbitingRefs.current[lockCycle];
      if (orbitGroup) {
        const lockPositions = [
          [0.4, 0.3, 0.4],
          [-0.4, 0.3, 0.4],
          [0.4, 0.3, -0.4],
          [-0.4, 0.3, -0.4],
          [0, 0.6, 0.4],
          [0, 0.6, -0.4],
        ];
        const pos = lockPositions[lockCycle];
        orbitGroup.position.set(pos[0], pos[1], pos[2]);
        orbitGroup.rotation.set(0, 0, 0);
      }
    }

    // Reset cycle after all locked
    if (lockedIndices.current.size >= 6) {
      if (state.clock.elapsedTime % 18 < 0.1) {
        lockedIndices.current.clear();
      }
    }

    // Pulse locked packages
    lockedRefs.current.forEach((mesh, i) => {
      if (mesh && lockedIndices.current.has(i)) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.1;
        mesh.scale.setScalar(pulse);
      }
    });
  });

  const orbitingPackages = [
    { size: [0.35, 0.28, 0.3] as [number, number, number], color: accentColor },
    { size: [0.3, 0.35, 0.28] as [number, number, number], color: "#64748b" },
    { size: [0.32, 0.3, 0.32] as [number, number, number], color: accentColor },
    { size: [0.28, 0.32, 0.3] as [number, number, number], color: "#94a3b8" },
    { size: [0.34, 0.28, 0.34] as [number, number, number], color: accentColor },
    { size: [0.3, 0.3, 0.28] as [number, number, number], color: "#64748b" },
  ];

  return (
    <group ref={groupRef}>
      {/* CENTRAL CART HUB */}
      <group position={[0, 0, 0]}>
        {/* Cart base */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.6, 0.7, 0.3, 24]} />
          <meshStandardMaterial color="#374151" opacity={0.9} transparent />
        </mesh>

        {/* Cart rim - glowing */}
        <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.65, 0.04, 8, 32]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.6} />
        </mesh>

        {/* Cart icon representation - simplified basket */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.8, 0.15, 0.8]} />
          <meshStandardMaterial color={accentColor} opacity={0.3} transparent wireframe />
        </mesh>

        {/* Central glow */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Label */}
        <Text position={[0, -0.15, 0]} fontSize={0.15} color="#94a3b8" anchorX="center">
          CART
        </Text>
      </group>

      {/* ORBITING PACKAGES */}
      {orbitingPackages.map((pkg, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) orbitingRefs.current[i] = el;
          }}
          position={[1.8 + i * 0.3, 0.4, 0]}
        >
          <mesh
            ref={(el) => {
              if (el) lockedRefs.current[i] = el;
            }}
          >
            <boxGeometry args={pkg.size} />
            <meshStandardMaterial color={pkg.color} opacity={0.85} transparent roughness={0.5} metalness={0.2} />
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(...pkg.size)]} />
              <lineBasicMaterial color="#1a202c" linewidth={2} />
            </lineSegments>
          </mesh>
        </group>
      ))}

      {/* Orbit trail rings */}
      {[1.8, 2.4, 3.0].map((radius, i) => (
        <mesh key={i} position={[0, 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.008, 8, 64]} />
          <meshStandardMaterial color="#475569" opacity={0.3} transparent />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// AWB TREE SCENE - Master AWB with child branches + printer
// For AWB Generation feature
// ============================================
function AWBTreeScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const labelRefs = useRef<THREE.Group[]>([]);
  const printerLabelRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
    }

    // Animate label emerging from printer
    if (printerLabelRef.current) {
      const cycle = (state.clock.elapsedTime * 0.3) % 1;
      printerLabelRef.current.position.y = -0.3 + cycle * 0.8;
      printerLabelRef.current.material = printerLabelRef.current.material as THREE.MeshStandardMaterial;
      (printerLabelRef.current.material as THREE.MeshStandardMaterial).opacity = cycle < 0.8 ? 0.9 : 0.9 - (cycle - 0.8) * 4.5;
    }

    // Pulse child labels
    labelRefs.current.forEach((label, i) => {
      if (label) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.05;
        label.scale.setScalar(pulse);
      }
    });
  });

  const childAWBs = [
    { x: -1.2, label: "001" },
    { x: 0, label: "002" },
    { x: 1.2, label: "003" },
  ];

  return (
    <group ref={groupRef}>
      {/* PRINTER */}
      <group position={[-2.5, 0, 0]}>
        {/* Printer body */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.8, 0.5, 0.6]} />
          <meshStandardMaterial color="#374151" roughness={0.7} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.5, 0.6)]} />
            <lineBasicMaterial color="#1a202c" />
          </lineSegments>
        </mesh>
        {/* Printer slot */}
        <mesh position={[0, 0.55, 0.2]}>
          <boxGeometry args={[0.5, 0.05, 0.15]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Status light */}
        <mesh position={[0.3, 0.4, 0.31]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1} />
        </mesh>
        {/* Emerging label */}
        <mesh ref={printerLabelRef} position={[0, 0.2, 0.2]}>
          <boxGeometry args={[0.4, 0.25, 0.02]} />
          <meshStandardMaterial color="#ffffff" opacity={0.9} transparent />
        </mesh>
        {/* Label */}
        <Text position={[0, -0.1, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
          PRINTER
        </Text>
      </group>

      {/* MASTER AWB */}
      <group position={[0.5, 1.5, 0]}>
        {/* Master label card */}
        <mesh>
          <boxGeometry args={[1.2, 0.6, 0.08]} />
          <meshStandardMaterial color={accentColor} opacity={0.9} transparent roughness={0.3} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.2, 0.6, 0.08)]} />
            <lineBasicMaterial color="#1a202c" />
          </lineSegments>
        </mesh>
        {/* Barcode lines */}
        {[-0.35, -0.2, -0.05, 0.1, 0.25, 0.4].map((x, i) => (
          <mesh key={i} position={[x, -0.1, 0.05]}>
            <boxGeometry args={[0.08 + (i % 2) * 0.04, 0.15, 0.01]} />
            <meshStandardMaterial color="#1a202c" />
          </mesh>
        ))}
        {/* AWB Number */}
        <Text position={[0, 0.15, 0.05]} fontSize={0.1} color="#1a202c" anchorX="center" fontWeight="bold">
          S-DXB-00001
        </Text>
        {/* Master label */}
        <Text position={[0, -0.45, 0]} fontSize={0.1} color="#94a3b8" anchorX="center">
          MASTER AWB
        </Text>
      </group>

      {/* CONNECTING LINES from master to children */}
      {childAWBs.map((child, i) => (
        <group key={`line-${i}`}>
          {/* Vertical line from master */}
          <mesh position={[0.5, 1.1, 0]}>
            <boxGeometry args={[0.02, 0.3, 0.02]} />
            <meshStandardMaterial color={accentColor} opacity={0.6} transparent />
          </mesh>
          {/* Horizontal spread line */}
          <mesh position={[0.5, 0.95, 0]}>
            <boxGeometry args={[2.6, 0.02, 0.02]} />
            <meshStandardMaterial color={accentColor} opacity={0.6} transparent />
          </mesh>
          {/* Vertical line to child */}
          <mesh position={[0.5 + child.x, 0.7, 0]}>
            <boxGeometry args={[0.02, 0.5, 0.02]} />
            <meshStandardMaterial color={accentColor} opacity={0.6} transparent />
          </mesh>
        </group>
      ))}

      {/* CHILD AWBs */}
      {childAWBs.map((child, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) labelRefs.current[i] = el;
          }}
          position={[0.5 + child.x, 0.3, 0]}
        >
          {/* Child label card */}
          <mesh>
            <boxGeometry args={[0.8, 0.45, 0.06]} />
            <meshStandardMaterial color="#64748b" opacity={0.9} transparent roughness={0.3} />
            <lineSegments>
              <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.45, 0.06)]} />
              <lineBasicMaterial color="#1a202c" />
            </lineSegments>
          </mesh>
          {/* Mini barcode */}
          {[-0.2, -0.1, 0, 0.1, 0.2].map((x, j) => (
            <mesh key={j} position={[x, -0.05, 0.04]}>
              <boxGeometry args={[0.05 + (j % 2) * 0.02, 0.1, 0.01]} />
              <meshStandardMaterial color="#1a202c" />
            </mesh>
          ))}
          {/* Child AWB number */}
          <Text position={[0, 0.1, 0.04]} fontSize={0.08} color="#1a202c" anchorX="center">
            {`S-DXB-00001-${child.label}`}
          </Text>
          {/* Glow ring */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <torusGeometry args={[0.5, 0.015, 8, 32]} />
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.3} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Base platform */}
      <mesh position={[0.5, -0.1, 0]}>
        <boxGeometry args={[4, 0.05, 2]} />
        <meshStandardMaterial color="#1e293b" opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

// ============================================
// OFFLINE SYNC SCENE - Futuristic offline/online sync
// For Offline Mode feature
// ============================================
function OfflineSyncScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const dataPacketRefs = useRef<THREE.Mesh[]>([]);
  const syncBeamRefs = useRef<THREE.Mesh[]>([]);
  const ringRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
    }

    // Cycle: 0-5s offline, 5-10s syncing/online, repeat
    const cycleTime = state.clock.elapsedTime % 10;
    const isOffline = cycleTime < 5;
    const isSyncing = cycleTime >= 5 && cycleTime < 7;
    const isOnline = cycleTime >= 7;

    // Cloud color transition
    if (cloudRef.current) {
      const material = cloudRef.current.material as THREE.MeshStandardMaterial;
      if (isOffline) {
        material.color.setHex(0xef4444); // red
        material.emissive.setHex(0xef4444);
        material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        material.color.setHex(0x22c55e); // green
        material.emissive.setHex(0x22c55e);
        material.emissiveIntensity = 0.5;
      }
    }

    // Data packets - queue when offline, stream up when syncing
    dataPacketRefs.current.forEach((packet, i) => {
      if (packet) {
        if (isOffline) {
          // Queue around device
          const angle = (i / 6) * Math.PI * 2 + state.clock.elapsedTime * 0.5;
          const radius = 0.8;
          packet.position.x = Math.cos(angle) * radius;
          packet.position.z = Math.sin(angle) * radius;
          packet.position.y = 0.3 + i * 0.15 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1;
          packet.scale.setScalar(1);
          (packet.material as THREE.MeshStandardMaterial).opacity = 0.9;
        } else if (isSyncing || isOnline) {
          // Stream up to cloud
          const syncProgress = ((cycleTime - 5) * 0.5 + i * 0.15) % 1;
          packet.position.x = Math.sin(syncProgress * Math.PI * 2) * 0.3;
          packet.position.z = Math.cos(syncProgress * Math.PI * 2) * 0.3;
          packet.position.y = 0.5 + syncProgress * 2.5;
          packet.scale.setScalar(1 - syncProgress * 0.5);
          (packet.material as THREE.MeshStandardMaterial).opacity = 1 - syncProgress;
        }
      }
    });

    // Sync beams - only visible when syncing
    syncBeamRefs.current.forEach((beam, i) => {
      if (beam) {
        const visible = isSyncing || isOnline;
        (beam.material as THREE.MeshStandardMaterial).opacity = visible ? 0.4 + Math.sin(state.clock.elapsedTime * 5 + i) * 0.2 : 0;
      }
    });

    // Rotating sci-fi rings
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += delta * (0.3 + i * 0.2) * (i % 2 === 0 ? 1 : -1);
        ring.rotation.x = Math.sin(state.clock.elapsedTime + i) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* HOLOGRAPHIC DEVICE */}
      <group position={[0, 0.5, 0]}>
        {/* Device frame - wireframe style */}
        <mesh>
          <boxGeometry args={[0.8, 1.2, 0.1]} />
          <meshStandardMaterial color={accentColor} wireframe opacity={0.8} transparent />
        </mesh>
        {/* Device screen */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[0.65, 1.0, 0.02]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.2}
            opacity={0.3}
            transparent
          />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[0.7, 1.05]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.5}
            opacity={0.2}
            transparent
          />
        </mesh>
        {/* Holographic rings around device */}
        {[0.6, 0.8, 1.0].map((radius, i) => (
          <mesh
            key={i}
            ref={(el) => { if (el) ringRefs.current[i] = el; }}
            position={[0, 0, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[radius, 0.01, 8, 32]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={0.5}
              opacity={0.4}
              transparent
            />
          </mesh>
        ))}
      </group>

      {/* CLOUD */}
      <group position={[0, 2.8, 0]}>
        <mesh ref={cloudRef}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.3} opacity={0.8} transparent />
        </mesh>
        {/* Cloud bumps */}
        {[[-0.35, 0, 0], [0.35, 0, 0], [0, 0, 0.3], [0, 0, -0.3]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.25, 12, 12]} />
            <meshStandardMaterial color="#64748b" opacity={0.6} transparent />
          </mesh>
        ))}
        {/* Cloud label */}
        <Text position={[0, -0.7, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
          CLOUD
        </Text>
      </group>

      {/* SYNC BEAMS */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) syncBeamRefs.current[i] = el; }}
          position={[-0.2 + i * 0.2, 1.8, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.8}
            opacity={0}
            transparent
          />
        </mesh>
      ))}

      {/* DATA PACKETS */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) dataPacketRefs.current[i] = el; }}
          position={[0.8, 0.5 + i * 0.2, 0]}
        >
          <octahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? accentColor : "#94a3b8"}
            emissive={i % 2 === 0 ? accentColor : "#94a3b8"}
            emissiveIntensity={0.6}
            opacity={0.9}
            transparent
          />
        </mesh>
      ))}

      {/* STATUS LABELS */}
      <Text position={[0, -0.3, 0]} fontSize={0.12} color="#94a3b8" anchorX="center">
        DEVICE
      </Text>

      {/* Base platform with glow */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.2, 1.3, 0.1, 24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.03, 8, 32]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

// ============================================
// LABEL ATTACH SCENE - Label floating down to attach to package
// For Label Printing feature
// ============================================
function LabelAttachScene({ accentColor }: { accentColor: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const labelRef = useRef<THREE.Group>(null);
  const packageRef = useRef<THREE.Mesh>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const glowRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }

    // 4-second cycle: label descends, attaches, scan, reset
    const cycleTime = state.clock.elapsedTime % 4;
    const descending = cycleTime < 1.5;
    const attaching = cycleTime >= 1.5 && cycleTime < 2;
    const scanning = cycleTime >= 2 && cycleTime < 3;
    const complete = cycleTime >= 3;

    // Label animation
    if (labelRef.current) {
      if (descending) {
        // Float down
        const progress = cycleTime / 1.5;
        labelRef.current.position.y = 2 - progress * 1.5;
        labelRef.current.position.x = Math.sin(cycleTime * 3) * 0.1;
        labelRef.current.rotation.z = Math.sin(cycleTime * 2) * 0.1;
      } else if (attaching || scanning) {
        // Attached to package
        labelRef.current.position.y = 0.52;
        labelRef.current.position.x = 0;
        labelRef.current.position.z = 0.26;
        labelRef.current.rotation.z = 0;
      } else {
        // Reset to top
        labelRef.current.position.y = 2;
        labelRef.current.position.x = 0;
        labelRef.current.position.z = 0;
      }
    }

    // Package pulse when label attaches
    if (packageRef.current) {
      if (attaching) {
        const pulse = 1 + Math.sin((cycleTime - 1.5) * 20) * 0.05;
        packageRef.current.scale.setScalar(pulse);
      } else {
        packageRef.current.scale.setScalar(1);
      }
    }

    // Scan line animation
    if (scanLineRef.current) {
      if (scanning) {
        const scanProgress = (cycleTime - 2) / 1;
        scanLineRef.current.position.x = -0.4 + scanProgress * 0.8;
        (scanLineRef.current.material as THREE.MeshStandardMaterial).opacity = 0.8;
      } else {
        (scanLineRef.current.material as THREE.MeshStandardMaterial).opacity = 0;
      }
    }

    // Glow ring on completion
    if (glowRingRef.current) {
      if (complete || scanning) {
        const glowIntensity = scanning ? (cycleTime - 2) : 1;
        (glowRingRef.current.material as THREE.MeshStandardMaterial).opacity = glowIntensity * 0.6;
        glowRingRef.current.scale.setScalar(1 + (complete ? Math.sin(state.clock.elapsedTime * 5) * 0.1 : 0));
      } else {
        (glowRingRef.current.material as THREE.MeshStandardMaterial).opacity = 0;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* PACKAGE */}
      <group position={[0, 0.3, 0]}>
        <mesh ref={packageRef}>
          <boxGeometry args={[0.7, 0.5, 0.5]} />
          <meshStandardMaterial color="#64748b" opacity={0.9} transparent roughness={0.5} metalness={0.2} />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.7, 0.5, 0.5)]} />
            <lineBasicMaterial color="#1a202c" />
          </lineSegments>
        </mesh>

        {/* Glow ring around package */}
        <mesh
          ref={glowRingRef}
          position={[0, 0, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.6, 0.03, 8, 32]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={0.8}
            opacity={0}
            transparent
          />
        </mesh>

        {/* Scan line */}
        <mesh
          ref={scanLineRef}
          position={[0, 0, 0.26]}
        >
          <boxGeometry args={[0.02, 0.6, 0.01]} />
          <meshStandardMaterial
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={1}
            opacity={0}
            transparent
          />
        </mesh>
      </group>

      {/* FLOATING LABEL */}
      <group ref={labelRef} position={[0, 2, 0]}>
        {/* Label card */}
        <mesh>
          <boxGeometry args={[0.5, 0.35, 0.02]} />
          <meshStandardMaterial color="#ffffff" opacity={0.95} transparent />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.35, 0.02)]} />
            <lineBasicMaterial color="#1a202c" />
          </lineSegments>
        </mesh>
        {/* Barcode on label */}
        {[-0.15, -0.08, 0, 0.08, 0.15].map((x, i) => (
          <mesh key={i} position={[x, -0.05, 0.015]}>
            <boxGeometry args={[0.04 + (i % 2) * 0.02, 0.12, 0.005]} />
            <meshStandardMaterial color="#1a202c" />
          </mesh>
        ))}
        {/* Label text */}
        <Text position={[0, 0.08, 0.015]} fontSize={0.05} color="#1a202c" anchorX="center">
          STAGE 1
        </Text>
        {/* Glow trail */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.3, 0.4, 0.01]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.3}
            opacity={0.2}
            transparent
          />
        </mesh>
      </group>

      {/* PRINTER (background) */}
      <group position={[0, 2.5, -0.5]}>
        <mesh>
          <boxGeometry args={[0.8, 0.4, 0.3]} />
          <meshStandardMaterial color="#374151" />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.4, 0.3)]} />
            <lineBasicMaterial color="#1a202c" />
          </lineSegments>
        </mesh>
        {/* Printer slot */}
        <mesh position={[0, -0.2, 0.1]}>
          <boxGeometry args={[0.5, 0.03, 0.1]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Status light */}
        <mesh position={[0.3, 0.1, 0.16]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1} />
        </mesh>
        <Text position={[0, 0.35, 0]} fontSize={0.1} color="#94a3b8" anchorX="center">
          PRINTER
        </Text>
      </group>

      {/* Labels */}
      <Text position={[0, -0.15, 0]} fontSize={0.1} color="#94a3b8" anchorX="center">
        PACKAGE
      </Text>

      {/* Base platform */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.1, 24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.02, 8, 32]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.4} />
      </mesh>
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
  const [isManualMode, setIsManualMode] = useState(false);
  const [currentAnnotation, setCurrentAnnotation] = useState<TourStop["annotation"] | null>(null);
  const [annotationVisible, setAnnotationVisible] = useState(false);

  // Reset tour when type changes
  useEffect(() => {
    setIsManualMode(false);
    setCurrentAnnotation(null);
    setAnnotationVisible(false);
  }, [type]);

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
      case "dataflow":
        return <DataflowScene accentColor={accentColor} />;
      case "orbit":
        return <OrbitScene accentColor={accentColor} />;
      case "awbtree":
        return <AWBTreeScene accentColor={accentColor} />;
      case "offlinesync":
        return <OfflineSyncScene accentColor={accentColor} />;
      case "labelattach":
        return <LabelAttachScene accentColor={accentColor} />;
      default:
        return <PackagesScene accentColor={accentColor} />;
    }
  };

  // Get tour data for current scene type
  const tourData = useMemo(() => {
    return tourDataMap[type] || tourDataMap.packages;
  }, [type]);

  // Initial camera position from first tour stop
  const initialCameraPosition = useMemo(() => {
    return tourData.stops[0]?.cameraPosition || [4, 3, 4] as [number, number, number];
  }, [tourData]);

  // Handle annotation changes from tour camera
  const handleAnnotationChange = (annotation: TourStop["annotation"], visible: boolean) => {
    setCurrentAnnotation(annotation);
    setAnnotationVisible(visible);
  };

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: initialCameraPosition, fov: 50 }}
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

        {/* Tour Camera Controller */}
        <TourCamera
          tourData={tourData}
          isManualMode={isManualMode}
          onAnnotationChange={handleAnnotationChange}
        />

        {/* Annotation overlay in 3D space */}
        {currentAnnotation && (
          <Annotation
            position={currentAnnotation.position}
            text={currentAnnotation.text}
            subtext={currentAnnotation.subtext}
            visible={annotationVisible}
          />
        )}

        {/* OrbitControls - only enabled in manual mode */}
        {isManualMode && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={12}
          />
        )}
      </Canvas>

      {/* Control button overlay */}
      <button
        onClick={() => setIsManualMode(!isManualMode)}
        className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-white/80 hover:text-white hover:bg-black/80 transition-all flex items-center gap-1.5"
      >
        {isManualMode ? (
          <>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Auto Tour
          </>
        ) : (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Take Control
          </>
        )}
      </button>
    </div>
  );
}
