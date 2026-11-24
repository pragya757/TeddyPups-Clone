'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import goneHomeData from '@/data/gone_home.json';

const FEATURED_SLUG_ORDER = [
  'maltipoo-max-male',
  'korean-teacup-maltipoo-female',
  'korean-teacup-poodle-female',
  'maltipoo-cavapoo-male',
  'toy-poodle-male-female',
  'pomeranian-female',
  'copper-male',
  'shitzu-female',
  'shitzu-male',
  'pomeranian-bella-female',
  'maltipoo-zoe-girl',
  'poodle-molly-female',
  'poodle-teddy-male',
  'maltipoo-lola-girl',
  'korean-teacup-pomeranian-male',
  'pomsky-ollie-boy',
  'maltipoo-bruno-boy',
  'maltese-buddy-male',
  'maltese-charlie-male',
];

const WASH_COLORS = [
  '#bfddf5', // sky
  '#fbe3b4', // honey soft
  '#f9cdbf', // blush
  '#d7e6c9', // sage
  '#bfddf5', // sky
  '#fbe3b4', // honey soft
  '#f9cdbf', // blush
  '#d7e6c9', // sage
];

const TILTS = [-1.5, 1.8, -2, 1.5, -1.2, 2.1, -1.6, 1.8];

// Doodles matching the reference site: hearts, stars/sparkles, paws, dots
function DoodleDecoration({ index }) {
  const doodleType = index % 4;

  if (doodleType === 0) {
    // 3 speckles & 4-point sparkle
    return (
      <>
        <g className="tp-sketch__doodle">
          <circle cx="176" cy="38" r="2.2" fill="#2a170e" />
          <circle cx="184" cy="46" r="1.8" fill="#2a170e" />
          <circle cx="180" cy="54" r="2" fill="#2a170e" />
        </g>
        <path
          className="tp-sketch__doodle"
          d="M24 162 Q24 168 30 168 Q24 168 24 174 Q24 168 18 168 Q24 168 24 162 Z"
          fill="#2a170e"
        />
      </>
    );
  }

  if (doodleType === 1) {
    // 4-point star and tiny paw
    return (
      <>
        <path
          className="tp-sketch__doodle"
          d="M182 68 Q182 76 190 76 Q182 76 182 84 Q182 76 174 76 Q182 76 182 68 Z"
          fill="#2a170e"
        />
        <g className="tp-sketch__doodle">
          <circle cx="20" cy="144" r="1.8" fill="#2a170e" />
          <circle cx="26" cy="150" r="1.6" fill="#2a170e" />
          <circle cx="22" cy="156" r="2" fill="#2a170e" />
        </g>
      </>
    );
  }

  if (doodleType === 2) {
    // cute hand-drawn outline heart
    return (
      <>
        <path
          className="tp-sketch__doodle"
          d="M26 62 C22 55 12 58 13 67 C15 75 26 82 26 82 C26 82 37 75 39 67 C40 58 30 55 26 62 Z"
          fill="none"
          stroke="#2a170e"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="tp-sketch__doodle"
          d="M178 140 Q178 146 184 146 Q178 146 178 152 Q178 146 172 146 Q178 146 178 140 Z"
          fill="#2a170e"
        />
      </>
    );
  }

  // doodleType === 3: subtle paws & dots
  return (
    <>
      <g className="tp-sketch__doodle">
        <ellipse cx="184" cy="138" rx="4.5" ry="3.8" fill="#2a170e" />
        <circle cx="178" cy="131" r="1.6" fill="#2a170e" />
        <circle cx="182" cy="128" r="1.7" fill="#2a170e" />
        <circle cx="187" cy="129" r="1.7" fill="#2a170e" />
        <circle cx="190" cy="133" r="1.5" fill="#2a170e" />
      </g>
      <g className="tp-sketch__doodle">
        <circle cx="24" cy="46" r="2" fill="#2a170e" />
        <circle cx="30" cy="52" r="1.8" fill="#2a170e" />
      </g>
    </>
  );
}

