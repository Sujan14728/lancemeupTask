import React, { useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { ConfirmationNumber, ContentCut } from '@mui/icons-material';

//This two libraries are used for generating pdfs of the invoice
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CheckoutSlug = ({ movie }) => {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const id = router.query.slug;
  const [invoiceBox, setInvoiceBox] = useState(false);

  //Price calculation
  const ticket = router.query.ticket;
  const price = router.query.price;
  const tax = 13;
  const withOutTax = ticket * price;
  useEffect(() => {
    const withTax = withOutTax + (tax / 100) * withOutTax;
    setTotal(withTax);
  }, []);

  //Form Details
  const [details, setDetails] = useState({
    name: '',
    email: '',
    address: '',
    country: 'Nepal',
    state: '',
    city: '',
    code: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [eventDetails, setEventDetails] = useState([]);

  //This function is used to validate all the data entered by the user
  const validateForm = () => {
    const errors = {};

    if (!details.name.trim()) {
      errors.name = 'Name is required!';
    }

    if (!details.email.trim()) {
      errors.email = 'Email is required!';
    } else if (!isValidEmail(details.email)) {
      errors.email = 'Invalid email format!';
    }

    if (!details.address.trim()) {
      errors.address = 'Address is required!';
    }
    if (!details.state.trim()) {
      errors.state = 'State is required!';
    }
    if (!details.city.trim()) {
      errors.city = 'State is required!';
    }

    if (!details.code.trim()) {
      errors.code = 'Zip/Post is required!';
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const isValidEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  // This function is activated when clicks the confirm&pay button
  // The event details are stored in a state after the form is validated
  const handleConfirm = () => {
    if (validateForm()) {
      setInvoiceBox(true);
      const newEventDetails = [];
      for (let i = 1; i <= ticket; i++) {
        newEventDetails.push({
          id: i,
          event: movie.titleText.text,
          eventType: movie.titleType.text,
          ticket: 1,
          price: price,
          discount: 0.0,
          total: total,
        });
      }
      setEventDetails(newEventDetails);
    }
  };
  //PDF download
  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save('invoice.pdf');
      setInvoiceBox(false);
      //setting user details to the initial state
      setDetails({
        name: '',
        email: '',
        address: '',
        country: 'Nepal',
        state: '',
        city: '',
        code: '',
      });
    });
  };

  return (
    <div className="w-full h-full flex justify-center pt-16 bg-[#0f0f0f] text-white relative mb-8 lg:mb-0 ">
      <div className="w-[80%] flex gap-8 flex-col ">
        <div>
          <span className="text-2xl md:text-3xl lg:text-4xl">
            Order Confirmation
          </span>
        </div>
        <hr className="border-neutral-400" />
        <div className="flex w-full gap-8 lg:flex-row flex-col">
          {/* This is the form where user enters their information */}
          <form className="flex flex-col gap-8 w-full lg:w-[60%] bg-[#1a1919] p-4 rounded-lg pb-8 ">
            <span className="text-2xl">Information</span>
            <div className="flex flex-col relative w-full ">
              <label htmlFor="name" className="text-xl mb-2">
                Full Name*
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="eg. Jane cooper"
                className="outline-none border-[1px] border-neutral-400 p-2 bg-inherit rounded-lg text-lg "
                required
                value={details.name}
                onChange={(e) => {
                  setDetails({ ...details, name: e.target.value });
                }}
              />
              {formErrors.name && (
                <span className="absolute -bottom-6 text-red-700 ">
                  {formErrors.name}
                </span>
              )}
            </div>
            <div className="flex gap-8 w-full lg:flex-row flex-col ">
              <div className="flex flex-1 flex-col relative">
                <label htmlFor="email" className="text-xl mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="eg. janecooper@xyz.com"
                  className="outline-none border-[1px] border-neutral-400 p-2 bg-inherit rounded-lg text-lg "
                  required
                  value={details.email}
                  onChange={(e) => {
                    setDetails({ ...details, email: e.target.value });
                  }}
                />
                {formErrors.email && (
                  <span className="absolute -bottom-6 text-red-700 ">
                    {formErrors.email}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col relative">
                <label htmlFor="address" className="text-xl mb-2">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="outline-none border-[1px] border-neutral-400 p-2 bg-inherit rounded-lg text-lg "
                  required
                  value={details.address}
                  onChange={(e) => {
                    setDetails({ ...details, address: e.target.value });
                  }}
                />
                {formErrors.address && (
                  <span className="absolute -bottom-6 text-red-700 ">
                    {formErrors.address}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-8 w-full lg:flex-row flex-col ">
              <div className="flex flex-1 flex-col">
                <label htmlFor="country" className="text-xl mb-2">
                  Country*
                </label>
                <select
                  name="country"
                  id="country"
                  className="outline-none border-[1px] border-neutral-400 p-2 bg-[#1a1919] rounded-lg text-lg "
                  onChange={(e) => {
                    setDetails({ ...details, country: e.target.value });
                  }}
                  value={details.country}
                >
                  <option value="Nepal">Nepal</option>
                  <option value="India">India</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Bhutan">Bhutan</option>
                </select>
              </div>
              <div className="flex flex-1 flex-col relative">
                <label htmlFor="state" className="text-xl mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="outline-none border-[1px] border-neutral-400 p-2 bg-inherit rounded-lg text-lg "
                  required
                  value={details.state}
                  onChange={(e) => {
                    setDetails({ ...details, state: e.target.value });
                  }}
                />
                {formErrors.state && (
                  <span className="absolute -bottom-6 text-red-700 ">
                    {formErrors.state}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-8 w-full lg:flex-row flex-col ">
              <div className="flex flex-1 flex-col relative">
                <label htmlFor="city" className="text-xl mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="outline-none border-[1px] border-neutral-400 p-2 bg-inherit rounded-lg text-lg "
                  required
                  value={details.city}
                  onChange={(e) => {
                    setDetails({ ...details, city: e.target.value });
                  }}
                />
                {formErrors.city && (
                  <span className="absolute -bottom-6 text-red-700 ">
                    {formErrors.city}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col relative">
                <label htmlFor="code" className="text-xl mb-2">
                  Zip/Post Code*
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  className="outline-none border-[1px] border-neutral-400 p-2 bg-inherit rounded-lg text-lg "
                  required
                  value={details.code}
                  onChange={(e) => {
                    setDetails({ ...details, code: e.target.value });
                  }}
                />
                {formErrors.code && (
                  <span className="absolute -bottom-6 text-red-700 ">
                    {formErrors.code}
                  </span>
                )}
              </div>
            </div>
          </form>
          <div className="flex flex-col h-fit gap-4 w-full lg:w-[40%] bg-[#1a1919] p-4 py-8 rounded-lg">
            <div>
              <span className="text-2xl font-semibold">Checkout Summary</span>
            </div>
            <hr className="border-neutral-400" />
            <div className="flex flex-col gap-2">
              <span className="text-xl font-semibold">
                {movie.titleText && movie.titleText.text}
              </span>
              <div className="flex items-center gap-4 text-neutral-400 text-sm">
                <span className={`${!movie.titleType && 'text-red-500'} `}>
                  {movie.titleType && movie.titleType.text}
                </span>
                <div className={`w-2 h-2 rounded-full bg-neutral-400 `}></div>

                <span>Kathmandu, Nepal</span>
              </div>
            </div>
            <hr className="border-neutral-400" />
            <div className="text-neutral-400 flex flex-col gap-4">
              <div className="flex w-full justify-between">
                <span>Normal</span>
                <span>*{ticket}</span>
                <span>${price}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Sub Total</span>
                <span>${ticket * price}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Tax( {tax}% )</span>
                <span>${(tax / 100) * withOutTax}</span>
              </div>
              <div className="flex w-full justify-between">
                <span>Discount</span>
                <span>$0</span>
              </div>
            </div>
            <hr className="border-neutral-400" />
            <div className="flex w-full justify-between text-neutral-400 ">
              <span className="text-xl">Total</span>
              <div className="flex items-center gap-1">
                <span>USD</span>
                <span className="text-2xl text-white">${total}</span>
              </div>
            </div>
            <hr className="border-neutral-400" />
            <button
              className="w-full text-white bg-red-700 py-4 rounded-lg"
              onClick={handleConfirm}
            >
              Confirm & pay
            </button>
          </div>
        </div>
      </div>
      {/* This is invoice part where form details and event details are used for creating invoice pdf */}
      {invoiceBox && (
        <>
          <div className="absolute top-0 w-[95%] lg:w-[60%] h-fit mt-4 z-[100] bg-[#f7f8f9] pb-8">
            <div></div>
            <div className="w-full h-full" ref={pdfRef}>
              <div className="h-[4rem] w-full bg-red-700 text-white font-semibold text-xl md:text-3xl px-4 flex items-center ">
                <span>MovieSansar</span>
              </div>
              <div className="w-full px-4 text-neutral-500 font-medium text-lg flex flex-col gap-4 ">
                <span className="text-xl md:text-3xl text-black mt-4 ">
                  Invoice
                </span>
                <div className="flex w-full justify-between md:text-base text-sm ">
                  <span>
                    Invoice to:{' '}
                    <span className="font-bold ">{details.name}</span>{' '}
                  </span>
                  <span>Invoice ID: YCCURW-00000 </span>
                </div>
                <div className="flex w-full justify-between md:text-base text-sm">
                  <span>
                    {details.address}, {details.city}{' '}
                  </span>
                  <span>Order Date: 10/05/2022 </span>
                </div>
                <span className="md:text-base text-sm">
                  {details.state}, {details.country}
                </span>
              </div>
              <div className="w-[98%] mx-auto px-4 rounded-lg bg-white mt-4 pt-4 ">
                <table className="w-full text-black text-sm md:text-base lg:text-lg font-normal  ">
                  <thead>
                    <tr>
                      <th className="font-medium  border-[1px]">#</th>
                      <th className="font-medium  border-[1px]">
                        Event Details
                      </th>
                      <th className="font-medium  border-[1px]">Event Type</th>
                      <th className="font-medium  border-[1px]">Ticket</th>
                      <th className="font-medium  border-[1px]">Unit Price</th>
                      <th className="font-medium  border-[1px]">Discount</th>
                      <th className="font-medium  border-[1px]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-xs md:text-sm text-neutral-700">
                      <th className="font-normal border-[1px] py-2 px-1">1</th>
                      <th className="font-normal border-[1px] py-2 px-1">
                        {movie.titleText.text}
                      </th>
                      <th className="font-normal border-[1px] py-2 px-1">
                        {movie.titleType.text}
                      </th>
                      <th className="font-normal border-[1px] py-2 px-1">
                        x{ticket}
                      </th>
                      <th className="font-normal border-[1px] py-2 px-1">
                        ${price}
                      </th>
                      <th className="font-normal border-[1px] py-2 px-1">$0</th>
                      <th className="font-normal border-[1px] py-2 px-1">
                        ${total}
                      </th>
                    </tr>
                  </tbody>
                </table>
                <div className="text-black w-full flex justify-end font-semibold py-8 gap-2 md:text-3xl text-xl">
                  <span>Invoice Total:</span>
                  <span>USD ${total}</span>
                </div>
              </div>
              <div className="w-[98%] h-full mx-auto mt-4 flex flex-col gap-4 ">
                {eventDetails.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="relative text-neutral-600 flex items-center h-full ">
                      <div className=" ">
                        <ContentCut color="inherit" />
                      </div>
                      <div className="w-full border-t-2 border-neutral-600 border-dotted "></div>
                    </div>
                    <div className="w-full lg:w-[60%] h-[12rem] gap-4 border-2 flex p-4 bg-white ">
                      <div className="w-[8rem] h-[8rem] ">
                        <Image
                          alt="poster"
                          width={10}
                          height={10}
                          src={
                            movie.primaryImage
                              ? movie.primaryImage.url
                              : '/images/no-image.jpg'
                          }
                          className="w-full h-full object-contain rounded-lg"
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col text-black gap-2">
                        <span className="text-xl font-semibold">
                          {item.event}
                        </span>
                        <span className="text-neutral-500 text-[0.8rem] lg:text-base ">
                          Sat, Apr 30, 2022 11:30AM
                        </span>
                        <div className="flex gap-4 text-neutral-500 font-bold items-center">
                          <span>
                            <ConfirmationNumber color="warning" />
                          </span>
                          <span>x{item.ticket}</span>
                        </div>
                        <span className="text-neutral-500">
                          Total:{' '}
                          <span className="font-bold text-black">
                            ${item.price}
                          </span>
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div className="relative w-[98%] h-full mx-auto mt-4 text-neutral-600 flex items-center mb-4 ">
                <div className=" ">
                  <ContentCut color="inherit" />
                </div>
                <div className="w-full border-t-2 border-neutral-600 border-dotted "></div>
              </div>
            </div>
            <div className="text-black w-[98%] mx-auto flex justify-center items-center mt-4  ">
              <button
                className="w-[40%] bg-red-500 text-white rounded-lg py-2 font-semibold text-xl"
                onClick={downloadPDF}
              >
                Download PDF
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutSlug;

// It first retrieves the slug from the params of the link which is the id of certain movie/series/music.
// Then it fetch the data of that event from the id and returns the data as props
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
