"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

interface Heading {
  text: string;
  slug: string;
}

interface ArticleSidebarProps {
  headings: Heading[];
}

export default function ArticleSidebar({ headings }: ArticleSidebarProps) {
  const [activeHeadingSlug, setActiveHeadingSlug] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const articleContent = document.querySelector(".article");
    if (!articleContent) return;

    // Clear any existing observer
    if (observer.current) {
      observer.current.disconnect();
    }

    const h2Elements = Array.from(articleContent.querySelectorAll("h2[id]"));

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // Find the first heading that is at least partially in view
      // Prioritize headings that are higher up in the viewport
      const visibleHeadings = entries
        .filter((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.1) // At least 10% visible
        .sort((a, b) => {
          const rectA = a.boundingClientRect;
          const rectB = b.boundingClientRect;
          return rectA.top - rectB.top; // Sort by top position
        });
      
      if (visibleHeadings.length > 0) {
        setActiveHeadingSlug(visibleHeadings[0].target.id);
      }
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "0px 0px -80% 0px", // A heading is active if it's in the top 20% of the viewport
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });

    h2Elements.forEach((h2) => {
      observer.current?.observe(h2);
    });

    // Initial check in case content is already loaded and scrolled
    const initialActive = h2Elements.find(h2 => {
      const rect = h2.getBoundingClientRect();
      return rect.top >= 0 && rect.top < window.innerHeight / 2; // First heading in the top half
    }) || h2Elements[0]; // Fallback to first if none in top half

    if (initialActive) {
      setActiveHeadingSlug(initialActive.id);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [headings]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    setActiveHeadingSlug(slug);
    const targetElement = document.getElementById(slug);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Adjust for fixed header/navbar if any
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="sticky top-20 h-max w-[250px] flex-shrink-0 flex flex-col gap-4 p-4 border-r border-foreground-light/10">
      <p className="font-bold text-lg mb-2">On this page</p>
      <nav>
        <ul className="flex flex-col gap-2">
          {headings.map((heading) => (
            <li
              key={heading.slug}
              className={`text-sm transition-colors duration-200 rounded-md ${
                activeHeadingSlug === heading.slug
                  ? "bg-background-sec text-foreground font-semibold"
                  : "text-foreground-light hover:bg-background-sec"
              }`}>
              <Link
                href={`#${heading.slug}`}
                onClick={(e) => handleLinkClick(e, heading.slug)}
                className="p-2 block"
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
