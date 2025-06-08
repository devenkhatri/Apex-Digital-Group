import Link from 'next/link';
import { featuredCaseStudies } from '@/data/mock';
import CaseStudyCard from '@/components/cards/CaseStudyCard';
import { Button } from '@/components/ui/button';
import Container from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';

const FeaturedCaseStudiesSection = () => {
  return (
    <section className="py-16 bg-secondary">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">
          Our Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredCaseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
        <div className="text-center">
          <Button asChild size="lg" variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-lg shadow-md transition-transform hover:scale-105">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCaseStudiesSection;
