'use client';

import { Image } from "./Image/Image";

const Avatar = () => {
  return (
    <Image 
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar" 
      src="/images/placeholder.jpg" 
    />
  );
};

export default Avatar;