import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer data-pup-scene="true" data-tone="dark" className="tp-scene tp-footer relative pb-[calc(var(--bar-h,60px)+2rem)] text-milk md:pb-10">
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

            <div data-pup-stop="true" data-pose="snug" data-facing="right" className="pup-stop tp-basket__pup">
              <div className="pup-buddy" data-facing="right">
                <svg viewBox="0 0 300 240" style={{ overflow: 'visible' }} role="img" aria-label="Teddy, sitting snug in his basket">
                  <g data-p="root">
                    {/* Fluffy body in basket */}
                    <circle cx="212" cy="115" r="42" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.6" />
                    {/* Fluffy cute ears */}
                    <path
                      data-p="earL"
                      d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
                      fill="#e4a352"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <path
                      data-p="earR"
                      d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
                      fill="#e4a352"
                      stroke="#2a170e"
                      strokeWidth="3.4"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {/* Head */}
                    <g data-p="head">
                      {/* Collar */}
                      <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                      <path d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
                      {/* Cloud shape head */}
                      <path d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                      <path d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                      {/* Muzzle */}
                      <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />
                      {/* Cheeks */}
                      <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                      <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
                      {/* Eyes open/shut blink */}
                      <g data-p="eyes">
                        <g data-p="open">
                          <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                          <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
                          <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                          <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                          <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                          <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
                        </g>
                        <g data-p="shut" opacity="0">
                          <path d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                        </g>
                      </g>
                      {/* Nose */}
                      <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill="#2a170e" />
                      {/* Mouth & Tongue */}
                      <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                      <path data-p="tongue" d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
                    </g>
                    {/* Cute paws resting over the basket rim */}
                    <g data-p="ledge" opacity="1">
                      <path d="M175 149 C175 138 181 132 190 132 C199 132 205 138 205 149 Z M219 149 C219 138 225 132 234 132 C243 132 249 138 249 149 Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
                      <path d="M186 143 v-4.5 M194 143 v-4.5 M230 143 v-4.5 M238 143 v-4.5" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" fill="none" />
                    </g>
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
