# Lade Stack Blog

A professional, minimal, and responsive blog website frontend. Built with React and TailwindCSS for a clean reading experience, featuring a homepage, blog post pages, about, and contact sections with a dark mode toggle.

## ✨ Key Features

-   **Modern & Responsive Design**: Crafted with **React** and **TailwindCSS** for a beautiful and fluid experience across all devices.
-   **Light & Dark Modes**: A sleek theme toggle allows users to switch between light and dark modes, with their preference saved in local storage.
-   **Dynamic Routing**: Utilizes **React Router** for seamless, single-page application (SPA) navigation.
-   **Component-Based Architecture**: A clean and organized structure with reusable components for easy maintenance and scalability.
-   **SEO Optimized**: Blog post pages dynamically generate essential **meta tags** (title, description, Open Graph, Twitter Cards) for improved search engine visibility and social sharing.
-   **Interactive User Experience**:
    -   **Live Search**: Instantly search and find blog posts with highlighted results.
    -   **Post Filtering**: Easily filter posts on the homepage by **category**, **tag**, or **status** (Published/Draft).
    -   **Client-Side Comments**: A fully functional comments section on each post that persists data using browser `localStorage`.
    -   **Social Sharing**: Integrated buttons to share articles on Twitter, LinkedIn, Facebook, or copy the link.
-   **Comprehensive Homepage**: A feature-rich landing page including:
    -   A prominent hero section with calls-to-action.
    -   A grid of featured posts.
    -   An "Explore Topics" section to guide users.
    -   Testimonials for social proof.
    -   An author spotlight to build a personal connection.
-   **Developer Focused**: Clean, readable code written in **TypeScript**, with clear separation of concerns.

## 📂 Project Structure

The project follows a logical and organized file structure to make development and maintenance straightforward.

```
/
├── index.html                # The main HTML entry point for the application
├── metadata.json             # Project metadata
├── readme.md                 # Project documentation (this file)
└── src/
    ├── App.tsx                 # Main application component, handles routing
    ├── index.tsx               # React root entry point
    ├── constants.ts            # Mock data for posts, authors, categories, etc.
    ├── types.ts                # TypeScript type definitions and interfaces
    ├── components/
    │   ├── AuthorBio.tsx         # Author biography component for post pages
    │   ├── BlogCard.tsx        # Standard card for displaying a blog post
    │   ├── CommentsSection.tsx # Handles comment form and display logic
    │   ├── FeaturedBlogCard.tsx# Larger card for featured posts
    │   ├── Footer.tsx          # Site-wide footer with newsletter signup
    │   ├── Navbar.tsx          # Site-wide navigation bar
    │   ├── ScrollProgressBar.tsx # Progress bar that tracks reading progress
    │   ├── SearchBar.tsx       # Search input component
    │   ├── SocialShareButtons.tsx # Social media sharing component
    │   └── ThemeToggle.tsx     # Light/Dark mode toggle button
    ├── hooks/
    │   ├── useLocalStorage.tsx # Custom hook for persisting state to localStorage
    │   └── useTheme.tsx        # Hook and provider for theme management
    └── pages/
        ├── AboutPage.tsx       # The "About Us" page
        ├── AdminPage.tsx       # Placeholder for a future admin dashboard
        ├── BlogPostPage.tsx    # Detailed view for a single blog post
        ├── ContactPage.tsx     # The "Contact Us" page with a form
        ├── HomePage.tsx        # The main landing page of the blog
        └── SearchResultsPage.tsx # Displays results from the search bar
```

## 🚀 Getting Started & Usage Guide

This blog frontend is designed to be easily customizable. All the content, including blog posts, authors, and categories, is managed from a single file.

### How to Add or Edit Blog Posts

1.  Navigate to the `src/constants.ts` file.
2.  Find the `mockPosts` array.
3.  To **add a new post**, create a new object in the array following the `Post` interface defined in `src/types.ts`.
4.  To **edit an existing post**, simply modify the properties of the corresponding object in the array.
5.  Set the `status` property to `'published'` to make it visible to regular users, or `'draft'` to keep it hidden in the drafts tab on the homepage.

### How the Comments Section Works

-   The comments functionality is powered by the `useLocalStorage` custom hook.
-   When a user submits a comment on a blog post, it is saved directly into the browser's **local storage**.
-   The comments are uniquely stored for each post based on the post's `slug`. This means all comments are client-side and will persist on that user's browser.

## 🛠️ Technology Stack

-   **Frontend Library**: [React](https://reactjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [TailwindCSS](https://tailwindcss.com/)
-   **Routing**: [React Router](https://reactrouter.com/)

---

Created by [LadeStack.in](https://ladestack.in)
