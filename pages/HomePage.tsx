import React, { useState, useMemo, useEffect } from 'react';
import { mockPosts } from '../constants';
import { BlogCard } from '../components/BlogCard';

const POSTS_PER_PAGE = 2; // Set to 2 to demonstrate pagination with 3 posts

const HomePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState({ type: 'all', name: 'All' });

    const allCategories = useMemo(() => [...new Set(mockPosts.flatMap(p => p.categories))], []);
    const allTags = useMemo(() => [...new Set(mockPosts.flatMap(p => p.tags || []))], []);

    const filteredPosts = useMemo(() => {
        if (activeFilter.type === 'all') {
            return mockPosts;
        }
        if (activeFilter.type === 'category') {
            return mockPosts.filter(post => post.categories.includes(activeFilter.name));
        }
        if (activeFilter.type === 'tag') {
            return mockPosts.filter(post => post.tags?.includes(activeFilter.name));
        }
        return mockPosts;
    }, [activeFilter]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter]);
    
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const goToNextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((page) => Math.max(page - 1, 1));
    };

    const handleFilterClick = (type: 'all' | 'category' | 'tag', name: string) => {
        setActiveFilter({ type, name });
    };

    const FilterButton: React.FC<{type: 'all' | 'category' | 'tag', name: string}> = ({ type, name }) => {
        const isActive = activeFilter.type === type && activeFilter.name === name;
        return (
            <button
                onClick={() => handleFilterClick(type, name)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
            >
                {name}
            </button>
        )
    }

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

            <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-center gap-2">
                     <FilterButton type="all" name="All Posts" />
                </div>
                <div>
                    <h2 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">Categories</h2>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {allCategories.map(category => <FilterButton key={category} type="category" name={category} />)}
                    </div>
                </div>
                 <div>
                    <h2 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">Tags</h2>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {allTags.map(tag => <FilterButton key={tag} type="tag" name={tag} />)}
                    </div>
                </div>
            </div>

            {currentPosts.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 min-h-[550px]">
                    {currentPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 min-h-[550px] flex flex-col justify-center">
                    <p className="text-lg text-muted-foreground">No posts found for "{activeFilter.name}".</p>
                </div>
            )}

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