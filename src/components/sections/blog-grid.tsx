'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  itemKey: string;
  imageUrl: string;
  t: any;
}

const BlogCard: React.FC<BlogCardProps> = ({ itemKey, imageUrl, t }) => {
  return (
    <Link
      href="/blog"
      className="group flex flex-col bg-white overflow-hidden transition-all duration-500 hover:translate-y-[-8px]"
    >
      <div className="flex flex-col p-8 lg:p-10 border border-black/5 border-b-0 rounded-t-[2.5rem] bg-[#F5F5F0]">
        <div className="flex items-start mb-8">
          <div className="flex flex-col items-start pr-8 border-r border-black/10 mr-8 shrink-0 min-w-[70px] rtl:pr-0 rtl:border-r-0 rtl:pl-8 rtl:border-l rtl:mr-0 rtl:ml-8">
            <span className="text-[12px] font-bold uppercase text-primary tracking-[0.2em] leading-none mb-2">
              {t(`items.${itemKey}.month`)}
            </span>
            <span className="text-[32px] font-bold text-black leading-none font-display">
              {t(`items.${itemKey}.day`)}
            </span>
          </div>
          <h5 className="text-[24px] lg:text-[32px] font-bold leading-[1.1] text-black font-display tracking-tight group-hover:text-primary transition-colors duration-500 rtl:text-right">
            {t(`items.${itemKey}.title`)}
          </h5>
        </div>
        <p className="text-[16px] leading-[1.6] text-black/40 font-medium font-body line-clamp-3 rtl:text-right">
          {t(`items.${itemKey}.desc`)}
        </p>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-b-[2.5rem] border border-black/5">
        <Image
          src={imageUrl}
          alt={t(`items.${itemKey}.title`)}
          fill
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
        />
        {/* Hover Arrow Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                <ArrowRight className="w-8 h-8 text-black rtl:rotate-180" />
            </div>
        </div>
      </div>
    </Link>
  );
};

const BlogGrid: React.FC = () => {
  const t = useTranslations('BlogPage');
  
  const posts = [
    {
      key: "preparation",
      imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop"
    },
    {
      key: "hydration",
      imageUrl: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=2071&auto=format&fit=crop"
    },
    {
      key: "cat_dome",
      imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop"
    },
    {
      key: "adoption",
      imageUrl: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2186&auto=format&fit=crop"
    },
    {
      key: "training",
      imageUrl: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=1988&auto=format&fit=crop"
    },
    {
      key: "fashion",
      imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <section className="bg-white py-24 md:py-40">
      <div className="container px-6 mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              itemKey={post.key}
              imageUrl={post.imageUrl}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
