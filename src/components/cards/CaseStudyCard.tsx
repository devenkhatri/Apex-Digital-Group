import Link from 'next/link';
import Image from 'next/image';
import type { CaseStudy } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <div className="relative w-full h-56">
        <Image 
          src={caseStudy.imageUrl} 
          alt={caseStudy.title} 
          layout="fill" 
          objectFit="cover"
          data-ai-hint={caseStudy.dataAiHint || "project image"}
        />
      </div>
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-xl font-headline mb-1">{caseStudy.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">Client: {caseStudy.clientName} | {caseStudy.serviceCategory}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-sm text-foreground mb-4 line-clamp-3">{caseStudy.problem}</p>
        <Button asChild variant="outline" className="mt-auto self-start border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <Link href={caseStudy.slug}>
            View Case Study <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CaseStudyCard;
