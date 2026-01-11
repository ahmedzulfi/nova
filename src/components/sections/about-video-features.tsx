"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const videoSrc = "https://videos.pexels.com/video-files/5790147/5790147-hd_1920_1080_30fps.mp4";
const videoThumb = "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2070&auto=format&fit=crop";

const features = [
  {
    number: "01",
    title: "Dedicated Zones",
    description: "Experience specialized environments with our dedicated Dog Zone and Cat Zone, tailored for each pet's needs.",
    image: "https://images.unsplash.com/photo-1541591419107-bb248ff6677a?q=80&w=1974&auto=format&fit=crop",
    variant: "default",
  },
  {
    number: "02",
    title: "Global Shows",
    description: "Watch world-class international competitions and shows featuring top-tier pets and professional judges.",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
    variant: "image-center",
  },
  {
    number: "03",
    title: "Entertainment",
    description: "Enjoy a mix of live entertainment and expert-led educational sessions for the whole family.",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop",
    variant: "default",
  },
  {
    number: "04",
    title: "Welfare & Safety",
    description: "We maintain a strong focus on animal welfare and safety, ensuring a positive experience for all.",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop",
    variant: "image-center",
  },
];

export default function AboutVideoFeatures() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="bg-white py-20 lg:py-40">
      <div className="container mx-auto px-6 max-w-[1280px]">
        {/* Passion Statement Section */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16 lg:mb-24">
          <span className="badge-label bg-[#f3f3f3] text-[#666666] px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wider">
            Festival Concept
          </span>
          <h2 className="text-[40px] lg:text-[56px] font-display font-semibold text-[#111111] leading-[1.2] max-w-[900px] tracking-tight">
            Qatar’s Premiere Pet Experience Built for Excellence
          </h2>
        </div>

        {/* Video Section */}
        <div className="relative w-full aspect-video rounded-[32px] overflow-hidden bg-[#f3f3f3] group mb-24 lg:mb-32">
          {!isPlaying && (
            <div className="absolute inset-0 z-10">
              <Image
                src={videoThumb}
                alt="Video thumbnail"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            </div>
          )}

          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover relative z-0"
            onClick={togglePlay}
          />

          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-xl"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <div className="flex gap-1.5">
                <div className="w-1.5 h-6 bg-[#111111] rounded-full" />
                <div className="w-1.5 h-6 bg-[#111111] rounded-full" />
              </div>
            ) : (
              <Play className="fill-[#111111] text-[#111111] w-6 h-6 lg:w-8 lg:h-8 ml-1" />
            )}
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-accent/10 rounded-[32px] p-8 flex flex-col h-full min-h-[480px] justify-between"
            >
              {feature.variant === "default" ? (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <h5 className="text-[24px] font-display font-semibold text-[#111111]">
                        {feature.number}
                      </h5>
                      <h5 className="text-[24px] font-display font-semibold text-[#111111]">
                        {feature.title}
                      </h5>
                    </div>
                    <p className="text-[16px] text-[#666666] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="relative w-full aspect-[4/3] mt-8 rounded-2xl overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-[16px] text-[#666666] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <h5 className="text-[24px] font-display font-semibold text-[#111111]">
                      {feature.number}
                    </h5>
                    <h5 className="text-[24px] font-display font-semibold text-[#111111]">
                      {feature.title}
                    </h5>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}