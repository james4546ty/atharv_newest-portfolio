import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Fallback hackathons
const fallbackHackathons = [
  {
    id: 1,
    name: 'InnoVyuh Hackathon 2025',
    role: 'Developer, Team Supreme',
    organizer: 'Organized by Google Developer Groups, MIT ACSC, Alandi',
    side: 'left',
    delay: 0,
    certificateUrl: 'https://drive.google.com/file/d/16tVLHuNttEHEsJAURV9k3YPMwkEn-Ncm/view?usp=sharing'
  },
  {
    id: 2,
    name: 'INNERVE 9.0',
    role: 'Finalist (Online Mode) – Team Bit Benders',
    organizer: 'Hosted by AIT Pune',
    side: 'right',
    delay: 200,
    certificateUrl: 'https://drive.google.com/file/d/1EaJ9H9mLKvg_NzEKcLUNfiUbvagQdTLU/view?usp=drive_link'
  },
  {
    id: 3,
    name: 'Odoo National Hackathon',
    role: 'Finalist (Leader) – Team Bit Benders',
    organizer: 'Hosted by Odoo India',
    side: 'left',
    delay: 400,
    certificateUrl: 'https://drive.google.com/file/d/1hR1J2oFTHPu6ythBNm_yEBXozjcQBoui/view?usp=sharing'
  },
  {
    id: 5,
    name: 'Google Cloud Agentic AI Day',
    role: ' Participant :- Team Bit Benders',
    organizer: 'Google Cloud and Hack2Skill',
    side: 'right',
    delay: 600,
    certificateUrl: 'https://drive.google.com/file/d/1HPbWanT4vxANgU_Oigb4qAdTfAAy5AtU/view?usp=drive_link'
  },
  {
    id: 6,
    name: 'Google Developer Groups (GDG) Solution Challenge ',
    role: ' Participant :- Team Bit Benders',
    organizer: 'Google Developer Groups and Hack2Skill',
    side: 'left',
    delay: 600,
    certificateUrl: 'https://drive.google.com/file/d/1efFBIWuVTiIOmnTBMSeKGX14l7Z34GzK/view?usp=sharing'
  },
  {
    id: 7,
    name: 'Generative AI Buildathon',
    role: 'Participant',
    organizer: 'Hosted by  NxtWave & OpenAI Academy Learning Community!',
    side: 'right',
    delay: 600,
    certificateUrl: 'https://drive.google.com/file/d/1LS821o4PwOGpdEIezd-I2WplaZJ_LwZs/view?usp=drive_link'
  },
  {
    id: 8,
    name: 'Eureka 2025 E-Cell (IIT Bombay)',
    role: 'Zonalist (Leader) – Team Bit Benders',
    organizer: 'Hosted by E-Cell IIT Bombay',
    side: 'left',
    delay: 600,
    certificateUrl: 'https://example.com/eureka-certificate'
  }
];

// Cloudinary photos
// The first URL is used as the large sticky backdrop; the rest are smaller parallax images.
const hackathonPhotos: string[] = [
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763299220/Futuristic_Landscape_With_Text_uip8ts.png",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298930/1741100450575_oaeo7u.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298931/1741344611400_jsfmgw.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298930/1741344632701_taf58r.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763299384/gdg_jswdf3.jpg",
  // The user label had 'L-6' appended; using the clean .jpg URL:
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763299441/sc_ihx4th.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298929/1757395508389_lt5fhn.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298930/1755239049276_ev65a0.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298930/1755328318411_kngbli.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298930/1755239048746_pturys.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298930/1755239049134_mcqkru.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763299573/231ad536-f9e8-4f87-98a4-c7d6d846e4d2.png",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298930/1757316236118_nqploo.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298929/1759152915229_lkbspt.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298929/1759152916672_r7y7zq.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298929/1759152917095_w3llh3.jpg",
  "https://res.cloudinary.com/djofffm1g/image/upload/v1763298929/1759152915256_kndplb.jpg",
];

const SECTION_HEIGHT = 1500;

function ParallaxImg({
  className,
  alt,
  src,
  start,
  end,
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) {
  const ref = useRef<HTMLImageElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.9]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
      loading="lazy"
    />
  );
}

