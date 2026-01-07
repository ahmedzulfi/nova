import React from 'react';
import Image from 'next/image';

interface EventCardProps {
  month: string;
  day: string;
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
}

const EventCard: React.FC<EventCardProps> = ({ month, day, title, description, imageUrl, href = "#" }) => {
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
          <div className="bg-brand-yellow w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
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

const EventsGrid: React.FC = () => {
  const events: EventCardProps[] = [
    {
      month: "Dec",
      day: "21",
      title: "Mountain Trail Challenge",
      description: "Tackle breathtaking climbs and thrilling descents on rugged mountain trails designed to test your endurance and skill.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/0QOpgrXjv1xzT8rg51xxK4fckI-7.jpg"
    },
    {
      month: "Oct",
      day: "15",
      title: "Scenic Coastal Ride",
      description: "A picturesque ride along serene coastlines, perfect for enjoying the beauty of nature and unwinding with fellow cyclists.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/RZSowN64EH0KYEEJLGC2ozMbAA-8.jpg"
    },
    {
      month: "Sep",
      day: "29",
      title: "Urban Night",
      description: "Experience the city in a new light with an illuminated night ride through vibrant streets and iconic landmarks.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/YMFIn97OUJJLFQjNRbPJFQgfumQ-9.jpg"
    },
    {
      month: "Jul",
      day: "24",
      title: "Charity Ride for Change",
      description: "Join a meaningful ride to raise funds and awareness for important causes while building community spirit.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/Bcf5Gg9hHWetqq03P8WyoHr99kk-10.jpg"
    },
    {
      month: "Jul",
      day: "28",
      title: "Cycling Festival & Expo",
      description: "A full day of cycling events, including group rides, skill workshops, and a showcase of the latest gear and technology.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/qShIPpfSXovUHE9Skw8wPVwlkA-11.jpg"
    },
    {
      month: "July",
      day: "19",
      title: "Ultimate Cycling Adventure",
      description: "This exciting day promises breathtaking routes, invigorating challenges, and a vibrant community atmosphere.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/acAU2tNfy8IKVUrYwgSUTv7b8-12.jpg"
    }
  ];

  return (
    <section className="bg-white py-[120px]">
      <div className="container px-6 mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6">
          {events.map((event, index) => (
            <EventCard
              key={index}
              month={event.month}
              day={event.day}
              title={event.title}
              description={event.description}
              imageUrl={event.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;