"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
      <div className="space-y-6 mx-auto">
  <h1 className="text-3xl font-bold md:text-6xl lg:text-5xl xl:text-8xl gradient-title animate-gradient">
  Everything You Need to 
            <br />
            Build a Great Tech Career
  </h1>
  <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
    Get expert guidance, ace interviews, and unlock job opportunities with smart AI-powered tools.
  </p>
</div>
<div className="flex justify-center space-x-4">
  <Link href="/dashboard">
    <Button size="lg" className="px-8">
      Get Started
    </Button>
  </Link>
</div>

        {/* <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
