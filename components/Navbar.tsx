import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClasses = "text-muted-foreground transition-colors hover:text-foreground";
    const activeNavLinkClasses = { color: 'hsl(var(--primary))', fontWeight: '500' };

    const navLinks = (
        <>
            <NavLink to="/" className={navLinkClasses} style={({ isActive }) => isActive ? activeNavLinkClasses : undefined}>Home</NavLink>
            <NavLink to="/about" className={navLinkClasses} style={({ isActive }) => isActive ? activeNavLinkClasses : undefined}>About</NavLink>
            <NavLink to="/contact" className={navLinkClasses} style={({ isActive }) => isActive ? activeNavLinkClasses : undefined}>Contact</NavLink>
        </>
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="font-bold text-lg text-foreground">
                    Lade Stack Blog
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navLinks}
                    </nav>
                    <SearchBar />
                </div>
                <div className="flex items-center gap-2">
                    <div className="hidden md:block">
                        <ThemeToggle />
                    </div>
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        <span className="sr-only">Toggle menu</span>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden pb-4">
                    <div className="px-4 mb-4">
                        <SearchBar />
                    </div>
                    <nav className="flex flex-col items-center space-y-4 text-base font-medium">
                       {navLinks}
                    </nav>
                     <div className="mt-4 flex justify-center">
                        <ThemeToggle />
                    </div>
                </div>
            )}
        </header>
    );
};
