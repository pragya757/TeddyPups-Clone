'use client';

import { useEffect, useRef, useState } from 'react';

// Paw print path from TeddyPups design
const PAW_PATH = "M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z";

export default function PupJourney() {
  const [mounted, setMounted] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [pose, setPose] = useState('peek');
  const [isFront, setIsFront] = useState(false);
  const [bubbleText, setBubbleText] = useState('hm?');
  const [showBubble, setShowBubble] = useState(true);
  
  const actorRef = useRef(null);
  const printsRef = useRef(null);
  const printIdxRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastWalkPosRef = useRef({ x: 0, y: 0 });
  const scrollTimeoutRef = useRef(null);
  const bubbleTimeoutRef = useRef(null);

  // Position state (interpolated screen coords)
  const posRef = useRef({ x: 0, y: 0, scale: 0.8 });

  useEffect(() => {
    setMounted(true);
    document.documentElement.dataset.pup = "lane";

    const updateCompanion = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      
      const scrollDiff = scrollY - lastScrollYRef.current;
      const scrollingDown = scrollDiff >= 0;
      lastScrollYRef.current = scrollY;

      // Query stops on page
      const stops = Array.from(document.querySelectorAll('.pup-stop[data-pup-stop="true"]'));
      if (!stops.length) return;

      // Find stops bounding rects relative to viewport
      const stopData = stops.map((el) => {
        const rect = el.getBoundingClientRect();
        const scene = el.closest('[data-pup-scene]');
        return {
          el,
          scene,
          rect,
          centerY: rect.top + rect.height / 2,
          pose: el.dataset.pose || 'sit',
          facing: el.dataset.facing || 'right',
          behind: el.dataset.behind === 'true',
          act: el.dataset.act || '',
        };
      });

      // Find which stop is closest to the active viewport focal area (around 40% - 75% down viewport)
      const focalY = window.innerHeight * 0.55;
      let activeIdx = 0;
      let minDistance = Infinity;

      stopData.forEach((st, idx) => {
        const dist = Math.abs(st.centerY - focalY);
        if (dist < minDistance) {
          minDistance = dist;
          activeIdx = idx;
        }
      });

      // Special case: top of the page (Hero)
      if (scrollY < 120) {
        activeIdx = 0;
      }
      // Special case: bottom of the page (Footer)
      if (docHeight > 0 && scrollY >= docHeight - 80) {
        activeIdx = stopData.length - 1;
      }

      const activeStop = stopData[activeIdx];
      const targetRect = activeStop.rect;

      // Check if user is actively scrolling
      setIsWalking(true);
      setFacingRight(scrollingDown);

      // Interpolate or smoothly position actor
      let targetX = targetRect.left;
      let targetY = targetRect.top;
      let targetScale = Math.min(1, Math.max(0.65, targetRect.width / 300));

      // At Hero (stop 0): sits behind the quilt, peeking
      if (activeIdx === 0 && scrollY < 120) {
        setIsFront(false);
        setPose('peek');
        setShowBubble(true);
        setBubbleText('hm?');
      } else if (activeIdx === stopData.length - 1 && scrollY >= docHeight - 80) {
        // Footer: snug in basket
        setIsFront(false);
        setPose('snug');
        setShowBubble(false);
      } else {
        // Floating / traveling in view
        setIsFront(true);
        setPose(activeStop.pose || 'sit');
      }

      // Position actor
      if (actorRef.current) {
        actorRef.current.style.transform = `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(1)}px, 0)`;
      }

      // Leave paw prints if walked sufficiently
      const walkDist = Math.hypot(targetX - lastWalkPosRef.current.x, targetY - lastWalkPosRef.current.y);
      if (walkDist > 45 && printsRef.current) {
        lastWalkPosRef.current = { x: targetX, y: targetY };
        const printSvgs = printsRef.current.children;
        if (printSvgs && printSvgs.length) {
          const p = printSvgs[printIdxRef.current % printSvgs.length];
          printIdxRef.current += 1;
          const printX = targetX + (scrollingDown ? 40 : 180);
          const printY = targetY + window.scrollY + 170;
          p.style.transform = `translate(${printX.toFixed(1)}px, ${printY.toFixed(1)}px) rotate(${(Math.random() * 24 - 12).toFixed(1)}deg)`;
          p.style.opacity = '0.5';
          setTimeout(() => {
            p.style.transition = 'opacity 1.5s ease-out';
            p.style.opacity = '0';
          }, 300);
        }
      }

      // Mark scene visited and here
      stopData.forEach((st, idx) => {
        if (st.scene) {
          st.scene.dataset.visited = idx <= activeIdx ? 'true' : 'false';
          st.scene.dataset.here = idx === activeIdx ? 'true' : 'false';
        }
      });

      // Clear previous timeout and set settling timeout
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsWalking(false);
        if (activeIdx === 0 && window.scrollY < 120) {
          setIsFront(false);
          setPose('peek');
        } else if (activeIdx === stopData.length - 1) {
          setIsFront(false);
          setPose('snug');
        } else {
          setPose(activeStop.pose);
        }
      }, 160);
    };

    window.addEventListener('scroll', updateCompanion, { passive: true });
    window.addEventListener('resize', updateCompanion);
    
    // Initial run
    setTimeout(updateCompanion, 100);

    return () => {
      window.removeEventListener('scroll', updateCompanion);
      window.removeEventListener('resize', updateCompanion);
      clearTimeout(scrollTimeoutRef.current);
      clearTimeout(bubbleTimeoutRef.current);
      delete document.documentElement.dataset.pup;
    };
  }, []);

  // Click companion for happy woof
  const handlePetPuppy = () => {
    const sounds = ['woof!', 'yip!', 'boing!', 'I like you! ♥', 'sniff!'];
    const s = sounds[Math.floor(Math.random() * sounds.length)];
    setBubbleText(s);
    setShowBubble(true);
    clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 1800);
  };

  if (!mounted) return null;

  return (
    <>
      {/* 24 paw prints for the trail */}
      <div ref={printsRef} className="pup-prints" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 64 64"
            className="pup-print"
            style={{
              position: 'absolute',
              width: '18px',
              height: '18px',
              fill: 'var(--color-toffee, #c2622b)',
              opacity: 0,
              pointerEvents: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            <path d={PAW_PATH} />
          </svg>
        ))}
      </div>

      {/* Dynamic Traveling Puppy Actor Layer */}
      <div
        className="pup-layer"
        data-front={isFront ? "true" : "false"}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: isFront ? 35 : 15,
          overflow: 'clip',
        }}
        aria-hidden="true"
      >
        <div
          ref={actorRef}
          className="pup-actor"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            willChange: 'transform',
            transition: 'transform 0.1s linear',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
          onClick={handlePetPuppy}
        >
          <div
            className="pup-actor__body relative"
            style={{
              width: '300px',
              transformOrigin: '150px 180px',
              transform: `scale(0.82) scaleX(${facingRight ? 1 : -1})`,
            }}
          >
            {/* Mascot SVG */}
            <svg
              viewBox="0 0 300 240"
              className={`tp-runner ${isWalking ? 'is-walking' : ''}`}
              data-walking={isWalking ? "true" : "false"}
              style={{ overflow: 'visible', width: '300px', height: '240px', display: 'block' }}
              role="img"
              aria-label="Teddy traveling down the page"
            >
              {/* Shadow on floor */}
              <ellipse
                cx="150"
                cy="230"
                rx={pose === 'peek' ? 0 : 86}
                ry="7"
                fill="#2a170e"
                opacity={pose === 'peek' ? 0 : 0.16}
                className="tp-runner__shadow"
              />

              <g className="tp-runner__body">
                {/* Back Far Leg */}
                {pose !== 'peek' && (
                  <g
                    className="tp-runner__leg tp-runner__leg--bf"
                    style={{
                      transformOrigin: '94px 192px',
                      animation: isWalking ? '0.32s ease-in-out infinite alternate tp-runner-leg-a' : 'none',
                    }}
                  >
                    <g transform="translate(94 192)">
                      <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z" fill="#e4a352" />
                      <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                    </g>
                  </g>
                )}

                {/* Front Far Leg */}
                {pose !== 'peek' && (
                  <g
                    className="tp-runner__leg tp-runner__leg--ff"
                    style={{
                      transformOrigin: '168px 192px',
                      animation: isWalking ? '0.32s ease-in-out infinite alternate tp-runner-leg-b' : 'none',
                    }}
                  >
                    <g transform="translate(168 192)">
                      <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z" fill="#e4a352" />
                      <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      <path d="M-3.5 29 v5 M4.5 29 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                    </g>
                  </g>
                )}

                {/* Fluffy Tail */}
                <g
                  className="tp-runner__tail"
                  style={{
                    transformOrigin: '84px 150px',
                    animation: isWalking ? '0.22s ease-in-out infinite alternate tp-runner-wag' : 'none',
                  }}
                >
                  <path d="M86 152 C80 146 76 140 74 136" stroke="#2a170e" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path d="M86 152 C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <path d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                </g>

                {/* Back Near Leg */}
                {pose !== 'peek' && (
                  <g
                    className="tp-runner__leg tp-runner__leg--bn"
                    style={{
                      transformOrigin: '110px 194px',
                      animation: isWalking ? '0.32s ease-in-out infinite alternate tp-runner-leg-b' : 'none',
                    }}
                  >
                    <g transform="translate(110 194)">
                      <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z" fill="#f2be6b" />
                      <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                    </g>
                  </g>
                )}

                {/* Torso */}
                {pose !== 'peek' && (
                  <>
                    <path d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                    <path d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  </>
                )}

                {/* Front Near Leg */}
                {pose !== 'peek' && (
                  <g
                    className="tp-runner__leg tp-runner__leg--fn"
                    style={{
                      transformOrigin: '186px 194px',
                      animation: isWalking ? '0.32s ease-in-out infinite alternate tp-runner-leg-a' : 'none',
                    }}
                  >
                    <g transform="translate(186 194)">
                      <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z" fill="#f2be6b" />
                      <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      <path d="M-3.5 27 v5 M4.5 27 v5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                    </g>
                  </g>
                )}

                {/* Paws on Ledge (only when peeking over quilt) */}
                {pose === 'peek' && (
                  <g data-p="ledge" opacity="1">
                    <path d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                    <path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  </g>
                )}

                {/* Head, Collar, Ears, Face */}
                <g
                  className="tp-runner__head"
                  style={{
                    animation: isWalking ? '0.16s ease-in-out infinite alternate tp-runner-bob' : 'none',
                  }}
                >
                  {/* Collar */}
                  <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                  {/* Tag */}
                  <path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />

                  {/* Left Ear */}
                  <path
                    d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="tp-runner__ear"
                    style={{
                      transformOrigin: '174px 82px',
                      animation: isWalking ? '0.16s ease-in-out infinite alternate tp-runner-ear' : 'none',
                    }}
                  />

                  {/* Right Ear */}
                  <path
                    d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                    fill="#e4a352"
                    stroke="#2a170e"
                    strokeWidth="3.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="tp-runner__ear tp-runner__ear--r"
                    style={{
                      transformOrigin: '250px 82px',
                      animation: isWalking ? '0.16s ease-in-out infinite alternate tp-runner-ear' : 'none',
                    }}
                  />

                  {/* Curly Cloud Head */}
                  <path d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

                  {/* Muzzle */}
                  <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />
                  {/* Cheeks */}
                  <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                  <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />

                  {/* Eyes */}
                  <g data-p="eyes">
                    <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                    <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                    <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                    <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                    <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                    <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                  </g>

                  {/* Nose */}
                  <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />

                  {/* Mouth and pink tongue */}
                  <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                  <path d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
                </g>
              </g>
            </svg>
          </div>

          {/* Speech bubble */}
          <span
            className="pup-bubble-at absolute"
            style={{
              top: '-15px',
              left: facingRight ? '190px' : '40px',
              transition: 'opacity 0.2s',
            }}
          >
            <span
              className="pup-bubble font-scrawl"
              data-show={showBubble ? "true" : "false"}
              style={{
                display: showBubble ? 'inline-block' : 'none',
                background: '#fffdf8',
                border: '2px solid #2a170e',
                borderRadius: '16px',
                padding: '4px 10px',
                fontSize: '13px',
                fontWeight: '700',
                color: '#2a170e',
                boxShadow: '2px 3px 0 #2a170e20',
                whiteSpace: 'nowrap',
              }}
            >
              {bubbleText}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
