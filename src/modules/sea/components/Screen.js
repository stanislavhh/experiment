import React from 'react';
import { Text } from '@react-three/drei';
import { useBox } from '@react-three/cannon';

const PLANE_SIZE = [25, 2, 15];

function Screen({ hits }) {
  const [screen] = useBox(() => ({
    position: [-20, 15, 65],
    args: PLANE_SIZE,
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <group ref={screen}>
      <mesh name="plane">
        <boxGeometry args={PLANE_SIZE} />
        <meshBasicMaterial color="#a9a9a9" transparent opacity={0.6} />
      </mesh>
      <Text
        rotation={[Math.PI / 2, Math.PI, 0]}
        position={[0, 1.25, 0]}
        color="white"
        fontSize={12}
      >
        {10 - hits}
      </Text>
    </group>
  );
}

export default Screen;
