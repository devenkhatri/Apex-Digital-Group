import { services } from '@/data/mock';
import ServiceCard from '@/components/cards/ServiceCard';
import Container from '@/components/common/Container';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ServicesOverviewSection = () => {
  return (
    <section className="py-16 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-4 font-headline">
          Comprehensive Digital Solutions
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          We offer a wide range of services to help your business thrive in the digital landscape. From strategy to execution, we're your trusted partner.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
         <div className="text-center">
          <Button asChild size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-3 text-lg shadow-md transition-transform hover:scale-105">
            <Link href="/services">
              Explore All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default ServicesOverviewSection;
