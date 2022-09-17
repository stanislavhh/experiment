import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import React from 'react';

export default function Camera({ maxDistance }) {
  const { camera } = useThree();

  React.useEffect(() => {
    const d = Math.floor(maxDistance / 2);
    camera.position.set(-d, d, -d);
  }, []);

  return (
    <>
      <perspectiveCamera
        fov={45}
        aspect={window.innerWidth / window.innerHeight}
        near={-1000}
        far={1000}
      />
      <OrbitControls enableDamping maxDistance={maxDistance} minDistance={30} />
    </>
  );
}
