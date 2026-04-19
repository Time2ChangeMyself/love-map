import type {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
  LineString,
  Point,
} from 'geojson';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import type { MapRef } from 'react-map-gl/maplibre';
import * as turf from '@turf/turf';
const zoomMap: Record<string, number> = {
  3: 9,
  4: 6,
  5: 6,
  6: 6,
  7: 6,
  8: 6,
  9: 6,
  10: 6,
  11: 6,
};

type PawFeature = Feature<Point, { angle: number }>;
type PawCollection = FeatureCollection<Point, { angle: number }>;

// export const useAnimateLine = (
//   line: Feature<LineString, GeoJsonProperties>,
//   mapRef: RefObject<MapRef | null>,
//   index: number,
//   onAnimationEnd?: VoidFunction,
//   onAnimationStart?: VoidFunction
// ): {
//   data: PawCollection;
//   isAnimatingFinish: boolean;
//   lastCoords: [number, number];
// } => {
//   const fullCoords = useMemo<[number, number][]>(
//     () => line.geometry.coordinates as [number, number][],
//     [line.geometry.coordinates]
//   );

//   const [coords, setCoords] = useState<[number, number][]>([fullCoords[0]]);

//   const [isAnimatingFinish, setIsAnimatingFinish] = useState(false);

//   const indexRef = useRef<number>(0);
//   const animationRef = useRef<number>(0);

//   // 🐾 генерация точек

//   const generatePawPoints = (coords: [number, number][]): PawCollection => {
//     const features: PawFeature[] = [];

//     for (let i = 0; i < coords.length; i++) {
//       // if (i % 2 !== 0) continue;

//       const curr = coords[i];

//       // 👉 берём следующую точку по кривой
//       const next = coords[i + 2] ?? coords[i + 1] ?? curr;

//       const from = turf.point(curr);
//       const to = turf.point(next);

//       // 💥 КЛЮЧЕВОЕ — геодезический угол относительно меридиана
//       let angle = turf.bearing(from, to) + 90;

//       // 👉 лапка смотрит вверх → переводим систему
//       angle -= 90;

//       features.push({
//         type: 'Feature',
//         properties: { angle },
//         geometry: {
//           type: 'Point',
//           coordinates: curr,
//         },
//       });
//     }

//     return {
//       type: 'FeatureCollection',
//       features,
//     };
//   };

//   useEffect(() => {
//     const ref = mapRef?.current;

//     function animate() {
//       onAnimationStart?.();

//       const point =
//         fullCoords[Math.floor(indexRef.current)] ??
//         fullCoords[fullCoords.length - 1];

//       const [lng, lat] = point;

//       if (indexRef.current >= fullCoords.length) {
//         if (index < 7) {
//           ref?.easeTo({
//             center: [lng, lat],
//             zoom: 13,
//             duration: 2500,
//             offset: [0, 150],
//           });
//         }

//         cancelAnimationFrame(animationRef.current);
//         setIsAnimatingFinish(true);
//         onAnimationEnd?.();
//         return;
//       }

//       indexRef.current += index > 2 ? 0.5 : 1;

//       const sliced = fullCoords.slice(0, Math.floor(indexRef.current));
//       setCoords(sliced);

//       if (index >= 8) {
//         ref?.zoomTo(4);
//       } else {
//         ref?.panTo({ lng, lat }, { zoom: zoomMap[index] || 12, duration: 100 });
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     }

//     animationRef.current = requestAnimationFrame(animate);

//     return () => cancelAnimationFrame(animationRef.current);
//   }, [fullCoords, mapRef, onAnimationEnd, onAnimationStart, index]);

//   return {
//     data: generatePawPoints(coords),
//     isAnimatingFinish,
//     lastCoords: coords[coords.length - 1],
//   };
// };

export const useAnimateLine = (
  line: Feature<LineString, GeoJsonProperties>,
  mapRef: RefObject<MapRef | null>,
  index: number,
  onAnimationEnd?: VoidFunction,
  onAnimationStart?: VoidFunction
): { [x: string]: unknown; data: Feature<LineString, GeoJsonProperties> } => {
  const fullCoords = useMemo(
    () => line.geometry.coordinates,
    [line.geometry.coordinates]
  );
  const [coords, setCoords] = useState([fullCoords[0]]);
  const [isAnimatingFinish, setIsAnimatingFinish] = useState(false);
  const indexRef = useRef(0);
  const animationRef = useRef<number>(0);
  useEffect(() => {
    const ref = mapRef?.current;
    function animate() {
      onAnimationStart?.();
      const point =
        fullCoords[Math.floor(indexRef.current)] ||
        fullCoords[fullCoords.length - 1];
      const [lng, lat] = point;
      if (indexRef.current >= fullCoords.length) {
        if (index < 7) {
          mapRef?.current?.easeTo({
            center: [lng, lat],
            zoom: 13,
            duration: 2500,
            offset: [0, 150],
          });
        }
        cancelAnimationFrame(animationRef.current!);
        setIsAnimatingFinish(true);
        onAnimationEnd?.();
        return;
      }
      indexRef.current += index > 2 ? 0.5 : 1;
      setCoords(fullCoords.slice(0, indexRef.current));
      if (index >= 8) ref?.zoomTo(4);
      else
        ref?.panTo({ lng, lat }, { zoom: zoomMap[index] || 12, duration: 100 });
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationRef.current!);
    };
  }, [fullCoords, mapRef, onAnimationEnd, onAnimationStart, index]);
  return {
    data: { ...line, geometry: { ...line.geometry, coordinates: coords } },
    isAnimatingFinish,
    lastCoords: coords[coords.length - 1],
  };
};
