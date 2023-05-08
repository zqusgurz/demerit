import Head from 'next/head';
import Header from '../../../components/common/Header/Header';
import Footer from '../../../components/common/Footer/Footer';
import { PropsWithChildren } from 'react';

const Layout = (props: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Hyuks Portfolio</title>
        <meta
          name="description"
          content="안녕하세요, 피드백과 개발을 즐기는 프론트엔드 개발자 변혁입니다."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Hyuk's Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hyuk-portfolio.vercel.app/" />
        <meta property="og:image" content="/icons/profile.svg" />
        <meta property="og:article:author" content="Hyuk" />
        <link rel="icon" href='/icons/profile.svg'/>
        {/* <link rel="icon" href="/favicon.svg" /> */}
      </Head>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
