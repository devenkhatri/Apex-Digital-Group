import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <Link href={post.slug} className="block">
        <div className="relative w-full h-56">
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={post.dataAiHint || "blog article"}
          />
        </div>
      </Link>
      <CardHeader className="flex-shrink-0">
        <CardDescription className="text-xs text-accent font-semibold uppercase tracking-wider mb-1">{post.category}</CardDescription>
        <CardTitle className="text-xl font-headline mb-1 hover:text-primary transition-colors">
          <Link href={post.slug}>{post.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 pt-4 border-t">
        <div className="flex items-center text-xs text-muted-foreground space-x-3">
          <span className="flex items-center"><UserCircle className="h-4 w-4 mr-1" /> {post.author}</span>
          <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1" /> {new Date(post.publishDate).toLocaleDateString()}</span>
        </div>
        <Button asChild variant="link" className="p-0 self-start text-primary hover:text-primary/80">
          <Link href={post.slug}>
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
