
import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Comment } from '../types';

interface CommentsSectionProps {
    postSlug: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ postSlug }) => {
    const [comments, setComments] = useLocalStorage<Comment[]>(`comments-${postSlug}`, []);
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');

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
        };

        setComments(prevComments => [newComment, ...prevComments]);
        setAuthor('');
        setText('');
        setError('');
    };

    return (
        <section className="max-w-3xl mx-auto mt-16" aria-labelledby="comments-heading">
            <h2 id="comments-heading" className="text-3xl font-bold mb-8">
                Join the Discussion ({comments.length})
            </h2>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-semibold">Leave a Comment</h3>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-foreground mb-1">Name</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Your name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-1">Comment</label>
                        <textarea
                            id="comment"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            rows={4}
                            placeholder="What are your thoughts?"
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        ></textarea>
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Post Comment
                    </button>
                </form>
            </div>

            <div className="space-y-6">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="flex space-x-4">
                             <div className="flex-shrink-0">
                                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-secondary">
                                    <span className="text-sm font-medium leading-none text-secondary-foreground">
                                        {comment.author.charAt(0).toUpperCase()}
                                    </span>
                                </span>
                            </div>
                            <div className="flex-1 rounded-md border bg-card p-4">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-foreground">{comment.author}</p>
                                    <p className="text-xs text-muted-foreground">{comment.date}</p>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">{comment.text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-8">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                )}
            </div>
        </section>
    );
};
