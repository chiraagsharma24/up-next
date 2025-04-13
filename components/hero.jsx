"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Boxes } from "./ui/background-boxes";
import { cn } from "@/lib/utils";
import { Typewriter } from "./ui/typewriter";
import { BorderMagicButton } from "./ui/border-magic-button";

const BackgroundBoxesDemo = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
    </div>
  );
};

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
    <section className="w-full pt-36 md:pt-48 pb-10 relative">
      <BackgroundBoxesDemo />
      <div className="space-y-6 text-center relative z-30">
        <div className="space-y-6 mx-auto">
          <h1 className="text-3xl font-bold md:text-6xl lg:text-5xl xl:text-8xl gradient-title animate-gradient">
            Everything You Need to 
            <br />
            <Typewriter 
              text="Build a Great Tech Career" 
              delay={100}
              className="text-3xl font-bold md:text-6xl lg:text-5xl xl:text-8xl gradient-title animate-gradient"
            />
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Get expert guidance, ace interviews, and unlock job opportunities with smart AI-powered tools.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <BorderMagicButton>
              Get Started
            </BorderMagicButton>
          </Link>
        </div>
      </div>
      <div className="hero-image-wrapper mt-12">
        <div ref={imageRef} className="hero-image">
          <Image
            src="/hero-image.png"
            alt="Career Growth"
            width={800}
            height={400}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
