import React from 'react';
import { createUseStyles } from 'react-jss';
import { SCENES, DEFAULT_SCENE_INDEX } from '../constants';
import ControlPanel from './ControlPanel';

const useStyles = createUseStyles({
  thanks: {
    color: 'white',
  },
});

export default function Controller() {
  const styles = useStyles();
  const [sceneIndex, setSceneIndex] = React.useState(DEFAULT_SCENE_INDEX);
  const Component = SCENES[sceneIndex];

  const hasNoMoreScenes = SCENES.length === sceneIndex;

  const nextScene = () => {
    setSceneIndex(sceneIndex + 1);
  };

  return hasNoMoreScenes ? (
    <div className={styles.thanks}>SMELLS GOOD</div>
  ) : (
    <>
      <Component nextScene={nextScene} />
      <ControlPanel />
    </>
  );
}
