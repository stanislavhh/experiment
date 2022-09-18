import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import SeagullModel from 'assets/models/seagull.glb';
import { INITIAL_BIRD_ROTATION, BIRD_SPEED } from 'modules/sea/constants';

const ANIMATION_NAME = 'ArmatureAction.006';

function Seagull() {
  const seagull = useRef();
  const { scene, animations } = useGLTF(SeagullModel);
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    actions?.[ANIMATION_NAME]?.play();
  });

  useFrame(() => {
    const action = actions[ANIMATION_NAME]

    if (action.time > 3.5 && action.time < 6.5) {
      seagull.current.position.y -= 0.01
      seagull.current.rotation.x += 0.002
    } else if (action.time >=6.5) {
      seagull.current.position.y += 0.01
      seagull.current.rotation.x -= 0.002
    }

    seagull.current.position.x += 1 * BIRD_SPEED;
    seagull.current.position.z += 1 * BIRD_SPEED;
  });

  return (
    <group
      ref={seagull}
      name="seagull"
      position={[-40, 25, -50]}
      rotation={INITIAL_BIRD_ROTATION}
      scale={[5, 5, 5]}
    >
      <React.Suspense fallback={null}>
        <primitive object={scene} />
      </React.Suspense>
    </group>
  );
}

export default Seagull;
