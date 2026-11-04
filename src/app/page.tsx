import React from 'react';
import {
  MarketingNavbar,
  HeroSection,
  ProblemSection,
  SolutionSection,
  FeatureShowcase,
  HowItWorksSection,
  SecuritySection,
  PricingSection,
  FaqSection,
  MarketingFooter
} from '@/components/marketing/landing-sections';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F2] text-[#202820]">
      <MarketingNavbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeatureShowcase />
        <HowItWorksSection />
        <SecuritySection />
        <PricingSection />
        <FaqSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
