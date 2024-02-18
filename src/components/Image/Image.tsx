interface ImageProps {
  className?: string;
  height?: number | `${number}`;
  width?: number | `${number}`;
  alt?: string; 
  style?: string;
  src: string;
}

export const Image: React.FC<ImageProps> = ({
  className,
  height,
  width,
  alt,
  src
}) => {
  return (
    <img 
      alt={alt}
      loading="lazy"
      width={width}
      height={height}
      decoding="async"
      data-nimg="1"
      className={className}
      src={src}>

      </img>
  )
}