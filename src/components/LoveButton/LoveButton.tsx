import { Button, type ButtonProps } from '@mui/material';
import type { FC } from 'react';

export const LoveButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      variant="contained"
      sx={{
        mt: 3,
        px: 4,
        py: 1.2,
        borderRadius: '999px',

        // 🔥 градиент
        background: 'linear-gradient(135deg, #ff4d8d, #ff7eb3)',

        textTransform: 'none',
        fontSize: 16,
        fontWeight: 500,

        boxShadow: '0 8px 20px rgba(255, 77, 141, 0.4)',

        transition: 'all 0.3s ease',

        '&:hover': {
          background: 'linear-gradient(135deg, #ff3b7c, #ff6aa8)',
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 25px rgba(255, 77, 141, 0.6)',
        },
      }}
      {...props}
    >
      Продолжить 💖
    </Button>
  );
};
