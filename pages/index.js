import Link from "next/link";
import Head from "next/head";
import styles from "../styles/styles.module.css";

function Home({ products }) {
  console.log(products);

  return (
    <>
      <Head>
        <title>Next E-commerce</title>
      </Head>
      <div className={styles.root}>
        {products.map(({ name, description, mediaUrl, price, _id }) => {
          return (
            <div className={styles.card} key={_id}>
              {name}
            </div>
          );
        })}
      </div>

      <Link href='/product'>
        <a>Go to Products</a>
      </Link>
    </>
  );
}

export default Home;

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  return {
    props: { products: data }, // will be passed to the page component as props
  };
}

/* const [text, setText] = useState("loading");
  useEffect(() => {
    fetch("http://localhost:3000/api/message")
      .then((res) => res.json())
      .then((data) => setText(data.message))
      .catch((err) => console.log(err));
  }, []); */
