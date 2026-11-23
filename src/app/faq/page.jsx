'use client';

import { useState } from 'react';
import Link from 'next/link';
import faqsData from '@/data/faqs.json';

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState(0); // first open by default
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqsData.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tp-page">
      <section className="tp-scene py-12 md:py-20">
        <div className="gutter mx-auto max-w-[110rem]">
          {/* Header */}
          <div className="grid gap-6 md:grid-cols-12 md:items-end mb-12">
            <div className="md:col-span-8">
              <p className="font-scrawl text-lg text-toffee">sniff out a question</p>
              <h1 className="font-plush text-4xl md:text-6xl text-cocoa mt-2">
                Questions & answers
              </h1>
              <p className="mt-4 text-base md:text-lg text-cocoa/80 max-w-2xl leading-relaxed">
                Can't find what you're looking for? Message us on WhatsApp — our concierge team is available 24/7 to help you with every detail.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href="https://wa.me/971500000000?text=Hi%20TeddyPups%2C%20I%20have%20a%20question%20about%20your%20puppies."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#20bd5a] transition-all"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-10 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search questions (e.g. vaccination, showroom, delivery)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border-2 border-cocoa/20 bg-milk px-5 py-3.5 pl-12 text-base text-cocoa placeholder:text-cocoa/50 outline-none focus:border-cocoa focus:ring-2 focus:ring-honey/40 transition-all shadow-sm"
              />
              <svg
                viewBox="0 0 24 24"
                className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-cocoa/60 stroke-current stroke-2 fill-none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="grid gap-4 max-w-4xl">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border-2 transition-all ${
                    isOpen
                      ? 'border-cocoa bg-milk shadow-md'
                      : 'border-cocoa/15 bg-milk/70 hover:border-cocoa/40'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-plush text-lg md:text-xl text-cocoa font-bold">
                      {faq.q}
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-cocoa/30 font-bold transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-cocoa text-milk' : 'text-cocoa'
                      }`}
                    >
                      ↓
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-cocoa/10 px-6 pb-6 pt-4">
                      <p className="text-base text-cocoa/85 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <div className="rounded-2xl border-2 border-dashed border-cocoa/30 p-8 text-center text-cocoa/70">
                <p className="font-scrawl text-lg">No matching questions found.</p>
                <p className="mt-2 text-sm">
                  Feel free to ask us directly on WhatsApp or phone!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
