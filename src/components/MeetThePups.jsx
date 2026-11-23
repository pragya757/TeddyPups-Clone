'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const doorsData = [
  {
    slug: 'maltipoo-max-male',
    name: 'Max',
    breed: 'Maltipoo',
    gender: 'Boy',
    age: '3 months',
    meta: 'Maltipoo, boy, 3 months, with video',
    color: '#a24a1a',
    image: '/media/Z0ToauDx7Eve/5fffe4d022/b942a5_4b8cfb8204d24eadaf524332aba1dc15-mv2.webp',
    desc: 'Max is an affectionate, playful apricot teacup Maltipoo with a silky hypoallergenic coat, sweet teddy bear eyes, and a very gentle, cuddle-loving temperament. Fully vaccinated, microchipped, and showroom ready in Dubai.',
    origin: 'Showroom in Dubai',
  },
  {
    slug: 'korean-teacup-maltipoo-female',
    name: 'Korean Teacup Maltipoo',
    breed: 'Korean Teacup Maltipoo',
    gender: 'Girl',
    age: '2 months',
    meta: 'girl, 2 months, with video',
    color: '#5a3a28',
    image: '/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg',
    desc: 'Direct from Seoul’s most prestigious heritage breeders. This exquisite teacup girl boasts ultra-compact proportions, button nose, silky non-shedding coat, and a calm, sweet lap-puppy nature.',
    origin: 'Imported from South Korea',
  },
  {
    slug: 'korean-teacup-poodle-female',
    name: 'Korean Teacup Poodle',
    breed: 'Korean Teacup Poodle',
    gender: 'Girl',
    age: '2 months',
    meta: 'girl, 2 months',
    color: '#d4893f',
    image: '/media/xeMJCapr5vcU/e618c653b2/b942a5_14376a216177484dbbb27995d0f6aeb7-mv2.jpg',
    desc: 'A doll-faced miniature Korean teacup poodle in warm apricot honey. Highly intelligent, hypoallergenic, and wonderfully suited for apartment living and loving families.',
    origin: 'Imported from South Korea',
  },
  {
    slug: 'maltipoo-cavapoo-male',
    name: 'Maltipoo & Cavapoo',
    breed: 'Maltipoo & Cavapoo',
    gender: 'Boy',
    age: '3 months',
    meta: 'boy, 3 months, with video',
    color: '#b8644a',
    image: '/media/YQhey4j7uWvZ/3ea10db6c1/b942a5_7ce7e7bd18424b6c8fb16dd30113ade2-mv2.jpg',
    desc: 'Best of both worlds: playful, friendly, and social with a lush wavy teddy coat. Certified vet health check complete and loves children and other pets.',
    origin: 'Showroom in Dubai',
  },
  {
    slug: 'toy-poodle-male-female',
    name: 'Toy Poodle',
    breed: 'Toy Poodle',
    gender: 'Boy & girl',
    age: '2 months',
    meta: 'boy & girl, 2 months',
    color: '#7a4a2e',
    image: '/media/vMu0BPvkAZ-j/c65e53967d/b942a5_0b2c0c0d178c4005acbe28725a5ea573-mv2.jpg',
    desc: 'Adorable deep red toy poodle siblings with vibrant curls, bright curious expressions, and playful cuddly energy. 100% hypoallergenic and low maintenance.',
    origin: 'Showroom in Dubai',
  },
  {
    slug: 'maltipoo-female-2',
    name: 'Maltipoo',
    breed: 'Maltipoo',
    gender: 'Girl',
    age: '3 months',
    meta: 'girl, 2 months, with video',
    color: '#a24a1a',
    image: '/media/3WJNmn6VVgVu/732f779474/b942a5_2b5dcece361b4589890ae920c66a1b70-mv2.jpg',
    desc: 'Sweet, bright, and loving cream Maltipoo girl with soft wavy fleece. Perfect companion for quiet evenings and cheerful walks.',
    origin: 'Imported from South Korea',
  },
  {
    slug: 'pomeranian-female',
    name: 'Pomeranian',
    breed: 'Pomeranian',
    gender: 'Girl',
    age: '3 months',
    meta: 'girl, 3 months, with video',
    color: '#5a3a28',
    image: '/media/3yOfnmoyPooH/81e0c7e00c/b942a5_556841b9a73942e5a9d782a683f3bc68-mv2.jpg',
    desc: 'A pure white cloud Pomeranian with fluffy double coat, short muzzle, and sparkling dark eyes. Microchipped and passport ready.',
    origin: 'Showroom in Dubai',
  },
  {
    slug: 'copper-male',
    name: 'Copper',
    breed: 'Cavapoo',
    gender: 'Boy',
    age: '2 months',
    meta: 'Cavapoo, boy, 2 months',
    color: '#d4893f',
    image: '/media/O-6w4FYqE10j/be76f399cc/b942a5_bb73ebbb952047988f944f3a8e3052bd-mv2.jpg',
    desc: 'Rich copper-colored Cavapoo with an irresistibly gentle expression and loyal, affectionate personality. A true sweetheart.',
    origin: 'Showroom in Dubai',
  },
];

