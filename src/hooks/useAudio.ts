import { useCallback, type RefObject } from 'react';
import type H5AudioPlayer from 'react-h5-audio-player';

export type UseAudioType = {
  audioRef: RefObject<H5AudioPlayer | null>;
};

export const useAudio = ({ audioRef }: UseAudioType) => {
  const changeVolumeSmooth = useCallback(
    async ({
      from,
      to,
      speed = 3000,
    }: {
      from: number;
      to: number;
      speed?: number;
    }) => {
      if (!audioRef.current?.audio?.current)
        return Promise.reject(
          new Error('Audio element not found - cannot change volume')
        );

      const audio = audioRef.current.audio.current;

      const steps = 60; // количество шагов для плавности
      const stepDuration = speed / steps;
      const volumeStep = (to - from) / steps;

      let currentStep = 0;

      return new Promise<number>((resolve) => {
        const interval = setInterval(() => {
          currentStep++;
          const newVolume = from + volumeStep * currentStep;

          audio.volume = Math.max(0, Math.min(1, newVolume)); // ограничиваем от 0 до 1

          if (currentStep >= steps) {
            clearInterval(interval);
            audio.volume = to;
            resolve(to);
          }
        }, stepDuration);
      });
    },
    [audioRef]
  );

  return { changeVolumeSmooth };
};
