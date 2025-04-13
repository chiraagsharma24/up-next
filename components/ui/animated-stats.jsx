"use client";

import React, { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

export function AnimatedStats({ value, label }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center space-y-2"
      style={{
        transform: isInView ? "scale(1)" : "scale(0.5)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      <h3 className="text-4xl font-bold">{value}</h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
} 