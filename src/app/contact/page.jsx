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
      <section className="tp-scene py-12 md:py-20">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-6 md:pt-12">
          {/* Header */}
          <header className="grid gap-6 lg:grid-cols-12 lg:items-end mb-16">
            <div className="lg:col-span-7">
              <p className="font-scrawl text-lg text-toffee">say hello, we'd love to meet you</p>
              <h1 className="font-plush text-4xl md:text-6xl text-cocoa mt-2 max-w-[14ch]">
                Get in touch with us
              </h1>
            </div>
            <p className="text-base md:text-lg text-cocoa/80 lg:col-span-5 leading-relaxed">
              Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!
            </p>
          </header>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: The Whimsical Letter Form */}
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl border-2 border-cocoa/20 bg-milk p-8 md:p-12 shadow-lg">
                {submitted ? (
                  <div className="py-12 text-center">
                    <span className="text-5xl">💌</span>
                    <h2 className="mt-4 font-plush text-3xl text-cocoa">Your letter has been posted!</h2>
                    <p className="mt-3 text-base text-cocoa/80 max-w-md mx-auto leading-relaxed">
                      Thank you so much, {form.name || 'friend'}. Our concierge team in Downtown Dubai will reply via {form.phone ? `WhatsApp on ${form.phone}` : 'email'} very shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-full border-2 border-cocoa px-6 py-2.5 font-bold text-cocoa hover:bg-sand/30 transition-all text-sm"
                    >
                      Write another letter
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="tp-letterform space-y-6">
                    <p className="font-scrawl text-2xl text-toffee border-b border-cocoa/15 pb-3">
                      Dear TeddyPups,
                    </p>

                    <div className="text-lg text-cocoa leading-loose">
                      <span>My name is </span>
                      <input
                        type="text"
                        required
                        placeholder="your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all min-w-[180px]"
                      />
                      <span>, and you can reach me on </span>
                      <input
                        type="tel"
                        required
                        placeholder="phone / WhatsApp"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all min-w-[200px]"
                      />
                      <span> or by email at </span>
                      <input
                        type="email"
                        placeholder="email (optional)"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all min-w-[180px]"
                      />
                      <span>. I live in </span>
                      <input
                        type="text"
                        placeholder="your area, e.g. Dubai Marina"
                        value={form.area}
                        onChange={(e) => setForm({ ...form, area: e.target.value })}
                        className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all min-w-[200px]"
                      />
                      <span>, and I'm curious about </span>
                      <select
                        value={form.puppyId}
                        onChange={(e) => setForm({ ...form, puppyId: e.target.value })}
                        className="inline-block border-b-2 border-cocoa/40 bg-transparent px-2 py-0.5 font-semibold text-cocoa outline-none focus:border-cocoa focus:bg-honey/10 transition-all cursor-pointer"
                      >
                        <option value="">a puppy you have available</option>
                        {puppiesData.map((p) => (
                          <option key={p.slug} value={p.name}>
                            {p.name} ({p.breed})
                          </option>
                        ))}
                      </select>
                      <span>.</span>
                    </div>

                    <div className="pt-4">
                      <label className="block text-sm font-semibold text-cocoa/70 mb-2">
                        Anything else you'd like to tell us:
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your home, family, or any questions you have..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-2xl border-2 border-cocoa/20 bg-milk/50 p-4 text-base text-cocoa outline-none focus:border-cocoa focus:ring-2 focus:ring-honey/40 transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-cocoa py-4 text-base font-bold text-milk shadow-md hover:bg-cocoa/90 active:scale-[0.99] transition-all"
                      >
                        Post my letter
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Contact Details & Showroom */}
            <div className="flex flex-col justify-between space-y-8 lg:col-span-5">
              <div className="rounded-3xl border-2 border-cocoa/15 bg-milk p-8 shadow-sm">
                <h2 className="font-plush text-2xl text-cocoa">Downtown Dubai Showroom</h2>
                <p className="mt-3 text-base text-cocoa/80 leading-relaxed">
                  Visit us by appointment in Downtown Dubai to meet our available puppies in person and spend bonding time in our private lounge.
                </p>

                <div className="mt-6 space-y-4 text-sm font-semibold text-cocoa">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📍</span>
                    <span>Downtown Dubai, United Arab Emirates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🕒</span>
                    <span>Every day: 10:00 AM – 9:00 PM (By appointment)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💬</span>
                    <a
                      href="https://wa.me/971500000000?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20schedule%20a%20visit."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline"
                    >
                      WhatsApp: +971 50 000 0000
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✉️</span>
                    <a href="mailto:hello@teddypups.ae" className="text-cocoa hover:underline">
                      hello@teddypups.ae
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Card */}
              <div className="rounded-3xl bg-[#25D366]/10 border-2 border-[#25D366]/30 p-8 text-center">
                <h3 className="font-plush text-xl text-cocoa font-bold">Fastest Response</h3>
                <p className="mt-2 text-sm text-cocoa/80 leading-relaxed">
                  We reply within minutes on WhatsApp with live photos, videos, and full information.
                </p>
                <a
                  href="https://wa.me/971500000000?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20discuss%20adopting%20a%20puppy."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#20bd5a] transition-all"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
