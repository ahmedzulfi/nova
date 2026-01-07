import React from 'react';
import Image from 'next/image';

/**
 * EventGallery Component
 * 
 * A pixel-perfect clone of the gallery section from the Urban Night event page.
 * Features a grid-style layout of four high-quality cycling and urban night images
 * with large border radii and subtle hover effects.
 */
export default function EventGallery() {
  const images = [
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/Y6B1got14COYGJJkLuyb96suY-2.jpg",
      alt: "Cyclist at night with city lights",
      width: 2728,
      height: 3410,
      containerClass: "col-span-1 row-span-2",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/VEJR7mR2IBDDgRrluVSfkpRXn28-3.jpg",
      alt: "Close up of bicycle details",
      width: 5464,
      height: 8192,
      containerClass: "col-span-1 row-span-3",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/aQHoEKeAFONMHGKxI7zkEjo-4.jpg",
      alt: "Blurry motion of city traffic",
      width: 4394,
      height: 2929,
      containerClass: "col-span-1 row-span-1",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/6YPsWrhPOBJ7vtnmZlfdCFrbv4-5.jpg",
      alt: "Cyclist riding through urban tunnel",
      width: 3895,
      height: 4869,
      containerClass: "col-span-1 row-span-2",
    },
  ];

  return (
    <section 
      id="gallery" 
      className="bg-white py-[120px] md:py-[120px]"
      style={{ isolation: 'isolate' }}
    >
      <div className="container mx-auto max-w-[1280px] px-6">
        {/* Gallery Label */}
        <div className="mb-12 flex justify-start">
          <div className="inline-flex items-center justify-center rounded-full bg-[#f2f2f2] px-4 py-1">
            <span className="text-[14px] font-medium text-[#1a1a1a]">Gallery</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
          {/* Item 1 - Left Column Tall */}
          <div className="relative overflow-hidden rounded-[24px] md:row-span-3 group bg-[#f2f2f2]">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Item 2 - Middle Column Extra Tall */}
          <div className="relative overflow-hidden rounded-[24px] md:row-span-4 group bg-[#f2f2f2]">
            <Image
              src={images[1].src}
              alt={images[1].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Item 3 - Right Column Top Small */}
          <div className="relative overflow-hidden rounded-[24px] md:row-span-2 group bg-[#f2f2f2]">
            <Image
              src={images[2].src}
              alt={images[2].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Item 4 - Bottom Left/Right Column */}
          <div className="relative overflow-hidden rounded-[24px] md:row-span-3 group bg-[#f2f2f2]">
            <Image
              src={images[3].src}
              alt={images[3].alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Optional: Add spacing elements to match original layout if specific masonry behavior is needed */}
          {/* The current grid-auto-rows strategy handles the variety of aspect ratios closely to the provided HTML structure */}
        </div>
      </div>
    </section>
  );
}