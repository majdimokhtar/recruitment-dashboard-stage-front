import React from "react";
import Head from "next/head";



const Header = ({ children, title = "Find you Job Now" }) => {
  return (
    <div>
      <Head>
        <title>{title} - Smart Authentication</title>
      </Head>
      {children}
    </div>
  );
};

export default Header;
