import Container from '@/components/common/Container';
import CaseStudyCard from '@/components/cards/CaseStudyCard'; // Reusing CaseStudyCard for portfolio items
import { portfolioProjects } from '@/data/mock';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Our Portfolio | Apex Digital Group',
  description: 'Explore a selection of our successful projects and case studies, showcasing our expertise across various digital services.',
};

export default function PortfolioPage() {
  return (
    <div className="py-16 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4">Our Portfolio</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the impactful solutions we've delivered for our clients. Each project demonstrates our commitment to excellence and measurable results.
          </p>
        </div>
        
        {portfolioProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <CaseStudyCard key={project.id} caseStudy={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Our portfolio is currently being updated. Please check back soon!</p>
        )}

        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Like what you see? Let's discuss how we can achieve similar results for your business.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-3 text-lg">
            <Link href="/contact">
              Start Your Project
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
