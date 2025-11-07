import React, { useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockPosts } from '../constants';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { BlogCard } from '../components/BlogCard';
import { CommentsSection } from '../components/CommentsSection';
import { AuthorBio } from '../components/AuthorBio';

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);


const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = mockPosts.find((p) => p.slug === slug);
    const articleRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!post) return;

        const originalTitle = document.title;
        document.title = `${post.title} | Lade Stack Blog`;

        const metaConfigs = [
            { attr: 'name' as const, key: 'description', content: post.description },
            { attr: 'name' as const, key: 'keywords', content: [...post.categories, ...(post.tags || [])].join(', ') },
            { attr: 'property' as const, key: 'og:title', content: post.title },
            { attr: 'property' as const, key: 'og:description', content: post.description },
            { attr: 'property' as const, key: 'og:image', content: post.image },
            { attr: 'property' as const, key: 'og:url', content: window.location.href },
            { attr: 'property' as const, key: 'og:type', content: 'article' },
            { attr: 'name' as const, key: 'twitter:card', content: 'summary_large_image' },
            { attr: 'name' as const, key: 'twitter:title', content: post.title },
            { attr: 'name' as const, key: 'twitter:description', content: post.description },
            { attr: 'name' as const, key: 'twitter:image', content: post.image },
        ];
        
        // Create or update meta tags
        metaConfigs.forEach(config => {
            let element = document.head.querySelector(`meta[${config.attr}='${config.key}']`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(config.attr, config.key);
                document.head.appendChild(element);
            }
            element.setAttribute('content', config.content);
        });

        // Cleanup function to remove tags when the component unmounts
        return () => {
            document.title = originalTitle;
            metaConfigs.forEach(config => {
                const element = document.head.querySelector(`meta[${config.attr}='${config.key}']`);
                if (element) {
                    element.remove();
                }
            });
        };
    }, [post]);

    const relatedPosts = useMemo(() => {
        if (!post) return [];
    
        const currentPostTags = post.tags || [];
        const currentPostCategories = post.categories || [];
    
        return mockPosts.filter(p => {
            if (p.id === post.id || p.status !== 'published') return false;
    
            const hasCommonCategory = p.categories.some(cat => currentPostCategories.includes(cat));
            const hasCommonTag = (p.tags || []).some(tag => currentPostTags.includes(tag));
    
            return hasCommonCategory || hasCommonTag;
        }).slice(0, 2); // Limit to 2 related posts
    }, [post]);

    if (!post) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Post not found</h1>
                <Link to="/" className="text-primary hover:underline mt-4 inline-block">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <>
            <ScrollProgressBar targetRef={articleRef} />
            <div className="animate-fade-in">
                <article ref={articleRef} className="max-w-3xl mx-auto">
                    <header className="mb-8 text-center">
                        {post.status === 'draft' && (
                            <div className="mb-4 text-center">
                                <span className="inline-block bg-yellow-500/20 text-yellow-500 dark:text-yellow-400 rounded-full px-4 py-1 text-sm font-bold tracking-wider uppercase">
                                    Draft
                                </span>
                            </div>
                        )}
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-5xl mb-4">
                            {post.title}
                        </h1>
                        <div className="text-sm text-muted-foreground">
                            <span>By {post.author}</span>
                            <span className="mx-2">•</span>
                            <span>{post.date}</span>
                        </div>
                    </header>
                    <img
                        src={post.image}
                        alt={post.title}
                        width={1200}
                        height={600}
                        className="w-full rounded-lg shadow-lg mb-8 aspect-video object-cover"
                    />
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    
                    <AuthorBio authorName={post.author} />
                    
                    <div className="mt-12 border-t border-border/40 pt-8 flex justify-center">
                         <SocialShareButtons post={post} />
                    </div>
                </article>

                <CommentsSection postSlug={post.slug} />

                {relatedPosts.length > 0 && (
                     <section className="max-w-5xl mx-auto mt-16" aria-labelledby="related-posts-heading">
                        <h2 id="related-posts-heading" className="text-3xl font-bold text-center mb-8">Related Posts</h2>
                        <div className="grid gap-8 sm:grid-cols-2">
                            {relatedPosts.map((p) => <BlogCard key={p.id} post={p} />)}
                        </div>
                    </section>
                )}

                <div className="text-center mt-16">
                     <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-md bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to All Posts
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BlogPostPage;