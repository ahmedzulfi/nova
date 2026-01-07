import React from 'react';
import Image from 'next/image';

/**
 * GallerySection component
 * A responsive grid of four high-quality photos showing different scenes 
 * of cyclists and urban night landscapes, following the "Swiss Design" influence.
 */
const GallerySection = () => {
const images = [
{
url: "https://images.unsplash.com/photo-1541591419107-bb248ff6677a?q=80&w=1974&auto=format&fit=crop",
alt: "Happy dog at the festival",
width: 2728,
height: 3410,
},
{
url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
alt: "Curious cat in the Cat Dome",
width: 5464,
height: 8192,
},
{
url: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2070&auto=format&fit=crop",
alt: "Festival crowd and pet shows",
width: 4394,
height: 2929,
},
{
url: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop",
alt: "Dog show competition highlights",
width: 3895,
height: 4869,
},
];

  return (
    <section 
      id="gallery" 
      className="bg-background overflow-hidden relative"
      style={{ 
        paddingTop: '120px', 
        paddingBottom: '120px' 
      }}
    >
      <div className="container mx-auto px-8 max-w-[1280px]">
        {/* Label Header */}
        <div className="flex items-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 bg-secondary rounded-full border border-border">
            <span className="text-secondary-foreground font-semibold text-[16px] leading-[1.4] tracking-tight">
              Gallery
            </span>
          </div>
        </div>

        {/* Gallery Grid - Using an asymmetrical layout inspired by the design system */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6 lg:gap-8">
            <div className="relative overflow-hidden rounded-[24px] group">
              <Image
                src={images[0].url}
                alt={images[0].alt}
                width={images[0].width}
                height={images[0].height}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="relative overflow-hidden rounded-[24px] group">
              <Image
                src={images[1].url}
                alt={images[1].alt}
                width={images[1].width}
                height={images[1].height}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Column 2 - Shifted slightly down for visual rhythm (Swiss style) */}
          <div className="flex flex-col gap-6 lg:gap-8 md:mt-24">
            <div className="relative overflow-hidden rounded-[24px] group">
              <Image
                src={images[2].url}
                alt={images[2].alt}
                width={images[2].width}
                height={images[2].height}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative overflow-hidden rounded-[24px] group">
              <Image
                src={images[3].url}
                alt={images[3].alt}
                width={images[3].width}
                height={images[3].height}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Vertical Decorative Label (Hidden on small screens, part of the High Level Design) */}
      <div className="hidden lg:block absolute right-10 top-1/2 transform -translate-y-1/2 select-none pointer-events-none opacity-[0.05] vertical-text">
        <span className="text-[120px] font-bold text-foreground">VISUALS</span>
      </div>
    </section>
  );
};

export default GallerySection;