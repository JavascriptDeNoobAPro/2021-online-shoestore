import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
        />
      </Head>
      <Navbar />
      {children}
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
          background: linear-gradient(#d3d3d3, #279dcf);
        }
        ul {
          list-style-type: none;
        }
        a {
          text-decoration: none;
          font-size: 1.5rem;
        }
      `}</style>
    </>
  );
};

export default Layout;
