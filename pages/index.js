import Image from 'next/image';
import { Inter } from 'next/font/google';
import axios from 'axios';
import MovieCard from '@/components/MovieCard';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

//This is the home page component which gets props from getServerSideProps.
export default function Home({ movies }) {
  const router = useRouter();

  //Opens a event slug page which contains the data of the movie which is retrieved from the id passed from the params
  const handleEventClick = (id) => {
    router.push(`/event/${id}`);
  };
  return (
    <div className="w-full h-full flex justify-center mt-16 mb-16 text-white ">
      <div className="w-[80%] flex flex-wrap gap-y-8 ">
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
}

//fetching data from external api.
//getServerSideProps allows to fetch the data in server side which helps in performance of the website.
export const getServerSideProps = async () => {
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles?page=2',
    params: {
      list: 'top_boxoffice_200',
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
