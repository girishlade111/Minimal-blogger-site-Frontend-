
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface BlogCardProps {
    post: Post;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <Link to={`/blog/${post.slug}`} className="group block">
            <div className="flex flex-col h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <img
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    loading="lazy"
                    className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-2 flex flex-wrap gap-2">
                        {post.categories.map((category) => (
                            <span key={category} className="inline-block bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                                {category}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {post.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-auto">
                        <span>{post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};