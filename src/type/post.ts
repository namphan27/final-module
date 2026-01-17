export interface PostUser {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
}

export type MediaType = "image" | "video";

export interface Post {
  _id: string;
  caption: string;
  image: string | null;
  video: string | null;
  mediaType: MediaType;
  likes: number;
  comments: number;
  createdAt: string;
  user: PostUser;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasMore: boolean;
}

export interface NewsfeedResponse {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
    pagination: Pagination;
  };
}
