import Head from "next/head";
import baseUrl from "../utils/baseUrl";
import styles from "../styles/card.module.css";
import Cards from "../components/Cards";

function Home({ products }) {
  console.log(products);

  return (
    <>
      <Head>
        <title>Next E-commerce</title>
      </Head>
      <div className={styles.container}>
        {products.map((products) => (
          <Cards products={products} key={products._id} />
        ))}
      </div>
    </>
  );
}

export default Home;

export async function getStaticProps(context) {
  const res = await fetch(`${baseUrl}/api/products`);
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
