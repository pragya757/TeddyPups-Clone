'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import faqsData from '@/data/faqs.json';

const PIN_COLORS = [
  '#c2622b', // toffee
  '#2f6e9e', // sky deep
  '#f2be6b', // honey
  '#a24a1a', // toffee deep
  '#5a3a28', // cocoa soft
  '#8e3f15', // toffee ink
  '#d77038',
];

const TILTS = [-0.8, 0.9, -1.1, 0.7, -0.6, 1.2, -0.9, 0.8, -0.7];

export default function FaqPage() {
  const [openIndices, setOpenIndices] = useState([0]); // first open by default
  const [searchQuery, setSearchQuery] = useState('');

  const toggleNote = (idx) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqsData;
    const q = searchQuery.toLowerCase();
    return faqsData.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const anyOpen = openIndices.length > 0;

  return (
    <div className="tp-page">
      <section className="tp-faqroom py-10 md:py-16 relative">
        <div className="gutter mx-auto max-w-[110rem] pb-24">
          {/* Header */}
          <div className="mb-12 max-w-3xl">
            <p className="font-scrawl text-lg text-toffee">sniff out a question</p>
            <h1 className="tp-sketchbook__title font-plush text-4xl md:text-6xl text-cocoa mt-2">
              Questions & answers
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
            <p className="mt-4 text-base md:text-lg text-cocoa/85 leading-relaxed">
              Got a question? We've pinned all the answers right here on Teddy's board.
              If you have any other questions, reach out directly on WhatsApp or call us anytime!
            </p>
          </div>

          {/* Notes Corkboard Layout */}
          <div
            className="tp-notes grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            data-open={anyOpen ? 'true' : undefined}
          >
            {/* Left Sticky Sidebar */}
            <div className="tp-notes__side lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div>
                <p className="tp-notes__label font-scrawl text-xl text-cocoa font-bold">
                  Search the board
                </p>
                <div className="tp-notes__search mt-2">
                  <svg
                    className="tp-notes__lens"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                  <input
                    type="text"
                    placeholder="search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <p className="tp-notes__count font-scrawl text-sm text-cocoa/80 mt-2 pl-2">
                  showing {filteredFaqs.length} of {faqsData.length} pinned questions
                </p>
              </div>

              {/* Quick Contact Box */}
              <div className="rounded-2xl border-2 border-cocoa/20 bg-milk p-6 shadow-sm">
                <h3 className="font-plush text-lg text-cocoa font-bold">
                  Still have questions?
                </h3>
                <p className="mt-2 text-sm text-cocoa/80 leading-relaxed">
                  Our concierge team is available to help you with photos, videos, and questions.
                </p>
                <div className="mt-4 space-y-2.5 text-sm font-semibold text-cocoa">
                  <div className="flex items-center gap-2">
                    <span>💬</span>
                    <a
                      href="https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I%20have%20a%20question%20about%20your%20puppies."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1b6b3e] hover:underline"
                    >
                      +91 98278 51210
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✉️</span>
                    <a href="mailto:modzupdates@gmail.com" className="text-cocoa hover:underline">
                      modzupdates@gmail.com
                    </a>
                  </div>
                </div>
                <a
                  href="https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I%20have%20a%20question%20about%20your%20puppies."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1b6b3e] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#165a34] transition-all"
                >
                  Ask on WhatsApp
                </a>
              </div>

              {/* Teddy mascot with speech bubble */}
              <div className="tp-notes__teddy hidden sm:block">
                <div className="tp-notes__bubble" aria-hidden="true">
                  <span className="font-plush font-bold text-toffee-deep">
                    {anyOpen ? '!' : '?'}
                  </span>
                </div>
                <svg
                  viewBox="0 0 300 240"
                  style={{ overflow: 'visible', width: '100%', height: 'auto' }}
                  aria-hidden="true"
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
              </div>
            </div>

            {/* Right Cork Pinboard */}
            <div className="tp-notes__board lg:col-span-8">
              <div className="tp-notes__list">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndices.includes(idx);
                  const tilt = TILTS[idx % TILTS.length];
                  const pinColor = PIN_COLORS[idx % PIN_COLORS.length];

                  return (
                    <article
                      key={idx}
                      className="tp-note"
                      data-unfolded={isOpen ? 'true' : undefined}
                      style={{
                        '--tilt': `${tilt}deg`,
                        '--pin': pinColor,
                      }}
                    >
                      {/* Push Pin */}
                      <span className="tp-note__pin" aria-hidden="true" />

                      {/* Question Button */}
                      <div className="tp-note__q">
                        <button
                          type="button"
                          onClick={() => toggleNote(idx)}
                          aria-expanded={isOpen}
                        >
                          <span className="font-plush text-cocoa font-bold">
                            {faq.q}
                          </span>
                          <span
                            className="tp-note__chevron"
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* Unfolding Answer Flap */}
                      <div className="tp-note__answer">
                        <div className="tp-note__flap">
                          <p className="font-sans text-base text-cocoa-soft leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {filteredFaqs.length === 0 && (
                  <div className="rounded-2xl border-2 border-dashed border-cocoa/40 bg-milk/80 p-8 text-center text-cocoa">
                    <p className="font-scrawl text-xl">No matching notes found on the board!</p>
                    <p className="mt-2 text-sm text-cocoa/75">
                      Try another keyword or reach out on WhatsApp at{' '}
                      <a href="https://wa.me/919827851210" className="font-bold underline">
                        +91 98278 51210
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}