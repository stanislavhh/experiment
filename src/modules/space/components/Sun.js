import React from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';

export default function Sun({ onClick }) {
  const mesh = React.useRef();
  const [active, setActive] = React.useState(false);

  const onPointerOver = () => setActive(true);
  const onPointerOut = () => setActive(false);

  const { scale, color } = useSpring({
    scale: active ? 2 : 1,
    color: active ? 'red' : 'orange'
  })

  useFrame(() => {});

  return (
    <animated.mesh
      layers={0}
      ref={mesh}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      receiveShadow
      position={[0, 0, 0]}
      visible
    >
      <sphereGeometry attach="geometry" args={[25]} />
      <animated.meshBasicMaterial
        opacity={0.7}
        attach="material"
        color={color}
        roughness={0.15}
        metalness={0.1}
        shininess={1}
      />
    </animated.mesh>
  );
}
