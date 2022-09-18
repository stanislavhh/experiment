import { useThree } from '@react-three/fiber';
import { animated, useSpring, easings } from '@react-spring/three';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

export default function Camera({ maxDistance }) {
  const { camera } = useThree();
  const [fadedIn, setFadedIn] = useState(false);

  useEffect(() => {
    const d = Math.floor(maxDistance / 2);
    camera.position.set(-d, d, -d);
    camera.lookAt(0, 7, 0);
  }, []);

  const { opacity } = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0 },
    onRest: (e) => {
      if (e.finished) {
        setFadedIn(true);
      }
    },
    config: {
      tension:  20,
      easing: easings.easeInOutCubic
    }
  });

  return (
    <>
      <perspectiveCamera fov={45} aspect={window.innerWidth / window.innerHeight} far={1000} />
      {!fadedIn && (
        <animated.mesh
          position={[-15, 0, -20]}
          rotation={[Math.PI, Math.PI / 1.33, 0]}
          material-opacity={opacity}
        >
          <planeGeometry args={[1000, 1000]} />
          <meshBasicMaterial color="black" side={THREE.DoubleSide} transparent />
        </animated.mesh>
      )}
    </>
  );
}
