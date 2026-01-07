"use client";

import React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FAQAccordion Component
 *
 * This component clones the accordion section with four items as specified:
 * - Diverse cycling routes
 * - Professional support
 * - Hydration and nutrition stations
 * - Post-ride amenities
 *
 * Each item features a gray circular plus icon on the right and thin gray borders.
 */

interface AccordionItemProps {
  title: string;
  isLast?: boolean;
}

const AccordionItem = ({ title, isLast }: AccordionItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-[30px] border-t border-[#E6E6E6] cursor-pointer group transition-colors hover:bg-black/[0.02]",
        isLast && "border-b"
      )}
    >
      <h3 className="text-[24px] md:text-[32px] font-semibold text-black tracking-tight font-display">
        {title}
      </h3>
      <div className="flex items-center justify-center w-[44px] h-[44px] rounded-full bg-[#E6E6E6] transition-transform group-hover:scale-110">
        <Plus className="w-5 h-5 text-black" strokeWidth={2.5} />
      </div>
    </div>
  );
};

  export default function FAQAccordion() {
    const accordionData = [
      { title: "International Dog & Cat Shows" },
      { title: "Vet Talks & Workshops" },
      { title: "Pet Adoption Initiatives" },
      { title: "Live Family Entertainment" },
    ];

  return (
    <section className="w-full bg-white py-20 md:py-32">
      <div className="container max-width-[1280px] mx-auto px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col">
            {accordionData.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                isLast={index === accordionData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}