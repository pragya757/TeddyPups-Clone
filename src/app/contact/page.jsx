'use client';

import { useState, useRef, useId, useEffect } from 'react';
import puppiesData from '@/data/puppies.json';

const WHATSAPP_NUMBER = '+91 98278 51210';
const WHATSAPP_LINK =
  'https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I%20have%20a%20question%20about%20your%20puppies.';
const EMAIL_ADDRESS = 'modzupdates@gmail.com';

function BlankInput({ name, label, error, size = 14, ...props }) {
  return (
    <span className="tp-blank" style={{ '--size': `${size}ch` }}>
      <input
        name={name}
        aria-label={label}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
    </span>
  );
}

export default function ContactPage() {
  const [phase, setPhase] = useState('writing'); // 'writing' | 'sealing' | 'posting' | 'sent'
  const [errors, setErrors] = useState({});
  const selectId = useId();
  const textareaId = useId();
  const formRef = useRef(null);
  const containerRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();

    const newErrors = {};
    if (!name || name.length < 2) newErrors.name = 'Please enter your name.';
    if (!phone) newErrors.phone = 'Please enter a contact number.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setPhase('sealing');
    setTimeout(() => {
      setPhase('posting');
    }, 750);
    setTimeout(() => {
      setPhase('sent');
    }, 1750);
  };

  return (
    <div data-page="contact" className="tp-page">
      <section
        data-pup-scene="true"
        data-tone="light"
        className="tp-scene"
        style={{ '--sky-top': '#fff9ee', '--sky-bottom': '#f9dca4' }}
        aria-labelledby="contact-title"
      >
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          {/* Header */}
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h1
              id="contact-title"
              className="font-plush text-giant max-w-[12ch] lg:col-span-7"
            >
              Get in touch with us
            </h1>
            <p className="text-lede text-[var(--ink-soft)] lg:col-span-5 lg:pb-3">
              Have questions about our puppies or adoption process? Fill out the form,
              and our team will get back to you promptly. Whether ready to adopt or just
              seeking info, we'd love to hear from you!
            </p>
          </header>

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Right Column: Letter Form */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <div ref={containerRef} className="tp-post" data-phase={phase}>
                {phase !== 'sent' && (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    className="tp-letterform"
                    aria-hidden={phase !== 'writing' ? 'true' : undefined}
                    inert={phase !== 'writing' ? '' : undefined}
                  >
                    {/* Stamped Paw */}
                    <span aria-hidden="true" className="tp-letter__stamp">
                      <svg
                        viewBox="0 0 64 64"
                        className="size-9"
                        aria-hidden="true"
                        fill="currentColor"
                      >
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                    </span>

                    <p className="font-scrawl tp-letterform__greeting">
                      Dear TeddyPups,
                    </p>

                    {Object.keys(errors).length > 0 && (
                      <div role="alert" className="tp-letterform__alert">
                        <p className="font-semibold text-cocoa">
                          Please fill in the required fields:
                        </p>
                        <ul className="text-cocoa/80 text-sm mt-1 list-disc pl-5">
                          {Object.entries(errors).map(([key, msg]) => (
                            <li key={key}>{msg}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Sentence 1 */}
                    <p className="tp-letterform__line">
                      my name is{' '}
                      <BlankInput
                        name="name"
                        label="Your name (required)"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={80}
                        size={16}
                        error={errors.name}
                      />
                      , and you can reach me on{' '}
                      <BlankInput
                        name="phone"
                        label="Phone or WhatsApp number with country code (required)"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        size={15}
                        placeholder="+971 50 123 4567"
                        error={errors.phone}
                      />{' '}
                      or by email at{' '}
                      <BlankInput
                        name="email"
                        label="Email (optional)"
                        type="email"
                        autoComplete="email"
                        size={20}
                        placeholder="optional"
                        error={errors.email}
                      />
                      .
                    </p>

                    {/* Sentence 2 */}
                    <p className="tp-letterform__line">
                      I live in{' '}
                      <BlankInput
                        name="area"
                        label="Your area (optional)"
                        autoComplete="address-level2"
                        maxLength={80}
                        size={13}
                        placeholder="e.g. Dubai Marina"
                        error={errors.area}
                      />
                      , and I'm curious about{' '}
                      <span className="tp-blank tp-blank--select">
                        <label htmlFor={selectId} className="sr-only">
                          Puppy you're interested in (optional)
                        </label>
                        <select id={selectId} name="puppyId" defaultValue="">
                          <option value="">any puppy (not sure yet)</option>
                          {puppiesData.map((p) => (
                            <option key={p.slug} value={p.name}>
                              {p.name.replace(/&amp;/g, '&')} ({p.breed}
                              {p.gender ? `, ${p.gender.toLowerCase()}` : ''})
                            </option>
                          ))}
                        </select>
                      </span>
                      .
                    </p>

                    {/* Note Textarea */}
                    <label htmlFor={textareaId} className="sr-only">
                      Your message (optional)
                    </label>
                    <textarea
                      id={textareaId}
                      name="message"
                      rows={4}
                      maxLength={2000}
                      placeholder="Anything else you'd like to tell us…"
                      className="tp-letterform__note"
                    />

                    {/* Sign-off & Submit */}
                    <div className="tp-letterform__sign">
                      <p className="font-scrawl">with love, a future puppy parent</p>
                      <button
                        type="submit"
                        disabled={phase !== 'writing'}
                        className="btn btn-primary disabled:opacity-70"
                      >
                        {phase === 'writing' ? 'Post my letter' : 'Sealing the envelope…'}
                      </button>
                    </div>
                  </form>
                )}

                {/* Animated Envelope & Mailbox while sealing/posting */}
                {(phase === 'sealing' || phase === 'posting') && (
                  <div aria-hidden="true" className="tp-post__scene">
                    <svg viewBox="0 0 160 112" className="tp-post__envelope">
                      <rect
                        x="4"
                        y="18"
                        width="152"
                        height="90"
                        rx="6"
                        fill="#fffdf8"
                        stroke="#2a170e"
                        strokeWidth="4"
                      />
                      <path
                        d="M6 104 64 62M154 104 96 62"
                        fill="none"
                        stroke="#2a170e"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path
                        className="tp-post__flap"
                        d="M6 22 80 74 154 22"
                        fill="#fbe3b4"
                        stroke="#2a170e"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="80"
                        cy="72"
                        r="11"
                        fill="#a24a1a"
                        stroke="#2a170e"
                        strokeWidth="3"
                      />
                    </svg>
                    <svg viewBox="0 0 200 260" className="tp-post__box">
                      <rect
                        x="86"
                        y="170"
                        width="28"
                        height="86"
                        fill="#5a3a28"
                        stroke="#2a170e"
                        strokeWidth="4"
                      />
                      <path
                        d="M30 70a70 54 0 0 1 140 0v104H30z"
                        fill="#c2622b"
                        stroke="#2a170e"
                        strokeWidth="5"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="58"
                        y="86"
                        width="84"
                        height="14"
                        rx="7"
                        fill="#2a170e"
                      />
                      <path
                        d="M44 128h112"
                        stroke="#2a170e"
                        strokeWidth="3"
                        strokeLinecap="round"
                        opacity=".35"
                      />
                      <g className="tp-post__flag">
                        <path
                          d="M170 120V64"
                          stroke="#2a170e"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M170 64h22v16h-22"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="4"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </div>
                )}

                {/* Sent confirmation state */}
                {phase === 'sent' && (
                  <div tabIndex={-1} role="status" className="tp-post__sent">
                    <svg
                      viewBox="0 0 200 150"
                      aria-hidden="true"
                      className="tp-post__box tp-post__box--sent"
                    >
                      <rect
                        x="86"
                        y="96"
                        width="28"
                        height="52"
                        fill="#5a3a28"
                        stroke="#2a170e"
                        strokeWidth="4"
                      />
                      <path
                        d="M30 50a70 44 0 0 1 140 0v52H30z"
                        fill="#c2622b"
                        stroke="#2a170e"
                        strokeWidth="5"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="58"
                        y="58"
                        width="84"
                        height="12"
                        rx="6"
                        fill="#2a170e"
                      />
                      <path
                        d="M170 92V22"
                        stroke="#2a170e"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M170 22h22v16h-22"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="font-plush mt-4 text-[2rem]">Letter posted!</p>
                    <p className="mx-auto mt-2 max-w-[40ch] text-cocoa-soft">
                      Thanks for writing to TeddyPups. Our concierge team will read
                      your note and get back to you shortly.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                      <a
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                      >
                        WhatsApp us
                      </a>
                      <button
                        type="button"
                        onClick={() => setPhase('writing')}
                        className="btn btn-ghost"
                      >
                        Write another letter
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Teddy mascot peeking at the bottom right */}
              <div
                className="pup-buddy ml-auto mr-6 -mt-3 w-36 md:w-40"
                data-facing="left"
              >
                <svg
                  viewBox="0 0 300 240"
                  style={{ overflow: 'visible' }}
                  role="img"
                  aria-label="Teddy, waiting for your letter"
                  focusable="false"
                >
                  <g data-p="root" transform="translate(300 0) scale(-1 1)">
                    <ellipse
                      data-p="shadow"
                      cx="150"
                      cy="230"
                      rx="92"
                      ry="7"
                      fill="#2a170e"
                      opacity="0.12"
                    />
                    <g data-p="body" transform="translate(0 -2) rotate(-24 196 206)">
                      <g data-p="tail" transform="rotate(34 84 150)">
                        <path
                          d="M86 152 C80 146 76 140 74 136"
                          stroke="#2a170e"
                          strokeWidth="9"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d="M86 152 C80 146 76 140 74 136"
                          stroke="#f2be6b"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <path
                          d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
                          fill="#f2be6b"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </g>
                      <path
                        d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
                        fill="#f2be6b"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      <g data-p="fn" transform="translate(186 194) rotate(24)">
                        <path
                          d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z"
                          fill="#f2be6b"
                        />
                        <path
                          d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14"
                          stroke="#2a170e"
                          strokeWidth="3.4"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </g>
                    </g>
                    <g data-p="head" transform="translate(-10 -6)">
                      {/* Collar */}
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
                      {/* Left ear */}
                      <path
                        d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                        fill="#e4a352"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      {/* Right ear */}
                      <path
                        d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                        fill="#e4a352"
                        stroke="#2a170e"
                        strokeWidth="3.4"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      {/* Head face contour */}
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
                      {/* Muzzle */}
                      <path
                        d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z"
                        fill="#fbe3b4"
                      />
                      <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                      <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                      {/* Eyes */}
                      <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                      <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                      <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                      <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                      {/* Nose */}
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
                  </g>
                </svg>
              </div>
            </div>

            {/* Left Column: Direct Contact & Downtown Showroom Card */}
            <div className="lg:col-span-5 lg:row-start-1">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full sm:w-auto"
              >
                WhatsApp {WHATSAPP_NUMBER}
              </a>

              <dl className="mt-10 space-y-6">
                <div>
                  <dt className="font-scrawl text-[var(--ink-soft)]">call us</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    <a className="link-ink" href={`tel:${WHATSAPP_NUMBER.replace(/\s+/g, '')}`}>
                      {WHATSAPP_NUMBER}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-scrawl text-[var(--ink-soft)]">email</dt>
                  <dd className="mt-1 break-all text-lg font-semibold">
                    <a className="link-ink" href={`mailto:${EMAIL_ADDRESS}`}>
                      {EMAIL_ADDRESS}
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Showroom Card with Striped Awning & Skyline */}
              <section aria-labelledby="visit-title" className="tp-shopfront mt-12">
                <svg
                  viewBox="0 0 300 120"
                  className="absolute -bottom-1 right-0 w-3/4 text-toffee/30"
                  aria-hidden="true"
                >
                  <path
                    d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="tp-visit relative p-7 pt-6">
                  <div>
                    <h2 id="visit-title" className="font-plush text-[2rem] leading-tight">
                      Visit us in Downtown Dubai
                    </h2>
                    <p className="mt-3 max-w-[38ch] text-cocoa-soft">
                      Step into our Downtown Dubai showroom and experience the joy of
                      choosing your puppy face-to-face.
                    </p>
                    <p className="mt-4 flex items-center gap-2 font-semibold">
                      <svg
                        viewBox="0 0 64 64"
                        className="size-5 shrink-0 text-toffee-deep"
                        aria-hidden="true"
                        fill="currentColor"
                      >
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                      </svg>
                      Downtown Dubai, United Arab Emirates
                    </p>
                    <a
                      href="https://maps.google.com/?q=Downtown+Dubai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost mt-6 !bg-milk"
                    >
                      Open in Google Maps
                    </a>
                  </div>

                  <figure className="tp-visit__photo">
                    <img
                      src="/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg"
                      alt="The apricot teddy bear puppy from our showroom, held up to say hello"
                      style={{
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        inset: 0,
                        objectFit: 'cover',
                        objectPosition: '45.3% 44.4%',
                      }}
                    />
                  </figure>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
