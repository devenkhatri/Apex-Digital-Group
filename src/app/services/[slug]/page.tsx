import { services } from '@/data/mock';
import type { Service } from '@/types';
import Container from '@/components/common/Container';
import ServiceIcon from '@/components/common/ServiceIcon';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ServiceDetailPageProps {
  params: { slug: string };
}

// This function can be used for generateStaticParams if using SSG
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id, // Assuming service.id is used in the URL slug construction
  }));
}

// Function to generate metadata dynamically
export async function generateMetadata({ params }: ServiceDetailPageProps) {
  const service = services.find(s => s.id === params.slug || s.slug === `/services/${params.slug}`);
  if (!service) {
    return {
      title: 'Service Not Found | Apex Digital Group',
      description: 'The requested service could not be found.',
    };
  }
  return {
    title: `${service.title} | Services | Apex Digital Group`,
    description: service.description,
  };
}


export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  // Find service by slug (e.g., 'digital-marketing') or full path slug
  const service = services.find(s => s.id === params.slug || s.slug === `/services/${params.slug}`);

  if (!service) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-3xl font-bold font-headline">Service Not Found</h1>
        <p className="text-muted-foreground mt-4">The service you're looking for doesn't exist or has been moved.</p>
        <Button asChild className="mt-8">
          <Link href="/services">Back to Services</Link>
        </Button>
      </Container>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-background">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            {service.icon && <ServiceIcon IconComponent={service.icon} className="h-16 w-16 text-primary mb-6" />}
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">{service.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
          {service.imageUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image 
                src={service.imageUrl} 
                alt={service.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={service.dataAiHint || "service concept"}
              />
            </div>
          )}
        </div>

        {service.subServices && service.subServices.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-headline text-center mb-10">What We Offer</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {service.subServices.map((sub, index) => (
                <Card key={index} className="bg-card shadow-md hover:shadow-lg transition-shadow rounded-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl font-headline">
                      <CheckCircle className="h-6 w-6 text-accent mr-3 flex-shrink-0" />
                      {sub.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{sub.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center bg-secondary p-10 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold font-headline mb-4">Interested in {service.title}?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Let's discuss how our {service.title.toLowerCase()} services can help your business achieve its goals.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-lg shadow-md transition-transform hover:scale-105">
            <Link href="/contact">
              Request a Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
