import React from 'react';
import Image from 'next/image';

/**
 * EventHero Component
 * 
 * Clones the hero section for the "Urban Night" event.
 * Includes category badge, title, description, and event information grid with a registration button.
 * Adheres to the light theme and high-level design system.
 */
const EventHero: React.FC = () => {
  return (
    <section 
      className="relative w-full overflow-hidden bg-background pt-[140px] pb-[60px]"
      style={{ minHeight: '400px' }}
    >
      <div className="container px-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-24">
          
          {/* Left Column: Title and Description */}
          <div className="flex flex-col max-w-[640px]">
            {/* Breadcrumb-style category badge */}
            <div className="mb-8 self-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border">
                <span className="text-sm font-medium text-foreground">
                  Festivals & Exhibitions
                </span>
                <Image 
                  src="https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg" 
                  alt="Icon" 
                  width={16} 
                  height={16} 
                  className="opacity-60"
                />
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-[clamp(3rem,8vw,80px)] font-semibold leading-[1.1] tracking-[-0.04em] text-foreground mb-6">
              Urban Night
            </h1>

            {/* Description */}
            <p className="text-lg leading-relaxed text-foreground/80 max-w-[480px]">
              Experience the city in a new light with an illuminated night ride through vibrant streets and iconic landmarks.
            </p>
          </div>

          {/* Right Column: Event Info Grid */}
          <div className="flex flex-col w-full lg:max-w-[450px]">
            <div className="grid grid-cols-1 border-t border-border">
              {/* Start Date Row */}
              <div className="flex justify-between items-center py-5 border-b border-border">
                <span className="text-base text-muted-foreground font-normal">Start:</span>
                <span className="text-base text-foreground font-medium">September 29, 2025</span>
              </div>
              
              {/* End Date Row */}
              <div className="flex justify-between items-center py-5 border-b border-border">
                <span className="text-base text-muted-foreground font-normal">End:</span>
                <span className="text-base text-foreground font-medium">September 29, 2025</span>
              </div>
              
              {/* Location Row */}
              <div className="flex justify-between items-center py-5 border-b border-border">
                <span className="text-base text-muted-foreground font-normal">Location:</span>
                <span className="text-base text-foreground font-medium">Times Sq., NYC</span>
              </div>
            </div>

            {/* Register Action */}
            <div className="mt-8">
              <a 
                href="/contact-us"
                className="inline-flex items-center justify-between gap-4 px-8 py-4 rounded-full bg-accent border border-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                style={{ backgroundColor: '#FEFDC3' }}
              >
                <span className="text-base font-semibold text-foreground">
                  Register now
                </span>
                <div className="flex items-center justify-center bg-white/50 rounded-full p-1.5 group-hover:bg-primary transition-colors">
                  <Image 
                    src="https://framerusercontent.com/images/mJ4B3sUua6gvwJ6rQYS23DLJ9c.svg" 
                    alt="Arrow Icon" 
                    width={18} 
                    height={18}
                  />
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EventHero;