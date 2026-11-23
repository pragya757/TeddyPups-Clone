# TeddyPups U.A.E. — Complete Clone

A pixel-perfect, high-performance clone of **[TeddyPups U.A.E.](https://puppy.instabizweb.com/)**, built with Next.js App Router, Tailwind CSS, and custom typography.

---

## 🌟 Key Features & Implementation

1. **Pixel-Perfect Aesthetic & Branding**:
   - Replicated the warm luxury color palette (`milk`, `cocoa`, `honey`, `toffee`).
   - Integrated custom typography: **Fraunces** (headings), **Shantell Sans** (cursive microcopy & annotations), and **Figtree** (body text).
   - SVG decorative elements: scalloped header hem, twinkling stars & animated moon, curved footer hill, and custom paw cursors (`/cursor/paw.svg`).

2. **Complete Page Architecture (51 Pre-rendered Static Pages)**:
   - **Homepage (`/`)**: Hero, "Meet the pups" lineup, "Two ways to meet your puppy" (Dubai showroom vs International import), 3-step adoption journey, why families trust us, client testimonials, FAQ preview, and final CTA.
   - **Available Puppies (`/puppies`)**: Complete interactive catalog of 42 puppies with real-time filtering by breed (Maltipoo, Pomeranian, Poodle, Cavapoo, Shih-Tzu) and origin (Dubai showroom vs Imported), plus live search.
   - **Puppy Detail Dynamic Pages (`/puppies/[slug]`)**:
     - Interactive photo carousel and thumbnail selector.
     - Characteristic attribute badges (Breed, Gender, Age, Location).
     - Chapter 2: Health guarantees (Vaccinated, Dewormed, Verified vet health certificate).
     - Chapter 3: The Way Home 3-step concierge process.
     - Direct WhatsApp inquiry with dynamic pre-filled text.
     - Whimsical interactive "Post my letter" form.
   - **How It Works (`/how-it-works`)**: Comprehensive guide on concierge import, showroom visits, and care steps.
   - **Questions & Answers (`/faq`)**: Interactive searchable accordion with 9 detailed FAQs.
   - **Happy Families (`/happy-families`)**: Wall of memories showcasing 64 verified client photo moments and testimonials.
   - **Gone Home (`/gone-home`)**: Complete archive of 27 adopted puppies styled with vintage tickets and "admit one" stubs.
   - **Visit & Contact (`/contact`)**: Downtown Dubai showroom details, operating hours, and interactive letterform.

3. **Mobile & Responsive Optimization**:
   - Sticky header with scroll detection.
   - Fullscreen animated mobile navigation drawer ("where to, friend?").
   - Fixed mobile WhatsApp action bar with quick call and WhatsApp triggers.

4. **Assets & Media**:
   - All 198+ original high-resolution media images and brand logos stored locally in `/public` for fast offline loading.

---

## 🚀 Getting Started

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Run
```bash
npm run build
npm run start
```
# TeddyPups-Clone
