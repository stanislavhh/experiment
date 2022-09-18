import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Star from 'modules/space/components/Star';
import Sun from 'modules/space/components/Sun';
import Camera from 'modules/space/components/Camera';
import { MAX_DISTANCE } from 'modules/space/constants';
import { getStars } from 'modules/space/utils';

const stars = getStars();

export default function Scene({ nextScene }) {
  const [moving, setMoving] = useState(false);
  const [destroySun, setDestroySun] = useState(false);
  const starsInSun = useRef([]);

  const handleStarMovedToSun = (id) => {
    starsInSun.current.push(id);

    if (stars.length === starsInSun.current.length) {
      setDestroySun(true);
    }
  };

  const sunClick = () => setMoving(!moving);

  const d = Math.floor(MAX_DISTANCE / 3);

  return (
    <Canvas camera={{ position: [d, d, d] }}>
      <Camera maxDistance={MAX_DISTANCE} />
      <pointLight />

      <color attach="background" args={['black']} />
      {stars.map(({ radius, id, position }) => (
        <Star
          sphereRadius={radius}
          position={position}
          key={id}
          move={moving}
          starsInSun={starsInSun}
          onSunMove={handleStarMovedToSun}
        />
      ))}
      <Sun onClick={sunClick} destroy={destroySun} nextScene={nextScene} />
    </Canvas>
  );
}
