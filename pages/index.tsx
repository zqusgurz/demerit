import type { NextPage } from 'next';
import Home from '../components/home/Home';

const Main: NextPage = () => {
  return (
    <main className="relative w-11/12 mx-auto md:w-4/5">
      <Home />
    </main>
  );
};

export default Main;
