import React from 'react';
import Image from 'next/image';

interface BlogCardProps {
  month: string;
  day: string;
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ month, day, title, description, imageUrl, href = "#" }) => {
  return (
    <a
      href={href}
      className="group flex flex-col bg-white overflow-hidden transition-all duration-300"
    >
      <div className="flex flex-col p-6 lg:p-10 border border-brand-border border-b-0 rounded-t-[1.5rem]">
        <div className="flex items-start mb-6">
          <div className="flex flex-col items-start pr-6 border-r border-brand-border mr-6 shrink-0 min-w-[60px]">
            <span className="text-[14px] font-medium uppercase text-brand-gray tracking-wider leading-none mb-1">
              {month}
            </span>
            <span className="text-[28px] font-semibold text-brand-black leading-none">
              {day}
            </span>
          </div>
          <h5 className="text-[24px] lg:text-[32px] font-semibold leading-[1.2] text-brand-black group-hover:text-brand-black transition-colors">
            {title}
          </h5>
        </div>
        <p className="text-[18px] leading-[1.6] text-brand-gray line-clamp-3">
          {description}
        </p>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-b-[1.5rem] border border-brand-border">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover Arrow Overlay */}
        <div className="absolute top-6 right-6 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand-black"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

const BlogGrid: React.FC = () => {
  const posts: BlogCardProps[] = [
    {
      month: "Mar",
      day: "15",
      title: "Preparing Your Pet for Festival Crowds",
      description: "Learn essential training tips to help your dog or cat stay calm and happy amidst the excitement of Nova Paw Festival.",
      imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
    },
    {
      month: "Mar",
      day: "10",
      title: "The Importance of Pet Hydration in Qatar",
      description: "Keep your furry friends safe and hydrated during the festival with our guide to pet health in the Pearl's climate.",
      imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop"
    },
    {
      month: "Feb",
      day: "28",
      title: "Inside the Cat Dome Experience",
      description: "A sneak peek into the immersive world of the Nova Paw Cat Dome, featuring interactive play zones and relaxation areas.",
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
    },
    {
      month: "Feb",
      day: "14",
      title: "Adoption Stories: Finding Forever Homes",
      description: "Heartwarming success stories from previous local initiatives and what to expect at our festival's adoption center.",
      imageUrl: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2186&auto=format&fit=crop"
    },
    {
      month: "Jan",
      day: "30",
      title: "Best in Show: Training Your Champion",
      description: "Top tips from professional judges on how to prepare your dog for the prestigious international competitions at Pet's Park.",
      imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1988&auto=format&fit=crop"
    },
    {
      month: "Jan",
      day: "15",
      title: "Festival Fashion: The Cutest Trends",
      description: "Explore the latest in pet accessories and fashion as we get ready for the Dog and Cat Fashion Shows.",
      imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-white py-[120px]">
      <div className="container px-6 mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              month={post.month}
              day={post.day}
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
