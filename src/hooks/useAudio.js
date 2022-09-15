import { useState, useRef, useEffect } from 'react';

export default function useAudio({ url }) {
  const [loaded, setLoaded] = useState(false);
  const track = useRef(new Audio(url));

  useEffect(() => {
    track.current.addEventListener('canplay', () => {
      setLoaded(true);
    });
  }, []);

  return {
    track,
    loaded,
  };
}
