import React from 'react';
import Image from 'next/image';

const HeroBanner: React.FC = () => {
  // Asset URLs from the provided list
  const avatars = [
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/Bnjmt6ispxsHDmXpka9YksPYB0-1.jpg",
      className: "top-[15%] left-[22%] w-[84px] h-[84px] md:w-[100px] md:h-[100px]",
    },
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/ravDLcbIxz2CPKB2ZifsYAjN2ac-2.jpg",
      className: "top-[12%] right-[22%] w-[84px] h-[84px] md:w-[100px] md:h-[100px]",
    },
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/hVawiHfWaJYKjIPAUTLtzJpgad8-3.jpg",
      className: "top-[40%] left-[10%] w-[90px] h-[90px] md:w-[110px] md:h-[110px]",
    },
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/kaofChT0ChjJb76ClKauaOyof8-4.jpg",
      className: "top-[40%] right-[10%] w-[88px] h-[88px] md:w-[108px] md:h-[108px]",
    },
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/t8invdbJezsYKxGg3I06JAU18Ng-5.jpg",
      className: "bottom-[12%] left-[22%] w-[94px] h-[94px] md:w-[114px] md:h-[114px]",
    },
    {
      url: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/ERWMHvvPvKlBgf6GVzBtjyrr4-6.jpg",
      className: "bottom-[15%] right-[22%] w-[94px] h-[94px] md:w-[114px] md:h-[114px]",
    },
  ];

  const arrowIcon = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/mJ4B3sUua6gvwJ6rQYS23DLJ9c-3.svg";

  return (
    <section className="relative overflow-hidden pt-[160px] pb-[120px] bg-[#FFFFFF]">
      {/* Floating Images */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`absolute rounded-full overflow-hidden border-4 border-white shadow-sm ${avatar.className}`}
          >
            <Image
              src={avatar.url}
              alt="Cyclist"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100px, 120px"
              priority
            />
          </div>
        ))}
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center max-w-[800px] mx-auto">
          {/* Headline */}
          <h1 className="mb-6 text-[48px] md:text-[88px] font-semibold leading-[1.1] tracking-tight text-[#000000]">
            Join the ride of a lifetime!
          </h1>

          {/* Descriptive Paragraph */}
          <p className="mb-10 text-[18px] md:text-[20px] leading-[1.6] text-[#666666] max-w-[640px]">
            Explore our exciting lineup of cycling events designed for riders of all levels. From challenging mountain trails and scenic coastal rides to community-focused charity rides and vibrant cycling festivals.
          </p>

          {/* CTA Button */}
          <a
            href="/contact-us"
            className="group flex items-center justify-center px-10 py-5 bg-[#F7F170] hover:bg-[#EEF05C] rounded-full transition-all duration-200"
          >
            <span className="text-[16px] font-semibold text-[#000000] mr-3">
              Let's get started
            </span>
            <div className="w-[22px] h-[22px] flex items-center justify-center">
              <img 
                src={arrowIcon} 
                alt="Arrow" 
                className="w-full h-full object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;