import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

/**
 * PassionVideo Section component
 * Clones the mission statement section with the headline "We're passionate cyclists..."
 * and a full-width embedded video player showcasing cycling action.
 */
export default function PassionVideo() {
  return (
    <section className="bg-white py-[80px] lg:py-[120px]">
      <div className="container px-5 lg:px-10 mx-auto max-w-[1280px]">
        {/* Top Content Wrapper */}
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24">
          {/* Section Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F1F1F1] text-[14px] font-medium text-black">
              About us
            </span>
          </div>

          {/* Headline */}
          <h2 className="max-w-[900px] text-[32px] md:text-[40px] lg:text-[48px] font-medium leading-[1.2] tracking-[-0.01em] text-black">
            We&apos;re passionate cyclists and adventurers, creating unforgettable experiences on two wheels
          </h2>
        </div>

        {/* Video Player Section */}
        <div className="relative w-full aspect-video rounded-[24px] overflow-hidden group">
          {/* Video element - Using Pexels asset from provided list */}
          <video
            className="w-full h-full object-cover"
            src="https://videos.pexels.com/video-files/5790147/5790147-hd_1920_1080_30fps.mp4"
            poster="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/W0aaivkpwhdltWBu8nNmMhGIIek-7.jpg"
            muted
            loop
            playsInline
          />

          {/* Custom Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors duration-300">
            <button
              className="relative w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              aria-label="Play video"
            >
              {/* Pulse effect border */}
              <div className="absolute inset-0 rounded-full border border-white animate-ping opacity-25"></div>

              <Play className="w-6 h-6 lg:w-8 lg:h-8 text-black fill-current ml-1" />
            </button>
          </div>
        </div>

        {/* Benefit Cards Wrapper (as shown in HTML structure and screenshots following the video) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 lg:mt-24">
          {/* Card 01 */}
          <div className="bg-accent/10 rounded-[24px] p-6 lg:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h5 className="text-[24px] font-semibold text-black opacity-40">01</h5>
                <h5 className="text-[24px] font-semibold text-black">Scenic Routes</h5>
              </div>
              <p className="text-[18px] text-[#666666] leading-[1.6]">
                Our carefully curated routes let you explore breathtaking, stunning natural landscapes.
              </p>
            </div>
            <div className="mt-8 rounded-[16px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 relative h-[180px]">
              <Image
                src="https://framerusercontent.com/images/rkAuWOc2uqbczacSJeKfT5o9b0.jpg?scale-down-to=512"
                alt="Scenic Routes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </div>

          {/* Card 02 */}
          <div className="bg-accent/10 rounded-[24px] p-6 lg:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h5 className="text-[24px] font-semibold text-black opacity-40">02</h5>
                <h5 className="text-[24px] font-semibold text-black">Strong Community</h5>
              </div>
              <p className="text-[18px] text-[#666666] leading-[1.6]">
                Join a cycling community, share your passion, explore new routes, and make friends.
              </p>
            </div>
            <div className="mt-8 rounded-[16px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 relative h-[180px]">
              <Image
                src="https://framerusercontent.com/images/ERWMHvvPvKlBgf6GVzBtjyrr4.jpg"
                alt="Strong Community"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </div>

          {/* Card 03 */}
          <div className="bg-accent/10 rounded-[24px] p-6 lg:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h5 className="text-[24px] font-semibold text-black opacity-40">03</h5>
                <h5 className="text-[24px] font-semibold text-black">Organization</h5>
              </div>
              <p className="text-[18px] text-[#666666] leading-[1.6]">
                Our dedicated team of expert cyclists and planners ensures your safety and enjoyment.
              </p>
            </div>
            <div className="mt-8 rounded-[16px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 relative h-[180px]">
              <Image
                src="https://framerusercontent.com/images/ENhmY5gWUIMHaAAWD65wT5X420Y.jpg"
                alt="Organization"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </div>

          {/* Card 04 */}
          <div className="bg-accent/10 rounded-[24px] p-6 lg:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h5 className="text-[24px] font-semibold text-black opacity-40">04</h5>
                <h5 className="text-[24px] font-semibold text-black">Expert Guidance</h5>
              </div>
              <p className="text-[18px] text-[#666666] leading-[1.6]">
                Our experienced staff are dedicated to ensuring your experience is safe and enjoyable.
              </p>
            </div>
            <div className="mt-8 rounded-[16px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 relative h-[180px]">
              <Image
                src="https://framerusercontent.com/images/qLTk8vC88vXmeSSHkWZFyf0Q3M0.jpg"
                alt="Expert Guidance"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}