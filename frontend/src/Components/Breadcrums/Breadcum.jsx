import React from "react";
import "./Breadcum.css";
import arrow from "../Assests/arrow.png";

const Breadcum = (props) => {
  const { product } = props;
  return (
    <div className="breadcum">
      HOME <img src={arrow} alt="icn" /> SHOP <img src={arrow} alt="icn" />
      {product.category} <img src={arrow} alt="icn" />
      {product.name}
    </div>
  );
};

export default Breadcum;
