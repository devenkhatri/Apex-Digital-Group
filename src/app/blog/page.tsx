import Container from '@/components/common/Container';
import BlogPostCard from '@/components/cards/BlogPostCard';
import { blogPosts } from '@/data/mock';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Blog | Apex Digital Group',
  description: 'Read the latest insights, trends, and news from the experts at Apex Digital Group on digital marketing, AI, web development, and IT.',
};

export default function BlogPage() {
  return (
    <div className="py-16 bg-background">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4">Our Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed with our latest articles, tips, and industry insights from the Apex Digital Group team.
          </p>
        </div>
        
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No blog posts available yet. Check back soon!</p>
        )}

         <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Want to stay updated? Subscribe to our newsletter (feature coming soon!).
          </p>
        </div>
      </Container>
    </div>
  );
}
