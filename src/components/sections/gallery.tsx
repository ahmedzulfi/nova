"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2, Camera } from 'lucide-react';

const categories = ["All", "Event Highlights", "Dog Shows", "Cat Shows", "Entertainment", "Family Activities"];

const galleryImages = [
    {
        url: "https://images.unsplash.com/photo-1541591419107-bb248ff6677a?q=80&w=1974&auto=format&fit=crop",
        alt: "Happy dog at the festival",
        category: "Dog Shows",
        aspect: "aspect-[3/4]"
    },
    {
        url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
        alt: "Curious cat in the Cat Dome",
        category: "Cat Shows",
        aspect: "aspect-square"
    },
    {
        url: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2070&auto=format&fit=crop",
        alt: "Festival crowd and pet shows",
        category: "Event Highlights",
        aspect: "aspect-video"
    },
    {
        url: "https://images.unsplash.com/photo-1534361960057-19889db9621e?q=80&w=2070&auto=format&fit=crop",
        alt: "Dog show competition highlights",
        category: "Dog Shows",
        aspect: "aspect-[4/3]"
    },
    {
        url: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop",
        alt: "Adoption corner",
        category: "Family Activities",
        aspect: "aspect-square"
    },
    {
        url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1964&auto=format&fit=crop",
        alt: "Pet fashion show",
        category: "Entertainment",
        aspect: "aspect-[3/4]"
    },
];

const GallerySection = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const filteredImages = activeCategory === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    return (
        <section id="gallery" className="bg-white py-12 lg:py-20 overflow-hidden">
            <div className="container mx-auto px-6 max-w-[1280px]">
                
                {/* Refined Filter Bar */}
                <div className="flex flex-wrap items-center justify-start gap-3 mb-16 border-b border-black/5 pb-8">
                  <div className="flex items-center gap-3 text-black/20 mr-4">
                    <Camera className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Filter</span>
                  </div>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-sm text-[13px] font-bold uppercase tracking-wider transition-all duration-300 active:scale-[0.96] ${activeCategory === cat
                                ? 'bg-black text-white shadow-sm'
                                : 'bg-[#F9F9F9] text-black/40 hover:text-black hover:bg-[#F0F0F0]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Editorial Masonry Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                    {filteredImages.map((image, idx) => (
                        <div
                            key={idx}
                            className="relative break-inside-avoid overflow-hidden rounded-sm group cursor-pointer bg-[#F9F9F9]"
                            onClick={() => setSelectedImage(image.url)}
                        >
                            <div className={`${image.aspect} relative w-full grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]`}>
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                
                                {/* Refined Overlay Effect */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-sm border border-white/20 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <Maximize2 className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Minimal Label */}
                            <div className="p-6 flex items-center justify-between border-t border-black/5 bg-white">
                                <span className="text-[11px] font-black uppercase tracking-[0.15em] text-black/40">
                                    {image.category}
                                </span>
                                <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Premium Lightbox */}
            {selectedImage && (
                <div 
                  className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-500 p-8"
                  style={{ animation: 'fade-in 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-10 right-10 w-14 h-14 bg-white text-black rounded-sm flex items-center justify-center transition-all hover:scale-110 active:scale-90 z-[210] shadow-2xl"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div 
                      className="relative w-full h-full max-w-[1400px] flex items-center justify-center"
                      style={{ animation: 'scale-up 0.5s cubic-bezier(0.23, 1, 0.32, 1)' }}
                    >
                        <Image
                            src={selectedImage}
                            alt="Full View"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}

            <style jsx>{`
              @keyframes fade-in {
                from { opacity: 0; backdrop-filter: blur(0px); }
                to { opacity: 1; backdrop-filter: blur(20px); }
              }
              @keyframes scale-up {
                from { transform: scale(0.95) translateY(20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
              }
            `}</style>
        </section>
    );
};

export default GallerySection;
