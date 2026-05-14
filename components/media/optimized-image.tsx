import Image from "next/image";

import { cn } from "@/lib/utils";

type OptimizedImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
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
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={cn("object-cover", className)}
      sizes={sizes ?? (fill ? "(max-width: 768px) 100vw, 50vw" : undefined)}
      priority={priority}
    />
  );
}
