import NavBar from '@/components/NavBar';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  if (router.pathname.includes('/invoice')) return <Component {...pageProps} />;
  else {
    return (
      <>
        <NavBar />
        <Component {...pageProps} />
      </>
    );
  }
}
