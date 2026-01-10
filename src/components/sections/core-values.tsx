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
      className="flex flex-col flex-nowrap h-full justify-between items-stretch overflow-hidden p-[24px] relative rounded-[24px] bg-accent/10"
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
      title: "Animal Welfare",
      description: "Promoting responsible pet ownership through education and dedicated adoption initiatives.",
      imageUrl: "https://images.unsplash.com/photo-1541591419107-bb248ff6677a?q=80&w=1974&auto=format&fit=crop",
      layout: "image-bottom",
    },
    {
      number: "02",
      title: "Safety First",
      description: "Ensuring a safe and controlled environment for all pets and families to enjoy the festival.",
      imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop",
      layout: "image-center",
    },
    {
      number: "03",
      title: "Education",
      description: "Expert-led talks and interactive workshops designed to help you care for your beloved pets.",
      imageUrl: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=2070&auto=format&fit=crop",
      layout: "image-bottom",
    },
    {
      number: "04",
      title: "Strong Community",
      description: "Connecting pet lovers to share experiences and celebrate the bond between humans and animals.",
      imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2070&auto=format&fit=crop",
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