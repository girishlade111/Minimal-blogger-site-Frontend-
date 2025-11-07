export interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: string;
  date: string;
  image: string;
  content: string;
  categories: string[];
  tags?: string[];
  status: 'published' | 'draft';
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  parentId?: string | null;
}

export interface Author {
  name: string;
  bio: string;
  avatar: string;
  website?: string;
}