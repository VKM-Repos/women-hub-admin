import { Category } from './category.types';

export type Post = {
  id: number;
  title: string;
  author: string;
  description: string;
  coverImageUrl: string;
  datePublished: string;
  category: Category;
  tags: string;
  body: string;
  numberOfComments: number;
  numberOfLikes: number;
  status: PostStatus;
  createdAt: string;
};

type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null;
