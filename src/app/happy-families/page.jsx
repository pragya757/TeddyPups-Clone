import Image from 'next/image';
import happyFamiliesData from '@/data/happy_families.json';

export const metadata = {
  title: 'Happy families | TeddyPups U.A.E.',
  description: 'Real photos shared by TeddyPups families after welcoming their new puppy home.',
};

export default function HappyFamiliesPage() {
  return (
    <div className="tp-page">
      <section className="tp-memories py-10 md:py-16">
        <div className="gutter mx-auto max-w-[110rem] pb-24">
          {/* Header */}
          <div className="tp-memories__head max-w-3xl mb-12">
            <p className="font-scrawl text-lg text-toffee">our wall of happy endings</p>
            <h1 className="font-plush text-4xl md:text-6xl text-cocoa mt-2">
              Happy families
            </h1>
            <p className="mt-4 text-base md:text-lg text-cocoa/80 leading-relaxed">
              Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients across Dubai and the world after welcoming their furry friends.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="rounded-full bg-honey/25 px-4 py-1.5 font-scrawl text-sm font-bold text-cocoa">
                {happyFamiliesData.length} moments and counting
              </span>
            </div>
          </div>

          {/* Testimonial Quote Spotlight */}
          <div className="mb-16 rounded-3xl border-2 border-cocoa/20 bg-milk p-8 md:p-12 shadow-md">
            <span className="font-plush text-5xl text-honey">“</span>
            <blockquote className="font-plush text-xl md:text-2xl text-cocoa leading-relaxed mt-2">
              TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having our puppy home has brought so much warmth to our family.
            </blockquote>
            <p className="mt-4 font-scrawl text-lg text-toffee">
              — Sarah M., Downtown Dubai
            </p>
          </div>

          {/* 64 Polaroid Photo Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {happyFamiliesData.map((item, idx) => (
              <div
                key={item.id || idx}
                className="group overflow-hidden rounded-2xl border-2 border-cocoa/15 bg-milk p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cocoa hover:shadow-lg"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-sand/30">
                  <Image
                    src={item.url}
                    alt={item.alt || 'Happy TeddyPups family with their new puppy'}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="pt-2 px-1 text-center">
                  <p className="font-scrawl text-xs text-cocoa/70 truncate">
                    {item.caption || 'Loving forever home ♥'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 rounded-3xl bg-cocoa p-10 text-center text-milk">
            <h2 className="font-plush text-3xl">Ready to welcome your own puppy?</h2>
            <p className="mt-2 text-milk/80 text-base max-w-lg mx-auto">
              Meet our available puppies in Dubai or chat with our team on WhatsApp today.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="/puppies"
                className="rounded-full bg-honey px-8 py-3.5 text-sm font-bold text-cocoa shadow-md hover:bg-honey-soft transition-all"
              >
                View Available Puppies
              </a>
              <a
                href="https://wa.me/971500000000?text=Hi%20TeddyPups%2C%20I'd%20like%20to%20learn%20more."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-milk px-8 py-3.5 text-sm font-bold text-milk hover:bg-milk/10 transition-all"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
