
import React, { useState } from 'react';

export const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;
        
        console.log('Newsletter signup:', email);
        setSubmitted(true);
        setEmail('');
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <footer className="border-t border-border/40">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Subscribe to our Newsletter</h3>
                        <p className="mt-2 text-muted-foreground">
                            Get the latest articles and updates delivered straight to your inbox.
                        </p>
                    </div>
                    <div>
                        {submitted ? (
                            <div className="flex items-center justify-center h-full text-green-500">
                                <p>Thanks for subscribing!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-grow"
                                    aria-label="Email for newsletter"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                >
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
                    <p>
                        This blog website frontend is created by <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">LadeStack.in</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
