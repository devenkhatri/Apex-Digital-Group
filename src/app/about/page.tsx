import Container from '@/components/common/Container';
import TeamMemberCard from '@/components/cards/TeamMemberCard';
import TestimonialCard from '@/components/cards/TestimonialCard';
import { teamMembers, testimonials } from '@/data/mock';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, Target } from 'lucide-react';

export const metadata = {
  title: 'About Us | Apex Digital Group',
  description: 'Learn more about Apex Digital Group, our mission, our expert team, and what our clients say about us.',
};

export default function AboutUsPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <Container className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">About Apex Digital Group</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a passionate team of digital experts dedicated to helping businesses thrive in the online world through innovation, strategy, and cutting-edge technology.
          </p>
        </Container>
      </section>

      {/* Mission/Values Section */}
      <section className="py-16">
        <Container>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg">
              <Target className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold font-headline mb-2">Our Mission</h3>
              <p className="text-muted-foreground">To empower businesses with transformative digital solutions that drive growth, efficiency, and lasting success.</p>
            </div>
            <div className="p-6 rounded-lg">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold font-headline mb-2">Our Approach</h3>
              <p className="text-muted-foreground">We combine data-driven strategies with creative thinking and technical expertise to deliver tailored solutions that meet unique client needs.</p>
            </div>
            <div className="p-6 rounded-lg">
              <MessageSquare className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold font-headline mb-2">Our Values</h3>
              <p className="text-muted-foreground">Innovation, Integrity, Collaboration, Client-Centricity, and Excellence are at the core of everything we do.</p>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-secondary">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">Meet Our Experts</h2>
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Our team information is currently being updated.</p>
          )}
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <Container>
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">Client Testimonials</h2>
          {testimonials.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Client testimonials are coming soon!</p>
          )}
        </Container>
      </section>

      {/* CTA */}
       <section className="py-20 bg-primary text-primary-foreground">
        <Container className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
            Partner with Us for Digital Excellence
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Ready to take your business to the next level? Let's create something amazing together.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-10 py-4 text-xl">
            <Link href="/contact">
              Contact Our Team
            </Link>
          </Button>
        </Container>
      </section>
    </div>
  );
}
