import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Star from 'modules/space/components/Star';
import Sun from 'modules/space/components/Sun';
import Camera from 'modules/space/components/Camera';
import { STARS_COUNT, MAX_DISTANCE } from 'modules/space/constants';
import { getRandomPosition } from 'modules/space/utils';

const stars = Array.from({ length: STARS_COUNT }, (_, index) => ({
  id: index,
  radius: 1 + Math.random() * 2,
  position: getRandomPosition(),
}));

export default function Scene() {
  const [moving, setMoving] = useState(false)

  const sunClick = () => setMoving(!moving)

  return (
    <Canvas>
      <Camera maxDistance={MAX_DISTANCE} />
      <pointLight castShadow />
     
      <color attach="background" args={['black']} />
      {stars.map(({ radius, id, position }) => (
        <Star sphereRadius={radius} position={position} key={id} move={moving} />
      ))}
      <Sun onClick={sunClick} />
    </Canvas>
  );
}
