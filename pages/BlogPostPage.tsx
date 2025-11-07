import React, { useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockPosts } from '../constants';
import { ScrollProgressBar } from '../components/ScrollProgressBar';
import { SocialShareButtons } from '../components/SocialShareButtons';
import { BlogCard } from '../components/BlogCard';
import { CommentsSection } from '../components/CommentsSection';
import { AuthorBio } from '../components/AuthorBio';
import { CodeSnippet } from '../components/CodeSnippet';

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);

const parseContent = (content: string): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    const regex = /\[CODE language="(.+?)"\]([\s\S]+?)\[\/CODE\]/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const [fullMatch, language, code] = match;
        const precedingText = content.substring(lastIndex, match.index);

        if (precedingText.trim()) {
            nodes.push(
                <div
                    key={`text-${lastIndex}`}
                    className="prose prose-lg dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: precedingText }}
                />
            );
        }

        nodes.push(
            <CodeSnippet
                key={`code-${match.index}`}
                language={language.trim()}
                code={code.trim()}
            />
        );
        
        lastIndex = match.index + fullMatch.length;
    }

    const remainingText = content.substring(lastIndex);
    if (remainingText.trim()) {
        nodes.push(
            <div
                key={`text-${lastIndex}`}
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: remainingText }}
            />
        );
    }

    return nodes;
};


const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = mockPosts.find((p) => p.slug === slug);
    const articleRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!post) return;

        const originalTitle = document.title;
        document.title = `${post.title} | Lade Stack Blog`;

        // Define all meta tags for the page
        const metaConfigs = [
            // Standard SEO
            { attr: 'name' as const, key: 'description', content: post.description },
            { attr: 'name' as const, key: 'keywords', content: [...post.categories, ...(post.tags || [])].join(', ') },
            { attr: 'name' as const, key: 'author', content: post.author },

            // Open Graph (for Facebook, LinkedIn, etc.)
            { attr: 'property' as const, key: 'og:title', content: post.title },
            { attr: 'property' as const, key: 'og:description', content: post.description },
            { attr: 'property' as const, key: 'og:image', content: post.image },
            { attr: 'property' as const, key: 'og:url', content: window.location.href },
            { attr: 'property' as const, key: 'og:type', content: 'article' },
            { attr: 'property' as const, key: 'og:site_name', content: 'Lade Stack Blog' },
            { attr: 'property' as const, key: 'article:published_time', content: new Date(post.date).toISOString() },
            { attr: 'property' as const, key: 'article:author', content: post.author },
            ...(post.tags || []).map(tag => ({ attr: 'property' as const, key: 'article:tag', content: tag })),


            // Twitter Card (for Twitter)
            { attr: 'name' as const, key: 'twitter:card', content: 'summary_large_image' },
            { attr: 'name' as const, key: 'twitter:title', content: post.title },
            { attr: 'name' as const, key: 'twitter:description', content: post.description },
            { attr: 'name' as const, key: 'twitter:image', content: post.image },
            { attr: 'name' as const, key: 'twitter:site', content: '@LadeStack' }, // Fictional Twitter handle
            { attr: 'name' as const, key: 'twitter:creator', content: `@${post.author.replace(/\s/g, '')}` }, // Assumed author handle
        ];
        
        // Keep track of added tags to remove them on cleanup
        const addedMetaTags: Element[] = [];

        // Create or update meta tags
        metaConfigs.flat().forEach(config => {
            if (!config) return;
            let element = document.head.querySelector(`meta[${config.attr}='${config.key}']`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(config.attr, config.key);
                document.head.appendChild(element);
                addedMetaTags.push(element);
            }
            element.setAttribute('content', config.content);
        });

        // Cleanup function to restore original title and remove added meta tags
        return () => {
            document.title = originalTitle;
            addedMetaTags.forEach(tag => {
                document.head.removeChild(tag);
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
    
    const parsedContent = useMemo(() => post ? parseContent(post.content) : [], [post]);

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
                            <span>
                                By{' '}
                                <Link to={`/author/${encodeURIComponent(post.author)}`} className="font-medium text-foreground hover:underline">
                                    {post.author}
                                </Link>
                            </span>
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
                    
                    <div>
                        {parsedContent.map((node, index) => <React.Fragment key={index}>{node}</React.Fragment>)}
                    </div>
                    
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
                        className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90"
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