import React from 'react';
import { useSpring, animated } from '@react-spring/three';
import { SUN_RADIUS } from 'modules/space/constants';

export default function Sun({ onClick, destroy, nextScene }) {
  const mesh = React.useRef();
  const [active, setActive] = React.useState(false);

  const onPointerOver = () => setActive(true);
  const onPointerOut = () => setActive(false);

  const getSunScale = () => {
    if (destroy) return 0
    if (active) return 2

    return 1
  }

  const { scale, color } = useSpring({
    scale: getSunScale(),
    color: active ? 'red' : 'orange',
    onRest: ({ value: { scale: nextScale }, finished }) => {
      if (!Number(nextScale) && finished) {
        nextScene();
      }
    },
  });

  return (
    <animated.mesh
      ref={mesh}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      receiveShadow
      position={[0, 0, 0]}
      visible
      on
    >
      <sphereGeometry attach="geometry" args={[SUN_RADIUS]} />
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
