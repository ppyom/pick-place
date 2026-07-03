import localFont from 'next/font/local';

export const suite = localFont({
  src: './SUITE-Variable.woff2',
  variable: '--font-suite',
  display: 'swap',
  preload: true,
});
