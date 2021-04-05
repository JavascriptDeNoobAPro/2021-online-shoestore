import Image from "next/image";
import Link from "next/link";
import accounting from "accounting";
import Rating from "@material-ui/lab/Rating";
import styles from "../styles/card.module.css";

const Cards = ({
  products: { name, description, mediaUrl, price, rating, _id },
}) => {
  return (
    <div className={styles.box} key={_id}>
      <h2>{name}</h2>
      <Link href={"/product/[id]"} as={`/product/${_id}`}>
        <a>Details</a>
      </Link>
      <div className={styles.content}>
        <Image src={mediaUrl} height={180} width={300} objectFit='contain' />
        <div className={styles.pricestars}>
          <h3>{accounting.formatMoney(price, "€")}</h3>
          <Rating name='read-only' value={rating} readOnly />
        </div>
        <h4>{description}</h4>
      </div>
    </div>
  );
};

export default Cards;
