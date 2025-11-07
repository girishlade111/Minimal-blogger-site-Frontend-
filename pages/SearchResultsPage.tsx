import React, { useMemo } from 'react';
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

    const filteredPosts = useMemo(() => {
        if (!query) {
            return [];
        }
        const lowercasedQuery = query.toLowerCase();
        // Strip HTML tags from content for better search accuracy
        const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');

        return mockPosts.filter(post =>
            post.title.toLowerCase().includes(lowercasedQuery) ||
            post.description.toLowerCase().includes(lowercasedQuery) ||
            stripHtml(post.content.toLowerCase()).includes(lowercasedQuery)
        );
    }, [query]);

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
                    <p className="text-muted-foreground text-lg">No posts found matching your search.</p>
                    <Link to="/" className="text-primary hover:underline mt-4 inline-block">
                        Back to Home
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;
