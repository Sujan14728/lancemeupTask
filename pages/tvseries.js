import React from 'react';
import axios from 'axios';
import MovieCard from '@/components/MovieCard';
import { useRouter } from 'next/router';

const Series = ({ series }) => {
  const router = useRouter();
  const handleEventClick = (id) => {
    router.push(`/event/${id}`);
  };
  return (
    <div className="w-full h-full flex justify-center mt-16 mb-16 text-white ">
      <div className="w-[80%] flex flex-wrap  gap-y-8 ">
        {series.map((item, index) => (
          <div
            className="w-full md:w-[49%] lg:w-[32%] xl:w-[24%] md:mx-[0.5%] cursor-pointer"
            key={index}
            onClick={() => {
              handleEventClick(item.id);
            }}
          >
            <MovieCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Series;
//fetches data whose titleType is tv series only
export const getServerSideProps = async () => {
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles',
    params: {
      startYear: '2010',
      titleType: 'tvSeries',
      endYear: '2023',
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_XRapidAPIKey,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const series = response.data.results;
    return {
      props: { series },
    };
  } catch (error) {
    console.error(error);
    return {
      props: 'error',
    };
  }
};
