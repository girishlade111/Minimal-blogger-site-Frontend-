
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
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}
