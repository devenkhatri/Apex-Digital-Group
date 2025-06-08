import HeroSection from '@/components/sections/HeroSection';
import ClientMetricsSection from '@/components/sections/ClientMetricsSection';
import FeaturedCaseStudiesSection from '@/components/sections/FeaturedCaseStudiesSection';
import ServicesOverviewSection from '@/components/sections/ServicesOverviewSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection'; // Added for more content
import CtaSection from '@/components/sections/CtaSection'; // Added for clear CTA

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClientMetricsSection />
      <ServicesOverviewSection />
      <FeaturedCaseStudiesSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
