'use client';

import { useState, useMemo, useId } from 'react';
import faqsData from '@/data/faqs.json';

const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.7, -1.9, 1.4];
const PIN_COLORS = ['var(--color-toffee)', 'var(--color-sky-deep)', '#d9a13c', '#c45a6a'];

function Highlight({ text, query }) {
  const n = query.trim();
  if (!n) return <>{text}</>;
  const parts = text.split(new RegExp(`(${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      )}
    </>
  );
}

export default function FaqPage() {
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState('');
  const searchId = useId();

  const formattedFaqs = useMemo(() => {
    return faqsData.map((f, idx) => ({
      id: idx + 1,
      question: f.q || f.question,
      answer: f.a || f.answer,
    }));
  }, []);

  const q = query.trim().toLowerCase();
  const filteredFaqs = useMemo(() => {
    return q
      ? formattedFaqs.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(q))
      : formattedFaqs;
  }, [formattedFaqs, q]);

  const isOpenAny = openId !== null || !!q;
  const whatsAppUrl =
    'https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I%20have%20a%20question%20about%20your%20puppies.';

  // Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: formattedFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div data-page="faq" className="tp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section
        data-pup-scene="true"
        data-tone="dark"
        className="tp-scene tp-faqroom overflow-hidden"
        style={{ '--sky-top': '#a95e32', '--sky-bottom': '#331c11' }}
        aria-labelledby="faq-title"
      >
        <div className="gutter relative mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="max-w-4xl">
            <h1 id="faq-title" className="font-plush text-giant text-milk">
              Questions &amp; answers
            </h1>
            <p className="text-lede mt-6 max-w-[52ch] text-milk/90">
              Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7.
            </p>
          </header>

          {/* Notes Corkboard Section */}
          <div
            className="tp-notes mt-10 md:mt-14"
            data-open={isOpenAny ? '' : undefined}
          >
            {/* Sidebar */}
            <aside className="tp-notes__side" aria-label="Find a question">
              <label
                htmlFor={searchId}
                className="font-scrawl tp-notes__label text-honey-soft text-lg"
              >
                sniff out a question
              </label>

              <div className="tp-notes__search">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="tp-notes__lens"
                >
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="m15.5 15.5 5 5" />
                </svg>
                <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="delivery, Korea, vaccinated…"
                  autoComplete="off"
                />
              </div>

              <p className="tp-notes__count text-milk/90" aria-live="polite">
                {query.trim()
                  ? `${filteredFaqs.length} ${filteredFaqs.length === 1 ? 'note' : 'notes'} found`
                  : `${formattedFaqs.length} notes on the board`}
              </p>

              {/* Teddy mascot looking up with speech bubble */}
              <div className="tp-notes__teddy" aria-hidden="true">
                <span className="tp-notes__bubble font-plush">
                  <span className="tp-notes__q">?</span>
                  <span className="tp-notes__a">!</span>
                </span>
                <div className="pup-buddy" data-facing="right">
                  <svg
                    viewBox="0 0 300 240"
                    style={{ overflow: 'visible', width: '100%', height: 'auto' }}
                    role="img"
                    aria-label="Teddy, reading the notes"
                  >
                    <g data-p="body">
                      <ellipse cx="150" cy="225" rx="85" ry="6" fill="#2a170e" opacity="0.12" />
                      <g transform="translate(100 190)">
                        <path
                          d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="3"
                        />
                      </g>
                      <g transform="translate(196 190)">
                        <path
                          d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="3"
                        />
                      </g>
                      <path
                        d="M90 175 Q150 165 210 175 Q210 200 150 205 Q90 200 90 175 Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeWidth="3"
                      />
                    </g>
                    <g data-p="head" transform="translate(-62 -2)">
                      <path
                        d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z"
                        fill="#a24a1a"
                        stroke="#2a170e"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
                        fill="#fbe3b4"
                        stroke="#2a170e"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                        fill="#e4a352"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                        fill="#e4a352"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <path
                        d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                        fill="#fbe3b4"
                      />
                      <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                      <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                      <g data-p="eyes">
                        <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                        <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                        <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                        <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                      </g>
                      <path
                        d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z"
                        fill="#2a170e"
                      />
                      <path
                        d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
                        stroke="#2a170e"
                        strokeWidth="3"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </g>
                  </svg>
                </div>
              </div>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp tp-notes__ask"
              >
                Ask your own question
              </a>
            </aside>

            {/* Cork Bulletin Board */}
            <div className="tp-notes__board">
              <ul className="tp-notes__list">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen =
                    openId === faq.id || (!!q && faq.answer.toLowerCase().includes(q));
                  const tilt = TILTS[idx % TILTS.length];
                  const pinColor = PIN_COLORS[idx % PIN_COLORS.length];

                  return (
                    <li
                      key={faq.id}
                      className="tp-note"
                      data-reveal="true"
                      data-revealed="true"
                      data-unfolded={isOpen || undefined}
                      style={{
                        '--tilt': `${tilt}deg`,
                        '--pin': pinColor,
                        '--i': idx,
                      }}
                    >
                      {/* Push Pin */}
                      <span className="tp-note__pin" aria-hidden="true" />

                      {/* Question Toggle Button */}
                      <h2 className="tp-note__q">
                        <button
                          type="button"
                          id={`q-${faq.id}`}
                          aria-expanded={isOpen}
                          aria-controls={`a-${faq.id}`}
                          onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                        >
                          <span className="font-plush-text">
                            <Highlight text={faq.question} query={query} />
                          </span>
                          <span className="tp-note__chevron" aria-hidden="true" />
                        </button>
                      </h2>

                      {/* Unfolding Paper Answer */}
                      <div
                        id={`a-${faq.id}`}
                        role="region"
                        aria-labelledby={`q-${faq.id}`}
                        className="tp-note__answer"
                        inert={!isOpen ? '' : undefined}
                      >
                        <div className="tp-note__flap">
                          <p>
                            <Highlight text={faq.answer} query={query} />
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* No match empty note */}
              {!filteredFaqs.length && (
                <div className="tp-note tp-note--empty">
                  <span aria-hidden="true" className="tp-note__pin" />
                  <p className="font-plush-text text-[1.2rem] font-bold text-cocoa">
                    No note about “{query.trim()}” yet.
                  </p>
                  <p className="mt-2 text-cocoa-soft">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline text-toffee-deep hover:text-toffee"
                    >
                      Ask us on WhatsApp
                    </a>{' '}
                    and we'll answer.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
