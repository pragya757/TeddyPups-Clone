'use client';

export default function WhatsAppBar() {
  return (
    <div
      data-whatsapp-bar="true"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-cocoa bg-milk px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-4px_20px_rgba(42,23,14,0.12)] md:hidden"
    >
      <div className="flex items-center gap-2">
        <a
          href="https://wa.me/971500000000?text=Hi%20TeddyPups%2C%20I'm%20interested%20in%20a%20puppy."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-bold text-white shadow-sm active:scale-[0.98] transition-transform"
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 6.96C8.93 6.96 8.74 6.97 8.57 7.33C8.4 7.68 7.87 8.19 7.87 9.24C7.87 10.3 8.64 11.31 8.76 11.46C8.87 11.62 10.28 13.78 12.43 14.71C14.22 15.48 14.58 15.33 14.98 15.29C15.38 15.25 16.27 14.76 16.45 14.25C16.63 13.74 16.63 13.3 16.57 13.21C16.51 13.12 16.34 13.06 16.08 12.93C15.82 12.8 14.55 12.17 14.31 12.09C14.07 12 13.9 11.96 13.73 12.22C13.55 12.48 13.04 13.08 12.89 13.25C12.73 13.43 12.58 13.45 12.32 13.32C12.06 13.19 11.23 12.92 10.25 12.05C9.48 11.37 8.97 10.53 8.84 10.27C8.71 10.01 8.83 9.87 8.96 9.74C9.07 9.63 9.22 9.44 9.35 9.29C9.48 9.14 9.53 9.03 9.61 8.86C9.69 8.7 9.65 8.55 9.59 8.42C9.53 8.29 9.02 7.03 8.81 6.52C8.6 6.02 8.39 6.09 8.23 6.08C8.08 6.08 7.9 6.07 7.73 6.07" />
          </svg>
          <span>WhatsApp us</span>
        </a>
        <a
          href="tel:+971500000000"
          className="flex items-center justify-center gap-1.5 rounded-full border-2 border-cocoa bg-milk px-5 py-3 text-sm font-bold text-cocoa active:bg-sand transition-colors"
        >
          <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}
