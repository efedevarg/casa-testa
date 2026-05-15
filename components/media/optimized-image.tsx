import Image from "next/image";

import { cn } from "@/lib/utils";

/** Placeholder blur tenue (crema) para transición suave en cards */
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAIAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

type OptimizedImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  /** Encuadre estable — evita crops que cortan el sujeto */
  objectPosition?: string;
};

export function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority,
  placeholder = "blur",
  objectPosition = "50% 50%",
}: OptimizedImageProps) {
  const useBlur = !priority && placeholder === "blur";

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={cn("object-cover", className)}
      style={{ objectPosition }}
      sizes={sizes ?? (fill ? "(max-width: 768px) 100vw, 50vw" : undefined)}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      placeholder={useBlur ? "blur" : "empty"}
      blurDataURL={useBlur ? BLUR_DATA_URL : undefined}
    />
  );
}
