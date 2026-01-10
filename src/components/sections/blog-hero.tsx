import React from 'react';
import Image from 'next/image';

const BlogHero: React.FC = () => {
  const avatars = [
    {
      url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1974&auto=format&fit=crop",
      className: "top-[15%] left-[22%] w-[84px] h-[84px] md:w-[100px] md:h-[100px]",
    },
    {
      url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
      className: "top-[12%] right-[22%] w-[84px] h-[84px] md:w-[100px] md:h-[100px]",
    },
    {
      url: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1988&auto=format&fit=crop",
      className: "top-[40%] left-[10%] w-[90px] h-[90px] md:w-[110px] md:h-[110px]",
    },
    {
      url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop",
      className: "top-[40%] right-[10%] w-[88px] h-[88px] md:w-[108px] md:h-[108px]",
    },
    {
      url: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2186&auto=format&fit=crop",
      className: "bottom-[12%] left-[22%] w-[94px] h-[94px] md:w-[114px] md:h-[114px]",
    },
    {
      url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
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
              alt="Pet"
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
            Nova Paw Blog
          </h1>

          {/* Descriptive Paragraph */}
          <p className="mb-10 text-[18px] md:text-[20px] leading-[1.6] text-[#666666] max-w-[640px]">
            Stay updated with the latest pet care tips, festival news, and community stories. From preparation guides to heartwarming adoption success stories.
          </p>

          {/* CTA Button */}
          <a
            href="/registration"
            className="group flex items-center justify-center px-10 py-5 bg-primary hover:bg-primary/90 rounded-full transition-all duration-200"
          >
            <span className="text-[16px] font-semibold text-white mr-3">
              Register Your Pet
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

export default BlogHero;