export default function MeetThePups() {
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  
  const [trackX, setTrackX] = useState(0);
  const [floorX, setFloorX] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeCenterIdx, setActiveCenterIdx] = useState(0);

  // Handle sticky horizontal scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!pinRef.current || !trackRef.current) return;
      const rect = pinRef.current.getBoundingClientRect();
      const totalScrollDistance = pinRef.current.offsetHeight - window.innerHeight;
      
      if (totalScrollDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollDistance));

      // Calculate track travel: total track width minus viewport visible window
      const trackWidth = trackRef.current.scrollWidth;
      const maxTranslate = Math.max(0, trackWidth - window.innerWidth * 0.65);

      const currentX = progress * maxTranslate;
      setTrackX(currentX);
      setFloorX(currentX);

      // Determine which door is currently near center (around 38vw)
      const spotlightX = window.innerWidth * 0.38 + currentX;
      const doors = trackRef.current.children;
      let closestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < doors.length - 1; i++) {
        const door = doors[i];
        const doorCenter = door.offsetLeft + door.offsetWidth / 2;
        const dist = Math.abs(doorCenter - spotlightX);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = i;
        }
      }
      setActiveCenterIdx(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      data-pup-scene="true"
      data-tone="light"
      className="tp-scene tp-meet relative"
      data-pinned="true"
      style={{
        "--sky-top": "#fff1d8",
        "--sky-bottom": "#fbe3b4",
        backgroundColor: "#fbe3b4",
      }}
      aria-labelledby="meet-title"
    >
      {/* Outer Pin Range Container: 100vh + extra vertical scroll distance */}
      <div
        ref={pinRef}
        data-pin-range="true"
        style={{
          height: 'calc(100vh + 3000px)',
          position: 'relative',
        }}
      >
        {/* Sticky Stage Container: sticks to the viewport while user scrolls down */}
        <div
          className="tp-meet__stage"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            paddingTop: 'calc(var(--header-h, 4.75rem) + clamp(1rem, 3vh, 2.5rem))',
          }}
        >
          {/* Header */}
          <header className="tp-meet__head gutter flex items-end justify-between gap-6 max-w-[110rem] mx-auto w-full shrink-0 z-30">
            <div>
              <h2 id="meet-title" className="font-plush text-huge text-cocoa leading-tight">
                Meet the pups
              </h2>
              <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft,#5a3a28)]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link
              className="btn btn-primary inline-flex items-center rounded-full bg-cocoa px-7 py-3 text-base font-bold text-milk shadow-md hover:bg-cocoa/90 transition-all shrink-0"
              href="/puppies"
            >
              See all available puppies
            </Link>
          </header>

          {/* Corridor Hall with Horizontal Sliding Doors */}
          <div
            className="tp-meet__hall relative flex-1 w-full overflow-hidden"
            style={{
              "--floor-h": "clamp(5rem, 13vh, 8rem)",
            }}
          >
            {/* The Horizontal Track: slides left as you scroll */}
            <ol
              ref={trackRef}
              className="tp-meet__track"
              data-treadmill="true"
              aria-label="Puppies looking for a family"
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                position: 'absolute',
                left: 0,
                bottom: 'clamp(5rem, 13vh, 8rem)',
                transform: `translate3d(-${trackX.toFixed(1)}px, 0, 0)`,
                willChange: 'transform',
                width: 'max-content',
                maxWidth: 'none',
                paddingInline: '38vw 16vw',
                gap: 'clamp(4.5rem, 6vw, 7rem)',
                alignItems: 'flex-end',
                zIndex: 15,
                margin: 0,
              }}
            >
              {doorsData.map((door, idx) => {
                // Open if hovered, or if active in center, or Door 1 on initial load
                const isHovered = hoveredIdx === idx;
                const isAutoOpen = hoveredIdx === null && (idx === activeCenterIdx || (trackX === 0 && idx === 1));
                const isOpen = isHovered || isAutoOpen;

                return (
                  <li
                    key={door.slug}
                    className="tp-door relative shrink-0"
                    data-open={isOpen ? "true" : "false"}
                    style={{
                      width: 'var(--door-w, clamp(11rem, min(15vw, 24vh), 16rem))',
                      listStyle: 'none',
                    }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <Link
                      className="tp-door__link group block text-center select-none"
                      style={{ "--door": door.color }}
                      href={`/puppies/${door.slug}`}
                      aria-label={`View about ${door.name}`}
                    >
                      {/* Name & metadata above door */}
                      <span className="tp-door__plate block mb-3">
                        <span className="font-plush tp-door__name block text-xl font-bold text-cocoa group-hover:text-toffee transition-colors truncate">
                          {door.name}
                        </span>
                        <span className="tp-door__meta block text-xs font-semibold text-cocoa/75 mt-0.5 truncate">
                          {door.meta}
                        </span>
                      </span>

                      {/* Arched Door Frame & Chamber */}
                      <div
                        className="tp-door__frame relative rounded-t-full border-[3px] border-cocoa bg-[#1a0f0a] shadow-xl overflow-hidden"
                        style={{
                          aspectRatio: '4 / 5.2',
                          perspective: '750px',
                          perspectiveOrigin: '0 50%',
                        }}
                      >
                        {/* Puppy sitting inside chamber on cushion */}
                        <div className="tp-door__room absolute inset-0 z-0 overflow-hidden bg-[#2a170e]">
                          <Image
                            src={door.image}
                            alt={door.name}
                            fill
                            className="object-cover transition-transform duration-500"
                            style={{
                              transform: isOpen ? 'scale(1.05)' : 'scale(1)',
                            }}
                            sizes="(min-width: 1024px) 16rem, 50vw"
                          />
                        </div>

                        {/* Swinging Door Leaf with Paw Cutout */}
                        <div
                          className="tp-door__leaf absolute inset-0 z-10 rounded-t-full border-[3px] border-cocoa transition-transform duration-700 cubic-bezier(0.3, 1.25, 0.5, 1)"
                          style={{
                            backgroundColor: door.color,
                            transformOrigin: '0 50%',
                            transform: isOpen ? 'rotateY(-104deg)' : 'rotateY(0deg)',
                            boxShadow: isOpen ? '6px 0 24px rgba(0,0,0,0.45)' : 'none',
                          }}
                        >
                          {/* Inner panel groove */}
                          <div
                            className="absolute inset-[10%_12%_6%] rounded-t-full border-2 border-[#fffdf835] pointer-events-none"
                          />

                          {/* Paw print peephole cutout */}
                          <div className="tp-door__peephole absolute left-1/2 top-14 -translate-x-1/2 opacity-85 pointer-events-none">
                            <svg viewBox="0 0 64 64" className="size-8 text-[#fffdf865]" fill="currentColor">
                              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                            </svg>
                          </div>

                          {/* Brass Doorknob */}
                          <div className="tp-door__knob absolute right-3 top-1/2 -translate-y-1/2 size-3.5 rounded-full bg-[#f2be6b] border border-cocoa shadow-inner pointer-events-none" />
                        </div>

                        {/* "Available" Tag on top right */}
                        <span className="tp-door__tag font-scrawl absolute right-2 top-3 z-20 rounded-full bg-milk/95 px-2.5 py-0.5 text-xs font-bold text-cocoa shadow-md border border-cocoa/30">
                          Available
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}

              {/* Final "Meet them all" door */}
              <li
                className="tp-door tp-door--all relative shrink-0"
                style={{
                  width: 'var(--door-w, clamp(11rem, min(15vw, 24vh), 16rem))',
                  listStyle: 'none',
                }}
              >
                <Link className="tp-door__link group block text-center" href="/puppies">
                  <span className="tp-door__plate block mb-3 opacity-0 pointer-events-none">
                    <span className="font-plush tp-door__name block text-xl">All</span>
                  </span>
                  <div
                    className="tp-door__frame tp-door__frame--all relative rounded-t-full border-[3px] border-dashed border-cocoa/50 bg-sand/30 flex items-center justify-center p-6 text-center hover:border-cocoa transition-colors"
                    style={{ aspectRatio: '4 / 5.2' }}
                  >
                    <span className="font-plush text-2xl font-bold text-cocoa underline underline-offset-4 decoration-toffee">
                      Meet them all →
                    </span>
                  </div>
                </Link>
              </li>
            </ol>

            {/* Wooden Floor Board with synchronous plank scroll matching Screenshot */}
            <div
              aria-hidden="true"
              className="tp-meet__floor absolute inset-x-0 bottom-0"
              style={{
                height: 'clamp(5rem, 13vh, 8rem)',
                borderTop: '3px solid #2a170e',
                background: `linear-gradient(to bottom, #2a170e29, transparent 22%), repeating-linear-gradient(90deg, transparent 0 calc(11rem - 2px), #2a170e1f calc(11rem - 2px) 11rem) ${-floorX.toFixed(1)}px 0, linear-gradient(#e8b06a, #dc9a52)`,
                boxShadow: '0 -12px 0 -6px #f5d9a8',
                display: 'block',
                zIndex: 10,
              }}
            />

            {/* Yellow cartoon puppy companion resting at left */}
            <div
              data-pup-stop="true"
              data-pose="sit"
              data-facing="right"
              className="pup-stop tp-meet__teddy"
              style={{
                position: 'absolute',
                left: '14vw',
                bottom: 'calc(clamp(5rem, 13vh, 8rem) * 0.42)',
                width: 'clamp(9.5rem, 14vw, 13rem)',
                zIndex: 20,
              }}
            >
              <div className="pup-buddy" data-facing="right">
                <svg viewBox="0 0 300 240" style={{ overflow: 'visible', width: '100%', height: 'auto' }} aria-hidden="true" focusable="false">
                  <g data-p="root">
                    <ellipse data-p="shadow" cx="150" cy="230" rx="92" ry="7" fill="#2a170e" opacity="0.12" />
                    <g data-p="body">
                      {/* Back legs */}
                      <g transform="translate(94 192)">
                        <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z" fill="#e4a352" />
                        <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                        <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      </g>
                      <g transform="translate(168 192)">
                        <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z" fill="#e4a352" />
                        <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                        <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      </g>
                      {/* Tail */}
                      <g transform="rotate(34 84 150)">
                        <path d="M86 152 C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                        <path d="M86 152 C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
                        <path d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                      </g>
                      {/* Near legs */}
                      <g transform="translate(110 194)">
                        <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z" fill="#f2be6b" />
                        <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                        <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      </g>
                      <path d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                      <path d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                      <g transform="translate(186 194)">
                        <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z" fill="#f2be6b" />
                        <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                        <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      </g>
                    </g>
                    {/* Head & Face */}
                    <g data-p="head" transform="translate(0 4)">
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
                        <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                        <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                      </g>
                      <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />
                      <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      <path d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
