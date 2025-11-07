import React, { useState } from 'react';
import { Post } from '../types';

interface SocialShareButtonsProps {
    post: Post;
}

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Twitter</title>
        <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.35 0 11.37-6.1 11.37-11.37 0-.17 0-.34-.01-.51.78-.57 1.45-1.28 1.98-2.08z" />
    </svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>LinkedIn</title>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 0 1 2.063-2.065 2.064 2.064 0 0 1 2.063 2.065c0 1.14-.925 2.065-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Facebook</title>
        <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.69v-3.62h3.13V8.41c0-3.1 1.89-4.79 4.66-4.79 1.33 0 2.46.1 2.79.14v3.24h-1.92c-1.5 0-1.79.72-1.79 1.77v2.31h3.59l-.47 3.62h-3.12V24h5.78c.74 0 1.33-.59 1.33-1.32V1.32C24 .59 23.41 0 22.675 0z" />
    </svg>
);

const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);


export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ post }) => {
    const [isCopied, setIsCopied] = useState(false);
    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(post.title);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`,
    };

    const socialPlatforms = [
        { name: 'Twitter', icon: TwitterIcon, href: shareLinks.twitter, colorClass: 'hover:text-[#1DA1F2]' },
        { name: 'LinkedIn', icon: LinkedInIcon, href: shareLinks.linkedin, colorClass: 'hover:text-[#0A66C2]' },
        { name: 'Facebook', icon: FacebookIcon, href: shareLinks.facebook, colorClass: 'hover:text-[#1877F2]' },
    ];

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy link: ', err);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">Share:</span>
            <div className="flex items-center gap-2">
                {socialPlatforms.map(({ name, icon: Icon, href, colorClass }) => (
                    <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Share on ${name}`}
                        className={`p-2 rounded-full text-muted-foreground transition-colors duration-200 hover:bg-accent ${colorClass}`}
                    >
                        <Icon className="w-5 h-5 fill-current" />
                    </a>
                ))}
                 <button
                    onClick={handleCopyLink}
                    aria-label={isCopied ? "Link copied" : "Copy link"}
                    className="p-2 rounded-full text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-foreground"
                >
                    {isCopied ? (
                        <CheckIcon className="w-5 h-5 text-green-500" />
                    ) : (
                        <CopyIcon className="w-5 h-5" />
                    )}
                </button>
            </div>
        </div>
    );
};