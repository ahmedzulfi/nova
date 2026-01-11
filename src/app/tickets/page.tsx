"use client";

import React from 'react';
import Navigation from "@/components/sections/navigation";
import Footer from "@/components/sections/footer";
import { Button } from "@/components/ui/button";

const ticketPlans = [
    {
        name: "Pet Owners",
        price: "35",
        currency: "QAR",
        description: "Entry for pet owners with their companions. Includes safety check.",
        features: [
            "Valid for 1 Pet + 1 Owner",
            "Pet Passport Required",
            "Full Event Access",
            "Safety Check Included",
        ],
        highlight: true,
    },
    {
        name: "Adults",
        price: "25",
        currency: "QAR",
        description: "General admission for adults and pet enthusiasts.",
        features: [
            "Full Festival Grounds Access",
            "All Live Shows & Music",
            "Workshops & Expert Talks",
            "Shopping & Food Village",
        ],
        highlight: false,
    },
    {
        name: "Kids (Under 12)",
        price: "15",
        currency: "QAR",
        description: "Special entry for children under 12 years old.",
        features: [
            "Unlimited Kids Zone Access",
            "Interactive Pet Sessions",
            "Pet Education Workshops",
            "Festival Keepsake Map",
        ],
        highlight: false,
    },
];

const entryRules = [
    {
        category: "Admission",
        rules: [
            "Tickets must be shown at entrance",
            "Wristbands will be issued at the door",
            "No entry without wristbands"
        ]
    },
    {
        category: "Safety",
        rules: [
            "Pets must be vaccinated",
            "Aggressive behavior may result in removal",
            "Organizers reserve the right to refuse entry"
        ]
    }
];

