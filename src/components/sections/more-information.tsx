import React from 'react';

const MoreInformation = () => {
  return (
    <section className="bg-white py-[120px] relative">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col gap-24">
          
            {/* Section: Event Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 lg:sticky lg:top-[110px] self-start">
                  <h2 className="text-[48px] font-medium leading-[1.1] text-[#1c1c1c] tracking-[-0.02em]">
                    Event overview
                  </h2>
                </div>
              <div className="lg:col-span-2">
                <div className="flex flex-col gap-4 text-[18px] leading-[1.6] text-[#1c1c1c]">
                  <p>
                    <span className="font-semibold">Type of event:</span> Night Ride.
                  </p>
                  <p>
                    <span className="font-semibold">Distance options:</span> 15km, 30km, and 45km.
                  </p>
                  <p>
                    <span className="font-semibold">Difficulty level:</span> Beginner to Intermediate.
                  </p>
                  <p>
                    <span className="font-semibold">Terrain:</span> Urban streets, bike paths, underpasses, and bridges.
                  </p>
                  <p>
                    <span className="font-semibold">Participants:</span> Over 700 cyclists, including night-ride veterans and first-timers.
                  </p>
                  <p className="mt-4">
                    This event blended cycling culture with urban nightlife, offering a unique experience filled with energy and community.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 lg:sticky lg:top-[110px] self-start">
                <h2 className="text-[48px] font-medium leading-[1.1] text-[#1c1c1c] tracking-[-0.02em]">
                  Schedule
                </h2>
              </div>
              <div className="lg:col-span-2">
                <div className="flex flex-col gap-4 text-[18px] leading-[1.6] text-[#1c1c1c]">
                  <p>
                    <span className="font-semibold">6:00 PM:</span> Check-in and gear-up zone opens.
                  </p>
                  <p>
                    <span className="font-semibold">7:00 PM:</span> DJ set & safety briefing.
                  </p>
                  <p>
                    <span className="font-semibold">7:30 PM:</span> Start for 45km route.
                  </p>
                  <p>
                    <span className="font-semibold">8:00 PM:</span> Start for 30km route.
                  </p>
                  <p>
                    <span className="font-semibold">8:30 PM:</span> Start for 15km route.
                  </p>
                  <p>
                    <span className="font-semibold">9:00 PM – 11:30 PM:</span> Neon checkpoints, live street performers, snack stops.
                  </p>
                  <p>
                    <span className="font-semibold">12:00 AM:</span> After-ride hangout and night market.
                  </p>
                </div>
              </div>
            </div>

            {/* Section: Route Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 lg:sticky lg:top-[110px] self-start">
                <h2 className="text-[48px] font-medium leading-[1.1] text-[#1c1c1c] tracking-[-0.02em]">
                  Route details
                </h2>
              </div>
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-8 text-[18px] leading-[1.6] text-[#1c1c1c]">
                <div className="flex flex-col gap-4">
                  <p>
                    Each route was mapped to highlight the energy and architecture of the city at night:
                  </p>
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    <li>
                      <span className="font-semibold">15km Route:</span> Smooth, well-lit city loop perfect for beginners and casual riders.
                    </li>
                    <li>
                      <span className="font-semibold">30km Route:</span> A balanced ride through key urban zones and vibrant districts.
                    </li>
                    <li>
                      <span className="font-semibold">45km Route:</span> A deeper dive into the city’s rhythm — bridges, skyline views, and fast flats.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.01em]">
                    What participants enjoyed
                  </h3>
                  <div className="flex flex-col gap-2">
                    <p><span className="font-semibold">LED-lit checkpoints</span> with music, snacks, and photo ops.</p>
                    <p><span className="font-semibold">Ride marshals:</span> Ensuring safety and smooth flow across busy intersections.</p>
                    <p><span className="font-semibold">Glow-up stations:</span> Temporary tattoos, bike light kits, and reflective art before the ride.</p>
                    <p><span className="font-semibold">Urban after-party:</span> Food trucks, live music, and chill-out zones post-ride.</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.01em]">
                    Highlights
                  </h3>
                  <ul className="list-disc pl-5 flex flex-col gap-2">
                    <li>The city skyline lit up behind hundreds of glowing riders.</li>
                    <li>Spontaneous dance breaks at neon checkpoints.</li>
                    <li>New riders discovered a new side of their city — fast, alive, and open after dark.</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.01em]">
                    Awards and recognition
                  </h3>
                  <p>
                    Best lit rider for standout bike lighting. Night owl award for most energy at the finish line. Team glow recognition for the brightest coordinated group.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MoreInformation;
