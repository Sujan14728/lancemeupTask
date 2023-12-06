import MovieCard from '@/components/MovieCard';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Movies = ({ movies }) => {
  const router = useRouter();
  const handleEventClick = (id) => {
    router.push(`/event/${id}`);
  };
  return (
    <div className="w-full h-full flex justify-center mt-16 mb-16 text-white ">
      <div className="w-[80%] flex flex-wrap  gap-y-8 ">
        {movies.map((item, index) => (
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

export default Movies;

//fetches data whose titleType is movies only
export const getServerSideProps = async () => {
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles?page=3',
    params: {
      startYear: '2010',
      titleType: 'movie',
      endYear: '2023',
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_XRapidAPIKey,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const movies = response.data.results;
    return {
      props: { movies },
    };
  } catch (error) {
    console.error(error);
    return {
      props: 'error',
    };
  }
};
