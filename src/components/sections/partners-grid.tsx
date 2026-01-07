"use client";

import React, { useState } from "react";
import Image from "next/image";

const partners = [
  {
    name: "Logoipsum 1",
    logo: "https://framerusercontent.com/images/gstxLSiknmmGSvWzmXPPUxFz8Kk.svg", // Fallback to a logo found in assets
    // Since specific logo assets aren't in the provided asset list, we use the logoipsum SVGs as placeholders
    // or the primary brand logo provided. However, the design instructions specify "Logoipsum" partner logos.
    // I will use generic text-based placeholders for the logos to match the visual style of the grid.
    placeholder: "Logoipsum",
    type: "partner",
  },
  {
    name: "Logoipsum 2",
    logo: "",
    placeholder: "Logoipsum",
    type: "partner",
  },
  {
    name: "Logoipsum 3",
    logo: "",
    placeholder: "Logoipsum",
    type: "partner",
  },
  {
    name: "Logoipsum 4",
    logo: "",
    placeholder: "Logoipsum",
    type: "partner",
  },
  {
    name: "Logoipsum 5",
    logo: "",
    placeholder: "Logoipsum",
    type: "partner",
  },
  {
    name: "Logoipsum 6",
    logo: "",
    placeholder: "Logoipsum",
    type: "partner",
  },
];

const categories = [
  { id: "partners", label: "Partners" },
  { id: "charity", label: "Charity" },
  { id: "hardware", label: "Hardware" },
];

export default function PartnersGrid() {
  const [activeTab, setActiveTab] = useState("partners");

  return (
    <section className="py-[160px] bg-white">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 min-h-[500px] border border-[#E5E5E5] rounded-[32px] overflow-hidden">
          {/* Left Content Column */}
          <div className="lg:col-span-5 p-10 md:p-14 border-b md:border-b-0 md:border-r border-[#E5E5E5] flex flex-col justify-between">
            <div>
              {/* Tabbed Categories */}
              <div className="flex flex-wrap gap-2 mb-12">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`px-6 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 ${
                      activeTab === category.id
                        ? "bg-[#F7F58E] text-[#111111]"
                        : "bg-[#FEFFD4] text-[#111111] opacity-70 hover:opacity-100"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Introductory Text */}
              <div className="max-w-[400px] mt-auto">
                <h3 className="text-[24px] leading-[1.3] font-display font-semibold mb-6 text-[#111111]">
                  Discover the trusted network that powers our mission
                </h3>
                <p className="text-[16px] leading-[1.6] text-[#666666]">
                  From esteemed partners and impactful charitable collaborations
                  to cutting-edge hardware solutions, we work together to
                  elevate every aspect of your experience while making a
                  difference.
                </p>
              </div>
            </div>
          </div>

          {/* Right Grid Column */}
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-center p-8 border-b border-r last:border-r-0 border-[#E5E5E5] ${
                  idx >= 4 ? "lg:border-b-0" : ""
                } ${idx % 3 === 2 ? "lg:border-r-0" : ""} ${
                  idx % 2 === 1 ? "md:border-r-0 lg:border-r" : ""
                } min-h-[180px] hover:bg-[#F9F9F9] transition-colors`}
              >
                {/* Logo Placeholder - Implementing visual match for Logoipsum */}
                <div className="flex items-center gap-2 grayscale opacity-80 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    {/* Simplified geometric representation of logoipsum marks */}
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="flex items-center justify-center">
                          {idx === 0 ? (
                            <div className="border-l-2 border-t-2 border-[#111111] w-4 h-4" />
                          ) : idx === 1 ? (
                            <div className="rounded-full bg-[#111111] w-5 h-5" />
                          ) : idx === 2 ? (
                            <div className="border-2 border-[#111111] rounded-full w-5 h-5 flex items-center justify-center">
                              <div className="w-2 h-2 bg-[#111111] rounded-full" />
                            </div>
                          ) : idx === 3 ? (
                            <div className="flex items-end gap-0.5 h-6">
                              <div className="w-1.5 h-6 bg-[#111111]" />
                              <div className="w-1.5 h-4 bg-[#111111]" />
                              <div className="w-1.5 h-6 bg-[#111111]" />
                            </div>
                          ) : idx === 4 ? (
                            <div className="w-6 h-6 rounded-full border-4 border-[#111111] flex items-center justify-center">
                              <div className="w-2 h-2 bg-[#111111] rounded-full" />
                            </div>
                          ) : idx === 5 ? (
                            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[18px] border-b-[#111111]" />
                          ) : null}
                        </div>
                      </div>

                    <span className="font-display font-bold text-[20px] tracking-tight text-[#111111]">
                      Logoipsum
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}