
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-border/40">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
                <p>
                    This blog website frontend is created by <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">LadeStack.in</a>
                </p>
            </div>
        </footer>
    );
};
