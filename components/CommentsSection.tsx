import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Comment } from '../types';

const ReplyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 17 4 12 9 7" />
        <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);


interface CommentsSectionProps {
    postSlug: string;
}

type SortOption = 'newest' | 'oldest' | 'author';

export const CommentsSection: React.FC<CommentsSectionProps> = ({ postSlug }) => {
    const [comments, setComments] = useLocalStorage<Comment[]>(`comments-${postSlug}`, []);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const formRef = useRef<HTMLFormElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const commentMap = useMemo(() => new Map(comments.map(c => [c.id, c])), [comments]);

    const replyingToAuthor = useMemo(() => {
        if (!replyingTo) return null;
        return commentMap.get(replyingTo)?.author || null;
    }, [replyingTo, commentMap]);

    useEffect(() => {
        if (replyingTo) {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            textareaRef.current?.focus();
        }
    }, [replyingTo]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!author.trim() || !text.trim()) {
            setError('Both name and comment fields are required.');
            return;
        }
        
        const newComment: Comment = {
            id: new Date().toISOString(),
            author: author.trim(),
            text: text.trim(),
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            parentId: replyingTo,
        };

        setComments(prevComments => [...prevComments, newComment]);
        setAuthor('');
        setText('');
        setError('');
        setReplyingTo(null);
    };

    const commentsByParent = useMemo(() => {
        return comments.reduce((acc, comment) => {
            const parentId = comment.parentId || 'root';
            if (!acc[parentId]) {
                acc[parentId] = [];
            }
            acc[parentId].push(comment);
            return acc;
        }, {} as Record<string, Comment[]>);
    }, [comments]);
    
    const renderCommentsTree = (parentId: string = 'root'): React.ReactNode => {
        const childComments = commentsByParent[parentId];
        if (!childComments || childComments.length === 0) return null;
        
        const sortedChildren = [...childComments].sort((a, b) => {
            switch (sortBy) {
                case 'oldest':
                    return new Date(a.id).getTime() - new Date(b.id).getTime();
                case 'author':
                    return a.author.localeCompare(b.author);
                case 'newest':
                default:
                    return new Date(b.id).getTime() - new Date(a.id).getTime();
            }
        });

        return (
            <div className="space-y-6">
                {sortedChildren.map(comment => {
                    const replies = renderCommentsTree(comment.id);
                    return (
                        <div key={comment.id} className="flex space-x-4">
                            <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-secondary">
                                    <span className="text-sm font-medium leading-none text-secondary-foreground">
                                        {comment.author.charAt(0).toUpperCase()}
                                    </span>
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="rounded-md border bg-card p-4">
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-foreground">{comment.author}</p>
                                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">{comment.text}</p>
                                    <button
                                        onClick={() => setReplyingTo(comment.id)}
                                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                                    >
                                        <ReplyIcon className="h-3 w-3" />
                                        Reply
                                    </button>
                                </div>
                                {replies && (
                                     <div className="mt-4 pl-6 border-l-2 border-border/40">
                                        {replies}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <section className="max-w-3xl mx-auto mt-16" aria-labelledby="comments-heading">
             <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                <h2 id="comments-heading" className="text-3xl font-bold">
                    Join the Discussion ({comments.length})
                </h2>
                {comments.length > 0 && (
                    <div className="flex items-center gap-2">
                        <label htmlFor="sort-comments" className="text-sm font-medium text-muted-foreground">
                            Sort by:
                        </label>
                        <select
                            id="sort-comments"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                            aria-label="Sort comments"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="author">Author A-Z</option>
                        </select>
                    </div>
                )}
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-8">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                     <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">
                           {replyingToAuthor ? `Reply to ${replyingToAuthor}` : 'Leave a Comment'}
                        </h3>
                        {replyingTo && (
                            <button
                                type="button"
                                onClick={() => setReplyingTo(null)}
                                className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                            >
                                Cancel Reply <XIcon className="h-3 w-3" />
                            </button>
                        )}
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-foreground mb-1">Name</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Your name"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-1">Comment</label>
                        <textarea
                            id="comment"
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={4}
                            placeholder="What are your thoughts?"
                            required
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        ></textarea>
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                         {replyingTo ? 'Post Reply' : 'Post Comment'}
                    </button>
                </form>
            </div>

            <div className="space-y-6">
                {comments.length > 0 ? (
                    renderCommentsTree('root')
                ) : (
                    <p className="text-center text-muted-foreground py-8">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                )}
            </div>
        </section>
    );
};