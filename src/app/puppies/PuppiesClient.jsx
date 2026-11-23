'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function PuppiesClient({ initialPuppies }) {
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [search, setSearch] = useState('');

  const breeds = ['all', 'Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih-Tzu'];

  const filtered = initialPuppies.filter((p) => {
    // breed match
    const breedMatch =
      selectedBreed === 'all' ||
      p.breed.toLowerCase().includes(selectedBreed.toLowerCase());

    // origin match
    const originMatch =
      selectedOrigin === 'all' ||
      (selectedOrigin === 'local' && (p.origin.toLowerCase().includes('dubai') || p.origin.toLowerCase().includes('local'))) ||
      (selectedOrigin === 'imported' && p.origin.toLowerCase().includes('imported'));

    // search match
    const searchMatch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase());

    return breedMatch && originMatch && searchMatch;
  });

  return (
    <div className="tp-page">
      <section className="tp-sketchbook py-10 md:py-16">
        <div className="gutter mx-auto max-w-[110rem] pb-24">
          {/* Header */}
          <div className="tp-sketchbook__head mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="tp-sketchbook__words max-w-2xl">
              <p className="font-scrawl text-lg text-toffee">from Teddy's sketchbook</p>
              <h1 id="pups-title" className="font-plush text-4xl md:text-6xl text-cocoa mt-2">
                Available puppies
              </h1>
              <p className="mt-4 text-base md:text-lg text-cocoa/80 leading-relaxed">
                Every listing shows real photos of the actual puppy. Open a profile to see all photos and details, then ask us directly on WhatsApp.
              </p>
            </div>

            {/* Total Count Badge */}
            <div className="flex items-center gap-3">
              <span className="rounded-full border-2 border-cocoa/20 bg-milk px-5 py-2 font-scrawl text-base text-cocoa">
                Showing {filtered.length} adorable pups
              </span>
            </div>
          </div>

          {/* Interactive Filters & Search */}
          <div className="mb-12 flex flex-col gap-6 border-y border-cocoa/15 py-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Breed Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cocoa/60 mr-2">Breed:</span>
              {breeds.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setSelectedBreed(b)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    selectedBreed === b
                      ? 'bg-cocoa text-milk shadow-sm'
                      : 'border-2 border-cocoa/20 bg-milk text-cocoa hover:border-cocoa/40'
                  }`}
                >
                  {b === 'all' ? 'All Breeds' : b}
                </button>
              ))}
            </div>

            {/* Origin & Search */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 rounded-full border-2 border-cocoa/20 bg-milk p-1">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'local', label: 'In Dubai' },
                  { id: 'imported', label: 'Imported' },
                ].map((orig) => (
                  <button
                    key={orig.id}
                    type="button"
                    onClick={() => setSelectedOrigin(orig.id)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      selectedOrigin === orig.id
                        ? 'bg-honey text-cocoa shadow-sm'
                        : 'text-cocoa/70 hover:text-cocoa'
                    }`}
                  >
                    {orig.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full border-2 border-cocoa/20 bg-milk px-4 py-1.5 text-sm text-cocoa placeholder:text-cocoa/50 outline-none focus:border-cocoa"
              />
            </div>
          </div>

          {/* Puppy Cards Grid */}
          <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((pup) => {
              const mainImg = pup.images && pup.images.length > 0 ? pup.images[0] : '/brand/logo.png';
              return (
                <li key={pup.slug} className="group">
                  <Link
                    href={`/puppies/${pup.slug}`}
                    className="block overflow-hidden rounded-3xl border-2 border-cocoa/20 bg-milk p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-cocoa hover:shadow-xl"
                  >
                    {/* Photo with aspect ratio */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-sand/30">
                      <Image
                        src={mainImg}
                        alt={`${pup.name}, ${pup.gender} ${pup.breed} puppy`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Status / origin sticker */}
                      <span className="absolute left-3 top-3 rounded-full bg-milk/95 px-3 py-1 font-scrawl text-xs font-bold text-cocoa shadow-sm backdrop-blur-sm">
                        {pup.origin.includes('Imported') ? 'Imported' : 'In Dubai'}
                      </span>

                      {/* Video indicator */}
                      <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-cocoa/80 px-2.5 py-1 text-[0.7rem] font-bold text-milk backdrop-blur-sm">
                        ▶ video
                      </span>
                    </div>

                    {/* Metadata Card Footer */}
                    <div className="mt-4 px-1 pb-1">
                      <div className="flex items-center justify-between">
                        <h2 className="font-plush text-2xl text-cocoa font-bold group-hover:text-toffee transition-colors">
                          {pup.name}
                        </h2>
                        <span className="font-scrawl text-xs text-honey font-bold">
                          Available
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-cocoa/75">
                        {pup.breed} · {pup.gender} · {pup.age}
                      </p>
                    </div>
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
                Try selecting "All Breeds" or message us on WhatsApp — we have new litters arriving weekly!
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedBreed('all');
                  setSelectedOrigin('all');
                  setSearch('');
                }}
                className="mt-6 rounded-full bg-cocoa px-6 py-2.5 text-sm font-bold text-milk shadow-md hover:bg-cocoa/90 transition-all"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
