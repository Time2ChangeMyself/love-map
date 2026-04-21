import { useRef, useState } from 'react';
import { MapView } from './components/Map/Map';
import { Player } from './components/Player';
import './App.css';
import { Box, Modal, Typography, Backdrop, Fade } from '@mui/material';
import type H5AudioPlayer from 'react-h5-audio-player';
import packageJson from '../package.json';
import { LoveButton } from './components/LoveButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  p: 4,
  borderRadius: '20px',
  background: 'linear-gradient(135deg, #fff 0%, #fdf6f9 100%)',
  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',

  // 💎 стеклянный эффект
  backdropFilter: 'blur(20px)',

  textAlign: 'center',
  '&:focus-visible': {
    outline: 'none',
  },
  '@media (max-width: 600px)': {
    height: 'min(fit-content, calc(100dvh - 10px))',
    width: 'calc(100% - 40px)',
  },
};

console.log(
  `%cLove-map version: ${packageJson.version}`,
  'color: red; font-size: 16px;'
);

function App() {
  const audio = useRef<H5AudioPlayer | null>(null);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    audio?.current?.audio.current.play();
  };

  return (
    <>
      <MapView audioRef={audio} />
      <Player ref={audio} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Дашуля! Я кое-что подготовил для тебя... 💌
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                fontFamily: 'Georgia, serif',
                color: 'rgba(0,0,0,0.7)',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
              }}
            >
              {`Я хочу поздравить тебя с Днём Рождения! Я правда рад, что ты есть в моей жизни. И хочу, чтобы у тебя впереди было больше спокойствия, радости и вещей, от которых внутри становится хорошо. Ты заслуживаешь всего самого тёплого!\n
Ты часто используешь свой талант и даришь мне на праздники целые истории и квесты, в этот раз я хотел попробовать сделать что-то подобное и для тебя. Надеюсь тебе понравится небольшая карта Наших событий!`}
            </Typography>

            <LoveButton onClick={handleClose} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default App;
