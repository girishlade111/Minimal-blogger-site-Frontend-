import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { mockPosts } from '../constants';
import { BlogCard } from '../components/BlogCard';

const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) {
        return text;
    }
    
    const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const safeQuery = escapeRegExp(query.trim());

    if (!safeQuery) return text;

    const parts = text.split(new RegExp(`(${safeQuery})`, 'gi'));
    
    return (
        <>
            {parts.map((part, index) =>
                part.toLowerCase() === query.trim().toLowerCase() ? (
                    <mark key={index} className="bg-primary/30 rounded font-semibold">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </>
    );
};

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [activeFilter, setActiveFilter] = useState({ type: 'all' as 'all' | 'category' | 'tag', name: 'All' });

    const allCategories = useMemo(() => [...new Set(mockPosts.flatMap(p => p.categories))], []);
    const allTags = useMemo(() => [...new Set(mockPosts.flatMap(p => p.tags || []))], []);

    const initialResults = useMemo(() => {
        if (!query) {
            return [];
        }
        const lowercasedQuery = query.toLowerCase();
        const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

        return mockPosts.filter(post =>
            post.title.toLowerCase().includes(lowercasedQuery) ||
            post.description.toLowerCase().includes(lowercasedQuery) ||
            stripHtml(post.content.toLowerCase()).includes(lowercasedQuery)
        );
    }, [query]);

    const filteredPosts = useMemo(() => {
        if (activeFilter.type === 'all') {
            return initialResults;
        }
        if (activeFilter.type === 'category') {
            return initialResults.filter(post => post.categories.includes(activeFilter.name));
        }
        if (activeFilter.type === 'tag') {
            return initialResults.filter(post => post.tags?.includes(activeFilter.name));
        }
        return initialResults;
    }, [initialResults, activeFilter]);

    const handleFilterClick = (type: 'category' | 'tag', name: string) => {
        if (activeFilter.type === type && activeFilter.name === name) {
            setActiveFilter({ type: 'all', name: 'All' });
        } else {
            setActiveFilter({ type, name });
        }
    };

    const FilterButton: React.FC<{type: 'category' | 'tag', name: string}> = ({ type, name }) => {
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
        );
    };

    return (
        <div className="animate-fade-in space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Search Results
                </h1>
                {query && (
                    <p className="mt-4 text-lg text-muted-foreground">
                        Showing results for: <span className="font-semibold text-foreground">"{query}"</span>
                    </p>
                )}
            </div>
            
            {initialResults.length > 0 && (
                 <div className="space-y-6 border-b border-t border-border/40 py-6">
                    <div>
                        <h2 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">Filter by Category</h2>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {allCategories.map(category => <FilterButton key={category} type="category" name={category} />)}
                        </div>
                    </div>
                     <div>
                        <h2 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mt-6 mb-4">Filter by Tag</h2>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {allTags.map(tag => <FilterButton key={tag} type="tag" name={tag} />)}
                        </div>
                    </div>
                     {activeFilter.type !== 'all' && (
                        <div className="text-center mt-6">
                            <button
                                onClick={() => setActiveFilter({ type: 'all', name: 'All' })}
                                className="text-sm text-primary hover:underline underline-offset-4"
                            >
                                Clear Filter
                            </button>
                        </div>
                    )}
                </div>
            )}


            {filteredPosts.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <BlogCard 
                          key={post.id} 
                          post={post}
                          highlightedTitle={highlightText(post.title, query)}
                          highlightedDescription={highlightText(post.description, query)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-muted-foreground text-lg">
                        {activeFilter.type !== 'all' 
                            ? `No posts found for "${query}" with the filter "${activeFilter.name}".`
                            : 'No posts found matching your search.'
                        }
                    </p>
                    <Link to="/" className="text-primary hover:underline mt-4 inline-block">
                        Back to Home
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;