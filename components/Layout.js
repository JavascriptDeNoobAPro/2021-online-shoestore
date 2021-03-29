import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
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
