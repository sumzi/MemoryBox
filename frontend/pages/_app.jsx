import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Background } from '../styles/variables';
import Navbar from '../components/Navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import { refreshToken } from '../api/user';
import { RefapiClient, loginApiInstance } from '../api';
import Router from 'next/router';

const JWTapiClient = loginApiInstance();

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
function MyApp({ Component, pageProps }) {
  const background = useRef();
  const [todayhours, setTodayhours] = useState();
  const [backgroundImg, setBackgroundImg] = useState();

  useEffect(() => {
    const today = new Date();
    const hours = `0${today.getHours()}`.slice(-2);
    setTodayhours(Number(hours));
  });

  useEffect(() => {
    if (todayhours >= 18 || todayhours < 7) {
      setBackgroundImg('Night');
    } else {
      setBackgroundImg('Day');
    }
  }, [todayhours]);

  const Refresh = async () => {
    const result = await JWTapiClient.post(`user/refresh`).catch(err => {
      if (err.response.status === 401) {
        Router.push('/login');
      }
    });
    return result;
  };

  useEffect(() => {
    Refresh();
  });

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ReactQueryDevtools initialIsOpen={false} />
        <Background
          ref={background}
          className={backgroundImg === 'Day' ? 'day' : 'night'}
        />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
