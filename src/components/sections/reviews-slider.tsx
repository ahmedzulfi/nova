import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';

/**
 * ReviewsSlider Component
 * 
 * A clean, centered scrolling section of testimonials for the Cyclix brand.
 * Matches the pixel-perfect requirements from the design instructions and screenshots.
 */

interface Review {
  id: number;
  content: string;
  author: string;
  role?: string;
  avatar: string;
  rating: number;
  isActive?: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    content: "“The cyclix event exceeded all expectations! The route was well-planned, scenic, and challenging in the best way. Riding alongside passionate cyclists was inspiring. I can’t wait to join again next year!”",
    author: "Wade Warren",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/C5Jc0Hp3z1DXuXzeeIZpL1ERNCc-18.jpg",
    rating: 5,
    isActive: false
  },
  {
    id: 2,
    content: "Beautiful rides, great people, and top-notch vibes - an unforgettable, well-organized event with amazing energy, scenic views, and support that kept me going strong!",
    author: "Arlene McCoy",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/Jqayfjs2tuO7Zr58zNE6U1qsQ-19.jpg",
    rating: 5,
    isActive: true
  },
  {
    id: 3,
    content: "The perfect blend of challenge and community: tough climbs, great connections, breathtaking scenery, shared laughs, inspiring stories, and an epic, unforgettable finish!",
    author: "Leslie Alex",
    avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/7ckekOZAa0J28C2T3IfYTvNDv5U-20.jpg",
    rating: 5,
    isActive: false
  },
];

const StarRating = ({ count, active = true }: { count: number; active?: boolean }) => {
  return (
    <div className="flex gap-1 mb-8">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${active ? 'fill-current text-black' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

export default function ReviewsSlider() {
  return (
    <section className="py-[160px] bg-white overflow-hidden">
      <div className="container mx-auto px-10">
        <div className="flex flex-col items-center mb-12">
          <span className="badge-label mb-8 bg-[#f3f3f3] text-[#666666] px-4 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wider">
            Most recent reviews
          </span>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`flex flex-col items-center text-center transition-opacity duration-300 ${review.isActive ? 'opacity-100 scale-100' : 'opacity-30 scale-[0.9]'
                  }`}
              >
                {/* Stars */}
                <StarRating count={review.rating} active={review.isActive} />

                {/* Review Text */}
                <blockquote
                  className={`font-display font-semibold transition-all duration-300 ${review.isActive
                      ? 'text-[24px] leading-[1.3] text-[#111111] max-w-[540px]'
                      : 'text-[18px] leading-[1.5] text-[#666666] max-w-[400px]'
                    }`}
                >
                  {review.content}
                </blockquote>

                {/* Author Info */}
                <div className="mt-10 flex flex-col items-center">
                  <div className="relative w-[56px] h-[56px] mb-4 rounded-xl overflow-hidden grayscale">
                    <Image
                      src={review.avatar}
                      alt={review.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <cite className="not-italic font-display font-semibold text-[16px] text-[#111111]">
                    {review.author}
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}