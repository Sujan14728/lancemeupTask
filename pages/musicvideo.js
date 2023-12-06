import React from 'react';
import axios from 'axios';
import MovieCard from '@/components/MovieCard';
import { useRouter } from 'next/router';

const MusicVideo = ({ music }) => {
  const router = useRouter();
  const handleEventClick = (id) => {
    router.push(`/event/${id}`);
  };
  return (
    <div className="w-full h-full flex justify-center mt-16 mb-16 text-white ">
      <div className="w-[80%] flex flex-wrap  gap-y-8 ">
        {music.map((item, index) => (
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

export default MusicVideo;
//fetches data whose titleType is music video only
export const getServerSideProps = async () => {
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles',
    params: {
      titleType: 'musicVideo',
    },
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_XRapidAPIKey,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const music = response.data.results;
    return {
      props: { music },
    };
  } catch (error) {
    console.error(error);
    return {
      props: 'error',
    };
  }
};

// 0:null
// 1:"movie"
// 2:"musicVideo"
// 3:"podcastEpisode"
// 4:"podcastSeries"
// 5:"short"
// 6:"tvEpisode"
// 7:"tvMiniSeries"
// 8:"tvMovie"
// 9:"tvPilot"
// 10:"tvSeries"
// 11:"tvShort"
// 12:"tvSpecial"
// 13:"video"
// 14:"videoGame"
