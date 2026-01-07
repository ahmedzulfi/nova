import React from 'react';

const EventDetails = () => {
  return (
    <section className="bg-white py-[120px]">
      <div className="container max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          
          {/* Event Overview */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[32px] font-medium text-[#1A1A1A] leading-tight tracking-[-0.02em]">
              Event overview
            </h3>
            <div className="flex flex-col gap-4 text-[18px] leading-[1.6] text-[#1A1A1A]">
              <p className="flex flex-col sm:flex-row sm:gap-1">
                <strong className="font-semibold whitespace-nowrap">Type of event:</strong>
                <span>Night Ride.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-1">
                <strong className="font-semibold whitespace-nowrap">Distance options:</strong>
                <span>15km, 30km, and 45km.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-1">
                <strong className="font-semibold whitespace-nowrap">Difficulty level:</strong>
                <span>Beginner to Intermediate.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-1">
                <strong className="font-semibold whitespace-nowrap">Terrain:</strong>
                <span>Urban streets, bike paths, underpasses, and bridges.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-1">
                <strong className="font-semibold whitespace-nowrap">Participants:</strong>
                <span>Over 700 cyclists, including night-ride veterans and first-timers.</span>
              </p>
              <p className="mt-2 text-[#1A1A1A]">
                This event blended cycling culture with urban nightlife, offering a unique experience filled with energy and community.
              </p>
            </div>
          </div>

          {/* Schedule */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[32px] font-medium text-[#1A1A1A] leading-tight tracking-[-0.02em]">
              Schedule
            </h3>
            <div className="flex flex-col gap-4 text-[18px] leading-[1.6] text-[#1A1A1A]">
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="font-semibold whitespace-nowrap">6:00 PM:</strong>
                <span>Check-in and gear-up zone opens.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="font-semibold whitespace-nowrap">7:00 PM:</strong>
                <span>DJ set & safety briefing.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="font-semibold whitespace-nowrap">7:30 PM:</strong>
                <span>Start for 45km route.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="font-semibold whitespace-nowrap">8:00 PM:</strong>
                <span>Start for 30km route.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="font-semibold whitespace-nowrap">8:30 PM:</strong>
                <span>Start for 15km route.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="font-semibold whitespace-nowrap">9:00 PM – 11:30 PM:</strong>
                <span>Neon checkpoints, live street performers, snack stops.</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:gap-2">
                <strong className="font-semibold whitespace-nowrap">12:00 AM:</strong>
                <span>After-ride hangout and night market.</span>
              </p>
            </div>
          </div>

          {/* Route Details */}
          <div className="flex flex-col gap-6 overflow-hidden">
            <h3 className="text-[32px] font-medium text-[#1A1A1A] leading-tight tracking-[-0.02em]">
              Route details
            </h3>
            <div className="flex flex-col gap-6 text-[18px] leading-[1.6] text-[#1A1A1A]">
              <div className="flex flex-col gap-4">
                <p>Each route was mapped to highlight the energy and architecture of the city at night:</p>
                <ul className="list-none flex flex-col gap-4">
                  <li className="flex flex-col sm:flex-row sm:gap-1">
                    <strong className="font-semibold whitespace-nowrap">15km Route:</strong>
                    <span>Smooth, well-lit city loop perfect for beginners and casual riders.</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:gap-1">
                    <strong className="font-semibold whitespace-nowrap">30km Route:</strong>
                    <span>A balanced ride through key urban zones and vibrant districts.</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:gap-1">
                    <strong className="font-semibold whitespace-nowrap">45km Route:</strong>
                    <span>A deeper dive into the city’s rhythm — bridges, skyline views, and fast flats.</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-[20px] font-semibold text-[#1A1A1A]">What participants enjoyed</h4>
                <div className="flex flex-col gap-3">
                  <p><strong className="font-semibold">LED-lit checkpoints</strong> with music, snacks, and photo ops.</p>
                  <p><strong className="font-semibold">Ride marshals:</strong> Ensuring safety and smooth flow across busy intersections.</p>
                  <p><strong className="font-semibold">Glow-up stations:</strong> Temporary tattoos, bike light kits, and reflective art before the ride.</p>
                  <p><strong className="font-semibold">Urban after-party:</strong> Food trucks, live music, and chill-out zones post-ride.</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-[20px] font-semibold text-[#1A1A1A]">Highlights</h4>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  <li>The city skyline lit up behind hundreds of glowing riders.</li>
                  <li>Spontaneous dance breaks at neon checkpoints.</li>
                  <li>New riders discovered a new side of their city — fast, alive, and open after dark.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-[20px] font-semibold text-[#1A1A1A]">Awards and recognition</h4>
                <p className="text-[#1A1A1A]">
                  Best lit rider for standout bike lighting. Night owl award for most energy at the finish line. Team glow recognition for the brightest coordinated group.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;