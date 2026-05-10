'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const AboutSchedule = () => {
  const [activeDay, setActiveDay] = useState(1);

  const schedule = {
    day1: {
      date: "Friday, Nov 27, 2026",
      events: [
        { time: "10:00 AM", title: "Gates Open & Welcome", desc: "Festival opens    collect your passport and giveaway bag at the entrance." },
        { time: "10:30 AM", title: "Opening Ceremony", desc: "Grand opening on the Main Stage with mascot reveal and sponsor introductions." },
        { time: "11:00 AM", title: "Best Dog Show    Round 1", desc: "WKU international judges evaluate Puppy and Youth classes in the Dog Arena." },
        { time: "11:00 AM", title: "Cat Drawing Battle    Session 1", desc: "Live creative battle in the Cat Dome    artists compete in real-time." },
        { time: "12:30 PM", title: "Dog Fashion Show", desc: "Owners and dogs strut the runway in matching themed outfits." },
        { time: "1:00 PM", title: "Lunch Break & Food Trucks", desc: "Enjoy cuisine from 6 food trucks across both zones." },
        { time: "2:00 PM", title: "Grooming Competition", desc: "Professional groomers showcase precision trimming and styling." },
        { time: "3:00 PM", title: "Best Cat Show    Round 1", desc: "WCF international judges evaluate cats inside the Cat Dome." },
        { time: "4:00 PM", title: "Painting Competition", desc: "Live painting session with artworks projected across the Cat Dome walls." },
        { time: "5:30 PM", title: "Carnival Games & Activities", desc: "Fetch & Win, Spin-A-Treat, Paw Shot Challenge, and more." },
        { time: "7:00 PM", title: "Day 1 Awards Ceremony", desc: "Champion cups, medals, and certificates presented on the Main Stage." }
      ]
    },
    day2: {
      date: "Saturday, Nov 28, 2026",
      events: [
        { time: "10:00 AM", title: "Gates Open", desc: "Second day kicks off with new competitions and activities." },
        { time: "10:30 AM", title: "Best Dog Show    Round 2", desc: "Adult class judging and Best in Show finale by WKU judges." },
        { time: "11:00 AM", title: "Cat Drawing Battle    Session 2", desc: "Second round of the live creative drawing battle." },
        { time: "12:00 PM", title: "Best Cat Show    Round 2", desc: "WCF judges select the Best Cat of Show." },
        { time: "1:00 PM", title: "Lunch Break & Food Trucks", desc: "Enjoy cuisine from 6 food trucks across both zones." },
        { time: "2:00 PM", title: "Dog Fashion Show    Day 2", desc: "New contestants take the runway with their dogs." },
        { time: "3:00 PM", title: "Grooming Competition    Day 2", desc: "Second round of professional grooming artistry." },
        { time: "4:00 PM", title: "Painting Competition    Day 2", desc: "New artists create live works in the Cat Dome." },
        { time: "5:00 PM", title: "Adoption & Vet Zone", desc: "Final chance to visit QAWS, Paws Rescue, and NovaVet booths." },
        { time: "6:30 PM", title: "Grand Closing Ceremony", desc: "Final awards, Best in Show, Best Cat of Show, and closing celebration." }
      ]
    }
  };

  const currentEvents = activeDay === 1 ? schedule.day1.events : schedule.day2.events;

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1350px]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-x-32 items-start">
          
          {/* Left Column: Sticky Navigation */}
          <div className="flex flex-col gap-8 md:sticky md:top-32">
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E6E6E6] text-black text-[12px] font-semibold uppercase tracking-[0.05em] font-body">
                Program Preview
              </span>
            </div>
            
            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 no-scrollbar">
              <button 
                onClick={() => setActiveDay(1)}
                className={`text-left px-6 py-4    rounded-sm  transition-all duration-300 min-w-[200px] md:min-w-0 ${
                  activeDay === 1 ? 'bg-primary text-black' : 'bg-[#F9F9F9] text-black hover:bg-black/5'
                }`}
              >
                <span className="block text-[14px] uppercase tracking-wider font-semibold opacity-60 mb-1">
                  Day 01
                </span>
                <span className="block text-[18px] font-bold font-display leading-[1.2]">
                  November 27, 2026
                </span>
              </button>
              <button 
                onClick={() => setActiveDay(2)}
                className={`text-left px-6 py-4    rounded-sm  transition-all duration-300 min-w-[200px] md:min-w-0 ${
                  activeDay === 2 ? 'bg-primary text-black' : 'bg-[#F9F9F9] text-black hover:bg-black/5'
                }`}
              >
                <span className="block text-[14px] uppercase tracking-wider font-semibold opacity-60 mb-1">
                  Day 02
                </span>
                <span className="block text-[18px] font-bold font-display leading-[1.2]">
                  November 28, 2026
                </span>
              </button>
            </div>

          </div>

          {/* Right Column: Events List */}
          <div className="flex flex-col mt-12 md:mt-0">
            <h2 className="text-[40px] md:text-[72px]   font-bold  leading-[0.95] text-black mb-12 font-display tracking-tighter">
              Explore the <br className="hidden md:block" /> Festival Schedule
            </h2>
            
            <div className="flex flex-col relative min-h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  {currentEvents.map((item, index) => (
                    <div 
                      key={index} 
                      className={`py-10 group ${index !== 0 ? 'border-t border-black/5' : ''}`}
                    >
                      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-16">
                        <span className="text-[18px]   font-bold  text-primary min-w-[100px] font-display">
                          {item.time}
                        </span>
                        <div className="flex flex-col gap-3">
                          <h4 className="text-[24px] md:text-[32px]   font-bold  text-black font-display leading-[1.2] group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h4>
                          <p className="text-[16px] md:text-[18px] leading-[1.6] text-black/50 max-w-[620px] font-body">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-16 pt-12 border-t border-black/5">
              <a
                className="inline-flex items-center justify-center px-10 py-5 bg-black text-white rounded-full font-bold text-[18px] transition-all hover:bg-black/90 active:scale-95 shadow-xl shadow-black/10"
                href="/tickets"
              >
                Get Your Tickets Now
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSchedule;
