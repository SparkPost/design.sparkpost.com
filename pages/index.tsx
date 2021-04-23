import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Home Page {process.env.TEST}</h1>
      <Link href="/about">About</Link>
    </div>
  );
};

export default Home;
