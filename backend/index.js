import express, { json } from "express";
import { PORT, DB_URL } from "./Config.js";
import cors from "cors";
import path from "path";
import connectDB from "./connectDB.js";
import multer from "multer";
import productRouter from "./Routes/productRoutes.js";
import userRouter from "./Routes/userRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());
connectDB(DB_URL);

// To store all the uploaded images ==================================================
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });
// Creating upload Endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  });
});
// ================================================================================

// Product Routes
app.use("/", productRouter);
// User Routes
app.use("/", userRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
