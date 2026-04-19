import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './Carousel.css';

export const Carousel: FC<{ imgs: string[] }> = ({ imgs = [] }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      effect="fade"
      spaceBetween={10}
      slidesPerView={1}
      style={{ alignItems: 'center' }}
      wrapperClass="wrapper"
    >
      {imgs.map((img) => (
        <SwiperSlide
          style={{
            overflow: 'hidden',
            width: '100%',
            aspectRatio: '1 / 1',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <img src={img} style={{ width: '100%', objectFit: 'contain' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
