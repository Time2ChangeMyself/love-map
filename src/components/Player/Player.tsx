import { useMediaQuery } from '@mui/material';
import { useCallback, useEffect, useRef, type FC, type RefObject } from 'react';
import type H5AudioPlayer from 'react-h5-audio-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const Player: FC<{ ref: RefObject<H5AudioPlayer | null> }> = ({
  ref,
}) => {
  const matches = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (!ref?.current) return;

    ref.current.audio.current.volume = matches ? 1 : 0.1;
  }, [matches, ref]);

  return (
    <AudioPlayer
      layout="horizontal"
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#ff7eb3',
      }}
      ref={ref}
      showSkipControls={false}
      src="/The Chain (2004 Remaster) - Fleetwood Mac.mp3"
      loop
      customAdditionalControls={[]}
    />
  );
};
