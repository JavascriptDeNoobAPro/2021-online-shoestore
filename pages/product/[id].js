import { useRouter } from "next/router";
import baseUrl from "../../utils/baseUrl";

import CartItem from "../../components/CartItem";

const Product = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h3>loading ...</h3>;
  }

  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });
    await res.json();
    router.push("/");
  };

  return (
    <div className='root' style={{ minHeight: "100vh" }}>
      <CartItem product={product} deleteProduct={deleteProduct} />
    </div>
  );
};

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "6061e04f1cafab0b62ffe8c7" } }],
    fallback: true, //fallback : false significa que otras rutas deben retornar 404
  };
}

/* export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`http://localhost:3000/api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
} */

export default Product;
