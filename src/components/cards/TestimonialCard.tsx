import Image from 'next/image';
import type { Testimonial } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="bg-card p-6 rounded-lg shadow-lg h-full flex flex-col">
      <CardContent className="flex-grow flex flex-col">
        <Quote className="h-8 w-8 text-accent mb-4" />
        <p className="text-foreground/80 italic mb-6 flex-grow">"{testimonial.quote}"</p>
        <div className="flex items-center mt-auto">
          {testimonial.clientLogoUrl && (
            <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden border-2 border-primary/20">
              <Image
                src={testimonial.clientLogoUrl}
                alt={`${testimonial.clientCompany} logo`}
                layout="fill"
                objectFit="contain"
                data-ai-hint={testimonial.dataAiHint || "client logo"}
              />
            </div>
          )}
          <div>
            <p className="font-semibold text-primary">{testimonial.clientName}</p>
            <p className="text-sm text-muted-foreground">{testimonial.clientTitle}, {testimonial.clientCompany}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
