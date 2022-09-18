import React from 'react'
import { usePlane } from "@react-three/cannon";

const PLANE_SIZE = [1000, 1000];

function Plane() {
  const [plane] = usePlane(() => ({
    position: [0, -50, 0],
    args: PLANE_SIZE,
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh ref={plane} name="plane">
      <planeGeometry args={PLANE_SIZE} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}

export default Plane