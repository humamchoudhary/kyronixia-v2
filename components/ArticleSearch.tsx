"use client";

import { useState } from "react";
import type { ArticleItem } from "@/types";
import ArticleListItem from "./ArticleListItem";

interface Props {
  articles: ArticleItem[];
}

const ArticleSearch = ({ articles }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="relative w-full">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 pl-12 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-colors duration-300"
        />
      </div>
      <div className="flex flex-col">
        {filteredArticles.map((article) => (
          <ArticleListItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleSearch;
