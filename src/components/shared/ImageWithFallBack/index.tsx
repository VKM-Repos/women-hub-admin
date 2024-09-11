'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageWithFallbackProps {
  src: string;
  fallbackSrc: string;
  aspectRatio: {
    width: number;
    height: number;
  };
  alt: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  aspectRatio,
  alt,
  className,
}) => {
  const aspectRatioValue = aspectRatio.width / aspectRatio.height;
  return (
    <AspectRatio ratio={aspectRatioValue}>
      <div className="h-0 w-full">
        <img
          src={src}
          onError={e => {
            const img = document.getElementById(alt) as HTMLImageElement;
            img.src = fallbackSrc;
          }}
          alt={alt}
          id={alt}
          className={className}
        />
      </div>
    </AspectRatio>
  );
};

export default ImageWithFallback;
