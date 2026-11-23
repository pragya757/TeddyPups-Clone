import puppiesData from '@/data/puppies.json';
import PuppiesClient from './PuppiesClient';

export const metadata = {
  title: 'Available puppies | TeddyPups U.A.E.',
  description: 'Teacup and teddy bear puppies available now in Dubai and imported from trusted breeders — every listing shows real photos of the puppy.',
};

export default function PuppiesPage() {
  return <PuppiesClient initialPuppies={puppiesData} />;
}
