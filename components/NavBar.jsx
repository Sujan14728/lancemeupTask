import { Menu } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

const NavBar = () => {
  const [menuBox, setMenuBox] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMenuBox(false);
  }, [router.pathname]);

  return (
    <div className="w-full h-full items-center flex justify-center flex-col  bg-neutral-700 text-white ">
      <div className="w-[80%] h-[3rem] flex justify-between items-center relative">
        <div className="flex w-[50%] justify-between ">
          <div className="">
            <span className="font-semibold text-xl">
              Movie
              <span className="text-red-500 font-semibold">Sansar</span>{' '}
            </span>
          </div>
          <div className="lg:flex hidden">
            <ul className="flex gap-4 items-center h-full">
              <Link href={'/'}>Home</Link>

              <Link href={'/musicvideo'}>Music Video</Link>
              <Link href={'/movies'}>Movies</Link>
              <Link href={'/tvseries'}>TV Series</Link>
            </ul>
          </div>
        </div>
        <div className="lg:flex hidden gap-4">
          <span>Login</span>
          <span>Register</span>
        </div>
        <div
          className="lg:hidden flex cursor-pointer"
          onClick={() => {
            setMenuBox(!menuBox);
          }}
        >
          <Menu />
        </div>
      </div>
      {menuBox && (
        <div className="relative w-[80%] z-[100] bg-inherit mb-2">
          <ul className="flex flex-col items-center h-full gap-2">
            <div className="w-full flex flex-col gap-1">
              <Link
                href={'/'}
                className="w-full py-2 flex justify-center bg-[#00000048] rounded-sm "
              >
                Home
              </Link>

              <Link
                href={'/musicvideo'}
                className="w-full py-2 flex justify-center bg-[#00000048] rounded-sm "
              >
                Music Video
              </Link>
              <Link
                href={'/movies'}
                className="w-full py-2 flex justify-center bg-[#00000048] rounded-sm "
              >
                Movies
              </Link>
              <Link
                href={'/tvseries'}
                className="w-full py-2 flex justify-center bg-[#00000048] rounded-sm "
              >
                TV Series
              </Link>
            </div>

            <div className="flex flex-col w-full items-center gap-2 ">
              <span className="w-[6rem] py-2 flex justify-center bg-red-500 rounded-lg cursor-pointer">
                Login
              </span>
              <span className="w-[6rem] py-2 flex justify-center bg-red-500 rounded-lg cursor-pointer">
                Register
              </span>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
