import React from 'react';

const TeamHero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-[140px] pb-[70px] md:pt-[140px] md:pb-[80px]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          {/* Headline H1 */}
          <h1 
            className="font-bold text-foreground tracking-[-0.04em] mb-6"
            style={{
              fontSize: 'clamp(48px, 8vw, 80px)',
              lineHeight: '1.1',
            }}
          >
            Our team
          </h1>
          
          {/* Descriptive Paragraph */}
          <p 
            className="text-[#666666] font-normal"
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              maxWidth: '640px',
            }}
          >
            We are a group of passionate cycling enthusiasts, industry professionals, and adventure seekers committed to making every ride exceptional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TeamHero;