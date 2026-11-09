"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const VARIANTS: Record<"up" | "down" | "scale", Variants> = {
  up: { hidden: { opacity: 0, y: 56 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  direction?: "up" | "down" | "scale";
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={VARIANTS[direction]}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
