import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Container from '@/components/common/Container';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
         {/* Optional: Add a subtle background pattern or image here */}
         {/* Example: <Image src="/path-to-pattern.svg" layout="fill" objectFit="cover" alt="Background pattern" /> */}
      </div>
      <Container className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline mb-6 leading-tight">
            Elevate Your Business with Apex Digital Solutions
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
            We are a full-service digital agency specializing in driving growth through innovative Digital Marketing, AI & Automation, Web Development, and IT Implementation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 py-3 text-lg shadow-lg transition-transform hover:scale-105">
              <Link href="/services">
                Our Services <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full px-8 py-3 text-lg shadow-lg transition-transform hover:scale-105">
              <Link href="/contact">
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
        <div className="hidden md:block relative aspect-square max-w-md mx-auto">
           <Image 
            src="https://placehold.co/600x600.png" 
            alt="Digital agency concept" 
            width={600}
            height={600}
            className="rounded-lg shadow-2xl object-cover"
            data-ai-hint="team collaboration"
            priority
          />
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
