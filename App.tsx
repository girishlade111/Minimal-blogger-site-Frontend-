import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { mockPosts, demoComments } from './constants';
import { Comment } from './types';

import HomePage from './pages/HomePage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AuthorPage from './pages/AuthorPage';

// A helper component to scroll to top on route change
const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App: React.FC = () => {
    React.useEffect(() => {
        const seedInitialComments = () => {
            if (typeof window === 'undefined' || window.localStorage.getItem('comments_seeded')) {
                return;
            }

            const postMap = new Map(mockPosts.map(p => [p.id, p.slug]));

            Object.entries(demoComments).forEach(([postId, comments]) => {
                const slug = postMap.get(Number(postId));
                if (slug) {
                    const commentsToStore: Comment[] = comments.map((comment, index) => ({
                        ...comment,
                        id: new Date(Date.now() - (Number(postId) * 100000) - (index * 60000)).toISOString(),
                        date: new Date(Date.now() - (Number(postId) * 100000) - (index * 60000)).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }),
                        parentId: null,
                    }));
                    window.localStorage.setItem(`comments-${slug}`, JSON.stringify(commentsToStore));
                }
            });

            window.localStorage.setItem('comments_seeded', 'true');
        };

        seedInitialComments();
    }, []);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="lade-stack-blog-theme">
            <div className="flex flex-col min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
                <Navbar />
                <ScrollToTop />
                <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchResultsPage />} />
                        <Route path="/blog/:slug" element={<BlogPostPage />} />
                        <Route path="/author/:authorName" element={<AuthorPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default App;