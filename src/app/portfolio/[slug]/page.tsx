import { portfolioProjects } from '@/data/mock';
import type { PortfolioProject } from '@/types';
import Container from '@/components/common/Container';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PortfolioProjectPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug.split('/').pop(), // Extract slug from full path
  }));
}

export async function generateMetadata({ params }: PortfolioProjectPageProps) {
  const project = portfolioProjects.find(p => p.slug.endsWith(params.slug));
  if (!project) {
    return {
      title: 'Project Not Found | Apex Digital Group',
      description: 'The requested project could not be found.',
    };
  }
  return {
    title: `${project.title} | Portfolio | Apex Digital Group`,
    description: `Case study for ${project.clientName}: ${project.problem}`,
  };
}

export default function PortfolioProjectPage({ params }: PortfolioProjectPageProps) {
  const project = portfolioProjects.find(p => p.slug.endsWith(params.slug));

  if (!project) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-3xl font-bold font-headline">Project Not Found</h1>
        <p className="text-muted-foreground mt-4">The project you're looking for doesn't exist or has been moved.</p>
        <Button asChild className="mt-8">
          <Link href="/portfolio">Back to Portfolio</Link>
        </Button>
      </Container>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-background">
      <Container>
        <Button asChild variant="outline" className="mb-8">
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>

        <article>
          <header className="mb-10">
            <Badge variant="secondary" className="mb-2 text-sm">{project.serviceCategory}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-3">{project.title}</h1>
            <p className="text-xl text-muted-foreground">Client: <span className="font-semibold text-foreground">{project.clientName}</span></p>
          </header>

          {project.imageUrl && (
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl mb-10">
              <Image 
                src={project.imageUrl} 
                alt={project.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={project.dataAiHint || "project screenshot"}
                priority
              />
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 prose prose-lg max-w-none text-foreground/90">
              <h2 className="text-2xl font-semibold font-headline mb-3">The Challenge</h2>
              <p className="mb-6">{project.problem}</p>
              
              <h2 className="text-2xl font-semibold font-headline mb-3">Our Solution</h2>
              <p className="mb-6">{project.solution}</p>
            </div>

            <aside className="md:col-span-1">
              <div className="bg-secondary p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold font-headline mb-4">Key Results</h3>
                <ul className="space-y-2">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
        
        <div className="text-center mt-16 pt-10 border-t">
          <h2 className="text-2xl font-bold font-headline mb-4">Have a Similar Project in Mind?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We'd love to hear about your challenges and discuss how we can help you achieve your goals.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-lg">
            <Link href="/contact">
              Contact Us Today
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
