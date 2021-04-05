import Link from "next/link";
import Image from "next/image";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const transparentBackground = () => {
    if (window.scrollY > 100) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transparentBackground);
    return () => window.removeEventListener("scroll", transparentBackground);
  }, []);

  return (
    <div className={`${active && "transparent"} `}>
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
          background-color: linear-gradient(#ccc, #d3d3d3);
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
        }
        .transparent a {
          display: none;
        }
        ul {
          display: flex;
        }
        li {
          margin-right: 2rem;
        }
        li:hover {
          border-bottom: 4px solid #279dcf;
        }
        a {
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
