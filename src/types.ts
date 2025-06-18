import { Post, User, Comment, Category, Tag, PostView, Role, PostStatus, CommentStatus, PostTag, PostCategory } from "../generated/prisma";

// Base types
export type UserRole = Role;
export type PostStatusType = PostStatus;
export type CommentStatusType = CommentStatus;

// Extended types with relations
export type PostWithRelations = Post & {
  author?: User | null
  comments?: Comment[]
  postCategories?: (PostCategory & { category: Category })[]
  postTags?: (PostTag & { tag: Tag })[]
  postView?: PostView | null
}

export type CommentWithRelations = Comment & {
  author?: User | null
  post?: Post | null
  parentComment?: Comment | null
  replies?: Comment[]
}

export type PostCategoryWithRelations = PostCategory & {
  post: Post
  category: Category
}

export type PostTagWithRelations = PostTag & {
  post: Post
  tag: Tag
}