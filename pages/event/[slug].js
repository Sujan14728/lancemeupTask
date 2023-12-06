import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import { DateRange, LocationOn, Remove, Add } from '@mui/icons-material';
import { useState } from 'react';
import { useRouter } from 'next/router';

const month = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const EventSlug = ({ movie }) => {
  const [ticket, setTicket] = useState(1);
  const price = '500.00';
  const router = useRouter();

  const handleSub = () => {
    if (ticket > 1) setTicket(ticket - 1);
  };
  const handleAdd = () => {
    if (ticket < 10) setTicket(ticket + 1);
  };

  const handleCheckout = (id) => {
    router.push(`/checkout/${id}?ticket=${ticket}&price=${price}`);
  };

  return (
    <div className="w-full lg:h-[calc(100vh-3rem)] flex justify-center pt-16 text-white pb-16 lg:pb-0">
      <div className=" w-[90%] lg:w-[80%] flex gap-8 lg:flex-row flex-col items-center lg:items-start  ">
        <div className="lg:h-[50rem] lg:w-[50%] ">
          <Image
            alt="movie"
            src={
              movie.primaryImage
                ? movie.primaryImage.url
                : '/images/no-image.jpg'
            }
            width={10}
            height={10}
            className="w-full h-full object-contain "
            unoptimized
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="flex flex-col w-full">
            <span className="text-3xl lg:text-4xl font-bold ">
              {movie.titleText.text}
            </span>
            <div className="text-base lg:text-lg mt-8">
              <span className="font-bold text-base lg:text-xl">
                Release Date:{' '}
              </span>
              <span className="">
                {movie.releaseDate && movie.releaseDate.day}{' '}
              </span>
              <span className="">
                {movie.releaseDate && month[movie.releaseDate.month]},{' '}
              </span>
              <span className="">
                {movie.releaseDate && movie.releaseDate.year}
              </span>
            </div>
            {/* <div className="">
              <span className="font-bold text-xl ">Details: </span>
              <span>{movie.primaryImage.caption.plainText}</span>
            </div> */}
          </div>

          <div className="lg:w-[60%] w-full max-h-[30rem]  mt-20 py-8 px-8 flex flex-col gap-4 bg-[#181717] text-white rounded-lg shadow-2xl shadow-[#ffffff18] ">
            <div className="font-semibold text-2xl w-full flex">
              <span>Event Details</span>
            </div>
            <hr className="border-neutral-400" />
            <div className="flex">
              <div className="w-12 h-12 rounded-full flex justify-center items-center text-white bg-[#535353]">
                <DateRange color="inherit" />
              </div>
              <div className="flex flex-col ml-4 gap-4">
                <span className="text-neutral-400 ">Date and Time</span>
                <div>
                  <span>Sat, Apr 30, 2024 </span>
                  <span>11:30 AM</span>
                </div>
              </div>
            </div>
            <hr className="border-neutral-400" />
            <div className="flex">
              <div className="w-12 h-12 rounded-full flex justify-center items-center text-white bg-[#535353]">
                <LocationOn color="inherit" />
              </div>
              <div className="flex flex-col ml-4 gap-4">
                <span className="text-neutral-400 ">Location</span>
                <div>
                  <span>Kathmandu, Nepal </span>
                </div>
              </div>
            </div>
            <hr className="border-neutral-400" />
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold ">Select tickets</span>
              <div className="flex items-center h-fit w-full justify-between mt-2 ">
                <div className="flex flex-col">
                  <span className="text-neutral-400 ">1x Ticket(s)</span>
                  <span className="text-xl mt-2">USD ${price}</span>
                </div>
                <div className="flex">
                  <div
                    className={`w-8 h-8 flex justify-center items-center bg-neutral-700 ${
                      ticket <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                    } `}
                    onClick={handleSub}
                  >
                    <Remove />
                  </div>
                  <div className="w-8 h-8 flex justify-center items-center text-2xl mx-2 ">
                    {ticket}
                  </div>
                  <div
                    className={`w-8 h-8 flex justify-center items-center bg-red-700 ${
                      ticket >= 10 ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                    onClick={handleAdd}
                  >
                    <Add />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <button
                className="w-full bg-red-600 rounded-lg py-3"
                onClick={() => {
                  handleCheckout(movie.id);
                }}
              >
                Checkout for ${ticket * Number(price)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSlug;

export const getServerSideProps = async (context) => {
  const slug = context.params.slug;
  const options = {
    method: 'GET',
    url: `https://moviesdatabase.p.rapidapi.com/titles/${slug}`,
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_XRapidAPIKey,
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const movie = response.data.results;
    return {
      props: { movie },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
