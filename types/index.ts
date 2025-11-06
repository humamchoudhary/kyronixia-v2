export type ArticleItem = {
  id: string;
  title: string;
  date: string;
  categories: string[]; // Changed from category to categories (array)
  coverImage?: string;
  excerpt?: string;
};

export type ArticleData = ArticleItem & {
  contentHtml: string;
  readingTime: number;
  headings: { text: string; slug: string }[];
};