export default function PuppiesClient({ initialPuppies }) {
  const [selectedWhere, setSelectedWhere] = useState('everywhere');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');

  // Sorted list: featured ones first
  const sortedPuppies = useMemo(() => {
    const list = [...initialPuppies];
    list.sort((a, b) => {
      const idxA = FEATURED_SLUG_ORDER.indexOf(a.slug);
      const idxB = FEATURED_SLUG_ORDER.indexOf(b.slug);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });
    return list;
  }, [initialPuppies]);

  // Filtering logic
  const filtered = useMemo(() => {
    return sortedPuppies.filter((p) => {
      // 1. Where filter
      if (selectedWhere === 'imported') {
        const isImported =
          p.origin.toLowerCase().includes('imported') ||
          p.desc.toLowerCase().includes('imported');
        if (!isImported) return false;
      } else if (selectedWhere === 'korean-teacup') {
        const isKoreanTeacup =
          p.name.toLowerCase().includes('korean') ||
          p.name.toLowerCase().includes('teacup') ||
          p.breed.toLowerCase().includes('korean') ||
          p.breed.toLowerCase().includes('teacup') ||
          p.slug.toLowerCase().includes('korean');
        if (!isKoreanTeacup) return false;
      }

      // 2. Breed filter
      if (selectedBreed !== 'all') {
        const targetBreed = selectedBreed.toLowerCase().replace(/[^a-z]/g, '');
        const pBreed = (p.breed + ' ' + p.name).toLowerCase().replace(/[^a-z]/g, '');
        if (!pBreed.includes(targetBreed)) return false;
      }

      // 3. Gender filter
      if (selectedGender !== 'all') {
        const pGender = p.gender.toLowerCase();
        if (selectedGender === 'boys') {
          if (!pGender.includes('boy')) return false;
        } else if (selectedGender === 'girls') {
          if (!pGender.includes('girl')) return false;
        }
      }

      return true;
    });
  }, [sortedPuppies, selectedWhere, selectedBreed, selectedGender]);

  const breeds = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];

  return (
    <div className="tp-page">
      <section className="tp-sketchbook py-10 md:py-16">
        <div className="gutter mx-auto max-w-[110rem] pb-24">
          {/* Header */}
          <div className="tp-sketchbook__head mb-8">
            <div className="tp-sketchbook__words">
              <p className="font-scrawl text-lg text-toffee">from Teddy's sketchbook</p>
              
              <h1 id="pups-title" className="tp-sketchbook__title font-plush text-5xl md:text-7xl text-cocoa mt-1">
                Available puppies
                <svg
                  className="tp-sketchbook__underline"
                  viewBox="0 0 400 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M4 14C80 7 220 5 396 16" />
                </svg>
              </h1>

              <p className="tp-sketchbook__lede mt-4 max-w-2xl text-base md:text-lg text-cocoa/85 leading-relaxed">
                Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
              </p>
            </div>

            {/* Self-Portrait Circle */}
            <div className="tp-sketchbook__self">
              <svg
                viewBox="0 0 300 240"
                style={{ overflow: 'visible', width: '100%', height: '100%' }}
                aria-label="Teddy's self portrait"
                role="img"
              >
                <g data-p="body">
                  <ellipse cx="150" cy="225" rx="85" ry="6" fill="#2a170e" opacity="0.12" />
                  <g transform="translate(100 190)">
                    <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                  </g>
                  <g transform="translate(196 190)">
                    <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                  </g>
                  <path d="M90 175 Q150 165 210 175 Q210 200 150 205 Q90 200 90 175 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
                </g>
                <g data-p="head" transform="translate(-62 -2)">
                  <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />
                  <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  <g data-p="eyes">
                    <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                    <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                    <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                    <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                  </g>
                  <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />
                  <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                </g>
              </svg>
              <span className="tp-sketchbook__caption font-scrawl text-sm">self-portrait</span>
            </div>
          </div>

          {/* Filter Pad Box (Taped Card) */}
          <div className="tp-sketchpad mb-10 mt-6">
            <div className="flex flex-col gap-5">
              {/* Row 1: where */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="w-24 text-sm font-semibold text-cocoa-soft/80 shrink-0">where</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    { id: 'everywhere', label: 'Everywhere' },
                    { id: 'imported', label: 'Imported' },
                    { id: 'korean-teacup', label: 'Korean Teacup' },
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      aria-pressed={selectedWhere === chip.id}
                      onClick={() => setSelectedWhere(chip.id)}
                      className="tp-sticker-chip"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: breed */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="w-24 text-sm font-semibold text-cocoa-soft/80 shrink-0">breed</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {breeds.map((b) => (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={selectedBreed === b}
                      onClick={() => setSelectedBreed(selectedBreed === b ? 'all' : b)}
                      className="tp-sticker-chip"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: boy or girl */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="w-24 text-sm font-semibold text-cocoa-soft/80 shrink-0">boy or girl</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    { id: 'boys', label: 'Boys' },
                    { id: 'girls', label: 'Girls' },
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      aria-pressed={selectedGender === chip.id}
                      onClick={() => setSelectedGender(selectedGender === chip.id ? 'all' : chip.id)}
                      className="tp-sticker-chip"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Count Line */}
          <div className="mb-10 pl-1">
            <p className="font-scrawl text-lg text-cocoa/90">
              {filtered.length} puppies looking for a home
            </p>
          </div>

          {/* Puppy Cards Grid (Sketchbook style) */}
          <ul className="tp-sketches">
            {filtered.map((pup, idx) => {
              const mainImg = pup.images && pup.images.length > 0 ? pup.images[0] : '/brand/logo.png';
              const tilt = TILTS[idx % TILTS.length];
              const washColor = WASH_COLORS[idx % WASH_COLORS.length];
              const cleanName = pup.name.replace(/&amp;/g, '&');
              const hasVideo =
                pup.slug.includes('max') ||
                pup.slug.includes('korean-teacup-maltipoo') ||
                pup.slug.includes('maltipoo-cavapoo') ||
                pup.slug.includes('pomeranian-female') ||
                pup.slug.includes('bruno') ||
                (pup.desc && pup.desc.toLowerCase().includes('video'));

              // Meta description formatting
              let metaStr = '';
              if (pup.slug === 'maltipoo-cavapoo-male') {
                metaStr = 'boy • 3 months Maltipoo & 2 months Cavapoo';
              } else if (pup.slug === 'toy-poodle-male-female') {
                metaStr = 'boy & girl • 2 months';
              } else {
                const parts = [];
                if (pup.breed && !cleanName.toLowerCase().includes(pup.breed.toLowerCase())) {
                  parts.push(pup.breed);
                }
                if (pup.gender) parts.push(pup.gender.toLowerCase());
                if (pup.age) parts.push(pup.age);
                metaStr = parts.join(' • ');
              }

              return (
                <li key={pup.slug}>
                  <Link
                    href={`/puppies/${pup.slug}`}
                    className="tp-sketch group"
                    style={{
                      '--tilt': `${tilt}deg`,
                      '--wash': washColor,
                      '--d': `${(idx % 10) * 50}ms`,
                    }}
                  >
                    <span className="tp-sketch__frame">
                      {/* Pastel Wash Background */}
                      <svg
                        className="tp-sketch__wash"
                        viewBox="0 0 200 200"
                        aria-hidden="true"
                      >
                        <circle cx="100" cy="100" r="92" />
                      </svg>

                      {/* Photo */}
                      <span className="tp-sketch__photo">
                        <Image
                          src={mainImg}
                          alt={`${cleanName}, ${pup.breed}`}
                          fill
                          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                          className="object-cover"
                          priority={idx < 5}
                        />
                      </span>

                      {/* Hand-drawn ink rings and doodles */}
                      <svg
                        className="tp-sketch__ink"
                        viewBox="0 0 200 200"
                        aria-hidden="true"
                      >
                        <ellipse
                          cx="100"
                          cy="100"
                          rx="90"
                          ry="89"
                          className="tp-sketch__line"
                        />
                        <ellipse
                          cx="101"
                          cy="99"
                          rx="88"
                          ry="90"
                          className="tp-sketch__line tp-sketch__line--retrace"
                        />
                        <DoodleDecoration index={idx} />
                      </svg>

                      {/* Video pill if available */}
                      {hasVideo && (
                        <span className="tp-sketch__video font-scrawl">
                          ► video
                        </span>
                      )}

                      {/* Available Sticker */}
                      <span className="tp-sketch__sticker font-scrawl">
                        Available
                      </span>
                    </span>

                    {/* Puppy Title & Meta */}
                    <span className="tp-sketch__name font-plush text-cocoa">
                      {cleanName}
                    </span>
                    <span className="tp-sketch__meta font-sans">
                      {metaStr}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {filtered.length === 0 && (
            <div className="my-16 rounded-3xl border-2 border-dashed border-cocoa/30 p-12 text-center text-cocoa">
              <span className="text-4xl">🐾</span>
              <p className="font-plush text-2xl mt-3">No puppies match your current filter.</p>
              <p className="mt-2 text-cocoa/70 text-sm">
                Try selecting different filters or message us on WhatsApp — we have new litters arriving weekly!
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedWhere('everywhere');
                  setSelectedBreed('all');
                  setSelectedGender('all');
                }}
                className="mt-6 rounded-full bg-cocoa px-6 py-2.5 text-sm font-bold text-milk shadow-md hover:bg-cocoa/90 transition-all"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Already Gone Home Bottom Strip */}
      <section className="tp-gone-strip relative">
        <div className="gutter mx-auto max-w-[110rem] flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          {/* Left info & CTA button */}
          <div className="max-w-md">
            <h2 className="font-plush text-4xl md:text-5xl text-cocoa font-bold">
              Already gone home
            </h2>
            <p className="mt-3 text-base md:text-lg text-cocoa-soft/90 leading-relaxed">
              These puppies have found their families.
            </p>
            <Link
              href="/gone-home"
              className="mt-6 inline-flex items-center rounded-full bg-cocoa px-7 py-3 text-sm font-bold text-milk shadow-md hover:bg-cocoa/90 transition-all hover:scale-[1.02]"
            >
              See the puppies who've gone home
            </Link>
          </div>

          {/* Right 5 puppies row */}
          <ul className="tp-gone-strip__row flex items-center justify-center gap-6 sm:gap-8 flex-wrap lg:flex-nowrap">
            {goneHomeData.slice(0, 5).map((item, idx) => (
              <li key={idx} className="text-center w-24 sm:w-28">
                <Link href="/gone-home" className="tp-sketch tp-sketch--small group block">
                  <span className="tp-sketch__frame" style={{ '--tilt': `${TILTS[idx % TILTS.length]}deg`, '--wash': '#fbe3b4' }}>
                    <svg className="tp-sketch__wash" viewBox="0 0 200 200" aria-hidden="true">
                      <circle cx="100" cy="100" r="92" />
                    </svg>
                    <span className="tp-sketch__photo">
                      <Image
                        src={item.src}
                        alt={item.name}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </span>
                    <svg className="tp-sketch__ink" viewBox="0 0 200 200" aria-hidden="true">
                      <ellipse cx="100" cy="100" rx="90" ry="89" className="tp-sketch__line" />
                      <ellipse cx="101" cy="99" rx="88" ry="90" className="tp-sketch__line tp-sketch__line--retrace" />
                      {/* Little decorative hearts & dots */}
                      {idx % 2 === 0 ? (
                        <circle cx="24" cy="54" r="2" fill="#2a170e" />
                      ) : (
                        <path
                          className="tp-sketch__doodle"
                          d="M178 50 C174 44 166 47 167 54 C168 60 178 66 178 66 C178 66 188 60 189 54 C190 47 182 44 178 50 Z"
                          fill="none"
                          stroke="#2a170e"
                          strokeWidth="2"
                        />
                      )}
                    </svg>
                    <span className="tp-sketch__sticker tp-sketch__sticker--home font-scrawl">
                      gone home ♥
                    </span>
                  </span>
                  <span className="tp-sketch__name font-plush text-center text-base sm:text-lg font-bold text-cocoa mt-2 block">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}