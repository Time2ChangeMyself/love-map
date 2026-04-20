import Map, {
  Marker,
  Popup,
  NavigationControl,
  type MapRef,
} from 'react-map-gl/maplibre';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useCallback, useMemo, useRef, useState, type RefObject } from 'react';
import HeartSvg from '../../assets/heart-svgrepo-com.svg?react';
import './Map.css';
import { Line } from '../Line';
import { useActiveMarkers, useActiveLines, useAudio } from '../../hooks';
import { type LineType } from '../../data';
import { ClickAwayListener, Stack, useMediaQuery } from '@mui/material';
import { CinematicText } from '../CinematicText';
import { Carousel } from '../Carousel';
import { LoveButton } from '../LoveButton';
import type H5AudioPlayer from 'react-h5-audio-player';

const startPoint = [42.966252, 44.10498];

export const MapView = ({
  audioRef,
}: {
  audioRef: RefObject<H5AudioPlayer | null>;
}) => {
  const matches = useMediaQuery('(max-width:600px)');

  const mapRef = useRef<MapRef>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [activeMarkers, addNextMarker] = useActiveMarkers();
  const { activeLines, addNextLine } = useActiveLines();
  const [selectedMark, setSelectedMark] = useState<LineType | null>(null);

  const { changeVolumeSmooth } = useAudio({ audioRef });

  const selectMark = useCallback(
    (m: LineType | null) => () => {
      setSelectedMark(m);
    },
    []
  );

  const handleDisableButtons = useCallback(() => {
    setIsDisabled(true);
  }, []);

  const handleLineAnimationEnd = useCallback(
    (count: number) => () => {
      addNextMarker(count);
      setIsDisabled(false);
    },
    [addNextMarker]
  );

  const removePopup = useCallback(() => {
    setSelectedMark(null);
  }, []);

  const line = useMemo(
    () =>
      activeLines.map((line, i) => (
        <Line
          key={i}
          line={line}
          mapRef={mapRef}
          onAnimationStart={handleDisableButtons}
          onAnimationEnd={handleLineAnimationEnd(
            line[line.length - 1].count ?? 0
          )}
          index={i}
        />
      )),
    [activeLines, handleDisableButtons, handleLineAnimationEnd]
  );

  const popupContent = useMemo(
    () => (
      <Stack spacing={2}>
        <CinematicText variant="h4" text={selectedMark?.name || ''} />
        <CinematicText variant="h5" text={selectedMark?.desc || ''} />
        {selectedMark?.imgs?.length && <Carousel imgs={selectedMark.imgs} />}
        {!selectedMark?.hideButton && (
          <LoveButton
            disabled={isDisabled}
            onClick={() => {
              removePopup();
              addNextLine(selectedMark?.count ?? 0);

              if ((selectedMark?.count ?? 0) >= 11 && audioRef.current) {
                const audioElement = audioRef.current.audio?.current;
                changeVolumeSmooth({
                  from: audioElement.volume,
                  to: 0,
                  speed: 2000,
                }).then((v) => {
                  audioElement.currentTime = 200;
                  return changeVolumeSmooth({ from: v, to: 0.5, speed: 2000 });
                });
              }
            }}
          />
        )}
      </Stack>
    ),
    [
      addNextLine,
      audioRef,
      changeVolumeSmooth,
      isDisabled,
      removePopup,
      selectedMark,
    ]
  );

  return (
    <div style={{ height: '100dvh', width: '100%' }}>
      {/**
       * https://maplibre.org/maplibre-gl-js/docs/examples/update-a-feature-in-realtime/
       * https://turfjs.org/docs/api/along
       * https://visgl.github.io/react-map-gl/docs/api-reference/maplibre/source
       */}
      <Map
        ref={mapRef}
        doubleClickZoom={false}
        onClick={(e) => {
          const { lng, lat } = e.lngLat;
          console.log(lng, lat);
        }}
        initialViewState={{
          longitude: startPoint[0],
          latitude: startPoint[1],
          zoom: 14,
        }}
        // mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        // mapStyle="https://tiles.openfreemap.org/styles/positron"
        mapStyle={import.meta.env.BASE_URL + 'map-liberty.json'}
        attributionControl={false}
      >
        <NavigationControl position="top-right" />

        {line}

        {activeMarkers.map((mark, i) => {
          const color = (mark?.count ?? 0) > 11 ? 'blue' : '#ff4d8d';
          return mark.render ? (
            <Marker
              key={i}
              anchor="center"
              longitude={mark.coords[0]}
              latitude={mark.coords[1]}
              onClick={selectMark(mark)}
            >
              <HeartSvg color={color} fill={color} className="heart-marker" />
            </Marker>
          ) : null;
        })}
        {matches && (
          <SwipeableDrawer
            anchor="bottom"
            open={!!selectedMark}
            onClose={removePopup}
            onOpen={() => {}}
            disableSwipeToOpen
            transitionDuration={{
              appear: 300,
              enter: 300,
              exit: 0,
            }}
            slotProps={{
              paper: {
                style: {
                  height: 'fit-content',
                  padding: '20px',
                  maxHeight: '100vh',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  boxShadow: '0px -4px 20px rgba(0,0,0,0.15)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#fff',
                },
              },
            }}
          >
            {popupContent}
          </SwipeableDrawer>
        )}

        {!!selectedMark && !matches && (
          <Popup
            maxWidth={matches ? '95%' : '600px'}
            style={{
              width: 'calc(100% - 20px)',
              height: matches ? 'min(fit-content, calc(100% - 50px))' : 'auto',
              pointerEvents: 'auto',
            }}
            className="Popup"
            longitude={selectedMark.coords[0]}
            latitude={selectedMark.coords[1]}
            locationOccludedOpacity={0}
            anchor="center"
            closeOnClick={false}
            onClose={removePopup}
            closeButton={false}
          >
            <ClickAwayListener onClickAway={removePopup}>
              {popupContent}
            </ClickAwayListener>
          </Popup>
        )}
      </Map>
    </div>
  );
};
