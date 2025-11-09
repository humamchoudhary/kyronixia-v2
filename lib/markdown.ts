import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * Returns the absolute path to the directory where the markdown files are stored.
 * @param directory - The name of the directory where the markdown files are stored (e.g., "articles", "solutions").
 * @returns The absolute path to the directory.
 */
function getMarkdownDirectory(directory: string): string {
  return path.join(process.cwd(), directory);
}

/**
 * Returns a list of all the slugs for the markdown files in a directory.
 * This is used to generate the static paths for the dynamic routes.
 * @param directory - The name of the directory where the markdown files are stored.
 * @returns A list of objects, where each object has a `params` property with a `slug` property.
 */
export function getAllMarkdownSlugs(directory: string) {
  const markdownDirectory = getMarkdownDirectory(directory);
  const fileNames = fs.readdirSync(markdownDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

/**
 * Returns the data for a single markdown file.
 * @param directory - The name of the directory where the markdown files are stored.
 * @param slug - The slug of the markdown file.
 * @returns An object with the slug, the HTML content, and the frontmatter data.
 */
export async function getMarkdownData(directory: string, slug: string) {
  const markdownDirectory = getMarkdownDirectory(directory);
  const fullPath = path.join(markdownDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    ...matterResult.data,
  };
}
