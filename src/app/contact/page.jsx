'use client';

import { useState } from 'react';
import Image from 'next/image';
import puppiesData from '@/data/puppies.json';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="tp-page">
      <section className="tp-scene py-10 md:py-16">
        <div className="gutter mx-auto max-w-[110rem] pb-24">
          {/* Header */}
          <header className="mb-14 max-w-3xl">
            <p className="font-scrawl text-lg text-toffee">say hello, we'd love to meet you</p>
            <h1 className="tp-sketchbook__title font-plush text-5xl md:text-7xl text-cocoa mt-2">
              Visit & contact
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
              Whether you'd like to meet our available puppies in our Downtown Dubai showroom,
              request live videos, or ask about adoption, our concierge team is always here for you.
            </p>
          </header>

          {/* 3-Ways Contact Section */}
          <div className="tp-ways mb-16 items-end">
            {/* Way 1: The Showroom Shopfront */}
            <div className="tp-shopfront p-6 sm:p-8 shadow-md">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                {/* Arched Window with Puppy */}
                <div className="tp-arch size-36 sm:size-44 shrink-0 relative shadow-inner">
                  <Image
                    src="/media/mihUKGFCatU3/0461cca56e/27b888_bac41adfadc44dce846a1c3fd0cdb0de-mv2.avif"
                    alt="Downtown Dubai Showroom Puppy"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Showroom Details */}
                <div className="space-y-3 text-cocoa">
                  <span className="font-scrawl text-base text-toffee-deep font-bold">in-person visits</span>
                  <h2 className="font-plush text-2xl font-bold">Downtown Dubai Showroom</h2>
                  <p className="text-sm text-cocoa-soft leading-relaxed">
                    Come meet our puppies in person in our comfortable, private bonding lounge.
                  </p>
                  <div className="space-y-1.5 text-xs sm:text-sm font-semibold">
                    <p className="flex items-center gap-2">
                      <span>📍</span> Downtown Dubai, U.A.E.
                    </p>
                    <p className="flex items-center gap-2">
                      <span>🕒</span> 10:00 AM – 9:00 PM (Every day by appointment)
                    </p>
                  </div>
                  <a
                    href="https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20schedule%20a%20showroom%20visit."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-cocoa px-6 py-2.5 text-xs sm:text-sm font-bold text-milk shadow-sm hover:bg-cocoa/90 transition-all"
                  >
                    Book a visit on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Middle Mascot */}
            <div className="tp-ways__teddy hidden lg:block">
              <div className="relative">
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

            {/* Way 2: Direct Concierge Card */}
            <div className="rounded-2xl border-3 border-cocoa bg-milk p-6 sm:p-8 shadow-md">
              <span className="font-scrawl text-base text-toffee font-bold">concierge desk</span>
              <h2 className="font-plush text-2xl font-bold text-cocoa mt-1">Direct contact</h2>
              <p className="mt-2 text-sm text-cocoa-soft leading-relaxed">
                Reach us anytime on WhatsApp or phone. We send real photos, videos, and full puppy profiles.
              </p>
              <div className="mt-5 space-y-3 text-sm font-semibold text-cocoa">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💬</span>
                  <div>
                    <p className="text-xs text-cocoa-soft">Phone / WhatsApp</p>
                    <a
                      href="https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I'm%20interested%20in%20a%20puppy."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1b6b3e] text-base font-bold hover:underline"
                    >
                      +91 98278 51210
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="text-xs text-cocoa-soft">Email</p>
                    <a
                      href="mailto:modzupdates@gmail.com"
                      className="text-cocoa text-base font-bold hover:underline"
                    >
                      modzupdates@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <a
                href="https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I'm%20interested%20in%20a%20puppy."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1b6b3e] py-3 text-sm font-bold text-white shadow-sm hover:bg-[#165a34] transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Whimsical Letter Form */}
          <div className="tp-letter max-w-4xl mx-auto">
            {/* Postage Stamp */}
            <div className="tp-letter__stamp">
              <svg viewBox="0 0 64 64" className="size-8" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <span className="text-5xl">💌</span>
                <h2 className="mt-4 font-plush text-3xl text-cocoa font-bold">
                  Your letter has been posted!
                </h2>
                <p className="mt-3 text-base text-cocoa-soft max-w-md mx-auto leading-relaxed">
                  Thank you so much, {form.name || 'friend'}. Our team will get back to you promptly
                  via {form.phone ? `WhatsApp on ${form.phone}` : 'email at modzupdates@gmail.com'}.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-full border-2 border-cocoa bg-milk px-7 py-2.5 font-bold text-cocoa hover:bg-honey-soft transition-all text-sm"
                >
                  Write another letter
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="tp-letterform space-y-6">
                <p className="tp-letterform__greeting font-scrawl text-2xl text-toffee font-bold border-b border-cocoa/15 pb-3">
                  Dear TeddyPups,
                </p>

                <div className="tp-letterform__line text-lg text-cocoa leading-loose">
                  <span>My name is </span>
                  <input
                    type="text"
                    required
                    placeholder="your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all min-w-[170px]"
                  />
                  <span>, and you can reach me on </span>
                  <input
                    type="tel"
                    required
                    placeholder="9827851210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all min-w-[180px]"
                  />
                  <span> or by email at </span>
                  <input
                    type="email"
                    placeholder="modzupdates@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all min-w-[210px]"
                  />
                  <span>. I live in </span>
                  <input
                    type="text"
                    placeholder="your area (e.g. Dubai Marina)"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all min-w-[190px]"
                  />
                  <span>, and I'm curious about </span>
                  <select
                    value={form.puppyId}
                    onChange={(e) => setForm({ ...form, puppyId: e.target.value })}
                    className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all cursor-pointer"
                  >
                    <option value="">a puppy looking for a home</option>
                    {puppiesData.slice(0, 15).map((p) => (
                      <option key={p.slug} value={p.name}>
                        {p.name.replace(/&amp;/g, '&')} ({p.breed})
                      </option>
                    ))}
                  </select>
                  <span>.</span>
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-semibold text-cocoa/70 mb-2">
                    Anything else you'd like to ask or share:
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your home, questions about vaccination, delivery, or anything on your mind..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="tp-letterform__note"
                  />
                </div>

                <div className="tp-letterform__sign pt-4">
                  <p className="font-scrawl text-sm text-cocoa-soft">
                    Sent with love from a prospective puppy parent
                  </p>
                  <button
                    type="submit"
                    className="rounded-full bg-cocoa px-8 py-3.5 text-base font-bold text-milk shadow-md hover:bg-cocoa/90 active:scale-[0.98] transition-all"
                  >
                    Post my letter 🐾
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}