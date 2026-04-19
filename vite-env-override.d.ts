declare module '*.svg?react' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare module 'swiper/css*';
