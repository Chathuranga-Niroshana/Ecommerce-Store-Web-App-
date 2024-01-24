import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assests/star_icon.png";
import star_dull_icon from "../Assests/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="image" />
          <img src={product.image} alt="image" />
          <img src={product.image} alt="image" />
          <img src={product.image} alt="image" />
        </div>
        <div className="productdisplay-img">
          <img
            src={product.image}
            alt="image"
            className="productdisplay-main-img"
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="icn" />
          <img src={star_icon} alt="icn" />
          <img src={star_icon} alt="icn" />
          <img src={star_icon} alt="icn" />
          <img src={star_dull_icon} alt="icn" />
          <p> (122) </p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In, deleniti
          quaerat laudantium illum amet consectetur, facere consequatur nulla
          beatae saepe quasi repudiandae laborum omnis sed molestiae deserunt
          sit unde iusto!
        </div>
        <div className="productdisplay-right-sizes">
          <h1>Select Size</h1>
          <div className="productdisplay-right-size">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button  onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span> Women, T-Shirt, Crop Top{" "}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span> Modern, Latest{" "}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
