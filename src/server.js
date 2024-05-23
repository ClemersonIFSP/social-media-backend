import express from "express";
import { PORT, HOST } from "./config.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import de Routers
import userRouter from "./routers/userRouter.js";
import atuhRouter from "./routers/authRouter.js";
import postRouter from "./routers/postRouter.js";
import likeRouter from "./routers/likeRouter.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routas de Routers
app.use("/user", userRouter);
app.use("/auth", atuhRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});