export default function TicketsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            <section className="pt-32 pb-20 lg:pt-48 lg:pb-40">
                <div className="container mx-auto px-6 max-w-[1280px]">
                    <div className="text-center mb-16 lg:mb-24">
                        <span className="inline-block bg-[#F3F3F3] text-black text-[12px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider mb-8">
                            Ticketing & Entry
                        </span>
                        <h1 className="text-[48px] md:text-[84px] font-bold font-display leading-[1] text-black mb-10 tracking-tight">
                            Secure Your <br className="hidden md:block" /> Festival Access
                        </h1>
                        <p className="text-[18px] md:text-[20px] text-[#666666] leading-[1.6] max-w-[600px] mx-auto font-body">
                            Join us for two days of celebration, competition, and community at The Pearl, Qatar.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {ticketPlans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`flex flex-col p-8 md:p-12 rounded-[40px] border ${plan.highlight
                                    ? "bg-black text-white border-black"
                                    : "bg-[#F9F9F9] text-black border-[#F0F0F0]"
                                    } transition-transform hover:scale-[1.02] duration-300`}
                            >
                                <h3 className="text-[24px] font-bold mb-2 font-display">{plan.name}</h3>
                                <p className={`text-[15px] mb-8 font-body ${plan.highlight ? "text-white/70" : "text-[#666666]"}`}>
                                    {plan.description}
                                </p>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-[48px] font-bold tracking-tight font-display">{plan.price}</span>
                                    <span className="text-[18px] font-semibold opacity-70">{plan.currency}</span>
                                </div>

                                <ul className="flex flex-col gap-5 mb-12 flex-grow">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-4 text-[16px] font-medium font-body">
                                            <div className={`w-2 h-2 rounded-full shrink-0 ${plan.highlight ? "bg-primary" : "bg-black"}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/registration"
                                    className={`inline-flex items-center justify-center w-full h-16 rounded-full font-bold text-[18px] transition-all active:scale-95 ${plan.highlight
                                        ? "bg-primary text-white hover:bg-primary/90"
                                        : "bg-black text-white hover:bg-black/90"
                                        }`}
                                >
                                    Get Tickets
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Entry Rules Section */}
                    <div className="mt-40">
                        <div className="text-center mb-16">
                            <h2 className="text-[32px] md:text-[56px] font-bold text-black mb-6 font-display tracking-tight">
                                Entry Rules & Safety
                            </h2>
                            <p className="text-[#666666] text-[18px] max-w-2xl mx-auto font-body">
                                To ensure a safe and enjoyable environment for all attendees and their furry friends, please adhere to our festival rules.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {entryRules.map((group) => (
                                <div key={group.category} className="space-y-6">
                                    <h4 className="text-[20px] font-bold text-black uppercase tracking-widest font-display border-b border-primary/20 pb-4">
                                        {group.category}
                                    </h4>
                                    <ul className="space-y-4">
                                        {group.rules.map((rule, idx) => (
                                            <li key={idx} className="flex items-start gap-4">
                                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                                    <span className="text-primary text-[12px] font-bold">{idx + 1}</span>
                                                </div>
                                                <p className="text-[#666666] text-[15px] leading-relaxed font-body">
                                                    {rule}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Full Terms & Conditions Section */}
                        <div className="mt-40 bg-[#F9F9F9] rounded-[40px] p-8 md:p-16 border border-[#F0F0F0]">
                            <div className="mb-12">
                                <h2 className="text-[32px] md:text-[48px] font-bold text-black mb-6 font-display tracking-tight">
                                    Terms & Conditions
                                </h2>
                                <p className="text-[#666666] text-[16px] font-body">
                                    By purchasing a ticket, registering a pet, or entering the Nova Paw Festival venue, all visitors agree to the following terms and conditions:
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                <div className="space-y-4">
                                    <h4 className="text-[18px] font-bold text-black font-display">1. General Admission</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-[#666666] text-[14px]">
                                        <li>Entry permitted only with a valid ticket and wristband.</li>
                                        <li>Wristbands must be worn at all times inside the venue.</li>
                                        <li>No entry without wristbands, even with a valid ticket.</li>
                                        <li>Tickets valid only for the date specified.</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[18px] font-bold text-black font-display">2. Pet Owner Entry Rules</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-[#666666] text-[14px]">
                                        <li>Present valid pet passport at entrance.</li>
                                        <li>Pet must match breed and details in passport.</li>
                                        <li>Maximum two (2) pets per owner.</li>
                                        <li>Cats must be in secure cages at all times.</li>
                                        <li>Pets must be fully vaccinated and in good health.</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[18px] font-bold text-black font-display">3. Responsibility & Behavior</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-[#666666] text-[14px]">
                                        <li>Owners fully responsible for pet behavior and safety.</li>
                                        <li>Pets must be under control at all times.</li>
                                        <li>Organizers reserve the right to remove unsafe visitors/pets.</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[18px] font-bold text-black font-display">4. Shows & Competitions</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-[#666666] text-[14px]">
                                        <li>Requires prior registration and approval.</li>
                                        <li>Registration does not guarantee acceptance.</li>
                                        <li>Organizers may limit participants or adjust schedules.</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[18px] font-bold text-black font-display">5. Health & Safety</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-[#666666] text-[14px]">
                                        <li>Children must be supervised by an adult at all times.</li>
                                        <li>Follow all staff and security instructions.</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[18px] font-bold text-black font-display">6. Tickets & Refunds</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-[#666666] text-[14px]">
                                        <li>Non-refundable unless event is canceled.</li>
                                        <li>No refunds for schedule changes.</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[18px] font-bold text-black font-display">7. Organizer Rights</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-[#666666] text-[14px]">
                                        <li>Right to refuse entry and modify programs.</li>
                                        <li>Update terms and conditions without prior notice.</li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[18px] font-bold text-black font-display">8. Liability</h4>
                                    <ul className="list-disc pl-5 space-y-2 text-[#666666] text-[14px]">
                                        <li>Not responsible for loss or damage of personal belongings.</li>
                                        <li>Not responsible for injuries caused by pets.</li>
                                        <li>Not responsible for incidents from rule violations.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-[#E6E6E6]">
                                <p className="text-[14px] font-bold text-black">
                                    9. Acceptance: By purchasing tickets, registering pets, or entering the venue, visitors confirm they have read, understood, and agreed to these terms and conditions.
                                </p>
                            </div>
                        </div>

                        {/* Are you Pet-Ready? Section */}
                        <div className="mt-20 p-8 md:p-12 bg-black text-white rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 group overflow-hidden relative">
                            <div className="relative z-10 max-w-[500px]">
                                <h3 className="text-[24px] md:text-[32px] font-bold mb-4 font-display text-white">Are you Pet-Ready?</h3>
                                <p className="text-white/70 text-[16px] font-body leading-relaxed">
                                    Get your documents ready and secure your spot today. We can't wait to see you and your furry friends at The Pearl!
                                </p>
                            </div>
                            <div className="relative z-10 shrink-0">
                                <a
                                    href="/registration"
                                    className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-full font-bold text-[18px] hover:bg-white hover:text-black transition-all active:scale-95"
                                >
                                    Get Tickets Now
                                </a>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
