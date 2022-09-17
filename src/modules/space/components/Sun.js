import React, { useRef } from 'react';
import { RepeatWrapping} from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useSpring, animated } from '@react-spring/three';
import { useFrame, useLoader } from '@react-three/fiber';
import { SUN_RADIUS } from 'modules/space/constants';
import { vertexSun, fragmentSun, uniformsSun } from 'assets/shaders/Sun';
import dustTexture from 'assets/textures/sundust.png';

function SunDust() {
  const dust = useRef();
  const texture = useLoader(TextureLoader, dustTexture);

  texture.wrapS = RepeatWrapping;
  texture.repeat.set(2, 1);

  useFrame(({ camera }) => {
    dust.current?.lookAt(camera.position);
  });

  return (
    <mesh ref={dust}>
      <sphereGeometry attach="geometry" args={[SUN_RADIUS * 5]} />
      <meshBasicMaterial attach="material" alphaMap={texture} transparent color="white" opacity={.25} />
    </mesh>
  );
}

export default function Sun({ onClick, destroy, nextScene }) {
  const mesh = React.useRef();
  const [active, setActive] = React.useState(false);

  const onPointerOver = () => setActive(true);
  const onPointerOut = () => setActive(false);

  const getSunScale = () => {
    if (destroy) return 0;
    if (active) return 1.1;

    return 1;
  };

  const { scale } = useSpring({
    scale: getSunScale(),
    onRest: ({ value: { scale: nextScale }, finished }) => {
      if (!Number(nextScale) && finished) {
        nextScene();
      }
    },
  });

  useFrame((state) => {
    const { clock } = state;
    mesh.current.material.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <animated.mesh
      ref={mesh}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      position={[0, 0, 0]}
      visible
    >
      <sphereGeometry attach="geometry" args={[SUN_RADIUS]} />
      <shaderMaterial
        fragmentShader={fragmentSun}
        vertexShader={vertexSun}
        uniforms={uniformsSun}
      />
      <SunDust />
    </animated.mesh>
  );
}
