import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import useAudio from 'hooks/useAudio';
import audioSceneSpace from 'assets/audio/scene1.mp3';


const useStyles = createUseStyles({
  button: {
    outline: 'none',
    borderRadius: '5px',
    background: 'rgba(125, 125, 125, 0.5)',
    color: 'rgba(255,255,255,0.8)',
    padding: '10px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
    '&:hover': {
      background: 'rgba(125, 125, 125, 1)',
      color: 'rgba(255,255,255, 1)',
      transform: 'scale(1.02)'
    }
  },
}); 

export default function AudioButton({ canPlay }) {
  const { track, loaded } = useAudio({ url: audioSceneSpace });
  const [muted, setMuted] = useState(true);
  const styles = useStyles();

  const toggleMuted = () => setMuted(!muted);

  useEffect(() => {
    if ([!muted, canPlay, loaded].every(Boolean)) {
      track.current?.play();
    } else {
      track.current?.pause();
    }
  }, [muted, canPlay, loaded]);

  return (
    <button type="button" className={styles.button} onClick={toggleMuted}>
      {muted ? 'ON' : 'OFF'}
    </button>
  );
}
