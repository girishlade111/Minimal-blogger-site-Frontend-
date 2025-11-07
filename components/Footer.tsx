
import React, { useState } from 'react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const CodepenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
    <line x1="12" y1="22" x2="12" y2="15.5"></line>
    <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
    <line x1="2" y1="15.5" x2="12" y2="8.5"></line>
    <line x1="22" y1="15.5" x2="12" y2="8.5"></line>
    <line x1="12" y1="2" x2="12" y2="8.5"></line>
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/girish_lade_/', Icon: InstagramIcon },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/girish-lade-075bba201/', Icon: LinkedInIcon },
    { name: 'GitHub', href: 'https://github.com/girishlade111', Icon: GithubIcon },
    { name: 'Codepen', href: 'https://codepen.io/Girish-Lade-the-looper', Icon: CodepenIcon },
    { name: 'Email', href: 'mailto:girishlade111@gmail.com', Icon: MailIcon }
];

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

                <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm">
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <p className="font-semibold text-foreground">Connect with me</p>
                        <div className="flex gap-6">
                            {socialLinks.map(({ name, href, Icon }) => (
                                <a
                                    key={name}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Connect on ${name}`}
                                    className="text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Icon className="h-6 w-6" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <p className="text-muted-foreground">
                        This blog website frontend is created by <a href="https://ladestack.in" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline-offset-4 hover:underline">LadeStack.in</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};
