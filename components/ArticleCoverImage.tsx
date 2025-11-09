"use client";

import { useState } from "react";
import Image from "next/image";

interface ArticleCoverImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

const DEFAULT_IMAGE = "/images/fallback.svg";
const ArticleCoverImage = ({
  src,
  alt,
  fallbackSrc = "/images/fallback.svg", // Your default fallback image
}: ArticleCoverImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={(e) => {
        (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
      }}
      className="w-full h-auto min-h-36 bg-foreground-light rounded-lg object-cover"
    />
  );
};

export default ArticleCoverImage;
