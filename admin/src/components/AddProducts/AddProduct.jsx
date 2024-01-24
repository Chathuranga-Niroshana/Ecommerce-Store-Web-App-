import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  // keep image in the image field after selected
  const [image, setImage] = useState(false);

  const imagehandler = (e) => {
    setImage(e.target.files[0]);
  };

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const Add_Product = async () => {
    try {
      let responseData;
      let product = productDetails;

      // Create FormData and append the image
      const formData = new FormData();
      formData.append("product", image);

      // Upload image
      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      responseData = await uploadResponse.json();

      if (uploadResponse.ok) {
        // If image upload is successful, update the product's image URL
        product.image = responseData.image_url;

        // Add the product
        const addProductResponse = await fetch(
          "http://localhost:4000/addproduct",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );

        const addProductData = await addProductResponse.json();

        if (addProductResponse.ok) {
          alert("Product Added");
        } else {
          console.log("Failed to add product:", addProductData.message);
          alert("Failed to add product");
        }
      } else {
        console.log("Failed to upload image:", responseData.message);
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error in Add_Product:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="addproduct-selector"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="Kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            value={productDetails.image}
            onChange={changeHandler}
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="upload area"
            className="addproduct-thumnail-img"
          />
        </label>
        <input
          onChange={imagehandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
