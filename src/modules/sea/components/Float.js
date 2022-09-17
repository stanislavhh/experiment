import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useBox } from '@react-three/cannon';
import eventBus from 'helpers/eventBus';
import {
  FLOAT_SIZE,
  DEFAULT_FLOAT_POSITION,
  DEFAULT_FLOAT_VELOCITY,
  MAX_VELOCITY,
} from 'modules/sea/constants';

export default function Float() {
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

    let diffX = mouseP.current.x - floatX;
    let diffZ = mouseP.current.z - floatZ;

    const xDir = diffX > 0 ? 1 : -1;
    const zDir = diffZ > 0 ? 1 : -1;

    const posDiffX = Math.abs(diffX);
    const posDiffZ = Math.abs(diffZ);
    const maxDiff = Math.max(posDiffX, posDiffZ);
    const xMoreY = maxDiff === posDiffX;
    const K = posDiffZ / posDiffX;

    if (maxDiff > MAX_VELOCITY) {
      diffX = (xMoreY ? MAX_VELOCITY : MAX_VELOCITY / K) * xDir;
      diffZ = (xMoreY ? MAX_VELOCITY * K : MAX_VELOCITY) * zDir;
    }

    setFloatVelocity([diffX, floatV.current[1], diffZ]);
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
      <meshStandardMaterial color="white" metalness={1} transparent opacity={0.6} />
    </mesh>
  );
}
