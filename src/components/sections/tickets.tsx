import React from 'react';

const ticketTiers = [
  {
    name: "Adult",
    price: "25",
    description: "Full festival access for individuals.",
    features: [
      "Full festival access    both zones",
      "All shows & competitions",
      "Food truck zone",
      "Giveaway bag"
    ]
  },
  {
    name: "Pet Owner",
    price: "50",
    description: "Complete package including pet entry.",
    features: [
      "Full festival access",
      "Pet entry (max 2 dogs)",
      "Competition eligibility",
      "Premium giveaway bag"
    ]
  },
  {
    name: "Kid",
    price: "15",
    description: "Special entry for children under 12 years old.",
    features: [
      "All kids activities",
      "Carnival games",
      "Petting zones",
      "Kids giveaway"
    ]
  }
];

const Tickets = () => {
  return (
    <section className="bg-white py-[120px] md:py-[160px]" id="tickets">
      <div className="container max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F0F0F0] text-black text-[12px] font-semibold uppercase tracking-[0.05em] font-body mb-6">
            Secure Your Spot
          </span>
          <h2 className="text-[32px] sm:text-[48px] md:text-[64px] font-bold leading-[1.1] text-black font-display tracking-tight">
            Ticket Tiers
          </h2>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1150px] mx-auto">
          {ticketTiers.map((tier, index) => (
            <div 
              key={index} 
              className="flex flex-col p-8 md:p-12 rounded-[2rem] border border-[#F0F0F0] bg-[#F9F9F9] text-black transition-all duration-300 hover:scale-[1.02] hover:border-black/20 h-full"
            >
              <h3 className="text-[24px] font-bold mb-2 font-display text-black">
                {tier.name}
              </h3>
              <p className="text-[15px] mb-8 font-body text-[#666666]">
                {tier.description}
              </p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[48px] font-bold tracking-tight font-display text-black">
                  {tier.price}
                </span>
                <span className="text-[18px] font-semibold opacity-70">QAR</span>
              </div>

              <ul className="flex flex-col gap-5 mb-12 flex-grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-[16px] font-medium font-body">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-black" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/tickets"
                className="inline-flex items-center justify-center w-full h-16    rounded-sm  font-bold text-[18px] transition-all active:scale-95 bg-black text-white hover:bg-black/90"
              >
                Purchase
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Tickets;
