import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

const CommentIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

interface FeaturedBlogCardProps {
    post: Post;
    commentCount?: number;
}

export const FeaturedBlogCard: React.FC<FeaturedBlogCardProps> = ({ post, commentCount }) => {
    return (
        <Link to={`/blog/${post.slug}`} className="group block col-span-1" aria-label={`Read more about ${post.title}`}>
            <div className="flex flex-col h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                <img
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={450}
                    loading="lazy"
                    className="w-full h-56 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-3 flex flex-wrap gap-2">
                        {post.categories.slice(0, 2).map((category) => (
                            <span key={category} className="inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                                {category}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {post.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-auto">
                        <Link to={`/author/${encodeURIComponent(post.author)}`} onClick={(e) => e.stopPropagation()} className="font-medium text-foreground hover:underline z-10 relative">
                           {post.author}
                        </Link>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                         {typeof commentCount === 'number' && (
                            <>
                                <span className="mx-2">•</span>
                                <div className="flex items-center gap-1">
                                    <CommentIcon className="h-3 w-3" />
                                    <span>{commentCount}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};