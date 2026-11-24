'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Puppies', href: '/puppies' },
    { label: 'Happy families', href: '/happy-families' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Visit & contact', href: '/contact' },
  ];

  return (
    <header
      id="site-header"
      data-scrolled={isScrolled ? "true" : "false"}
      data-hidden="false"
      data-home={isHome ? "true" : "false"}
      className="tp-header fixed inset-x-0 top-0 z-50 bg-milk/95 backdrop-blur-sm transition-all duration-300"
    >
      <div className="tp-header__bar gutter flex items-center justify-between py-3">
        {/* Brand Logo & Name */}
        <Link className="tp-header__brand flex items-center gap-3" aria-label="TeddyPups U.A.E. — home" href="/">
          <Image
            alt="TeddyPups Logo"
            width={56}
            height={56}
            className="tp-header__logo size-12 md:size-14 object-contain"
            src="/brand/logo.png"
            priority
          />
          <span className="font-plush tp-header__name text-2xl md:text-3xl font-bold text-cocoa">
            TeddyPups clone
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main" className="tp-header__nav hidden lg:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="relative">
                  <Link
                    aria-current={isActive ? "page" : undefined}
                    data-active={isActive ? "true" : "false"}
                    className={`tp-nav-link flex flex-col items-center transition-all ${
                      isActive
                        ? 'rounded-xl border-2 border-cocoa/40 px-3.5 py-1 text-cocoa font-bold shadow-sm'
                        : 'px-2 py-1 text-cocoa/80 hover:text-cocoa font-semibold'
                    }`}
                    href={item.href}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <svg viewBox="0 0 64 64" className="tp-nav-link__paw size-3.5 text-toffee mt-0.5" aria-hidden="true" fill="currentColor">
                        <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"></path>
                      </svg>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right CTA */}
        <div className="tp-header__end flex items-center gap-3">
          <a
            href="https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I'm%20interested%20in%20a%20puppy."
            className="tp-header__wa hidden md:inline-flex items-center justify-center rounded-full bg-[#1b6b3e] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#165a34] transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp us
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 text-[0.95rem] font-semibold lg:hidden shadow-sm"
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
          >
            <svg viewBox="0 0 64 64" className="size-4" aria-hidden="true" fill="currentColor">
              <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z"></path>
            </svg>
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Scalloped Hem at Header Bottom */}
      <svg aria-hidden="true" className="tp-header__hem w-full" height="14" preserveAspectRatio="none">
        <defs>
          <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 0H44V2A22 11 0 0 1 0 2Z" className="tp-header__hem-fill fill-milk"></path>
            <path d="M0 2A22 11 0 0 0 44 2" className="tp-header__hem-line stroke-cocoa/30 fill-none"></path>
          </pattern>
        </defs>
        <rect width="100%" height="14" fill="url(#tp-hem)"></rect>
      </svg>

      {/* Mobile Drawer Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-milk p-6 md:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-cocoa/15 pb-4">
            <span className="font-scrawl text-2xl text-cocoa">where to, friend?</span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk"
            >
              Close
            </button>
          </div>

          <nav className="my-auto py-6">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      data-active={isActive ? "true" : "false"}
                      className="tp-menu-link font-plush block py-2 text-[clamp(2.2rem,9vw,3.2rem)] text-cocoa"
                      href={item.href}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 pt-4 border-t border-cocoa/15">
            <a
              href="https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I'm%20interested%20in%20a%20puppy."
              className="btn btn-whatsapp w-full flex items-center justify-center gap-2 rounded-full bg-[#1b6b3e] py-3 text-base font-bold text-white shadow-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
            <p className="text-center text-sm font-medium text-cocoa/80">+91 98278 51210</p>
          </div>
        </div>
      )}
    </header>
  );
}
