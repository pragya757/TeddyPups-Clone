'use client';

import happyFamiliesData from '@/data/happy_families.json';

const TILTS = ['-2.2deg', '1.6deg', '-0.9deg', '2.4deg', '-1.5deg', '0.8deg', '-2.6deg', '1.2deg'];
const TAPES = ['#f6d79a', '#f9cdbf', '#cfe5f6', '#f6d79a', '#e9dcc4', '#f6d79a', '#f9cdbf', '#cfe5f6'];
const TAPE_CLASSES = [
  'tp-tape--center',
  'tp-tape--left',
  'tp-tape--right',
  'tp-tape--tl',
  'tp-tape--center',
  'tp-tape--right',
  'tp-tape--left',
  'tp-tape--center',
];

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

          {/* 64 Polaroid Photo Wall - Masonry Column Layout */}
          <div className="mt-16 md:mt-20">
            <ul className="tp-wall" aria-label="Photos from TeddyPups families">
              {happyFamiliesData.map((item, idx) => {
                const tilt = TILTS[idx % TILTS.length];
                const tapeColor = TAPES[idx % TAPES.length];
                const tapeClass = TAPE_CLASSES[idx % TAPE_CLASSES.length];
                const isCornerTape = idx % 8 === 3;
                const caption = item.caption ? item.caption.trim() : '';

                return (
                  <li
                    key={item.id || idx}
                    className="tp-wall__item"
                    data-reveal="true"
                    style={{ '--d': `${(idx % 8) * 60}ms` }}
                  >
                    <button
                      type="button"
                      className="tp-wall__print"
                      aria-label={`Open photo ${idx + 1} of ${happyFamiliesData.length}${caption ? ': ' + caption : ''}`}
                    >
                      <span
                        className="tp-polaroid"
                        style={{
                          '--tilt': tilt,
                          '--tape': tapeColor,
                          '--i': idx,
                        }}
                      >
                        {/* Washi Tape */}
                        {isCornerTape ? (
                          <>
                            <span aria-hidden="true" className="tp-tape tp-tape--tl" />
                            <span aria-hidden="true" className="tp-tape tp-tape--tr" />
                          </>
                        ) : (
                          <span aria-hidden="true" className={`tp-tape ${tapeClass}`} />
                        )}

                        {/* Photo Container - Natural aspect ratio */}
                        <span className="tp-polaroid__photo">
                          <img
                            src={item.url}
                            alt={item.alt || 'A happy TeddyPups family with their new puppy'}
                            loading={idx < 8 ? 'eager' : 'lazy'}
                            decoding="async"
                            style={{
                              width: '100%',
                              height: 'auto',
                              display: 'block',
                              backgroundColor: item.color || '#e8c8a8',
                            }}
                          />
                        </span>

                        {/* Polaroid Caption */}
                        <span className="tp-polaroid__caption font-scrawl">
                          {caption}
                        </span>
                      </span>

                      {/* Paw Icon Stamp */}
                      <svg viewBox="0 0 64 64" className="tp-wall__paw" aria-hidden="true" fill="currentColor">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
