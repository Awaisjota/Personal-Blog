import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import postRouter from "./routes/postRoutes.js";
import authRouter from "./routes/authRoutes.js";
import contactRouter from "./routes/contactRouter.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: ["https://awaisjotablog.netlify.app","https://personal-blog-frontend-sigma.vercel.app/" ,"http://localhost:5173"], // remove trailing slash
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);
app.use("/api/contact", contactRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is started on http://localhost:${PORT}`);
});
