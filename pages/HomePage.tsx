
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockPosts, categoryDetails, whyReadItems, testimonials, mockAuthors } from '../constants';
import { BlogCard } from '../components/BlogCard';
import { FeaturedBlogCard } from '../components/FeaturedBlogCard';
import { Comment, Post } from '../types';

const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);
const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.72c0 .27.16.59.67.5A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"></path></svg>
);
const PaletteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><path d="M12 2a7 7 0 1 0 10 10"></path></svg>
);
const CloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
);
const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 18h6v-2.48c0-.79.31-1.54.88-2.12l1.62-1.62c.98-.98 1.5-2.31 1.5-3.78 0-4.41-3.59-8-8-8s-8 3.59-8 8c0 1.47.52 2.8 1.5 3.78l1.62 1.62c.57.57.88 1.33.88 2.12V18z"></path><path d="M12 22v-2"></path><path d="M8.5 14.5h7"></path></svg>
);
const BookOpenIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
const TrendUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    BrainCircuitIcon, CodeIcon, PaletteIcon, CloudIcon, BookOpenIcon, TrendUpIcon, LightbulbIcon
};

const POSTS_PER_PAGE = 6;

interface CommentWithPostInfo extends Comment {
    postSlug: string;
    postTitle: string;
}

const HomePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilters, setActiveFilters] = useState<{ type: 'category' | 'tag' | 'author'; name: string }[]>([]);
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
    const allAuthors = useMemo(() => [...new Set(mockPosts.map(p => p.author))], []);

    const postsToFilter = postStatusFilter === 'published' ? regularPosts : draftPosts;

    const filteredPosts = useMemo(() => {
        if (activeFilters.length === 0) return postsToFilter;

        return postsToFilter.filter(post => {
            return activeFilters.every(filter => {
                if (filter.type === 'category') {
                    return post.categories.includes(filter.name);
                }
                if (filter.type === 'tag') {
                    return post.tags?.includes(filter.name);
                }
                if (filter.type === 'author') {
                    return post.author === filter.name;
                }
                return false;
            });
        });
    }, [activeFilters, postsToFilter]);

    useEffect(() => { setCurrentPage(1); }, [activeFilters, postStatusFilter]);
    
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    
    const recentComments = useMemo((): CommentWithPostInfo[] => {
        if (typeof window === 'undefined') return [];

        const allComments: CommentWithPostInfo[] = [];
        const postTitleMap = new Map(mockPosts.map(p => [p.slug, p.title]));

        for (let i = 0; i < window.localStorage.length; i++) {
            const key = window.localStorage.key(i);
            if (key && key.startsWith('comments-')) {
                try {
                    const slug = key.replace('comments-', '');
                    const postTitle = postTitleMap.get(slug);
                    if (!postTitle) continue;

                    const storedComments: Comment[] = JSON.parse(window.localStorage.getItem(key) || '[]');
                    if (Array.isArray(storedComments)) {
                        const commentsWithPostInfo = storedComments.map(comment => ({
                            ...comment,
                            postSlug: slug,
                            postTitle: postTitle,
                        }));
                        allComments.push(...commentsWithPostInfo);
                    }
                } catch (error) {
                    console.error(`Error parsing comments from localStorage for key ${key}`, error);
                }
            }
        }

        allComments.sort((a, b) => b.id.localeCompare(a.id));

        return allComments.slice(0, 3);
    }, []);

    const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPages));
    const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1));
    
    const handleFilterClick = (type: 'category' | 'tag' | 'author', name: string) => {
        setActiveFilters(prevFilters => {
            const existingFilterIndex = prevFilters.findIndex(f => f.type === type && f.name === name);
            if (existingFilterIndex > -1) {
                return prevFilters.filter((_, index) => index !== existingFilterIndex);
            } else {
                return [...prevFilters, { type, name }];
            }
        });
    };

    return (
        <div className="space-y-16 md:space-y-24">
            <section className="text-center py-16 md:py-24 animate-fade-in">
                <h1 className="text-5xl font-extrabold tracking-tighter text-foreground sm:text-6xl lg:text-7xl">
                    Where Code Meets Creativity
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
                    A curated blog for developers, designers, and tech enthusiasts. Dive into topics from AI and cloud to minimal UI design.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <a href="#latest-posts" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                        Start Reading
                    </a>
                    <Link to="/about" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
                        Learn More
                    </Link>
                </div>
            </section>

            {postStatusFilter === 'published' && featuredPosts.length > 0 && (
                <section aria-labelledby="featured-posts-heading">
                    <h2 id="featured-posts-heading" className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-8">
                        Featured Posts
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {featuredPosts.map((post) => (
                            <FeaturedBlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </section>
            )}

            <div className="border-t border-border/40"></div>

            <section aria-labelledby="explore-topics-heading">
                <h2 id="explore-topics-heading" className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
                    Explore Topics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categoryDetails.map((category) => {
                        const Icon = iconMap[category.Icon];
                        return (
                            <div key={category.name} className="p-6 rounded-lg border bg-card text-card-foreground text-center flex flex-col items-center transition-transform duration-300 hover:-translate-y-2">
                                <div className="flex-shrink-0 mb-4 p-3 bg-primary/10 rounded-full">
                                    <Icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">{category.name}</h3>
                                <p className="text-muted-foreground text-sm flex-grow">{category.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section aria-labelledby="why-read-heading" className="py-16 bg-secondary rounded-lg">
                <div className="container mx-auto px-4">
                    <h2 id="why-read-heading" className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
                        Why Read Lade Stack?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                        {whyReadItems.map((item) => {
                            const Icon = iconMap[item.Icon];
                            return (
                                <div key={item.title} className="flex flex-col items-center">
                                    <div className="flex-shrink-0 mb-4 p-3 bg-background border rounded-full">
                                        <Icon className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section aria-labelledby="testimonials-heading">
                <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl mb-12">
                    What Our Readers Say
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <blockquote key={index} className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                            <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                            <footer className="font-semibold text-foreground">{testimonial.name}, <span className="text-sm text-muted-foreground font-normal">{testimonial.title}</span></footer>
                        </blockquote>
                    ))}
                </div>
            </section>

            <section aria-labelledby="author-spotlight-heading">
                <div className="grid md:grid-cols-3 gap-8 items-center bg-card border rounded-lg p-8">
                    <div className="md:col-span-1 flex justify-center">
                        <img src={mockAuthors['Girish Lade'].avatar} alt={mockAuthors['Girish Lade'].name} width={150} height={150} className="rounded-full shadow-lg"/>
                    </div>
                    <div className="md:col-span-2 text-center md:text-left">
                        <h2 id="author-spotlight-heading" className="text-2xl font-bold text-foreground">About the Author</h2>
                        <p className="mt-4 text-muted-foreground">{mockAuthors['Girish Lade'].bio}</p>
                        <Link to="/about" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 mt-6">
                            Read More About Girish
                        </Link>
                    </div>
                </div>
            </section>

            <div className="border-t border-border/40"></div>
            
            <section className="space-y-8" aria-labelledby="latest-posts-heading" id="latest-posts">
                <div className="space-y-6">
                    <h2 id="latest-posts-heading" className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl">
                        Latest Posts
                    </h2>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                         <button
                            onClick={() => setActiveFilters([])}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                activeFilters.length === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                        >
                            All
                        </button>
                    </div>
                    <div>
                        <h3 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">Categories</h3>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {allCategories.map(category => {
                                const isActive = activeFilters.some(f => f.type === 'category' && f.name === category);
                                return (
                                    <button
                                        key={category}
                                        onClick={() => handleFilterClick('category', category)}
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                            isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">Tags</h3>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                             {allTags.map(tag => {
                                const isActive = activeFilters.some(f => f.type === 'tag' && f.name === tag);
                                return (
                                    <button
                                        key={tag}
                                        onClick={() => handleFilterClick('tag', tag)}
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                            isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-center text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-4">Authors</h3>
                        <div className="flex flex-wrap items-center justify-center gap-2">
                             {allAuthors.map(author => {
                                const isActive = activeFilters.some(f => f.type === 'author' && f.name === author);
                                return (
                                    <button
                                        key={author}
                                        onClick={() => handleFilterClick('author', author)}
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                            isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                    >
                                        {author}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-b border-border/40">
                    <div className="flex justify-center space-x-4">
                        <button onClick={() => setPostStatusFilter('published')} className={`pb-2 text-sm font-semibold transition-colors ${postStatusFilter === 'published' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                            Published ({mockPosts.filter(p => p.status === 'published').length})
                        </button>
                        <button onClick={() => setPostStatusFilter('draft')} className={`pb-2 text-sm font-semibold transition-colors ${postStatusFilter === 'draft' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                            Drafts ({mockPosts.filter(p => p.status === 'draft').length})
                        </button>
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
                        <p className="text-lg text-muted-foreground">
                             {activeFilters.length > 0
                                ? `No ${postStatusFilter} posts found for the selected filters.`
                                : `No ${postStatusFilter} posts found.`
                            }
                        </p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 pt-8">
                        <button onClick={goToPreviousPage} disabled={currentPage === 1} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Go to previous page">
                            Previous
                        </button>
                        <span className="text-sm text-muted-foreground" aria-live="polite">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button onClick={goToNextPage} disabled={currentPage === totalPages} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Go to next page">
                            Next
                        </button>
                    </div>
                )}
            </section>
            
            <div className="border-t border-border/40"></div>

            <section aria-labelledby="recent-comments-heading" className="space-y-8">
                <h2 id="recent-comments-heading" className="text-3xl font-bold tracking-tight text-center text-foreground sm:text-4xl">
                    Recent Comments
                </h2>
                {recentComments.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                        {recentComments.map(comment => (
                            <div key={comment.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-secondary">
                                            <span className="text-sm font-medium leading-none text-secondary-foreground">
                                                {comment.author.charAt(0).toUpperCase()}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-foreground">{comment.author}</p>
                                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                                    </div>
                                </div>
                                <blockquote className="mt-4 text-muted-foreground italic border-l-2 border-primary pl-4 text-sm flex-grow">
                                    "{comment.text.length > 100 ? `${comment.text.substring(0, 100)}...` : comment.text}"
                                </blockquote>
                                <Link to={`/blog/${comment.postSlug}`} className="text-sm text-primary hover:underline mt-4 self-start">
                                    on "{comment.postTitle}"
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">No recent comments to show.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;
