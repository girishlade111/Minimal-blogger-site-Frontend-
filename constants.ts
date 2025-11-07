
import { Post } from './types';

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'How AI is Changing Modern Businesses',
    slug: 'ai-modern-business',
    description: 'Exploring the impact of artificial intelligence in startups and enterprises, from automation to decision-making.',
    author: 'Girish Lade',
    date: 'November 7, 2025',
    image: 'https://picsum.photos/seed/ai-business/800/400',
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
    content: `
      Serverless architecture is a cloud-computing execution model in which the cloud provider runs the server, and dynamically manages the allocation of machine resources.
      Pricing is based on the actual amount of resources consumed by an application, rather than on pre-purchased units of capacity. This can be a significant cost-saver for many applications.
      <br/><br/>
      Developers can focus on writing and deploying code without worrying about the underlying infrastructure. This abstraction accelerates the development process and allows teams to ship features faster.
      However, serverless also comes with its own set of challenges, including potential for vendor lock-in, cold starts, and difficulties in debugging and monitoring.
      Despite these challenges, the agility and scalability offered by serverless are making it an increasingly popular choice for a wide range of applications, from web APIs to data processing pipelines.
    `
  }
];
