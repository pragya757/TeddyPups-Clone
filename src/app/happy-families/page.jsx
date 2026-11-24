'use client';

import happyFamiliesData from '@/data/happy_families.json';

const TILTS = [-1.8, 1.4, -1.2, 2.1, -1.5, 1.9, -2.2, 1.6, -1.1, 1.7, -1.9, 1.3];

const TAPE_COLORS = [
  '#f9cdbf', // blush pink
  '#f6d79a', // honey beige
  '#bfddf5', // soft sky blue
  '#e9dcc4', // parchment
  '#f9cdbf', // blush pink
  '#f6d79a', // honey beige
  '#bfddf5', // soft sky blue
  '#e9dcc4', // parchment
];

const TAPE_VARIANTS = [
  'tp-tape--center',
  'tp-tape--center',
  'tp-tape--left',
  'tp-tape--center',
  'tp-tape--right',
  'tp-tape--center',
];

// Specific known captions matching reference site & lovely moments
const SPECIAL_CAPTIONS = {
  3: 'Lulu 🧸 with her new mummy ❤️',
  7: 'Adorable Maltipoo baby 🧸❤️',
  10: 'My new teddy puppy 🥰🧸',
  15: 'Our new puppies 🧸🥰🤗',
  17: 'New puppy 🧸😍',
  22: 'Gang of 3 😍🧸',
  24: 'So happy 😍😍',
  29: 'Forever home 🐾❤️',
  35: 'New pup 🤗💫',
  38: 'Best cuddle buddy 🧸🥰',
  41: 'In love with our little boy ❤️',
  47: 'Sweet teacup princess 🧸💫',
  50: 'Our happy little family 🥰',
  53: 'Welcome home Leo 🐾',
  57: 'Little bundle of joy ❤️',
  62: 'Pure love 🧸❤️',
};

export default function HappyFamiliesPage() {
  return (
    <div className="tp-page min-h-screen">
      <section className="tp-scene py-10 md:py-16">
        <div className="gutter mx-auto max-w-[110rem] pb-24">
          {/* Header & Spotlight Note */}
          <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            {/* Left Header Copy */}
            <div className="lg:col-span-7">
              <p className="font-scrawl text-xl md:text-2xl text-toffee font-semibold">
                our wall of happy endings
              </p>
              <h1 className="font-plush text-huge text-cocoa leading-[0.92] mt-3 tracking-tight">
                Happy<br />
                families <span className="inline-block text-toffee text-5xl md:text-7xl align-middle font-normal ml-1">♡</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-cocoa/85 max-w-xl leading-relaxed">
                Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
              </p>
              <p className="mt-4 font-scrawl text-xl text-toffee font-bold">
                {happyFamiliesData.length} moments and counting
              </p>
            </div>

            {/* Right Taped Testimonial Note */}
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="relative max-w-md w-full bg-[#fffefb] p-7 md:p-8 rounded-sm shadow-[0_4px_20px_rgba(42,23,14,0.08)] border border-cocoa/10 rotate-[-0.8deg]">
                {/* Washi Tape on Top Center */}
                <span
                  className="tp-tape tp-tape--center !top-[-0.75rem]"
                  style={{ '--tape': '#bfddf5' }}
                  aria-hidden="true"
                />

                <blockquote className="text-sm md:text-base text-cocoa/90 leading-relaxed font-sans italic">
                  “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
                </blockquote>
                <p className="mt-5 font-scrawl font-bold text-base md:text-lg text-cocoa">
                  Sarah M., Dubai, UAE
                </p>
              </div>
            </div>
          </header>

          {/* 64 Polaroid Photo Wall */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-6 sm:gap-x-8 lg:gap-x-10 items-start">
            {happyFamiliesData.map((item, idx) => {
              const tilt = TILTS[idx % TILTS.length];
              const tapeColor = TAPE_COLORS[idx % TAPE_COLORS.length];
              const tapeVariant = TAPE_VARIANTS[idx % TAPE_VARIANTS.length];
              const caption = SPECIAL_CAPTIONS[idx] || (item.caption && item.caption.trim());

              return (
                <li
                  key={item.id || idx}
                  className={idx % 4 === 1 || idx % 4 === 2 ? 'lg:mt-6' : ''}
                >
                  <div
                    className="tp-polaroid group cursor-pointer"
                    style={{
                      '--tilt': `${tilt}deg`,
                    }}
                  >
                    {/* Washi Tape */}
                    <span
                      className={`tp-tape ${tapeVariant}`}
                      style={{
                        '--tape': tapeColor,
                        opacity: 0.9,
                      }}
                      aria-hidden="true"
                    />

                    {/* Photo Container */}
                    <span
                      className="tp-polaroid__photo"
                      style={{
                        aspectRatio: '4 / 4.8',
                        width: '100%',
                        position: 'relative',
                        display: 'block',
                        overflow: 'hidden',
                        borderRadius: '2px',
                        backgroundColor: '#f0e8dc',
                      }}
                    >
                      <img
                        src={item.url}
                        alt={item.alt || 'Happy TeddyPups family with their new puppy'}
                        loading={idx < 8 ? 'eager' : 'lazy'}
                        decoding="async"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                        }}
                        className="group-hover:scale-105"
                      />
                    </span>

                    {/* Polaroid Bottom Margin / Handwritten Caption */}
                    <span className="tp-polaroid__caption font-scrawl text-sm md:text-base text-cocoa block min-h-[2.8rem] pt-2.5 pb-1 px-1 text-center font-bold">
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
