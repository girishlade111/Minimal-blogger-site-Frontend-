import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockAuthors, mockPosts } from '../constants';
import { BlogCard } from '../components/BlogCard';
import { Comment } from '../types';

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

const getCommentCount = (slug: string): number => {
    if (typeof window === 'undefined') return 0;
    try {
        const item = window.localStorage.getItem(`comments-${slug}`);
        if (item) {
            const comments: Comment[] = JSON.parse(item);
            return Array.isArray(comments) ? comments.length : 0;
        }
    } catch (error) {
        console.error(`Error reading comments for slug ${slug} from localStorage`, error);
    }
    return 0;
};

const AuthorPage: React.FC = () => {
    const { authorName: encodedAuthorName } = useParams<{ authorName: string }>();
    const authorName = encodedAuthorName ? decodeURIComponent(encodedAuthorName) : '';
    
    const author = mockAuthors[authorName];
    const authorPosts = mockPosts.filter(
        post => post.author === authorName && post.status === 'published'
    );

    if (!author) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <h1 className="text-2xl font-bold">Author not found</h1>
                <p className="text-muted-foreground mt-2">The author you are looking for does not exist.</p>
                <Link to="/" className="text-primary hover:underline mt-6 inline-block">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in space-y-12">
            <section className="flex flex-col sm:flex-row items-center sm:items-start gap-8 rounded-lg border bg-card p-8 shadow-sm">
                <img
                    src={author.avatar}
                    alt={`Avatar of ${author.name}`}
                    width={150}
                    height={150}
                    loading="lazy"
                    className="rounded-full shadow-lg flex-shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-4xl font-bold text-foreground">{author.name}</h1>
                    <p className="mt-4 text-lg text-muted-foreground">{author.bio}</p>
                    {author.website && (
                        <a
                            href={author.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                        >
                            Visit Website <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                    )}
                </div>
            </section>
            
            <div className="border-t border-border/40"></div>

            <section aria-labelledby="author-posts-heading">
                <h2 id="author-posts-heading" className="text-3xl font-bold text-center mb-8">
                    Posts by {author.name}
                </h2>
                {authorPosts.length > 0 ? (
                     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {authorPosts.map(post => (
                            <BlogCard key={post.id} post={post} commentCount={getCommentCount(post.slug)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground text-lg">
                            {author.name} hasn't published any posts yet.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AuthorPage;