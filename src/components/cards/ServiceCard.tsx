import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ServiceIcon from '@/components/common/ServiceIcon';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      {service.imageUrl && (
        <div className="relative w-full h-48">
          <Image 
            src={service.imageUrl} 
            alt={service.title} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={service.dataAiHint || "service illustration"}
          />
        </div>
      )}
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          {service.icon && <ServiceIcon IconComponent={service.icon} className="h-8 w-8 text-primary" />}
          <CardTitle className="text-xl font-headline">{service.title}</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground min-h-[3em]">{service.briefDescription}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-end">
        <Button asChild variant="link" className="p-0 justify-start text-accent hover:text-accent/80">
          <Link href={service.slug}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
