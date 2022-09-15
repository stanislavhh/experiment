import React from 'react';
import { createUseStyles } from 'react-jss';
import AudioButton from './AudioButton';

const useStyles = createUseStyles({
  panel: {
    position: 'absolute',
    bottom: 20,
    right: 20
  },
});

export default function ControlPanel() {
  const styles = useStyles();

  return (
    <div className={styles.panel}>
      <AudioButton canPlay />
    </div>
  );
}
