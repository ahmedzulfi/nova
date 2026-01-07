import React from 'react';
import Image from 'next/image';

const TrustedPartners = () => {
  const assets = [
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/mJ4B3sUua6gvwJ6rQYS23DLJ9c-3.svg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/ihTyCbKnhLSE7Lqwo89ntcoqg-4.svg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/0mIul3LUvYrxO5EdpNOdc05E5Ho-5.svg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/9IEmjFVRXKF6HZUKHxGfGPU31iI-6.svg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/dCjZ948SS3d6hXKUdH5BSsVA7s-7.svg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/svgs/Xw6zxGSgFXisbPva7EGSyTMcvxc-8.svg"
  ];

  return (
    <section className="bg-white py-[60px] lg:py-[120px]">
      <div className="container mx-auto px-5 lg:px-10">
        <div className="flex flex-col lg:flex-row border border-[#E5E5E5] rounded-[24px] overflow-hidden">
          {/* Left Content Area */}
          <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E5E5E5]">
            <div>
              {/* Tab Filters */}
              <div className="flex flex-wrap gap-2 mb-12">
                <button className="bg-[#f7f07a] text-black text-[14px] font-medium px-4 py-2 rounded-full cursor-pointer transition-colors duration-200">
                  Partners
                </button>
                <button className="bg-[#f1f1f1] text-[#666666] text-[14px] font-medium px-4 py-2 rounded-full hover:bg-[#eaeaea] transition-colors duration-200">
                  Charity
                </button>
                <button className="bg-[#f1f1f1] text-[#666666] text-[14px] font-medium px-4 py-2 rounded-full hover:bg-[#eaeaea] transition-colors duration-200">
                  Hardware
                </button>
              </div>

              <div className="mt-auto">
                <h2 className="text-[24px] lg:text-[48px] font-medium leading-[1.2] tracking-[-0.01em] text-black mb-6">
                  Trusted by clients
                </h2>
                <h5 className="text-[18px] lg:text-[24px] font-semibold leading-[1.3] text-black mb-4">
                  Discover the trusted network that powers our mission
                </h5>
                <p className="text-[16px] lg:text-[18px] text-[#666666] leading-[1.6]">
                  From esteemed partners and impactful charitable collaborations to cutting-edge hardware solutions, we work together to elevate every aspect of your experience while making a difference.
                </p>
              </div>
            </div>
          </div>

          {/* Right Logo Grid Area */}
          <div className="w-full lg:w-[55%] flex flex-col bg-white">
            <div className="grid grid-cols-2 lg:grid-cols-3 flex-1">
              {/* Logo Cell 1 */}
              <div className="flex items-center justify-center p-8 border-b border-r border-[#E5E5E5] min-h-[160px]">
                <div className="opacity-0">Placeholder</div>
              </div>
              {/* Logo Cell 2 */}
              <div className="flex items-center justify-center p-8 border-b lg:border-r border-[#E5E5E5] min-h-[160px]">
                <div className="opacity-0">Placeholder</div>
              </div>
              {/* Logo Cell 3 */}
              <div className="flex items-center justify-center p-8 border-b border-[#E5E5E5] min-h-[160px]">
                <div className="opacity-0">Placeholder</div>
              </div>

              {/* Logo Cell 4 - Start of Logo Grid */}
              <div className="flex items-center justify-center p-8 border-b border-r border-[#E5E5E5] min-h-[160px]">
                <Image
                  src={assets[0]}
                  alt="Partner Logo"
                  width={140}
                  height={40}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              {/* Logo Cell 5 */}
              <div className="flex items-center justify-center p-8 border-b lg:border-r border-[#E5E5E5] min-h-[160px]">
                <Image
                  src={assets[1]}
                  alt="Partner Logo"
                  width={140}
                  height={40}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              {/* Logo Cell 6 */}
              <div className="flex items-center justify-center p-8 border-b border-[#E5E5E5] min-h-[160px]">
                <Image
                  src={assets[2]}
                  alt="Partner Logo"
                  width={140}
                  height={40}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

              {/* Logo Cell 7 */}
              <div className="flex items-center justify-center p-8 border-r border-[#E5E5E5] min-h-[160px]">
                <Image
                  src={assets[3]}
                  alt="Partner Logo"
                  width={140}
                  height={40}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              {/* Logo Cell 8 */}
              <div className="flex items-center justify-center p-8 lg:border-r border-[#E5E5E5] min-h-[160px]">
                <Image
                  src={assets[4]}
                  alt="Partner Logo"
                  width={140}
                  height={40}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              {/* Logo Cell 9 */}
              <div className="flex items-center justify-center p-8 min-h-[160px]">
                <Image
                  src={assets[5]}
                  alt="Partner Logo"
                  width={140}
                  height={40}
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;