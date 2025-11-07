import { Post, Author } from './types';

export const mockAuthors: { [key: string]: Author } = {
  'Girish Lade': {
    name: 'Girish Lade',
    bio: 'Girish is a passionate software engineer with a love for clean code, elegant design, and exploring the frontiers of technology. He founded Lade Stack to share knowledge and build a community of developers and creators.',
    avatar: 'https://i.pravatar.cc/150?u=girish-lade',
    website: 'https://ladestack.in',
  }
};

export const mockPosts: Post[] = [
  {
    id: 4,
    title: 'The Future of Frontend: A 2026 Outlook',
    slug: 'future-of-frontend-2026',
    description: 'Exploring upcoming trends in frontend development, including new frameworks, tooling, and performance optimization techniques.',
    author: 'Girish Lade',
    date: 'November 10, 2025',
    image: 'https://picsum.photos/seed/frontend-2026/800/400',
    categories: ['Web Development', 'Technology'],
    tags: ['React', 'Vue', 'WebAssembly', 'Performance'],
    status: 'published',
    content: `
      The world of frontend development is in a constant state of flux. As we look towards 2026, several key trends are emerging that will shape the way we build web applications.
      From the maturation of WebAssembly to the rise of meta-frameworks and server-side rendering, the focus is shifting towards better performance, developer experience, and more powerful user interfaces.
      <br/><br/>
      This article explores the technologies and methodologies that are poised to dominate the frontend landscape. We'll discuss the evolution of existing tools like React and Vue, the potential impact of new languages, and the increasing importance of edge computing for delivering fast, personalized experiences to users worldwide.
    `
  },
  {
    id: 5,
    title: 'Getting Started with Docker and Containers',
    slug: 'getting-started-docker',
    description: 'A beginner-friendly guide to understanding Docker, containers, and how they can streamline your development workflow.',
    author: 'Girish Lade',
    date: 'November 8, 2025',
    image: 'https://picsum.photos/seed/docker-guide/800/400',
    categories: ['Cloud', 'Software Architecture'],
    tags: ['Docker', 'Containers', 'DevOps'],
    status: 'published',
    content: `
      Docker has revolutionized the way we build, ship, and run applications. By packaging software into standardized units called containers, it solves the "it works on my machine" problem once and for all.
      This guide will walk you through the fundamentals of Docker, from understanding images and containers to writing your first Dockerfile.
      <br/><br/>
      We'll cover key concepts like containerization, Docker Hub, and Docker Compose, providing practical examples to help you integrate Docker into your projects. Whether you're a backend developer, a frontend engineer, or a data scientist, learning Docker is an essential skill for modern software development that improves consistency and scalability.
    `
  },
  {
    id: 1,
    title: 'How AI is Changing Modern Businesses',
    slug: 'ai-modern-business',
    description: 'Exploring the impact of artificial intelligence in startups and enterprises, from automation to decision-making.',
    author: 'Girish Lade',
    date: 'November 7, 2025',
    image: 'https://picsum.photos/seed/ai-business/800/400',
    categories: ['AI', 'Business', 'Technology'],
    tags: ['Machine Learning', 'Automation', 'Data Science'],
    status: 'published',
    content: `
      Artificial Intelligence (AI) is no longer a futuristic concept; it's a present-day reality transforming industries.
      From automating mundane tasks to providing deep insights from vast datasets, AI is becoming an indispensable tool for modern businesses.
      Startups are leveraging AI to create innovative products, while established enterprises are using it to optimize operations and enhance customer experiences.
      <br/><br/>
      One of the most significant impacts of AI is in the realm of data analysis. Machine learning algorithms can identify patterns and predict outcomes with a level of accuracy that was previously unattainable.
      This enables businesses to make more informed, data-driven decisions, leading to better outcomes and a stronger competitive edge.
      Furthermore, AI-powered chatbots and virtual assistants are revolutionizing customer service, providing 24/7 support and personalized interactions.
    `
  },
  {
    id: 2,
    title: 'Designing for Clarity: The Art of Minimal UI',
    slug: 'minimal-ui-design',
    description: 'A deep dive into the principles of minimal UI design and how to create clean, intuitive interfaces that users love.',
    author: 'Girish Lade',
    date: 'November 5, 2025',
    image: 'https://picsum.photos/seed/minimal-ui/800/400',
    categories: ['Design', 'UI/UX', 'Web Development'],
    tags: ['User Experience', 'Web Design', 'Simplicity'],
    status: 'published',
    content: `
      In a world saturated with information, simplicity is a luxury. Minimalist UI design embraces this principle, focusing on the essential elements to create a clean, uncluttered, and intuitive user experience.
      The core idea is to remove unnecessary distractions and guide the user's attention to what truly matters. This is achieved through generous use of whitespace, a limited color palette, and clear typography.
      <br/><br/>
      "Less is more" is the mantra of minimalism. By reducing visual noise, we enhance usability and improve comprehension.
      A minimal interface is not about having less; it's about making what's there more impactful. Every element on the screen should have a purpose and contribute to the overall user goal.
      This approach not only leads to a more aesthetically pleasing design but also results in faster loading times and better performance, which are crucial for user satisfaction and retention.
    `
  },
  {
    id: 3,
    title: 'The Rise of Serverless Architecture',
    slug: 'serverless-architecture',
    description: 'Understanding the benefits and challenges of serverless computing and why it\'s gaining popularity among developers.',
    author: 'Girish Lade',
    date: 'November 2, 2025',
    image: 'https://picsum.photos/seed/serverless/800/400',
    categories: ['Software Architecture', 'Cloud', 'Web Development'],
    tags: ['AWS Lambda', 'FaaS', 'Scalability'],
    status: 'draft',
    content: `
      Serverless architecture is a cloud-computing execution model in which the cloud provider runs the server, and dynamically manages the allocation of machine resources.
      Pricing is based on the actual amount of resources consumed by an application, rather than on pre-purchased units of capacity. This can be a significant cost-saver for many applications.
      <br/><br/>
      Developers can focus on writing and deploying code without worrying about the underlying infrastructure. This abstraction accelerates the development process and allows teams to ship features faster.
      However, serverless also comes with its own set of challenges, including potential for vendor lock-in, cold starts, and difficulties in debugging and monitoring.
      Despite these challenges, the agility and scalability offered by serverless are making it an increasingly popular choice for a wide range of applications, from web APIs to data processing pipelines.
    `
  },
  {
    id: 6,
    title: 'The Psychology of Color in UI Design',
    slug: 'color-psychology-ui',
    description: 'Learn how to use color theory and psychology to evoke emotions, guide user behavior, and create more effective user interfaces.',
    author: 'Girish Lade',
    date: 'October 28, 2025',
    image: 'https://picsum.photos/seed/color-psychology/800/400',
    categories: ['Design', 'UI/UX'],
    tags: ['Color Theory', 'User Experience', 'Branding'],
    status: 'published',
    content: `
      Color is one of the most powerful tools in a designer's arsenal. It's not just about aesthetics; colors have a profound psychological impact on users, influencing their perceptions, emotions, and actions.
      Understanding the psychology of color can help you build more intuitive and engaging interfaces.
      <br/><br/>
      This article delves into the meaning of different colors and how they can be applied in UI design. We'll explore how to create effective color palettes that align with your brand identity, enhance usability, and guide users towards desired actions. From call-to-action buttons to error messages, every color choice matters.
    `
  },
  {
    id: 7,
    title: 'Ethical Considerations in AI Development',
    slug: 'ethical-ai-development',
    description: 'A look at the critical ethical challenges in AI, including bias, privacy, and accountability, and how we can build more responsible systems.',
    author: 'Girish Lade',
    date: 'October 25, 2025',
    image: 'https://picsum.photos/seed/ethical-ai/800/400',
    categories: ['AI', 'Business'],
    tags: ['Ethics', 'Machine Learning', 'Responsibility'],
    status: 'published',
    content: `
      As Artificial Intelligence becomes more integrated into our daily lives, the ethical implications of its development and deployment are more critical than ever. Issues such as algorithmic bias, data privacy, and the accountability of autonomous systems pose significant challenges.
      <br/><br/>
      It is imperative for developers, businesses, and policymakers to address these concerns proactively. This involves creating frameworks for fairness, transparency, and accountability in AI systems. By prioritizing ethical considerations, we can work towards building AI that benefits all of humanity, not just a select few, and mitigate the risks of unintended negative consequences.
    `
  },
  {
    id: 8,
    title: 'Building a RESTful API with Node.js and Express',
    slug: 'nodejs-express-api',
    description: 'A step-by-step tutorial on creating a robust and scalable RESTful API from scratch using Node.js and the Express framework.',
    author: 'Girish Lade',
    date: 'October 22, 2025',
    image: 'https://picsum.photos/seed/nodejs-api/800/400',
    categories: ['Web Development', 'Software Architecture'],
    tags: ['Node.js', 'Express', 'API', 'Backend'],
    status: 'published',
    content: `
      Node.js and Express form a powerful and popular combination for building fast and scalable backend services. This tutorial will guide you through the process of creating a complete RESTful API.
      We'll cover everything from setting up your project and defining routes to handling requests, connecting to a database, and implementing authentication.
      <br/><br/>
      Here's a simple example of an Express server:
[CODE language="javascript"]
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Example app listening at http://localhost:\${port}\`);
});
[/CODE]
      By the end of this guide, you will have a solid understanding of backend development principles and a working API that can serve as a foundation for your own applications. We will focus on best practices to ensure your API is maintainable, secure, and ready for production.
    `
  },
  {
    id: 9,
    title: 'Mastering CSS Grid Layout',
    slug: 'mastering-css-grid',
    description: 'Unlock the power of modern web layouts with this comprehensive guide to CSS Grid. Say goodbye to floats and flexbox hacks.',
    author: 'Girish Lade',
    date: 'October 19, 2025',
    image: 'https://picsum.photos/seed/css-grid/800/400',
    categories: ['Web Development', 'Design'],
    tags: ['CSS', 'Layout', 'Frontend'],
    status: 'published',
    content: `
      CSS Grid is a two-dimensional layout system that has revolutionized how we design for the web. It allows for the creation of complex, responsive layouts with surprisingly simple and readable code.
      If you're still relying on older techniques like floats or even complex flexbox structures for page layout, it's time to make the switch.
      <br/><br/>
      This article provides a deep dive into the core concepts of CSS Grid, including grid containers, items, tracks, lines, and areas. Through practical examples, you'll learn how to build common layouts like holy grails, image galleries, and card-based designs with ease and precision.
    `
  },
  {
    id: 10,
    title: 'Introduction to Quantum Computing',
    slug: 'intro-quantum-computing',
    description: 'A high-level overview of quantum computing, explaining concepts like qubits, superposition, and entanglement for beginners.',
    author: 'Girish Lade',
    date: 'October 15, 2025',
    image: 'https://picsum.photos/seed/quantum/800/400',
    categories: ['Technology', 'AI'],
    tags: ['Quantum Mechanics', 'Future Tech'],
    status: 'draft',
    content: `
      Quantum computing represents a paradigm shift from classical computing. By harnessing the principles of quantum mechanics, such as superposition and entanglement, quantum computers can solve certain types of problems exponentially faster than even the most powerful supercomputers today.
      <br/><br/>
      This article aims to demystify the core concepts of quantum computing for a general audience. We will explore what qubits are, how they differ from classical bits, and what makes quantum computation so powerful. While still in its early stages, quantum computing has the potential to revolutionize fields like medicine, materials science, and artificial intelligence.
    `
  },
  {
    id: 11,
    title: 'How to Write Clean, Readable Code',
    slug: 'writing-clean-code',
    description: 'Practical tips and principles for writing code that is easy to understand, maintain, and debug. A must-read for any developer.',
    author: 'Girish Lade',
    date: 'October 11, 2025',
    image: 'https://picsum.photos/seed/clean-code/800/400',
    categories: ['Software Architecture', 'Web Development'],
    tags: ['Best Practices', 'Code Quality', 'Refactoring'],
    status: 'published',
    content: `
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler. This quote encapsulates the essence of clean code.
      Writing code is not just about making things work; it's about creating software that is maintainable and scalable over time.
      <br/><br/>
      In this post, we discuss several key principles for writing clean code. These include meaningful naming, writing small and focused functions, keeping comments concise and purposeful, and consistent formatting. Adopting these habits will not only make you a better developer but also improve the productivity and happiness of your entire team.
    `
  },
  {
    id: 12,
    title: 'The Importance of Accessibility in Web Design',
    slug: 'web-accessibility-importance',
    description: 'Learn why web accessibility (a11y) is crucial for an inclusive web and discover practical ways to make your websites usable by everyone.',
    author: 'Girish Lade',
    date: 'October 5, 2025',
    image: 'https://picsum.photos/seed/accessibility/800/400',
    categories: ['Web Development', 'UI/UX', 'Design'],
    tags: ['Accessibility', 'a11y', 'Inclusive Design'],
    status: 'published',
    content: `
      The web is for everyone. Web accessibility, or a11y, is the practice of ensuring that your websites and applications can be used by people with disabilities, including those with visual, auditory, motor, or cognitive impairments. It's not just a legal requirement in many places; it's the right thing to do.
      <br/><br/>
      An accessible website benefits everyone, not just users with disabilities. It leads to better SEO, improved user experience for all, and a wider audience reach. This article covers the basics of web accessibility, including semantic HTML, ARIA attributes, keyboard navigation, and color contrast, providing you with a starting point for building more inclusive digital products.
    `
  },
  {
    id: 13,
    title: 'A Guide to Progressive Web Apps (PWAs)',
    slug: 'guide-to-pwas',
    description: 'Discover how Progressive Web Apps combine the best of the web and native apps to create reliable, fast, and engaging user experiences.',
    author: 'Girish Lade',
    date: 'September 30, 2025',
    image: 'https://picsum.photos/seed/pwas/800/400',
    categories: ['Web Development', 'Technology'],
    tags: ['PWA', 'Service Workers', 'Offline First'],
    status: 'published',
    content: `
      Progressive Web Apps (PWAs) are a set of technologies that bring a native app-like experience to the mobile web. They are reliable, fast, and engaging, and can be installed on a user's home screen without needing an app store.
      Key technologies like service workers, web app manifests, and push notifications are the cornerstones of PWAs.
      <br/><br/>
      This guide explains what PWAs are and why you should consider building one. We'll walk through the core components and benefits, such as offline capabilities, improved performance, and re-engagement with users through push notifications. Learn how to level up your web applications and deliver a superior user experience.
    `
  }
];

