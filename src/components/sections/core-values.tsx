import React from "react";
import Image from "next/image";

interface CardProps {
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  layout: "image-bottom" | "image-center";
}

const CoreValueCard = ({
  number,
  title,
  description,
  imageUrl,
  layout,
}: CardProps) => {
  const isImageCenter = layout === "image-center";

  return (
    <div
      className="flex flex-col flex-nowrap h-full justify-between items-stretch overflow-hidden p-[24px] relative rounded-[24px] bg-[#f7f07a]"
      style={{
        boxShadow: "none",
        minHeight: "440px",
      }}
    >
      {/* Top Section */}
      {!isImageCenter ? (
        <div className="flex flex-col gap-[16px] items-start justify-start flex-none">
          <div className="flex flex-row items-center gap-[12px] w-full">
            <h5 className="font-sans font-semibold text-[24px] leading-[1.3] text-black tracking-[-0.01em]">
              {number}
            </h5>
            <h5 className="font-sans font-semibold text-[24px] leading-[1.3] text-black tracking-[-0.01em]">
              {title}
            </h5>
          </div>
          <p className="font-sans font-normal text-[18px] leading-[1.6] text-[#666666]">
            {description}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-start justify-start flex-none">
           <p className="font-sans font-normal text-[18px] leading-[1.6] text-[#666666]">
            {description}
          </p>
        </div>
      )}

      {/* Image Section */}
      <div className={`relative w-full overflow-hidden rounded-[16px] aspect-[1.33/1] ${isImageCenter ? "my-[24px]" : "mt-[24px]"}`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      {/* Bottom Section for Image Center Layout */}
      {isImageCenter && (
        <div className="flex flex-row items-center gap-[12px] w-full mt-auto flex-none">
          <h5 className="font-sans font-semibold text-[24px] leading-[1.3] text-black tracking-[-0.01em]">
            {number}
          </h5>
          <h5 className="font-sans font-semibold text-[24px] leading-[1.3] text-black tracking-[-0.01em]">
            {title}
          </h5>
        </div>
      )}
    </div>
  );
};

export default function CoreValuesSection() {
  const values: CardProps[] = [
    {
      number: "01",
      title: "Scenic Routes",
      description: "Our carefully curated routes let you explore breathtaking, stunning natural landscapes.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/rkAuWOc2uqbczacSJeKfT5o9b0-8.jpg",
      layout: "image-bottom",
    },
    {
      number: "02",
      title: "Strong Community",
      description: "Join a cycling community, share your passion, explore new routes, and make friends.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/ERWMHvvPvKlBgf6GVzBtjyrr4-9.jpg",
      layout: "image-center",
    },
    {
      number: "03",
      title: "Organization",
      description: "Our dedicated team of expert cyclists and planners ensures your safety and enjoyment.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/ENhmY5gWUIMHaAAWD65wT5X420Y-10.jpg",
      layout: "image-bottom",
    },
    {
      number: "04",
      title: "Expert Guidance",
      description: "Our experienced staff are dedicated to ensuring your experience is safe and enjoyable.",
      imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/cdeb881c-def5-4067-afdd-4b488b9b09d6-cyclix-template-framer-website/assets/images/qLTk8vC88vXmeSSHkWZFyf0Q3M0-1.jpg",
      layout: "image-center",
    },
  ];

  return (
    <section className="w-full bg-white py-[60px] md:py-[100px] lg:py-[120px]">
      <div className="container mx-auto px-[20px] lg:px-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {values.map((value, index) => (
            <CoreValueCard
              key={index}
              number={value.number}
              title={value.title}
              description={value.description}
              imageUrl={value.imageUrl}
              layout={value.layout}
            />
          ))}
        </div>
      </div>
    </section>
  );
}