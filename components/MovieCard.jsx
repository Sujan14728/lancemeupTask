import Image from 'next/image';
import React from 'react';

//This component is rendered on every page where an event card is required.
const MovieCard = ({ item }) => {
  return (
    <div className="w-full h-fit ">
      <div className="w-full md:h-[30rem] ">
        <Image
          width={10}
          height={10}
          alt="movie"
          src={
            item.primaryImage && item.primaryImage.url
              ? item.primaryImage.url
              : '/images/no-image.jpg'
          }
          className={`w-full h-full object-contain bg-[#00000048] rounded-lg ${
            !item.primaryImage && 'border-2'
          } `}
          unoptimized
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="mt-2 h-full">
          <span className="font-semibold text-2xl md:text-xl">
            {item.titleText ? item.titleText.text : 'Not Announced'}
          </span>
        </div>
        <div className="flex w-full justify-between ">
          <div className="flex items-center gap-4 text-lg md:text-base ">
            <span className={`${!item.releaseYear && 'text-red-500'}`}>
              {item.releaseYear ? item.releaseYear.year : 'Not revealed'}
            </span>
            <div className={`w-2 h-2 rounded-full bg-white `}></div>
            <span className={`${!item.titleType && 'text-red-500'} `}>
              {item.titleType && item.titleType.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
