import Link from "next/link";
import { Metadata } from "next";

import "./articles.css";
import { getArticleData, getRelatedArticles } from "@/lib/articles";
import { ArrowLeft } from "lucide-react";
import ArticleSidebar from "@/components/ArticleSidebar";

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

const Article = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const articleData = await getArticleData(slug);
  const relatedArticles = await getRelatedArticles(
    slug,
    articleData.categories,
    articleData.title,
  );
  // console.log(articleData);
  console.log(relatedArticles);

  return (
    <section className="mx-auto xl:w-7xl  mt-52 flex flex-col gap-5">
      <div className="flex justify-between">
        <Link
          href={"/articles"}
          className="flex flex-row gap-1 place-items-center"
        >
          <ArrowLeft size={20} />
          <p>back to home</p>
        </Link>

        <p>{articleData.date.toString()}</p>
      </div>
      <div className="flex flex-col justify-center w-full">
        <p className="font-light leading-none">
          {articleData.categories.map((item, index) => {
            return `${item}${articleData.categories.length - 1 == index ? "" : ", "}`;
          })}{" "}
        </p>
        <p className="font-light  mb-3">
          Read time: {articleData.readingTime} mins
        </p>
        <h1 className="font-bold text-5xl mb-4">{articleData.title}</h1>
        <img src={articleData.coverImage} />
      </div>
      <div className="flex flex-row justify-between gap-10">
        <ArticleSidebar headings={articleData.headings} />
        <article
          className="article w-full gap-3"
          dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
        />
      </div>
    </section>
  );
};

export default Article;
