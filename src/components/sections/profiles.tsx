import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

/**
 * ProfilesSection Component
 * 
 * A pixel-perfect clone of the "For who" section with three categories:
 * - Cyclists of all levels
 * - Families and recreational riders
 * - Health and fitness enthusiasts
 * 
 * Features centered text and surrounding small rounded-corner action images of cyclists.
 */
const ProfilesSection: React.FC = () => {
  return (
    <section className="py-[120px] bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1280px]">
          {/* Section Label */}
          <div className="flex justify-center mb-12">
            <span className="bg-[#E6E6E6] text-black text-[12px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
              Festival Zone
            </span>
          </div>

          {/* Content Grid */}
          <div className="relative">
            {/* Main Content Rows */}
            <div className="flex flex-col items-center gap-12 text-center max-w-[800px] mx-auto">
              
              {/* Category 1 */}
              <div className="flex flex-col items-center border-b border-[#E6E6E6] pb-12 w-full last:border-b-0">
                <h2 className="text-[32px] md:text-[56px] font-semibold text-black leading-[1.2] mb-4 font-display">
                  Best Cat Show & Fashion Show
                </h2>
                <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[600px] font-body">
                  Witness the elegance of various breeds as they compete for the Best Cat title and strut their stuff in the feline fashion show.
                </p>
              </div>

              {/* Category 2 */}
              <div className="flex flex-col items-center border-b border-[#E6E6E6] pb-12 w-full last:border-b-0">
                <h2 className="text-[32px] md:text-[56px] font-semibold text-black leading-[1.2] mb-4 font-display">
                  Drawing Cat Battle
                </h2>
                <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[600px] font-body">
                  A unique interactive experience where art meets feline grace. Watch live drawing competitions inspired by our beautiful cats.
                </p>
              </div>

              {/* Category 3 */}
              <div className="flex flex-col items-center pb-12 w-full">
                <h2 className="text-[32px] md:text-[56px] font-semibold text-black leading-[1.2] mb-4 font-display">
                  Cat Dome Experience
                </h2>
                <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[600px] font-body">
                  Step into a dedicated space designed specifically for cats and their owners to relax, play, and learn in a serene environment.
                </p>
              </div>
              
            </div>

            {/* Surrounding Images - Positioned relative to the container based on desktop layout */}
            <div className="hidden lg:block">
              {/* Top Left Image */}
              <div className="absolute -left-10 top-20 w-[180px] h-[180px] rounded-[32px] overflow-hidden shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop" 
                  alt="Cat Show" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top Right Image */}
              <div className="absolute -right-10 top-40 w-[180px] h-[220px] rounded-[32px] overflow-hidden shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1573865662567-57ef7b73392a?q=80&w=1915&auto=format&fit=crop" 
                  alt="Elegant Cat" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Left Image */}
              <div className="absolute -left-4 bottom-10 w-[180px] h-[200px] rounded-[32px] overflow-hidden shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop" 
                  alt="Cat Fashion" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Right Image */}
              <div className="absolute -right-4 bottom-20 w-[180px] h-[160px] rounded-[32px] overflow-hidden shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=1935&auto=format&fit=crop" 
                  alt="Cat Play" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Mobile Display of Images (Simplified grid) */}
            <div className="grid grid-cols-2 gap-4 lg:hidden mt-12 mb-16">
              <img 
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop" 
                alt="Cat Show" 
                className="w-full aspect-square rounded-[24px] object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1573865662567-57ef7b73392a?q=80&w=1915&auto=format&fit=crop" 
                alt="Elegant Cat" 
                className="w-full aspect-square rounded-[24px] object-cover"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-12">
            <a
              href="/registration"
              className="group flex items-center justify-between bg-[#F7F56D] hover:bg-[#FFF98F] text-black font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ fontSize: '16px' }}
            >
              <span>Register your cat</span>
              <div className="ml-3 bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </div>
            </a>
          </div>
      </div>
    </section>
  );
};

export default ProfilesSection;