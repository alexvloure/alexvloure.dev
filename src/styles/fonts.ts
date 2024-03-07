import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

const montserrat = Montserrat({ subsets: ['latin'] });
const mersad = localFont({ src: '../assets/fonts/Mersad.ttf' });
const satoshi_bold = localFont({ src: '../assets/fonts/Satoshi-Bold.otf' });

export { mersad, satoshi_bold, montserrat };
