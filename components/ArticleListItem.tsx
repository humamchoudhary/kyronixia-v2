import Link from "next/link";
import type { ArticleItem } from "@/types";

interface Props {
  article: ArticleItem;
}

const DEFAULT_IMAGE = "/images/fallback.svg";
const ArticleListItem = ({ article }: Props) => {
  return (
    <>
      <Link href={`/articles/${article.id}`}>
        <div className="p-4 rounded-lg group flex flex-col xl:flex-row items-center gap-8 transition-colors duration-300 hover:bg-neutral-50">
          <div className="w-full xl:w-52 xl:h-32 bg-neutral-100 rounded-lg overflow-hidden aspect-[4/3] xl:aspect-auto">
            {article.coverImage ? (
              <img
                src={article.coverImage || DEFAULT_IMAGE}
                alt={article.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                }}
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
      <div className="w-full h-px bg-background-sec/50"></div>
    </>
  );
};

export default ArticleListItem;
