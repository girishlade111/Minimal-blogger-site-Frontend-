
import React from 'react';

const AdminPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-[50vh] animate-fade-in">
            <div className="max-w-md w-full text-center">
                 <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
                    <h1 className="text-2xl font-semibold text-foreground mb-4">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground mb-6">
                        Coming soon – Supabase integration in progress.
                    </p>
                    <button
                        disabled
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full opacity-50 cursor-not-allowed"
                    >
                        Login
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default AdminPage;
