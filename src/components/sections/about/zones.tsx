import React from 'react';
import Image from 'next/image';
import { 
  Mic2, 
  Dog, 
  Cat, 
  HeartPulse, 
  Heart, 
  ShoppingBag, 
  Gamepad2, 
  Utensils, 
  Camera,
  ArrowUpRight
} from 'lucide-react';

const AboutZones = () => {
  const zones = [
    {
      title: "Main Stage",
      icon: <Mic2 className="w-6 h-6 text-primary" />,
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
      items: [
        "Live entertainment, performances, and experiences",
        "Competitions, fashion shows, and ceremonies",
        "Educational vet talks and engagement"
      ],
      emoji: "🎤"
    },
    {
      title: "Dog Arena",
      icon: <Dog className="w-6 h-6 text-accent" />,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
      items: [
        "International canine competitions and showcases",
        "Professional dog demonstrations and agility",
        "Safe and exciting experiences for dogs"
      ],
      emoji: "🐕"
    },
    {
      title: "Cat Tent",
      icon: <Cat className="w-6 h-6 text-black" />,
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop",
      items: [
        "Cat competitions and drawing battles",
        "Cat fashion activities and entertainment",
        "Comfortable indoor environment for cats"
      ],
      emoji: "🐱"
    },
    {
      title: "Vet & Wellness",
      icon: <HeartPulse className="w-6 h-6 text-primary" />,
      image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=2070&auto=format&fit=crop",
      items: [
        "Free veterinary consultations and guidance",
        "Health awareness and educational support",
        "Professional support for pet owners"
      ],
      emoji: "🏥"
    },
    {
      title: "Adoption Zone",
      icon: <Heart className="w-6 h-6 text-accent" />,
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2000&auto=format&fit=crop",
      items: [
        "Meet rescue organizations (QAWS, Paws Rescue)",
        "Awareness activities supporting rescue",
        "Connecting visitors with animals in need"
      ],
      emoji: "🐾"
    },
    {
      title: "Pet Market",
      icon: <ShoppingBag className="w-6 h-6 text-black" />,
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop",
      items: [
        "Pet accessories, lifestyle products, and treats",
        "Explore unique brands and merchandise",
        "Interactive shopping for pet lovers"
      ],
      emoji: "🛍️"
    },
    {
      title: "Kids Zone",
      icon: <Gamepad2 className="w-6 h-6 text-primary" />,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/6e/e7/92/kidz-klub-danbury-toddler.jpg?w=900&h=500&s=1",
      items: [
        "Family-friendly games and creative fun",
        "Interactive activities designed for children",
        "Entertainment, crafts, and challenges"
      ],
      emoji: "🎪"
    },
    {
      title: "Food Trucks",
      icon: <Utensils className="w-6 h-6 text-accent" />,
      image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=2070&auto=format&fit=crop",
      items: [
        "Variety of food and beverage experiences",
        "Relax, dine, and enjoy the festival vibes",
        "Outdoor social space with entertainment"
      ],
      emoji: "🍔"
    },
    {
      title: "Photo Zone",
      icon: <Camera className="w-6 h-6 text-black" />,
      image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=2070&auto=format&fit=crop",
      items: [
        "Interactive photo opportunities and installs",
        "Meet mascots and capture themed moments",
        "Designed for social sharing and memories"
      ],
      emoji: "📸"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white" id="zones">
      <div className="container mx-auto px-6 max-w-[1350]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-[700px]">
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-[12px] mb-6 block">Festival Geography</span>
            <h2 className="text-[40px] md:text-[72px] font-display   font-bold  text-black tracking-tighter leading-[0.95]">
              Explore the <br className="hidden md:block" /> Festival Zones
            </h2>
          </div>
          <p className="text-[18px] text-black/50 font-body max-w-[400px]">
            Discover 9 specialized zones at The Pearl Island, each designed for maximum engagement, safety, and fun.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zones.map((zone, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col h-full bg-[#F9F9F9] rounded-sm overflow-hidden border border-black/5 transition-all duration-500 hover:shadow-sm hover:shadow-black/10 hover:-translate-y-1"
            >
              {/* Image Header */}
              <div className="relative h-[240px] w-full overflow-hidden">
                <Image
                  src={zone.image}
                  alt={zone.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between">
                  <h3 className="text-[28px] font-display   font-bold  text-white leading-tight tracking-tight">
                    {zone.title}
                  </h3>
                  <div className="w-12 h-12    rounded-sm  bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    {zone.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8">
                  {zone.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[14px] md:text-[15px] text-black/60 font-body leading-relaxed group-hover:text-black transition-colors">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/30 flex-shrink-0 group-hover:bg-primary transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[20px] grayscale group-hover:grayscale-0 transition-all duration-500">{zone.emoji}</span>
                  <div className="flex items-center gap-2 text-primary   font-bold  uppercase tracking-widest text-[11px] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    Explore Zone <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutZones;
