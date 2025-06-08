import { blogPosts } from '@/data/mock';
import type { BlogPost } from '@/types';
import Container from '@/components/common/Container';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug.split('/').pop(), 
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug.endsWith(params.slug));
  if (!post) {
    return {
      title: 'Post Not Found | Apex Digital Group',
      description: 'The requested blog post could not be found.',
    };
  }
  return {
    title: `${post.title} | Blog | Apex Digital Group`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug.endsWith(params.slug));

  if (!post) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-3xl font-bold font-headline">Post Not Found</h1>
        <p className="text-muted-foreground mt-4">The blog post you're looking for doesn't exist or has been moved.</p>
        <Button asChild className="mt-8">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </Container>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-background">
      <Container className="max-w-3xl mx-auto">
        <Button asChild variant="outline" className="mb-8">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>

        <article>
          <header className="mb-10">
            <Badge variant="default" className="bg-accent text-accent-foreground mb-2 text-sm">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center"><UserCircle className="h-5 w-5 mr-1.5" /> By {post.author}</span>
              <span className="flex items-center"><CalendarDays className="h-5 w-5 mr-1.5" /> Published on {new Date(post.publishDate).toLocaleDateString()}</span>
            </div>
          </header>

          {post.imageUrl && (
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-xl mb-10">
              <Image 
                src={post.imageUrl} 
                alt={post.title} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={post.dataAiHint || "blog header image"}
                priority
              />
            </div>
          )}

          {/* Using prose for basic styling of blog content. For complex HTML, consider a dedicated parser/renderer. */}
          <div className="prose prose-lg max-w-none text-foreground/90 dark:prose-invert">
            {/* This is where the actual blog content (post.content) would be rendered. 
                If it's markdown, you'd use a markdown renderer here. 
                For simplicity, I'm putting placeholder text.
            */}
            <p>{post.excerpt}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>{post.content}</p> {/* This would be the main body */}
             <h3 className="font-headline">Sub-heading Example</h3>
            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu.</p>
          </div>
        </article>
        
        <div className="text-center mt-16 pt-10 border-t">
          <h2 className="text-2xl font-bold font-headline mb-4">Enjoyed this post?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Share it with your network or explore more articles on our blog.
          </p>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/blog">
              More Articles
            </Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
