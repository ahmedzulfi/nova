"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2 } from 'lucide-react';

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
        <section id="gallery" className="bg-white py-20 lg:py-32 overflow-hidden relative">
            <div className="container mx-auto px-6 max-w-[1280px]">
                {/* Category Selection */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-full text-[15px] font-bold transition-all duration-300 ${activeCategory === cat
                                ? 'bg-primary text-white'
                                : 'bg-[#F3F3F3] text-black hover:bg-[#E6E6E6]'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid - Masonry-like CSS columns */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {filteredImages.map((image, idx) => (
                        <div
                            key={idx}
                            className="relative break-inside-avoid overflow-hidden rounded-[32px] group cursor-pointer"
                            onClick={() => setSelectedImage(image.url)}
                        >
                            <div className={`${image.aspect} relative w-full`}>
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                                    <Maximize2 className="w-6 h-6 text-black" />
                                </div>
                            </div>

                            {/* Info Label */}
                            <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <span className="bg-white/90 backdrop-blur-md text-black text-[12px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    {image.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-in fade-in duration-300 p-4">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors border border-white/20"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative w-full max-w-[1200px] aspect-video">
                        <Image
                            src={selectedImage}
                            alt="Full View"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default GallerySection;
