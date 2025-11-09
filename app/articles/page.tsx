import ArticleSearch from "@/components/ArticleSearch";
import FeaturedArticle from "@/components/FeaturedArticle";
import { getAllArticles } from "@/lib/articles";

const ArticlesPage = () => {
  const articles = getAllArticles();
  console.log(articles);
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">
      <header className="text-center">
        <h1 className="font-cormorantGaramond font-light text-6xl text-neutral-900">
          From the blog
        </h1>
        <p className="text-neutral-500 mt-2">
          Your daily dose of knowledge and inspiration.
        </p>
      </header>
      <div className="flex flex-col gap-10">
        <FeaturedArticle article={featuredArticle} />
        <ArticleSearch articles={otherArticles} />
      </div>
    </section>
  );
};

export default ArticlesPage;
