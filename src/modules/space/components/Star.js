import React from 'react';
import { useFrame } from '@react-three/fiber';
import { SUN_RADIUS } from 'modules/space/constants';

export default function Star({ sphereRadius, position, move, onSunMove, color = '#dbdfe1' }) {
  const mesh = React.useRef();
  const speed = React.useRef(0.1);
  const [insideSun, setInsideSun] = React.useState(false)

  const moveStar = (t) => {
    let { x, y, z } = mesh.current.position;
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
      mesh.current.position[key] += value > 0 ? -v : v;
    });

    ({ x, y, z } = mesh.current.position)

    if ([x,y,z].every((p) => Math.abs(p) < SUN_RADIUS)) {
      setInsideSun(true)
      onSunMove(mesh.current.uuid)
    }
    speed.current += (0.01 + t / 1000)
  };

  useFrame(({ clock }) => {
    if (insideSun) return
    
    if (move) {
      moveStar(clock.getElapsedTime())
    }
  });

  if (insideSun) return null

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
