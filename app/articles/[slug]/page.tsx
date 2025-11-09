import Link from "next/link";
import { Metadata } from "next";
import "./articles.css";
import { getArticleData, getRelatedArticles } from "@/lib/articles";
import { ArrowLeft } from "lucide-react";
import ArticleSidebar from "@/components/ArticleSidebar";
import ArticleCoverImage from "@/components/ArticleCoverImage";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const articleData = await getArticleData(slug);
  return {
    title: articleData.title,
    description: articleData.excerpt,
    keywords: [...articleData.categories, articleData.title],
  };
}

const DEFAULT_IMAGE = "/images/fallback.svg";

const Article = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const articleData = await getArticleData(slug);
  const relatedArticles = await getRelatedArticles(
    slug,
    articleData.categories,
    articleData.title,
  );

  return (
    <div className="flex flex-col w-full bg-background">
      <section className="xl:w-7xl w-2xs  mx-auto min-h-screen flex flex-col items-center  relative px-4 sm:px-6 lg:px-8">
        {/* Header with back button and date */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full  mt-20 sm:mt-32 lg:mt-52 gap-4 sm:gap-0 mb-8">
          <Link
            href={"/articles"}
            className="flex flex-row gap-1 items-center hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={20} className="w-4 h-4 sm:w-5 sm:h-5" />
            <p className="text-sm sm:text-base">back to home</p>
          </Link>
          <p className="text-sm sm:text-base text-gray-600">
            {articleData.date.toString()}
          </p>
        </div>

        {/* Article header */}
        <div className="flex flex-col justify-center w-full  mb-8 lg:mb-12">
          <p className="font-light leading-none text-sm sm:text-base mb-2">
            {articleData.categories.map((item, index) => {
              return `${item}${articleData.categories.length - 1 === index ? "" : ", "}`;
            })}
          </p>
          <p className="font-light mb-4 sm:mb-6 text-sm sm:text-base">
            Read time: {articleData.readingTime} mins
          </p>
          <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight">
            {articleData.title}
          </h1>
          <ArticleCoverImage
            src={articleData.coverImage || DEFAULT_IMAGE}
            alt={articleData.title}
            fallbackSrc="/images/default-article-cover.jpg"
          />
        </div>

        {/* Article content with sidebar */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10 w-full  pb-12">
          {/* Sidebar - hidden on mobile, visible on desktop */}
          <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <ArticleSidebar headings={articleData.headings} />
          </div>

          {/* Main article content */}
          <article
            className="article w-full max-w-none lg:max-w-3xl xl:max-w-4xl"
            dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
          />
        </div>
      </section>
    </div>
  );
};

export default Article;
