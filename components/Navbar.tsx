import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    const navLinkClasses = "text-muted-foreground transition-colors hover:text-foreground";
    const activeNavLinkClasses = { color: 'hsl(var(--primary))', fontWeight: '500' };

    const navLinks = (
        <>
            <NavLink to="/" className={navLinkClasses} style={({ isActive }) => isActive ? activeNavLinkClasses : undefined} onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" className={navLinkClasses} style={({ isActive }) => isActive ? activeNavLinkClasses : undefined} onClick={closeMenu}>About</NavLink>
            <NavLink to="/contact" className={navLinkClasses} style={({ isActive }) => isActive ? activeNavLinkClasses : undefined} onClick={closeMenu}>Contact</NavLink>
        </>
    );
    
    const desktopNavLinks = (
         <>
            <NavLink to="/" className={navLinkClasses} style={({ isActive }) => isActive ? activeNavLinkClasses : undefined}>Home</NavLink>
            <NavLink to="/about" className={navLinkClasses} style={({ isActive }) => isActive ? activeNavLinkClasses : undefined}>About</NavLink>
            <NavLink to="/contact" className={navLinkClasses} style={({ isActive }) => isActive ? activeNavLinkClasses : undefined}>Contact</NavLink>
        </>
    );

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="font-bold text-lg text-foreground" onClick={closeMenu}>
                        Lade Stack Blog
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex items-center space-x-6 text-sm font-medium">
                            {desktopNavLinks}
                        </nav>
                        <SearchBar />
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            className="p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                            <span className="sr-only">Toggle menu</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm animate-fade-in"
                    style={{ animationDuration: '0.3s' }}
                >
                    <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center gap-8">
                        <nav className="flex flex-col items-center gap-8 text-xl font-medium">
                            {navLinks}
                        </nav>
                        <div className="w-full max-w-sm">
                           <SearchBar />
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            )}
        </>
    );
};