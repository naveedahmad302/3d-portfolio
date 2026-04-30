"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Navigation from "@/components/navigation/Navigation";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import TimelineSection from "@/components/timeline/TimelineSection";
import TerminalSection from "@/components/terminal/TerminalSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";
import SectionDivider from "@/components/common/SectionDivider";
import GridOverlay from "@/components/effects/GridOverlay";

const CustomCursor = dynamic(
  () => import("@/components/effects/CustomCursor"),
  { ssr: false }
);
const SkillsSection = dynamic(
  () => import("@/components/skills/SkillsSection"),
  { ssr: false }
);
const ParticleBackground = dynamic(
  () => import("@/components/effects/ParticleBackground"),
  { ssr: false }
);

export default function PortfolioApp() {
  const [isLoaded, setIsLoaded] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ParticleBackground />
      <GridOverlay />

      <main
        className={`relative z-10 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navigation />
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <TimelineSection />
        <SectionDivider />
        <TerminalSection />
        <SectionDivider />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
