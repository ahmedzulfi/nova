import React from 'react';
import { Trophy, Medal, FileCheck } from 'lucide-react';

const AwardsSection = () => {
  const awards = [
    {
      title: "Champion Cups",
      count: "48 Cups Total",
      desc: "16 Gold, 16 Silver, 16 Rose across all competitions and both days.",
      icon: <Trophy className="w-10 h-10 text-primary" />,
      color: "bg-primary/5"
    },
    {
      title: "Medals",
      count: "32 Medals",
      desc: "Awarded for 4th and 5th place finishers in the Silver and Rose categories.",
      icon: <Medal className="w-10 h-10 text-accent" />,
      color: "bg-accent/5"
    },
    {
      title: "Certificates",
      count: "For All Competitors",
      desc: "Official WKU/WCF certificates of participation for everyone who competes.",
      icon: <FileCheck className="w-10 h-10 text-black" />,
      color: "bg-black/5"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-[1280px]">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-primary font-bold uppercase tracking-widest text-[14px] mb-4 block">Victory & Recognition</span>
          <h2 className="text-[40px] md:text-[64px] font-display   font-bold  text-black tracking-tighter">Awards & Prizes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div 
              key={index} 
              className={`p-10 rounded-[2.5rem] ${award.color} border border-transparent hover:border-black/5 transition-all duration-300 group flex flex-col items-center text-center`}
            >
              <div className="mb-8 p-6 bg-white    rounded-sm  shadow-sm group-hover:scale-110 transition-transform duration-500">
                {award.icon}
              </div>
              <h3 className="text-[28px] font-display   font-bold  text-black mb-2">{award.title}</h3>
              <span className="text-primary font-bold text-[18px] mb-6 block">{award.count}</span>
              <p className="text-[16px] text-black/60 font-body leading-relaxed max-w-[300px]">
                {award.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
