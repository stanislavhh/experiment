import React from 'react';
import { SCENES, DEFAULT_SCENE } from '../constants';
import ControlPanel from './ControlPanel';

export default function Controller() {
  const [scene] = React.useState(DEFAULT_SCENE);
  const SceneComponent = SCENES[scene];

  return (
    <>
      <SceneComponent />
      <ControlPanel />
    </>
  );
}
