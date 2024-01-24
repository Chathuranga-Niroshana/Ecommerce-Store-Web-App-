import express from "express";
import { Product } from "../models/productSchema.js";

const router = express.Router();

// Add product
router.post("/addproduct", async (req, res) => {
  try {
    // give id auto
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    const savedProduct = await Product.create(product);
    res.status(201).send(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// delete product
router.delete("/removeproduct", async (req, res) => {
  try {
    await Product.findOneAndDelete({ id: req.body.id });
    res.status(201).send({ message: "Deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// get all products
router.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// get a product
router.get("/displayproduct", async (req, res) => {
  try {
    const product = await Product.find({ id: req.body.id });
    if (!product) {
      res.status(404).send({ message: "Not Found!" });
    } else {
      res.status(201).send(product);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
// new collection
router.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollection Fetch");
  res.send(newcollection);
});

// populer
router.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Populer in women fetched");
  res.send(popular_in_women);
});

export default router;
