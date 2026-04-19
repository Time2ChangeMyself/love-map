import type { FC } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Typography, type TypographyOwnProps } from '@mui/material';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2, // 👈 задержка между буквами
    },
  },
};

const letter: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
    filter: 'blur(6px)',
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
    animationDelay: 0.5,
  },
};

// export const CinematicText: FC<{
//   text: string;
//   variant: TypographyOwnProps['variant'];
// }> = ({ text = '', variant }) => {
//   return (
//     <Typography component="div" variant={variant}>
//       <motion.div
//         variants={container}
//         initial="hidden"
//         animate="visible"
//         style={{ display: 'flex', columnGap: '3px', flexWrap: 'wrap' }}
//       >
//         {text.split(' ').map((char, i) => (
//           <motion.span
//             key={i}
//             variants={letter}
//             style={{ display: 'inline-block' }}
//           >
//             {char === ' ' ? '\u00A0' : char}
//           </motion.span>
//         ))}
//       </motion.div>
//     </Typography>
//   );
// };

import { useEffect, useState } from 'react';

export const CinematicText: FC<{
  text: string;
  variant: TypographyOwnProps['variant'];
}> = ({ text = '', variant }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;

      if (i === text.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <Typography
      sx={{
        color: '#3a2f2f',
        textShadow: '0 0 1px rgba(0,0,0,0.1)',
        '&::first-letter': {
          fontWeight: 'bold',
          color: '#2a1f1f',
        },
      }}
      variant={variant}
    >
      {displayed}
    </Typography>
  );
};