function CenterBackdrop() {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ['170%', '100%']
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  const bg = hackathonPhotos[0];

  return (
    <div className="sticky top-0 h-screen w-full z-0 flex items-center justify-center">
      <AspectRatio ratio={16 / 9} className="w-full max-w-6xl">
        <motion.div
          className="w-full h-full rounded-xl overflow-hidden"
          style={{
            clipPath,
            backgroundSize,
            opacity,
            backgroundImage: `url(${bg})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </AspectRatio>
    </div>
  );
}

function TechBackground() {
  // Subtle moving gradients, grid and light streaks without extra CSS
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
      {/* Neon gradient wash */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(99,102,241,0.12) 0%, rgba(14,165,233,0.08) 40%, rgba(10,10,10,0.9) 100%)',
        }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 40px 40px',
          backgroundPosition: 'center',
        }}
      />
      {/* Light streak */}
      <motion.div
        className="absolute top-1/4 h-1 w-1/2 left-[-20%] rounded-full blur-md"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)',
        }}
        initial={{ x: '-20%' }}
        animate={{ x: '120%' }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 h-[2px] w-1/3 right-[-10%] rounded-full blur-sm"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)',
        }}
        initial={{ x: '0%' }}
        animate={{ x: '-120%' }}
        transition={{ duration: 7.5, ease: 'easeInOut', repeat: Infinity }}
      />
    </div>
  );
}

function ParallaxPhotos() {
  // Use all images after the first as the smaller parallax stack
  const others = hackathonPhotos.slice(1);

  // Determine container height based on number of images to keep the scroll within this section
  const rows = Math.max(1, Math.ceil(others.length / 4));
  const dynamicHeight = 650 * rows; // tuned to keep scroll within this section

  // Cycling layout configs to mimic the demo feel and keep images small
  const layoutClass = (i: number) => {
    switch (i % 4) {
      case 0:
        return 'w-1/3';
      case 1:
        return 'mx-auto w-2/3';
      case 2:
        return 'ml-auto w-1/3';
      default:
        return 'ml-24 w-5/12';
    }
  };

  const motionConfig = (i: number) => {
    switch (i % 4) {
      case 0:
        return { start: -200, end: 200 };
      case 1:
        return { start: 200, end: -250 };
      case 2:
        return { start: -200, end: 200 };
      default:
        return { start: 0, end: -500 };
    }
  };

  return (
    <div
      style={{ height: `calc(${dynamicHeight}px + 100vh)` }}
      className="relative w-full bg-[#0a0a0a]"
    >
      <CenterBackdrop />
      <TechBackground />
      <div className="mx-auto max-w-6xl px-4 pt-[200px] relative z-10">
        {others.map((src, i) => {
          const { start, end } = motionConfig(i);
          return (
            <ParallaxImg
              key={i}
              src={src}
              alt={`Hackathon moment ${i + 2}`}
              start={start}
              end={end}
              className={layoutClass(i)}
            />
          );
        })}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
}

export default function Hackathons() {
  const { data: hackathonsData } = useQuery<any[]>({
    queryKey: ['/api/hackathons'],
    queryFn: getQueryFn({ on401: 'returnNull' }),
  });

  const hackathons = hackathonsData && hackathonsData.length > 0 
    ? hackathonsData 
    : fallbackHackathons;         

  return (
    <section id="hackathons" className="py-20 lg:py-32 bg-[#0a0a0a] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="section-reveal">
          {/* Header */}
          <motion.div
            initial={{ y: 32, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-white tracking-tight">
              Hackathon Participation
            </h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Futuristic, minimal showcase of competitive tech building and collaboration
            </p>
          </motion.div>

          {/* Parallax Tech Elements + Center Highlight */}
          <ParallaxPhotos />

          {/* Information Blocks */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {(hackathons || []).slice(0, 4).map((h, idx) => (
                <motion.div
                  key={h.id ?? idx}
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="rounded-2xl border border-gray-800 bg-zinc-900/60 p-6 shadow-xl"
                >
                  <p className="text-sm uppercase text-zinc-500">Hackathon</p>
                  <h3 className="text-xl font-bold text-white">{h.name}</h3>
                  {h.projectTitle && (
                    <p className="mt-1 text-cyan-400 font-medium">{h.projectTitle}</p>
                  )}
                  <p className="mt-2 text-gray-300">{h.role}</p>
                  <p className="text-sm text-gray-500">{h.organizer}</p>
                  {h.certificateUrl && (
                    <a
                      href={h.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-cyan-400 hover:text-cyan-300 text-sm font-medium underline"
                    >
                      View Certificate →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto mt-16">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-cyan-500 z-0"></div>

            <div className="space-y-24">
              {hackathons.map((hackathon) => (
                <div
                  key={hackathon.id}
                  className={`flex items-center ${hackathon.side === 'right' ? 'flex-row-reverse' : ''}`}
                  style={{
                    animation: `slideIn${hackathon.side === 'left' ? 'Left' : 'Right'} 0.8s ease-out ${hackathon.delay}ms both`
                  }}
                >
                  <div className={`w-1/2 ${hackathon.side === 'left' ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-gray-800 bg-opacity-70 glass-effect rounded-2xl p-6 shadow-xl border border-gray-700">
                      <h3 className="text-xl font-bold mb-2 text-white">{hackathon.name}</h3>
                      <p className="text-gray-300 mb-2 font-medium">{hackathon.role}</p>
                      <p className="text-gray-400 text-sm mb-3">{hackathon.organizer}</p>
                      {hackathon.certificateUrl && (
                        <a
                          href={hackathon.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium underline transition duration-200"
                        >
                          View Certificate →
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
