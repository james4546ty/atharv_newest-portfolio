import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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

// Provide Cloudinary links here (order = top to bottom)
const hackathonPhotos: string[] = [
  // 'https://res.cloudinary.com/.../image/upload/v123/photo1.jpg',
  // 'https://res.cloudinary.com/.../image/upload/v123/photo2.jpg',
  // 'https://res.cloudinary.com/.../image/upload/v123/photo3.jpg',
  // 'https://res.cloudinary.com/.../image/upload/v123/photo4.jpg',
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

  const bg = hackathonPhotos[0] ||
    'https://images.unsplash.com/photo-1460186136353-977e9d6085a1?q=80&w=2670&auto=format&fit=crop';

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
}

function ParallaxPhotos() {
  // Build a simple stagger layout; if fewer than 4 photos, reuse them
  const src = (i: number) => hackathonPhotos[i % Math.max(1, hackathonPhotos.length)];
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterBackdrop />
      <div className="mx-auto max-w-5xl px-4 pt-[200px]">
        {hackathonPhotos.length > 0 ? (
          <>
            <ParallaxImg
              src={src(0)}
              alt="Hackathon moment 1"
              start={-200}
              end={200}
              className="w-1/3"
            />
            <ParallaxImg
              src={src(1)}
              alt="Hackathon moment 2"
              start={200}
              end={-250}
              className="mx-auto w-2/3"
            />
            <ParallaxImg
              src={src(2)}
              alt="Hackathon moment 3"
              start={-200}
              end={200}
              className="ml-auto w-1/3"
            />
            <ParallaxImg
              src={src(3)}
              alt="Hackathon moment 4"
              start={0}
              end={-500}
              className="ml-24 w-5/12"
            />
          </>
        ) : null}
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
    <section id="hackathons" className="py-20 lg:py-32 bg-gray-900 bg-opacity-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="section-reveal">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">Hackathon Participation</h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Collaborative problem-solving and innovation through competitive programming events
            </p>
          </div>

          {/* Scroll photo animation */}
          <ParallaxPhotos />

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto mt-16">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500 z-0"></div>

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
                          className="inline-block mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium underline transition duration-200"
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
