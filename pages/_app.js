import NavBar from '@/components/NavBar';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  //This part of code scrolls the page to top when a route is changed
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  const [loading, setLoading] = useState(false);

  //This part of code tracks the route change and enables and disables loading state
  useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('finished');
      setLoading(false);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <NavBar />
      {/* This is responsible for rendering loading animation if loading is enabled else respective components are rendered */}
      {loading ? (
        <div className="absolute top-[3rem] text-6xl text-white w-full h-[calc(100vh-3rem)] flex items-center justify-center bg-black ">
          <div className="animate-bounce ">
            <span className="font-semibold text-5xl lg:text-9xl">
              Movie
              <span className="text-red-500 font-semibold">Sansar</span>{' '}
            </span>
          </div>
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
