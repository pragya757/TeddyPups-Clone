import Link from 'next/link';
import Image from 'next/image';
import goneHomeData from '@/data/gone_home.json';

export const metadata = {
  title: 'Gone home | TeddyPups U.A.E.',
  description: 'TeddyPups puppies who have already joined their families.',
};

export default function GoneHomePage() {
  return (
    <div className="tp-page">
      <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
        {/* Header */}
        <header className="tp-boothhead mb-12 max-w-3xl">
          <p className="font-scrawl text-lg text-toffee">tickets home</p>
          <h1 className="font-plush text-4xl md:text-6xl text-cocoa mt-2">
            Gone home
          </h1>
          <p className="mt-4 text-base md:text-lg text-cocoa/80 leading-relaxed">
            Every puppy here has already joined a loving family. Looking for one just like them? Tell us on WhatsApp — we will help you find your perfect match.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/puppies"
              className="inline-flex rounded-full bg-cocoa px-6 py-3 text-sm font-bold text-milk shadow-md hover:bg-cocoa/90 transition-all"
            >
              See available puppies
            </Link>
          </div>
        </header>

        {/* Tickets Grid */}
        <ul className="tp-tickets grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Puppies who have gone home">
          {goneHomeData.map((ticket, idx) => (
            <li
              key={idx}
              className="tp-ticket relative overflow-hidden rounded-3xl border-2 border-cocoa/20 bg-milk p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cocoa hover:shadow-lg"
            >
              <div className="tp-ticket__link block">
                <div className="flex gap-4">
                  {/* Photo thumbnail */}
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-sand/30">
                    <Image
                      src={ticket.src}
                      alt={ticket.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Ticket Body */}
                  <div className="flex-1 min-w-0">
                    <span className="font-scrawl text-xs text-toffee block">
                      one ticket home
                    </span>
                    <h2 className="font-plush text-2xl text-cocoa font-bold truncate mt-0.5">
                      {ticket.name}
                    </h2>
                    <p className="tp-ticket__meta text-xs font-semibold text-cocoa/70 mt-0.5">
                      {ticket.meta}
                    </p>

                    {/* Route */}
                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-cocoa/80">
                      <span>TeddyPups</span>
                      <svg viewBox="0 0 60 12" className="w-8 h-2.5 stroke-cocoa fill-none stroke-2" aria-hidden="true">
                        <path d="M2 6h46" />
                        <path d="M44 2l6 4-6 4" />
                      </svg>
                      <span>home ♥</span>
                    </div>
                  </div>
                </div>

                {/* Perforated Divider & Ticket Stub */}
                <div className="mt-4 border-t-2 border-dashed border-cocoa/20 pt-3 flex items-center justify-between text-xs text-cocoa/60 font-mono">
                  <span className="font-plush font-bold tracking-wider uppercase">admit one</span>
                  <span>#TP-{202600 + idx}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
