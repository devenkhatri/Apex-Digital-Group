import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/common/Container';
import { ArrowRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
          Ready to Elevate Your Business?
        </h2>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Let's discuss how Apex Digital Group can help you achieve your goals. Contact us today for a free consultation.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-4 text-xl shadow-lg transition-transform hover:scale-105">
          <Link href="/contact">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </Container>
    </section>
  );
};

export default CtaSection;
