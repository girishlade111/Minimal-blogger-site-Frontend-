
import React, { useState, useMemo, useEffect } from 'react';
import { mockPosts } from '../constants';
import { BlogCard } from '../components/BlogCard';
import { FeaturedBlogCard } from '../components/FeaturedBlogCard';
import { Comment } from '../types';

const POSTS_PER_PAGE = 2; // Set to 2 to demonstrate pagination with 3 posts

const getCommentCount = (slug: string): number => {
    if (typeof window === 'undefined') {
        return 0;
    }
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


const HomePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState({ type: 'all', name: 'All' });
    const [postStatusFilter, setPostStatusFilter] = useState<'published' | 'draft'>('published');

    const { featuredPosts, regularPosts, draftPosts } = useMemo(() => {
        const published = mockPosts.filter(p => p.status === 'published');
        const drafts = mockPosts.filter(p => p.status === 'draft');
        return {
            featuredPosts: published.slice(0, 2),
            regularPosts: published.slice(2),
            draftPosts: drafts,
        };
    }, []);

    const allCategories = useMemo(() => [...new Set(mockPosts.flatMap(p => p.categories))], []);
    const allTags = useMemo(() => [...new Set(mockPosts.flatMap(p => p.tags || []))], []);

    const postsToFilter = postStatusFilter === 'published' ? regularPosts : draftPosts;

    const filteredPosts = useMemo(() => {
        if (activeFilter.type === 'all') {
            return postsToFilter;
        }
        if (activeFilter.type === 'category') {
            return postsToFilter.filter(post => post.categories.includes(activeFilter.name));
        }
        if (activeFilter.type === 'tag') {
            return postsToFilter.filter(post => post.tags?.includes(activeFilter.name));
        }
        return postsToFilter;
    }, [activeFilter, postsToFilter]);


    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, postStatusFilter]);
    
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
        <div className="animate-fade-in space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Latest Insights & Ideas
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Welcome to our blog. Discover articles on technology, design, and business.
                </p>
            </div>

            {postStatusFilter === 'published' && featuredPosts.length > 0 && (
                <section aria-labelledby="featured-posts-heading">
                    <h2 id="featured-posts-heading" className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-8">
                        Featured Posts
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {featuredPosts.map((post) => (
                            <FeaturedBlogCard key={post.id} post={post} commentCount={getCommentCount(post.slug)} />
                        ))}
                    </div>
                </section>
            )}

            {postStatusFilter === 'published' && featuredPosts.length > 0 && <div className="border-t border-border/40"></div>}
            
            <section className="space-y-8" aria-labelledby="all-posts-heading">
                <div className="space-y-6">
                    <h2 id="all-posts-heading" className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl">
                        All Posts
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <FilterButton type="all" name="All Posts" />
                    </div>
                    <div>
                        <h3 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">Categories</h3>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {allCategories.map(category => <FilterButton key={category} type="category" name={category} />)}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">Tags</h3>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {allTags.map(tag => <FilterButton key={tag} type="tag" name={tag} />)}
                        </div>
                    </div>
                </div>

                <div className="border-b border-border/40">
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => setPostStatusFilter('published')}
                            className={`pb-2 text-sm font-semibold transition-colors ${
                                postStatusFilter === 'published'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Published ({mockPosts.filter(p => p.status === 'published').length})
                        </button>
                        <button
                            onClick={() => setPostStatusFilter('draft')}
                            className={`pb-2 text-sm font-semibold transition-colors ${
                                postStatusFilter === 'draft'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            Drafts ({mockPosts.filter(p => p.status === 'draft').length})
                        </button>
                    </div>
                </div>


                {currentPosts.length > 0 ? (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 min-h-[550px]">
                        {currentPosts.map((post) => (
                            <BlogCard key={post.id} post={post} commentCount={getCommentCount(post.slug)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 min-h-[550px] flex flex-col justify-center">
                        <p className="text-lg text-muted-foreground">
                            {activeFilter.type !== 'all' 
                                ? `No ${postStatusFilter} posts found for "${activeFilter.name}".`
                                : `No ${postStatusFilter} posts found.`
                            }
                        </p>
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
            </section>
        </div>
    );
};

export default HomePage;
