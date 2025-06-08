import Image from 'next/image';
import type { TeamMember } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Linkedin, Twitter } from 'lucide-react'; // Example social icons

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
      <div className="relative w-full h-64 bg-secondary">
        <Image 
          src={member.imageUrl} 
          alt={member.name} 
          layout="fill" 
          objectFit="cover" 
          objectPosition="center top"
          data-ai-hint={member.dataAiHint || "person photo"}
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">{member.name}</CardTitle>
        <CardDescription className="text-accent font-semibold">{member.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 min-h-[4em] line-clamp-3">{member.bio}</p>
        {member.socialLinks && member.socialLinks.length > 0 && (
          <div className="flex justify-center space-x-3">
            {member.socialLinks.map(link => {
              let Icon;
              if (link.platform.toLowerCase() === 'linkedin') Icon = Linkedin;
              else if (link.platform.toLowerCase() === 'twitter') Icon = Twitter;
              // Add more social icons as needed
              
              return Icon ? (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  <Icon className="h-5 w-5" />
                </a>
              ) : null;
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
