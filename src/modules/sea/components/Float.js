import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import ColorTexture from 'assets/textures/alien-panels-ue/alien-panels_albedo.png';
import AoTexture from 'assets/textures/alien-panels-ue/alien-panels_ao.png';
import NormalTexture from 'assets/textures/alien-panels-ue/alien-panels_normal-dx.png';
import RoughnessTexture from 'assets/textures/alien-panels-ue/alien-panels_roughness.png';
import MetallicTexture from 'assets/textures/alien-panels-ue/alien-panels_metallic.png';
import eventBus from 'helpers/eventBus';
import { FLOAT_SIZE } from 'modules/sea/constants';

const DEFAULT_FLOAT_POSITION = [0, 2, 0];
const DEFAULT_FLOAT_VELOCITY = [0, 0, 0];

export default function Float() {
  const colorT = useLoader(THREE.TextureLoader, ColorTexture);
  const aoT = useLoader(THREE.TextureLoader, AoTexture);
  const normalT = useLoader(THREE.TextureLoader, NormalTexture);
  const roughnessT = useLoader(THREE.TextureLoader, RoughnessTexture);
  const metallicT = useLoader(THREE.TextureLoader, MetallicTexture);

  const [float, api] = useBox(() => ({
    type: 'Kinematic',
    args: FLOAT_SIZE,
    position: DEFAULT_FLOAT_POSITION,
  }));

  const mouseP = useRef(new THREE.Vector3());
  const floatP = useRef(DEFAULT_FLOAT_POSITION);
  const floatV = useRef(DEFAULT_FLOAT_VELOCITY);

  const setFloatVelocity = (velocity) => {
    floatV.current = velocity;
    api.velocity.set(...velocity);
  };

  const onPointerMove = (e) => {
    const floatX = floatP.current[0];
    const floatZ = floatP.current[2];

    mouseP.current = e.point;

    const velocityX = mouseP.current.x - floatX;
    const velocityZ = mouseP.current.z - floatZ;

    setFloatVelocity([velocityX, floatV.current[1], velocityZ]);
  };

  const onBallHit = () => {
    setFloatVelocity([floatV.current[0], -20, floatV.current[2]]);
    setTimeout(() => {
      setFloatVelocity([floatV.current[0], 20, floatV.current[2]]);
      setTimeout(() => {
        setFloatVelocity([floatV.current[0], 0, floatV.current[2]]);
      }, 100);
    }, 100);
  };

  useEffect(() => {
    eventBus.on('watermove', onPointerMove);
    eventBus.on('ballCollision', onBallHit);

    const unsubscribe = api.position.subscribe((p) => {
      floatP.current = p;

      let velocityX = mouseP.current.x - floatP.current[0];
      let velocityZ = mouseP.current.y - floatP.current[2];

      velocityX = Math.abs(Math.abs(p[0]) - Math.abs(mouseP.current.x)) < 1 ? 0 : velocityX;
      velocityZ = Math.abs(Math.abs(p[2]) - Math.abs(mouseP.current.z)) < 1 ? 0 : velocityZ;


      if (!velocityX || !velocityZ) {
        setFloatVelocity([velocityX, floatV.current[1], velocityZ]);
      }
    });

    return () => {
      eventBus.off('watermove', onPointerMove);
      eventBus.off('ballCollision', onBallHit);
      unsubscribe();
    };
  }, []);

  return (
    <mesh ref={float} name="float" receiveShadow visible>
      <boxGeometry args={FLOAT_SIZE} />
      <meshStandardMaterial
        map={colorT}
        normalMap={normalT}
        aoMap={aoT}
        roughnessMap={roughnessT}
        metalnessMap={metallicT}
      />
    </mesh>
  );
}
