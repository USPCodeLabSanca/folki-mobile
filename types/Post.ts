export default interface Post {
  id: number;
  postDate: string;
  content: string;
  userId: number;
  userName: string;
  userInstituteName: string | null;
  parentId: number | null;
  commentsCount: number;
  tags: string[];
  universityId: number | null;
  imageUrls: string[];
  upvotes: number;
  downvotes: number;
  voted: 'up' | 'down' | null;
  userBadge: string | null;
}
