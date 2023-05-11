import Head from 'next/head';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>미팅놈들 벌점 조회</title>
        <meta
          name="description"
          content="미팅놈들 벌점 조회 서비스"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="미팅놈들 벌점 조회" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://demerit.vercel.app/" />
        <meta property="og:image" content="/icons/logo.jpg" />
        <meta property="og:article:author" content="Hyuk" />
        <link rel="icon" href='/icons/logo.jpg'/>
      </Head>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
