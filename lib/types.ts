export interface Tweet {
  id: string;
  created_at: string;
  tweet_url: string;
  author_name: string;
  author_handle: string;
  content: string;
  category: string;
  is_published: boolean;
}