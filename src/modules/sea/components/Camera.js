import { useThree } from '@react-three/fiber';
import React, { useEffect } from 'react';

export default function Camera({ maxDistance }) {
  const { camera } = useThree();

  useEffect(() => {
    const d = Math.floor(maxDistance / 2);
    camera.position.set(-d, d, -d);
    camera.lookAt(0, 7, 0);
  }, []);

  return <perspectiveCamera fov={45} aspect={window.innerWidth / window.innerHeight} far={1000} />;
}
