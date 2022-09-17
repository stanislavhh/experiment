import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { Water } from 'three/addons/objects/Water';
import waterNormalsTexture from 'assets/textures/waternormals.jpg';
import { VIEW_SIZE } from 'modules/sea/constants';
import eventBus from 'helpers/eventBus'

extend({ Water });

function Ocean({ sunDirection = new THREE.Vector3() }) {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, waterNormalsTexture);

  waterNormals.wrapS = THREE.RepeatWrapping;
  waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(VIEW_SIZE, VIEW_SIZE), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection,
      sunColor: 0xeb8934,
      waterColor: 0x0064b5,
      distortionScale: 40,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals],
  );

  useEffect(() => {
    ref.current.material.uniforms.sunDirection.value = sunDirection;
  }, [sunDirection]);

  useFrame((_, delta) => {
    ref.current.material.uniforms.time.value += delta;
  });

  return (
    <water
      name="sea"
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={[0, -1, 0]}
      onPointerMove={(e) => eventBus.emit('watermove', e)}
    />
  );
}

export default Ocean;
