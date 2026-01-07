import React from 'react';
import Image from 'next/image';

/**
 * PartnersSection Component
 * 
 * A light-themed section showcasing trusted partners with a descriptive text 
 * and a horizontal grid of grayscale logos (Logoipsum).
 */
const PartnersSection: React.FC = () => {
  const partners = [
    {
      src: "https://framerusercontent.com/images/uqxH2heGt0ngsf0S3cOuOmQOA.svg",
      alt: "Logo",
      width: 226,
      height: 56,
    },
    {
      src: "https://framerusercontent.com/images/rSWXz9k6xFTe7pyVefjM14YqYXQ.svg",
      alt: "Logo",
      width: 320,
      height: 56,
    },
    {
      src: "https://framerusercontent.com/images/op7bcrGQodbRPWlq3bR4sZ2O3rc.svg",
      alt: "Logo",
      width: 226,
      height: 56,
    },
    {
      src: "https://framerusercontent.com/images/iu22u8KtpVL4GrwppTLL7zrL0.svg",
      alt: "Logo",
      width: 264,
      height: 56,
    },
    {
      src: "https://framerusercontent.com/images/jfrfvu3Ifo5mXe10jXRiBQ4JC8.svg",
      alt: "Logo",
      width: 281,
      height: 56,
    },
    {
      src: "https://framerusercontent.com/images/clj2Zv1q1pTKgYyUE48uDsdv1g.svg",
      alt: "Logo",
      width: 220,
      height: 56,
    },
  ];

  return (
    <section className="w-full bg-white py-[60px] md:py-[100px] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Partners Text Descriptive Wrapper */}
        <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-16">
          <p className="font-body text-[16px] md:text-[18px] leading-[1.6] text-[#666666] max-w-[600px]">
            <span className="font-semibold text-black">+1,300 trusted partners</span>{" "}
            and 5,900 people tried this unforgettable experience.
          </p>
        </div>

        {/* Partners Logo Grid Wrapper */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-300">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center w-full max-w-[160px] h-[40px] relative"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
                className="object-contain w-auto h-full"
                priority={index < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;