import { OrbitControls } from '@react-three/drei';
import React from 'react';

function Camera({ maxDistance }) {
  return (
    <>
      <perspectiveCamera
        fov={45}
        aspect={window.innerWidth / window.innerHeight}
        near={-1000}
        far={1000}
      />
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.25}
        enableDamping
        maxDistance={maxDistance}
        minDistance={50}
      />
    </>
  );
}

export default Camera;
