
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

export const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [history, setHistory] = useLocalStorage<string[]>('search-history', []);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
            setHistory(prevHistory => {
                const newHistory = [trimmedQuery, ...prevHistory.filter(h => h.toLowerCase() !== trimmedQuery.toLowerCase())];
                return newHistory.slice(0, 5);
            });
            navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
            setQuery('');
            setIsHistoryVisible(false);
        }
    };

    const handleHistoryClick = (searchQuery: string) => {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setIsHistoryVisible(false);
        // We don't setQuery here to prevent the input from briefly showing the old query
    };

    const handleClearHistory = (e: React.MouseEvent) => {
        e.stopPropagation();
        setHistory([]);
        setIsHistoryVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsHistoryVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full max-w-xs" ref={containerRef}>
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsHistoryVisible(true)}
                    placeholder="Search posts..."
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Search posts"
                    autoComplete="off"
                />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3" aria-label="Submit search">
                    <SearchIcon className="h-4 w-4 text-muted-foreground" />
                </button>
            </form>
            {isHistoryVisible && history.length > 0 && (
                <div className="absolute top-full mt-2 w-full rounded-md border bg-card text-card-foreground shadow-lg z-20 py-2 animate-fade-in" style={{ animationDuration: '0.2s' }}>
                    <div className="flex justify-between items-center px-3 pb-2 border-b">
                        <span className="text-sm font-semibold text-foreground">Recent Searches</span>
                        <button
                            onClick={handleClearHistory}
                            className="text-xs text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                        >
                            Clear
                        </button>
                    </div>
                    <ul>
                        {history.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleHistoryClick(item)}
                                    className="w-full text-left px-3 py-2 flex items-center gap-2 text-sm text-muted-foreground hover:bg-accent focus:outline-none focus:bg-accent"
                                >
                                    <ClockIcon className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{item}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
