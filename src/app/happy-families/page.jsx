'use client';

import Image from 'next/image';
import happyFamiliesData from '@/data/happy_families.json';

const TILTS = [-1.8, 1.4, -1.2, 2.1, -1.5, 1.9, -2.2, 1.6, -1.1, 1.7, -1.9, 1.3];

const TAPE_COLORS = [
  '#f9cdbf', // blush pink
  '#f6d79a', // honey beige
  '#bfddf5', // soft sky blue
  '#f9cdbf', // blush pink
  '#f6d79a', // honey beige
  '#bfddf5', // soft sky blue
];

const TAPE_VARIANTS = [
  'tp-tape--center',
  'tp-tape--center',
  'tp-tape--center',
  'tp-tape--left',
  'tp-tape--right',
  'tp-tape--center',
];

// Specific known captions from reference site
const SPECIAL_CAPTIONS = {
  3: 'Lulu 🧸 with her new mummy ♥',
  7: 'Adorable Maltipoo baby 🧸♥',
  11: 'My new teddy puppy 🥰🧸',
  15: 'Our new puppies 🧸🥰🤗',
  19: 'New puppy 🧸😍',
  23: 'Gang of 3 😍🧸',
  27: 'So happy 😍😍',
  35: 'New pup 🤗💫',
};

export default function HappyFamiliesPage() {
  return (
    <div className="tp-page">
      <section className="tp-scene py-10 md:py-16">
        <div className="gutter mx-auto max-w-[110rem] pb-24">
          {/* Header & Spotlight Note */}
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left Header Copy */}
            <div className="lg:col-span-7">
              <p className="font-scrawl text-lg text-toffee">
                our wall of happy endings
              </p>
              <h1 className="font-plush text-6xl md:text-8xl text-cocoa font-bold leading-[0.95] mt-2 tracking-tight">
                Happy<br />
                families <span className="inline-block text-toffee text-5xl md:text-7xl align-middle font-normal ml-1">♡</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-cocoa/85 max-w-xl leading-relaxed">
                Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
              </p>
              <p className="mt-4 font-scrawl text-lg text-toffee font-bold">
                {happyFamiliesData.length} moments and counting
              </p>
            </div>

            {/* Right Taped Testimonial Note */}
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="relative max-w-md w-full bg-[#fffefb] p-7 md:p-8 rounded-sm shadow-[0_2px_14px_rgba(42,23,14,0.1)] border border-cocoa/10 rotate-[-0.6deg]">
                {/* Washi Tape on Top Center */}
                <span
                  className="tp-tape tp-tape--center !top-[-0.75rem]"
                  style={{ '--tape': '#bfddf5' }}
                  aria-hidden="true"
                />

                <blockquote className="text-sm md:text-base text-cocoa/90 leading-relaxed font-sans italic">
                  “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
                </blockquote>
                <p className="mt-5 font-sans font-bold text-sm text-cocoa">
                  Sarah M., Dubai, UAE
                </p>
              </div>
            </div>
          </header>

          {/* 64 Polaroid Photo Wall */}
          <ul className="tp-photowall__prints grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 sm:gap-x-8 lg:gap-x-10">
            {happyFamiliesData.map((item, idx) => {
              const tilt = TILTS[idx % TILTS.length];
              const tapeColor = TAPE_COLORS[idx % TAPE_COLORS.length];
              const tapeVariant = TAPE_VARIANTS[idx % TAPE_VARIANTS.length];
              const caption = SPECIAL_CAPTIONS[idx] || (item.caption && item.caption.trim());

              return (
                <li
                  key={item.id || idx}
                  className={idx % 4 === 1 || idx % 4 === 2 ? 'lg:mt-5' : ''}
                >
                  <div
                    className="tp-polaroid group cursor-pointer"
                    style={{
                      '--tilt': `${tilt}deg`,
                      opacity: 1,
                    }}
                  >
                    {/* Washi Tape */}
                    <span
                      className={`tp-tape ${tapeVariant}`}
                      style={{
                        '--tape': tapeColor,
                        opacity: 0.88,
                      }}
                      aria-hidden="true"
                    />

                    {/* Photo Container */}
                    <span className="tp-polaroid__photo block relative aspect-[4/4.8] w-full overflow-hidden bg-[#e8dfd3]">
                      <Image
                        src={item.url}
                        alt={item.alt || 'Happy TeddyPups family with their new puppy'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={idx < 4}
                      />
                    </span>

                    {/* Polaroid Bottom Margin / Handwritten Caption */}
                    <span className="tp-polaroid__caption font-scrawl text-sm text-cocoa block min-h-[2.6rem] py-2 px-1 text-center font-bold">
                      {caption || ''}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}