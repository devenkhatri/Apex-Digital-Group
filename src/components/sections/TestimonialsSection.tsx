import { testimonials } from '@/data/mock';
import TestimonialCard from '@/components/cards/TestimonialCard';
import Container from '@/components/common/Container';

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-background">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12 font-headline">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
