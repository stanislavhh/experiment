import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import ColorTexture from 'assets/textures/crisscross-foam1-ue/crisscross-foam_albedo.png';
import AoTexture from 'assets/textures/crisscross-foam1-ue/crisscross-foam_ao.png';
import NormalTexture from 'assets/textures/crisscross-foam1-ue/crisscross-foam_normal-dx.png';
import RoughnessTexture from 'assets/textures/crisscross-foam1-ue/crisscross-foam_roughness.png';
import MetallicTexture from 'assets/textures/crisscross-foam1-ue/crisscross-foam_metallic.png';
import HeightTexture from 'assets/textures/crisscross-foam1-ue/crisscross-foam_height.png';
import { useSphere } from '@react-three/cannon';
import eventBus from 'helpers/eventBus';
import { getRandomBallPosition } from 'modules/sea/utils';

export default function Ball() {
  const [ball, api] = useSphere(() => ({
    name: 'ball',
    mass: 1,
    visible: true,
    position: getRandomBallPosition(),
    onCollide: (e) => eventBus.emit('ballCollision', e),
  }));

  const colorT = useLoader(THREE.TextureLoader, ColorTexture);
  const aoT = useLoader(THREE.TextureLoader, AoTexture);
  const normalT = useLoader(THREE.TextureLoader, NormalTexture);
  const roughnessT = useLoader(THREE.TextureLoader, RoughnessTexture);
  const metallicT = useLoader(THREE.TextureLoader, MetallicTexture);
  const hT = useLoader(THREE.TextureLoader, HeightTexture);

  const handleBallCollision = () => {
    api.applyImpulse([0, 8, 0], [0, 0, 0]);
  };

  useEffect(() => {
    eventBus.on('ballCollision', handleBallCollision);

    const unsubscribe = api.position.subscribe((p) => {
      if (p[1] < -50) {
        api.position.set(...getRandomBallPosition());
        api.velocity.set(0, 0, 0);
        api.angularVelocity.set(0, 0, 0);
      }
    });

    return () => {
      eventBus.off('ballCollision', handleBallCollision);
      unsubscribe();
    };
  }, []);

  return (
    <mesh ref={ball} name="ball" visible castShadow>
      <sphereGeometry args={[2]} lookAt={[0, 0, 0]} />
      <meshStandardMaterial
        map={colorT}
        normalMap={normalT}
        aoMap={aoT}
        roughnessMap={roughnessT}
        metalnessMap={metallicT}
        envMap={hT}
      />
    </mesh>
  );
}
