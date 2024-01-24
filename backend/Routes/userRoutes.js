import { User } from "../models/userSchema.js";
import express from "express";
import Jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res
        .status(400)
        .json({ success: false, errors: "User already exist!" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    const savedUser = await User.create(user);
    // res.status(201).send(savedUser);

    const data = {
      user: {
        id: user.id,
      },
    };
    const token = Jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// login
router.use("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
          },
        };
        const token = Jwt.sign(data, "secret_ecom");
        res.json({ success: true, token });
      } else {
        res.json({ success: false, error: "Wrong Password" });
      }
    } else {
      res.json({ success: false, error: "Wrong Email" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token!" });
  } else {
    try {
      const data = Jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "fffff!" });
    }
  }
};

// add product to cart
router.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added ");
});

// remove product from cart
router.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Removed ");
  }
});

// keep cart data after logout
router.post("/getcart", fetchUser, async (req, res) => {
  console.log("SetCart");
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

export default router;
