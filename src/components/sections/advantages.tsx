import React from 'react';
import Image from 'next/image';

const Advantages = () => {
  const advantagesData = [
    {
      id: "01",
      title: "International Dog & Cat Shows",
      description: "Experience world-class competitions with international judges and the finest breeds from around the globe.",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: "02",
      title: "Live Entertainment & Performances",
      description: "Enjoy live music, pet agility demonstrations, and interactive shows designed for all ages.",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
    },
    {
      id: "03",
      title: "Family-Friendly Festival",
      description: "A weekend filled with fun activities, educational workshops, and great food for the whole family.",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "04",
      title: "Vet Talks & Adoption Programs",
      description: "Learn from industry experts and find your new best friend through our dedicated adoption initiatives.",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "05",
      title: "Dedicated Dog & Cat Zones",
      description: "Specially designed areas for pets to socialize, play, and compete in a safe and controlled environment.",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-white py-[120px] md:py-[160px]">
      <div className="container max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-12 items-start">
          {/* Left Column: Badge and Thumbnail */}
          <div className="flex flex-col gap-12 sticky top-32">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E6E6E6] text-black text-[12px] font-semibold uppercase tracking-[0.05em] font-body">
                Festival Highlights
              </span>
            </div>
            
            {/* Thumbnail Image for 01 Scenic Routes */}
            <div className="hidden md:block w-full max-w-[220px]">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[24px]">
                <Image
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop"
                  alt="Pet Show"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Heading and Accordion List */}
          <div className="flex flex-col">
            <h2 className="text-[40px] md:text-[56px] font-semibold leading-[1.1] text-black mb-16 max-w-[640px] font-display">
              A unique and enriching experience for all pet lovers
            </h2>

            <div className="flex flex-col">
              {advantagesData.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`py-8 ${index !== 0 ? 'border-t border-[#E6E6E6]' : ''}`}
                >
                  <div className="flex items-start gap-6 group cursor-pointer">
                    <span className="text-[18px] font-semibold text-[#666666] pt-1 font-body">
                      {item.id}
                    </span>
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[24px] md:text-[32px] font-semibold text-black font-display">
                        {item.title}
                      </h4>
                      {/* Active State Details (01 is active in design) */}
                      {index === 0 && (
                        <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#666666] max-w-[580px] font-body">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Mobile Mobile Thumbnail for Scenic Routes if active */}
                  {index === 0 && (
                    <div className="md:hidden mt-6 w-full max-w-[280px]">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-[24px]">
                        <Image
                          src={item.image!}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t border-[#E6E6E6]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;