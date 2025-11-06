// lib/articles.ts
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";

import type { ArticleItem, ArticleData } from "@/types";

const articlesDirectory = path.join(process.cwd(), "articles");

// Calculate reading time based on word count
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

// Generate slug from heading text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Extract h2 headings from markdown content
export const extractHeadings = (content: string) => {
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: { text: string; slug: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1];
    const slug = generateSlug(text);
    headings.push({ text, slug });
  }

  return headings;
};

// Add IDs to h2 tags in HTML content
const addIdsToHeadings = (htmlContent: string): string => {
  return htmlContent.replace(/<h2>(.*?)<\/h2>/g, (match, text) => {
    const slug = generateSlug(text);
    return `<h2 id="${slug}">${text}</h2>`;
  });
};

const getSortedArticles = (): ArticleItem[] => {
  const fileNames = fs.readdirSync(articlesDirectory);

  const allArticlesData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    // Handle both single category (string) and multiple categories (array)
    let categories: string[] = [];
    if (Array.isArray(matterResult.data.categories)) {
      categories = matterResult.data.categories;
    } else if (matterResult.data.category) {
      categories = [matterResult.data.category];
    }

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      categories,
      coverImage: matterResult.data.coverImage || matterResult.data.coverimage,
      excerpt: matterResult.data.excerpt,
    };
  });

  return allArticlesData.sort((a, b) => {
    const format = "DD-MM-YYYY";
    const dateOne = moment(a.date, format);
    const dateTwo = moment(b.date, format);
    if (dateOne.isBefore(dateTwo)) {
      return 1;
    } else if (dateTwo.isBefore(dateOne)) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getCategorisedArticles = (): Record<string, ArticleItem[]> => {
  const sortedArticles = getSortedArticles();
  const categorisedArticles: Record<string, ArticleItem[]> = {};

  sortedArticles.forEach((article) => {
    article.categories.forEach((category) => {
      if (!categorisedArticles[category]) {
        categorisedArticles[category] = [];
      }
      if (!categorisedArticles[category].find((a) => a.id === article.id)) {
        categorisedArticles[category].push(article);
      }
    });
  });

  return categorisedArticles;
};

export const getAllArticles = (): ArticleItem[] => {
  return getSortedArticles();
};

export const getArticleData = async (id: string): Promise<ArticleData> => {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);

  // Extract h2 headings from markdown content
  const headings = extractHeadings(matterResult.content);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  let contentHtml = processedContent.toString();

  // Add IDs to h2 tags in the HTML
  contentHtml = addIdsToHeadings(contentHtml);

  const readingTime = calculateReadingTime(matterResult.content);

  // Handle both single category and multiple categories
  let categories: string[] = [];
  if (Array.isArray(matterResult.data.categories)) {
    categories = matterResult.data.categories;
  } else if (matterResult.data.category) {
    categories = [matterResult.data.category];
  }

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    categories,
    date: moment(matterResult.data.date, "DD-MM-YYYY").format("MMMM Do YYYY"),
    coverImage: matterResult.data.coverImage || matterResult.data.coverimage,
    excerpt: matterResult.data.excerpt,
    readingTime,
    headings, // Include the extracted headings with slugs
  };
};

// Get related articles based on matching categories and title similarity
export const getRelatedArticles = (
  currentId: string,
  categories: string[],
  title: string,
  limit: number = 3,
): ArticleItem[] => {
  const allArticles = getSortedArticles().filter(
    (article) => article.id !== currentId,
  );

  // Score articles based on relevance
  const scoredArticles = allArticles.map((article) => {
    let score = 0;

    // Title similarity (simple word matching)
    const currentWords = title.toLowerCase().split(/\s+/);
    const articleWords = article.title.toLowerCase().split(/\s+/);
    const matchingWords = currentWords.filter((word) =>
      articleWords.includes(word),
    );
    score += matchingWords.length * 3;

    // Category matching
    const matchingCategories = categories.filter((cat) =>
      article.categories.includes(cat),
    );
    score += matchingCategories.length * 2;

    return { article, score };
  });

  // Sort by score and return top results
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.article);
};

export const getAllCategories = (): string[] => {
  const articles = getSortedArticles();
  const categories = new Set<string>();

  articles.forEach((article) => {
    article.categories.forEach((cat) => categories.add(cat));
  });

  return Array.from(categories).sort();
};
