# Lade Stack Blog — Minimal Blogger Site (Frontend)

A professional, minimal, and responsive blog website frontend. Built with React, TypeScript, and TailwindCSS for a clean reading experience, with a homepage, blog post pages, about, and contact sections plus a dark mode toggle.

## Features

- **Modern & responsive design** — React + TailwindCSS, fluid across all devices
- **Light & dark modes** — theme toggle persisted to `localStorage`
- **Dynamic routing** — React Router single-page-app navigation
- **Component-based architecture** — clean, reusable components
- **SEO optimized** — blog post pages dynamically generate meta tags (title, description, Open Graph, Twitter Cards)
- **Live search** — instant post search with highlighted results
- **Post filtering** — filter homepage posts by category, tag, or status (published/draft)
- **Client-side comments** — comments section persisted via browser `localStorage` (per-post slug), with one-time seeded sample comments for new visitors
- **Social sharing** — share articles on Twitter, LinkedIn, Facebook, or copy the link
- **Feature-rich homepage** — hero section, featured posts grid, "Explore Topics", testimonials, author spotlight
- **Author profiles** — per-author bio and post listing pages
- **AI Studio live view** — optional Gemini-powered page (requires `GEMINI_API_KEY`)
- **Developer friendly** — TypeScript, clean separation of concerns

## Tech Stack

- **Frontend library:** [React 19](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Build tool:** [Vite 6](https://vitejs.dev/)
- **Optional AI:** [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini)

## Quick Start

**Prerequisites:** Node.js 18+ and npm.

```bash
npm install
npm run dev
```

The app starts at `http://localhost:3000`.

Optional: to enable the Gemini-powered Live page, create a `.env.local` file with:

```
GEMINI_API_KEY=your-key-here
```

Without the key the rest of the site works normally; only the AI feature is inactive.

## Build for Production

```bash
npm run build        # outputs to dist/
npm run preview      # preview the production build locally
```

## Project Structure

```
/
├── index.html              # HTML entry point
├── index.tsx               # React root entry point
├── App.tsx                 # Routing (React Router)
├── constants.ts            # All content: posts, authors, categories (edit here)
├── types.ts                # TypeScript interfaces
├── vite.config.ts          # Vite config (injects GEMINI_API_KEY at build time)
├── components/             # Reusable UI components
│   ├── Navbar.tsx, Footer.tsx, ThemeToggle.tsx
│   ├── BlogCard.tsx, FeaturedBlogCard.tsx
│   ├── CommentsSection.tsx, SearchBar.tsx
│   ├── SocialShareButtons.tsx, ScrollProgressBar.tsx
│   ├── AuthorBio.tsx, CodeSnippet.tsx
├── hooks/                  # useLocalStorage, useTheme
└── pages/                  # Route pages
    ├── HomePage.tsx, BlogPostPage.tsx
    ├── AboutPage.tsx, ContactPage.tsx
    ├── AuthorPage.tsx, SearchResultsPage.tsx
    ├── AdminPage.tsx (placeholder), LivePage.tsx (Gemini AI)
```

### How to Add or Edit Blog Posts

1. Open `constants.ts` and find the `mockPosts` array.
2. Add a new object following the `Post` interface in `types.ts`, or edit an existing entry.
3. Set `status: 'published'` to show it publicly, or `'draft'` to keep it in the drafts tab.

### How the Comments Section Works

Comments are stored in the browser's `localStorage`, keyed by post slug — fully client-side, no backend required. A one-time seeding script populates sample comments for new visitors.

## Deploy Notes

This is a static Vite build (no backend). Production deploy: `npm run build`, then serve the `dist/` directory on any static host (GitHub Pages, Cloudflare Pages, Netlify, Vercel). If you need the Gemini Live page in production, set `GEMINI_API_KEY` as a build-time environment variable.

## Roadmap

- [ ] Admin dashboard for managing posts from the UI
- [ ] Real backend-backed comments (optional)
- [ ] RSS feed generation

---

Built by Girish Lade — [ladestack.in](https://ladestack.in)
