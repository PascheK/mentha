"use client";

import BenefitsSection from "@/components/landing/BenefitsSection";
import DemoSection from "@/components/landing/DemoSection";
import FeatureSection from "@/components/landing/FeatureSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import HeroSection from "@/components/landing/HeroSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ParallaxBlobBackground from "@/components/landing/ParallaxBlobBackground";
import { useEffect } from "react";

export default function LandingPage() {
  useEffect(() => {
    document.documentElement.classList.contains("dark");
  }, []);

  return (
    <>
      <ParallaxBlobBackground />

      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <FeatureSection />
        <BenefitsSection />
        <DemoSection />
        <PricingSection />
        <TestimonialsSection />
      </main>
      <FinalCTASection />
    </>
  );
}
