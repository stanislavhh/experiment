import React from 'react';
import { useFrame } from '@react-three/fiber';

export default function Star({ sphereRadius, position, move, color = '#dbdfe1' }) {
  const mesh = React.useRef();
  const speed = React.useRef(0.1);

  const moveStar = (toZero = true) => {
    if (!move) {
      return
    }

    const { x, y, z } = mesh.current.position;
    const arr = [
      { key: 'x', value: x },
      { key: 'y', value: y },
      { key: 'z', value: z },
    ];

    const max = arr.reduce((res, axis) =>
      Math.abs(res.value) >= Math.abs(axis.value) ? res : axis,
    );

    arr.forEach(({ key, value }) => {
      const v = Math.abs(value / max.value) * speed.current;
      if (toZero) {
        mesh.current.position[key] += value > 0 ? -v : v;
      } else {
        mesh.current.position[key] += value > 0 ? v : -v;
      }
    });

    speed.current += 0.05
  };

  useFrame(() => {
    moveStar();
  });

  return (
    <mesh ref={mesh} receiveShadow position={position} visible>
      <sphereGeometry attach="geometry" args={[sphereRadius]} />
      <meshStandardMaterial
        attach="material"
        color={color}
        roughness={0.15}
        metalness={0.1}
        shininess={1}
      />
    </mesh>
  );
}
