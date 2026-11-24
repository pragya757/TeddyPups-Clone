import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="tp-footer relative pb-[calc(var(--bar-h,60px)+2rem)] text-milk md:pb-10">
      {/* Curved Hill SVG Divider */}
      <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="tp-footer__hill">
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z"></path>
      </svg>

      {/* Twinkling Night Sky and Moon */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-6 h-64 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {[
            { left: '6%', top: '18%', w: 12.6, delay: '0.00s' },
            { left: '14%', top: '42%', w: 8.4, delay: '0.40s' },
            { left: '23%', top: '12%', w: 9.8, delay: '0.80s' },
            { left: '31%', top: '30%', w: 7.0, delay: '1.20s' },
            { left: '44%', top: '9%', w: 11.2, delay: '1.60s' },
            { left: '52%', top: '36%', w: 7.7, delay: '2.00s' },
            { left: '63%', top: '15%', w: 10.5, delay: '2.40s' },
            { left: '71%', top: '40%', w: 7.0, delay: '2.80s' },
            { left: '92%', top: '33%', w: 8.4, delay: '3.20s' },
          ].map((star, idx) => (
            <svg
              key={idx}
              viewBox="0 0 40 40"
              className="tp-twinkle absolute text-honey"
              style={{ left: star.left, top: star.top, width: `${star.w}px`, animationDelay: star.delay }}
              aria-hidden="true"
            >
              <path
                d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
                fill="currentColor"
              ></path>
            </svg>
          ))}
        </div>
        <span className="tp-moon"></span>
      </div>

      <div className="gutter relative mx-auto grid max-w-[110rem] gap-12 pt-20 md:grid-cols-12 md:gap-x-12 md:gap-y-6 md:pt-28">
        {/* Brand statement */}
        <div className="md:col-span-5">
          <p className="font-plush text-big text-honey-soft">Home, at last.</p>
          <p className="mt-5 max-w-md text-milk/80 leading-relaxed">
            TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.
          </p>
        </div>

        {/* Teddy in basket illustration */}
        <div className="order-last md:order-none md:col-span-5 md:col-start-1 md:row-start-2">
          <div className="tp-basket">
            <svg aria-hidden="true" viewBox="0 0 300 240" className="tp-basket__back">
              <ellipse cx="212" cy="145" rx="96" ry="12" className="tp-basket__hollow"></ellipse>
              <path d="M116 145 A96 12 0 0 1 308 145" className="tp-basket__rim-line"></path>
              <path d="M116 145 A96 12 0 0 1 308 145" className="tp-basket__rim"></path>
            </svg>

            <div className="pup-stop tp-basket__pup">
              <div className="pup-buddy" data-facing="right">
                <svg viewBox="0 0 300 240" style={{ overflow: 'visible' }} role="img" aria-label="Teddy, sitting snug in his basket">
                  <g data-p="root">
                    <circle cx="212" cy="115" r="42" fill="#e4a352" stroke="#2a170e" strokeWidth="3.6" />
                    {/* Ears */}
                    <circle cx="178" cy="85" r="16" fill="#c27832" stroke="#2a170e" strokeWidth="3.2" />
                    <circle cx="246" cy="85" r="16" fill="#c27832" stroke="#2a170e" strokeWidth="3.2" />
                    {/* Eyes */}
                    <circle cx="198" cy="110" r="4.5" fill="#2a170e" />
                    <circle cx="226" cy="110" r="4.5" fill="#2a170e" />
                    {/* Muzzle & Nose */}
                    <ellipse cx="212" cy="122" rx="14" ry="10" fill="#f8d6a8" />
                    <polygon points="208,118 216,118 212,123" fill="#2a170e" />
                    {/* Paws on basket rim */}
                    <ellipse cx="192" cy="145" rx="10" ry="7" fill="#f8d6a8" stroke="#2a170e" strokeWidth="2.8" />
                    <ellipse cx="232" cy="145" rx="10" ry="7" fill="#f8d6a8" stroke="#2a170e" strokeWidth="2.8" />
                  </g>
                </svg>
              </div>
            </div>

            <svg aria-hidden="true" viewBox="0 0 300 240" className="tp-basket__front">
              <path d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z" className="tp-basket__body"></path>
              <path d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206" className="tp-basket__weave"></path>
              <path d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230" className="tp-basket__weave tp-basket__weave--stakes"></path>
              <path d="M116 145 A96 12 0 0 0 308 145" className="tp-basket__rim-line"></path>
              <path d="M116 145 A96 12 0 0 0 308 145" className="tp-basket__rim"></path>
            </svg>
          </div>
        </div>

        {/* Explore Links */}
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/puppies">Available puppies</Link></li>
            <li><Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/gone-home">Gone home</Link></li>
            <li><Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/happy-families">Happy families</Link></li>
            <li><Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/how-it-works">How it works</Link></li>
            <li><Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/how-it-works#delivery">Delivery & collection</Link></li>
            <li><Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/faq">FAQ</Link></li>
            <li><Link className="font-semibold text-milk/90 underline-offset-4 hover:text-honey hover:underline" href="/contact">Visit & contact</Link></li>
          </ul>
        </nav>

        {/* Say hello */}
        <div className="md:col-span-3 md:row-span-2 md:row-start-1">
          <h2 className="font-scrawl text-lg text-honey">Say hello</h2>
          <ul className="mt-4 space-y-2.5 text-milk/90">
            <li>
              <a className="font-semibold hover:text-honey" href="https://wa.me/919827851210?text=Hi%20TeddyPups%2C%20I'm%20interested%20in%20a%20puppy." target="_blank" rel="noopener noreferrer">
                WhatsApp +91 98278 51210
              </a>
            </li>
            <li>
              <a className="break-all hover:text-honey" href="mailto:modzupdates@gmail.com">
                modzupdates@gmail.com
              </a>
            </li>
            <li className="text-milk/70">Downtown Dubai, United Arab Emirates</li>
          </ul>

          <ul className="mt-6 flex flex-wrap gap-3" aria-label="Social media">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition-colors">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition-colors">
                TikTok
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border-2 border-milk/30 px-4 text-sm font-semibold hover:border-honey hover:text-honey transition-colors">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright row */}
      <div className="gutter relative mx-auto mt-16 flex max-w-[110rem] flex-col items-start justify-between gap-4 border-t border-milk/15 pt-6 text-sm text-milk/60 md:flex-row md:items-center">
        <span className="flex items-center gap-3">
          <Image
            alt="TeddyPups Logo"
            width={36}
            height={36}
            className="size-9"
            src="/brand/logo.png"
          />
          © 2026 TeddyPups U.A.E.
        </span>
        <span className="font-scrawl text-base text-honey/80">every puppy is family</span>
      </div>
    </footer>
  );
}
