import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import ProductDetails from "./ProductDetails";

const BoomBarrier = () => {
  return (
    <>
      <Helmet>
        <title></title>
        <meta
          name="description"
          content="Discover serviced apartments and premium rentals at Zenova Stays Porur. Comfortable stays in Chennai with low prices, modern rooms, and easy booking."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <Navbar />
    <ProductDetails/>
    </>
  );
};

export default BoomBarrier;
