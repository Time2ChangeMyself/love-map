import { Layer, Source, type MapRef } from 'react-map-gl/maplibre';
import * as turf from '@turf/turf';
import { useAnimateLine } from '../../hooks';
import type { FC, RefObject } from 'react';
import React, { useId } from 'react';

export const Line: FC<{
  line: {
    name: string;
    coords: number[];
    render: boolean;
  }[];
  mapRef: RefObject<MapRef | null>;
  onAnimationEnd: VoidFunction;
  onAnimationStart: VoidFunction;
  index: number;
}> = React.memo(({ line, mapRef, onAnimationEnd, onAnimationStart, index }) => {
  const augmentedLine = turf.lineString(line.map((a) => a.coords));
  const curved = turf.bezierSpline(augmentedLine, {
    resolution: 10000,
  });

  const id = useId();

  const { data } = useAnimateLine(
    curved,
    mapRef,
    index,
    onAnimationEnd,
    onAnimationStart
  );

  return (
    <>
      <Source id={`route-${id}`} type="geojson" data={data}>
        <Layer
          id={`route-line-${id}`}
          // type="symbol"
          // layout={{
          //   'text-field': '🐾',
          //   'text-size': 26,
          //   'text-rotate': ['get', 'angle'],
          //   'text-overlap': 'never',
          // }}
          // paint={{
          //   'text-color': '#ff4d8d',
          // }}
          type="line"
          paint={{
            'line-color': index < 7 ? '#ff4d8d' : 'blue',
            'line-width': 4,
            'line-dasharray': index > 6 ? [1, 1] : [4, 4],
          }}
        />
      </Source>
    </>
  );
});