export const categoryDetails = [
  {
    name: 'AI',
    description: 'The latest in machine learning and artificial intelligence.',
    Icon: 'BrainCircuitIcon',
  },
  {
    name: 'Web Development',
    description: 'Modern frontend and backend development techniques.',
    Icon: 'CodeIcon',
  },
  {
    name: 'UI/UX',
    description: 'Crafting beautiful and intuitive user experiences.',
    Icon: 'PaletteIcon',
  },
  {
    name: 'Cloud',
    description: 'Exploring serverless, containers, and cloud infrastructure.',
    Icon: 'CloudIcon',
  },
];


export const whyReadItems = [
    {
        Icon: 'BookOpenIcon',
        title: 'Expert Insights',
        description: 'Our articles are written by industry professionals with years of hands-on experience in their fields.'
    },
    {
        Icon: 'TrendUpIcon',
        title: 'Latest Trends',
        description: 'Stay ahead of the curve with our analysis of the latest trends and technologies in the software world.'
    },
    {
        Icon: 'LightbulbIcon',
        title: 'Practical Guides',
        description: 'We focus on practical, actionable advice that you can apply to your own projects immediately.'
    }
];

export const testimonials = [
    {
        quote: "This blog is my go-to resource for staying updated on web development. The articles are always insightful and well-written.",
        name: "Alex Johnson",
        title: "Senior Frontend Developer"
    },
    {
        quote: "I love the clean design and the high-quality content. It's a breath of fresh air in the tech blogosphere.",
        name: "Samantha Lee",
        title: "UI/UX Designer"
    }
];