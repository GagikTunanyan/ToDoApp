import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from "react-redux";
import { myStore } from "../redux";
import Head from "next/head";
import { resetServerContext } from 'react-beautiful-dnd';
import '@reach/dialog/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  resetServerContext();
  return (
    <Provider store={myStore}>
      <Head>
        <title>ToDo List</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </Head>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
