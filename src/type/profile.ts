export type ProfileTab = "posts" | "saved" | "tagged";

export interface UserProfile {
  username: string;
  fullName: string;
  avatarUrl?: string;
  bio?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

export interface ProfileForm {
  fullName: string;
  bio: string;
  avatarFile?: File;
}
