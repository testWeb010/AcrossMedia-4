import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const brandLogos = [
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555861/veeba_soqfr0.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555860/Valvoline1_vnvbfi.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555860/us_polo_w9glwy.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555859/TVS_Jupiter_ZKF-Y_Band-English_yswqh5.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555859/ubi_aulx8s.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555859/Uber_fuw3xo.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555859/tvs_logo_h6fsyx.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555858/tinder_vhzsvt.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555858/TOOTHSI_dgz3tq.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555857/the-health-factory_y2rjrm.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555857/Rupay_zzz6gl.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555856/Rexona_jqvn9g.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555856/raider_white_logo_o49qo2.png',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555855/Prestige-Logo-PNG-HD_3_2_lta831.png',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555855/Puma__uwjxh2.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555855/Ponds_Logo_puz25o.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555854/Plum_vjp7ih.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555854/looks_sklgei.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555854/Panasonic_wtj7lk.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555853/Netflix_nbp5r2.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555853/Metashot_logo_r9hdtw.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555852/limka_nzxry0.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555852/LOGO-_MARS-_BLACK_-_Copy_xhov2l.png',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555852/LIC-Logo_nkkp0c.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555851/Lahori-Zeera-Logo_o3onrp.png',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555851/Instax_jbmbxo.png',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555850/Kellogg_s-Logo_pivlv6.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555850/Helios1_bmp7co.jpg',
    'https://res.cloudinary.com/daolwstwj/image/upload/w_400,q_auto,f_auto/v1753555849/Hint-logo_c3cqpu.png',
].filter(url => url && url.trim() !== '');

interface MarqueeRowProps {
  logos: string[];
  duration: number;
  reverse?: boolean;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ logos, duration, reverse = false }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const logosToRender = [...logos, ...logos]; 
  
  const animationClass = isMobile
    ? reverse ? 'animate-marquee-ping-pong-reverse' : 'animate-marquee-ping-pong'
    : reverse ? 'animate-marquee-reverse' : 'animate-marquee-forward';
  
  return (
    <div className={`flex w-max flex-nowrap py-4 ${animationClass}`} style={{ animationDuration: `${duration}s` }}>
      {logosToRender.map((url, index) => (
        <LogoCard key={`logo-${index}`} url={url} />
      ))}
    </div>
  );
};

const BrandShowcase: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  const halfway = Math.ceil(brandLogos.length / 2);
  const logosRow1 = brandLogos.slice(0, halfway);
  const logosRow2 = brandLogos.slice(halfway);

  return (
    <section className="relative w-full overflow-x-hidden bg-black text-white py-24 md:py-32">
      <AnimatedAuroraBackground />
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            Showcasing Our Valued Partners
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We are proud to collaborate with a diverse portfolio of industry leaders, driving innovation and success together.
          </motion.p>
        </div>
        
        <div className="relative mt-16 md:mt-20 w-full">
          <div className="w-full [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
            {/* The logic is now much simpler. Both mobile and desktop use the same component with different animation classes. */}
            <MarqueeRow logos={logosRow1} duration={isMobile ? 80 : 100} />
            <MarqueeRow logos={logosRow2} duration={isMobile ? 80 : 100} reverse={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoCard = ({ url }: { url: string }) => {
    return (
        <div
            className="relative flex-shrink-0 mx-3 flex items-center justify-center h-24 w-36 md:h-32 md:w-52"
            style={{ perspective: '1000px' }}
        >
            <div className="group absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="relative w-[85%] h-[70%] bg-white/95 rounded-lg flex items-center justify-center p-2 shadow-inner">
                <img
                    src={url}
                    alt="Brand Partner Logo"
                    className="max-h-full max-w-full object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                    loading="lazy"
                    decoding="async"
                />
            </div>
        </div>
    );
};

const AnimatedAuroraBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute top-[-10%] left-[10%] w-[40rem] h-[40rem] bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ x: [0, 100, 0, -50, 0], y: [0, 50, -100, 50, 0] }}
        transition={{ duration: 150, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[5%] w-[30rem] h-[30rem] bg-fuchsia-500/20 rounded-full blur-3xl"
        animate={{ x: [0, -80, 0, 100, 0], y: [0, -100, 80, -50, 0] }}
        transition={{ duration: 120, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 10 }}
      />
    </div>
  );
};

export default BrandShowcase;