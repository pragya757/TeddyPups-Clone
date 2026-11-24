'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PuppyDetailClient({ puppy }) {
  const images = puppy.images && puppy.images.length > 0
    ? puppy.images
    : ['/brand/logo.png'];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    message: `Hi TeddyPups, I'd love to learn more about ${puppy.name} (${puppy.breed}).`,
  });

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/919827851210?text=${encodeURIComponent(
    `Hi TeddyPups, I'm inquiring about ${puppy.name} (${puppy.breed}, ${puppy.age}).`
  )}`;

  return (
    <div>
      {/* Chapter 1: Introduction */}
      <p className="tp-chapter flex items-center gap-2 mb-4">
        <span aria-hidden="true" className="tp-chapter__n font-plush text-2xl text-honey">1</span>
        <span className="font-scrawl text-2xl text-cocoa">hello, it's me</span>
      </p>

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Interactive Image Gallery */}
        <div className="min-w-0 lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border-2 border-cocoa/20 bg-sand/30 shadow-md">
            <div className="relative aspect-[4/5] md:aspect-[5/6] w-full">
              <Image
                src={images[activeImageIdx]}
                alt={`${puppy.name}, ${puppy.breed} puppy - photo ${activeImageIdx + 1}`}
                fill
                priority
                className="object-cover transition-opacity duration-300"
              />

              {/* Prev / Next Carousel Controls */}
              {images.length > 1 && (
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between pointer-events-none">
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-milk/90 text-cocoa shadow-md hover:bg-milk active:scale-95 transition-all text-xl font-bold"
                  >
                    ‹
                  </button>
                  <span className="pointer-events-auto rounded-full bg-cocoa/80 px-3 py-1 text-xs font-semibold text-milk backdrop-blur-sm">
                    {activeImageIdx + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-milk/90 text-cocoa shadow-md hover:bg-milk active:scale-95 transition-all text-xl font-bold"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative size-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                    activeImageIdx === idx
                      ? 'border-cocoa shadow-md scale-105'
                      : 'border-cocoa/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${puppy.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Key Details & CTA */}
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <span className="inline-block rounded-full bg-honey/30 px-3.5 py-1 text-xs font-bold text-cocoa font-scrawl">
              Available
            </span>

            <h1 className="mt-3 font-plush text-4xl md:text-5xl text-cocoa">
              {puppy.name}
            </h1>
            <p className="font-scrawl text-xl text-toffee mt-1">
              {puppy.breed}
            </p>

            {/* Characteristic Attributes Grid */}
            <div className="mt-6 rounded-2xl border-2 border-cocoa/20 bg-milk p-6 shadow-sm">
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-cocoa/60">Breed</dt>
                  <dd className="mt-1 text-base font-bold text-cocoa">{puppy.breed}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-cocoa/60">Boy or girl</dt>
                  <dd className="mt-1 text-base font-bold text-cocoa">{puppy.gender}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-cocoa/60">Age</dt>
                  <dd className="mt-1 text-base font-bold text-cocoa">{puppy.age}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-cocoa/60">Where</dt>
                  <dd className="mt-1 text-base font-bold text-cocoa">{puppy.origin}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-base font-bold text-white shadow-md hover:bg-[#20bd5a] transition-colors"
            >
              Ask about {puppy.name} on WhatsApp
            </a>
            <a
              href="#enquiry-form"
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-cocoa bg-milk py-3 text-base font-bold text-cocoa hover:bg-sand/40 transition-colors"
            >
              Send an enquiry
            </a>
          </div>
        </div>
      </div>

      {/* Chapter 2: What Comes With Puppy */}
      <div className="mt-20 border-t border-cocoa/15 pt-12">
        <p className="tp-chapter flex items-center gap-2 mb-6">
          <span aria-hidden="true" className="tp-chapter__n font-plush text-2xl text-honey">2</span>
          <span className="font-scrawl text-2xl text-cocoa">what comes with {puppy.name}</span>
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Vaccinated', desc: 'Up to date with age-appropriate core vaccinations.' },
            { title: 'Dewormed', desc: 'Comprehensive parasite protection and deworming treatments.' },
            { title: 'Verified Health Certificate', desc: 'Officially certified and stamped by licensed veterinarians.' },
            { title: 'Thoroughly Checked', desc: 'Multi-point clinical check before joining your loving family.' },
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl border-2 border-cocoa/15 bg-milk p-6 shadow-sm">
              <span className="text-2xl text-honey">✓</span>
              <h3 className="mt-2 font-plush text-lg text-cocoa">{item.title}</h3>
              <p className="mt-1 text-sm text-cocoa/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter 3: The Way Home */}
      <div className="mt-20 border-t border-cocoa/15 pt-12">
        <p className="tp-chapter flex items-center gap-2 mb-6">
          <span aria-hidden="true" className="tp-chapter__n font-plush text-2xl text-honey">3</span>
          <span className="font-scrawl text-2xl text-cocoa">the way home</span>
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { num: '1', title: 'Reserve your puppy', desc: `Tell us that ${puppy.name} has captured your heart and secure your reservation.` },
            { num: '2', title: 'Personalized updates', desc: 'Receive real-time photos, video clips, and veterinary travel clearances.' },
            { num: '3', title: 'Safe arrival & handover', desc: 'Meet in our Downtown Dubai showroom or enjoy concierge door-to-door delivery.' },
          ].map((step, idx) => (
            <div key={idx} className="rounded-2xl border-2 border-cocoa/15 bg-milk p-6 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-full bg-honey/40 font-plush font-bold text-cocoa">
                {step.num}
              </span>
              <h3 className="mt-4 font-plush text-lg text-cocoa">{step.title}</h3>
              <p className="mt-2 text-sm text-cocoa/75 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chapter 4: Inquiry Form ("Post my letter") */}
      <div id="enquiry-form" className="mt-20 border-t border-cocoa/15 pt-12">
        <div className="mx-auto max-w-2xl rounded-3xl border-2 border-cocoa/20 bg-milk p-8 md:p-10 shadow-lg">
          <h2 className="font-plush text-3xl text-cocoa text-center">
            Send an enquiry for {puppy.name}
          </h2>
          <p className="font-scrawl text-center text-lg text-toffee mt-1">
            we will write back to you shortly
          </p>

          {formSubmitted ? (
            <div className="mt-8 rounded-2xl bg-honey/20 p-6 text-center">
              <span className="text-4xl">💌</span>
              <h3 className="mt-2 font-plush text-2xl text-cocoa">Thank you, {formData.name || 'friend'}!</h3>
              <p className="mt-2 text-cocoa/80">
                Your letter has been posted. Our concierge team will reach out to you on {formData.phone || 'WhatsApp'} right away!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa/70 mb-1">
                  Your name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border-2 border-cocoa/30 bg-milk px-4 py-3 text-base text-cocoa outline-none focus:border-cocoa focus:ring-2 focus:ring-honey/50"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa/70 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98278 51210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border-2 border-cocoa/30 bg-milk px-4 py-3 text-base text-cocoa outline-none focus:border-cocoa focus:ring-2 focus:ring-honey/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa/70 mb-1">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    placeholder="modzupdates@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border-2 border-cocoa/30 bg-milk px-4 py-3 text-base text-cocoa outline-none focus:border-cocoa focus:ring-2 focus:ring-honey/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa/70 mb-1">
                  Your area in UAE (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dubai Marina, Downtown, Palm Jumeirah"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full rounded-xl border-2 border-cocoa/30 bg-milk px-4 py-3 text-base text-cocoa outline-none focus:border-cocoa focus:ring-2 focus:ring-honey/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa/70 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border-2 border-cocoa/30 bg-milk px-4 py-3 text-base text-cocoa outline-none focus:border-cocoa focus:ring-2 focus:ring-honey/50"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-cocoa py-4 text-base font-bold text-milk shadow-md hover:bg-cocoa/90 active:scale-[0.99] transition-all"
              >
                Post my letter
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
