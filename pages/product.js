import Link from "next/link";
import Head from "next/head";

const product = () => {
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <Link href='/'>
        <a>Home</a>
      </Link>
    </>
  );
};

export default product;
