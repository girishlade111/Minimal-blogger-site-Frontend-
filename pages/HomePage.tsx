
import React, { useState } from 'react';
import { mockPosts } from '../constants';
import { BlogCard } from '../components/BlogCard';

const POSTS_PER_PAGE = 2; // Set to 2 to demonstrate pagination with 3 posts

const HomePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(mockPosts.length / POSTS_PER_PAGE);
    
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = mockPosts.slice(indexOfFirstPost, indexOfLastPost);

    const goToNextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((page) => Math.max(page - 1, 1));
    };

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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 min-h-[550px]">
                {currentPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
            {totalPages > 1 && (
                 <div className="flex justify-center items-center gap-4 pt-8">
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Go to previous page"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-muted-foreground" aria-live="polite">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Go to next page"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;