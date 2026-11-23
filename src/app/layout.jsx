import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppBar from '@/components/WhatsAppBar';
import CurtainLoader from '@/components/CurtainLoader';

export const metadata = {
  title: 'TeddyPups clone — Premium teacup puppies in Dubai',
  description: 'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
  metadataBase: new URL('https://puppy.instabizweb.com'),
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'TeddyPups clone — Premium teacup puppies in Dubai',
    description: 'Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.',
    images: ['/brand/logo.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fffdf8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased text-cocoa bg-milk selection:bg-honey/30">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-milk focus:p-3 focus:border-2 focus:border-cocoa">
          Skip to content
        </a>
        <CurtainLoader />
        <Header />
        <main id="main">
          {children}
        </main>
        <Footer />
        <WhatsAppBar />
      </body>
    </html>
  );
}
