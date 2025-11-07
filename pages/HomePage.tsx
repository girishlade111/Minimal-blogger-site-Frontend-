
import React from 'react';
import { mockPosts } from '../constants';
import { BlogCard } from '../components/BlogCard';

const HomePage: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Latest Insights & Ideas
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Welcome to our blog. Discover articles on technology, design, and business.
                </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {mockPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
