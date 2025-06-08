import Container from '@/components/common/Container';
import ServiceCard from '@/components/cards/ServiceCard';
import { services } from '@/data/mock';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Services | Apex Digital Group',
  description: 'Explore the range of digital services offered by Apex Digital Group, including Digital Marketing, AI & Automation, Web Development, and IT Implementation.',
};

export default function ServicesPage() {
  return (
    <div className="py-16 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            At Apex Digital Group, we provide a comprehensive suite of digital solutions tailored to meet your business needs and drive growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold font-headline mb-4">Ready to Transform Your Business?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Let's discuss how our expertise can help you achieve your digital objectives.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-3 text-lg shadow-md transition-transform hover:scale-105">
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
