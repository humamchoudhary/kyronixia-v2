import Link from "next/link";
import type { ArticleItem } from "@/types";

interface Props {
  article: ArticleItem;
}

const ArticleListItem = ({ article }: Props) => {
  return (
    <Link href={`/articles/${article.id}`}>
      <div className="p-4 rounded-lg group flex items-center gap-8 transition-colors duration-300 hover:bg-neutral-50">
        <div className="w-48 h-28 bg-neutral-100 rounded-lg overflow-hidden">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200"></div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-neutral-800">
            {article.title}
          </h3>
          <p className="text-neutral-500 text-sm mt-1">{article.excerpt}</p>
          <p className="text-neutral-400 text-xs mt-2">{article.date}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleListItem;
