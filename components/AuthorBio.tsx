
import React from 'react';
import { mockAuthors } from '../constants';

interface AuthorBioProps {
    authorName: string;
}

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

export const AuthorBio: React.FC<AuthorBioProps> = ({ authorName }) => {
    const author = mockAuthors[authorName];

    if (!author) {
        return null;
    }

    return (
        <section className="max-w-3xl mx-auto mt-12" aria-labelledby="author-bio-heading">
            <h2 id="author-bio-heading" className="sr-only">About the author</h2>
            <div className="flex items-start gap-6 rounded-lg border bg-card p-6 shadow-sm">
                <img
                    src={author.avatar}
                    alt={`Avatar of ${author.name}`}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="rounded-full"
                />
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground">{author.name}</h3>
                    <p className="mt-2 text-muted-foreground">{author.bio}</p>
                    {author.website && (
                        <a
                            href={author.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
                        >
                            Visit Website <ExternalLinkIcon className="h-4 w-4" />
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};
