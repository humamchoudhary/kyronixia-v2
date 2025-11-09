import Link from "next/link";
import type { ArticleItem } from "@/types";

interface Props {
  article: ArticleItem;
}

const FeaturedArticle = ({ article }: Props) => {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="bg-neutral-50 rounded-lg p-8 group transition-colors duration-300 hover:bg-neutral-100">
        <h2 className="text-3xl font-bold text-neutral-800">
          {article.title}
        </h2>
        <p className="text-neutral-600 mt-2">{article.excerpt}</p>
        <p className="text-neutral-500 text-sm mt-4">{article.date}</p>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
