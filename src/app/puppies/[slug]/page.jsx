import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import puppiesData from '@/data/puppies.json';
import PuppyDetailClient from './PuppyDetailClient';

export function generateStaticParams() {
  return puppiesData.map((puppy) => ({
    slug: puppy.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const puppy = puppiesData.find((p) => p.slug === slug);
  if (!puppy) return { title: 'Puppy not found | TeddyPups U.A.E.' };

  return {
    title: `${puppy.name}, ${puppy.breed} puppy | TeddyPups U.A.E.`,
    description: puppy.desc || `Meet ${puppy.name}: ${puppy.breed}, ${puppy.gender}, ${puppy.age}, ${puppy.origin}. Real photos from TeddyPups U.A.E.`,
    openGraph: {
      title: `${puppy.name}, ${puppy.breed} puppy | TeddyPups U.A.E.`,
      description: puppy.desc || `Meet ${puppy.name} at TeddyPups U.A.E.`,
      images: puppy.images.length > 0 ? [puppy.images[0]] : ['/brand/logo.png'],
    },
  };
}

export default async function PuppyDetailPage({ params }) {
  const { slug } = await params;
  const puppy = puppiesData.find((p) => p.slug === slug);

  if (!puppy) {
    notFound();
  }

  return (
    <article className="tp-storybook min-h-screen bg-[#fffdf8]">
      <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[0.95rem] font-semibold text-cocoa/70">
          <Link className="underline-offset-4 hover:underline hover:text-cocoa" href="/puppies">
            Available puppies
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-cocoa font-bold">
            {puppy.name}
          </span>
        </nav>

        {/* Client-side interactive gallery and form */}
        <PuppyDetailClient puppy={puppy} />
      </div>
    </article>
  );
}
