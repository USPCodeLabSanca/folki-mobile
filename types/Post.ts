export default interface Post {
  id: number;
  postDate: string;
  content: string;
  userId: number;
  userName: string;
  parentId: number | null;
  commentsCount: number;
  tags: string[];
  universityId: number | null;
}
