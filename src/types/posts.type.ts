import { Category } from './category.types';
import { UserDTO } from './user.types';

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
  createdBy: UserDTO;
};

type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null;
