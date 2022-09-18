import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { Sky } from '@react-three/drei';
import Camera from 'modules/sea/components/Camera';
import Sea from 'modules/sea/components/Sea';
import Float from 'modules/sea/components/Float';
import Ball from 'modules/sea/components/Ball';
import Plane from 'modules/sea/components/Plane';
import Screen from 'modules/sea/components/Screen';
import Seagull from 'modules/sea/components/Seagull';
import {
  MAX_CAMERA_DISTANCE,
  VIEW_SIZE,
  SUN_PARAMS,
  DEFAULT_CONTACT_PHYSICS_MATERIAL,
} from 'modules/sea/constants';

export default function Scene({ nextScene }) {
  const sunPosition = useRef(new THREE.Vector3());
  const [hits, setHits] = useState(0);

  sunPosition.current.setFromSphericalCoords(
    1,
    THREE.MathUtils.degToRad(90 - SUN_PARAMS.elevation),
    SUN_PARAMS.azimuth,
  );
  const sunPositionArray = [sunPosition.current.x, sunPosition.current.y, sunPosition.current.z];

  const handleHit = (e) => {

    setHits((prev) => {
      if (prev === 10) return prev
      return e === 'increase' ? prev + 1 : 0;
    });
  };

  useEffect(() => {
    if (hits === 10) {
      // Do
      setTimeout(nextScene, 2000);
    }
  }, [hits]);

  return (
    <Canvas shadows>
      <Camera maxDistance={MAX_CAMERA_DISTANCE} />
      <spotLight castShadow intensity={20} position={[500, 20, 800]} />
      <pointLight castShadow position={[90, 50, 130]} intensity={5} />
      <ambientLight intensity={1} />
      <Physics
        size={4}
        gravity={[0, -50, 0]}
        defaultContactMaterial={DEFAULT_CONTACT_PHYSICS_MATERIAL}
      >
        <Float />
        <Ball onHit={handleHit} />
        <Plane />
        <Screen hits={hits} />
      </Physics>
      <Seagull />
      <Sky
        distance={VIEW_SIZE}
        sunPosition={sunPositionArray}
        rayleigh={SUN_PARAMS.rayleigh}
        azimuth={SUN_PARAMS.azimuth}
      />
      <Sea sunDirection={sunPosition.current.normalize()} />
    </Canvas>
  );
}
