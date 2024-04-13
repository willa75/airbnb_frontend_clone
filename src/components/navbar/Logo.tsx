'use client';

import { Link } from "react-router-dom";
import { Image } from "../Image/Image";

const Logo = () => {
  return (
    <Link to={"/"}>
      <Image
        alt='logo'
        className='hidden md:block cursor-pointer'
        height="100"
        width="100"
        src="/images/logo.png"
      />
    </Link>
  );
};

export default Logo;