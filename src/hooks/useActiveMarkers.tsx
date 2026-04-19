import { useCallback, useState } from 'react';
import { markers } from '../data';
export const useActiveMarkers = (): [typeof markers, (a: number) => void] => {
  const [activeMarkers, setActiveMarkers] = useState([markers[0]]);

  const addNextMarker = useCallback((count: number) => {
    setActiveMarkers((prevState) =>
      count > prevState.length ? markers.slice(0, count) : prevState
    );
  }, []);

  return [activeMarkers, addNextMarker];
};
