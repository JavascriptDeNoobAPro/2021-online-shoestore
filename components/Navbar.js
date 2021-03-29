import Link from "next/link";
import Image from "next/image";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const Navbar = () => {
  return (
    <div>
      <Link href='/'>
        <a>
          <Image
            src='/images/logo.webp'
            alt='logo'
            width={100}
            height={100}
            objectFit='contain'
            objectPosition='center'
          />
        </a>
      </Link>
      <ul>
        <li>
          {" "}
          <Link href='/login'>
            <a>login</a>
          </Link>
        </li>
        <li>
          {" "}
          <Link href='/signup'>
            <a>signup</a>
          </Link>
        </li>
        <li>
          {" "}
          <Link href='/checkout'>
            <a>
              <AddShoppingCartIcon fontSize='large' />
            </a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: lightgray;
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
        }
        ul {
          display: flex;
          margin-right: 2rem;
        }
        li:hover {
          text-decoration: underline;
        }
        a {
          margin-left: 2rem;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
