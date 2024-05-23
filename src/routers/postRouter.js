import express from "express";
import create from "../controllers/post/create.js";
import update from "../controllers/post/update.js";
import remove from "../controllers/post/remove.js";
import listOrderByDate from "../controllers/post/listOrderByDate.js";
import listOrderByLike from "../controllers/post/listOrderByLike.js";

const router = express.Router();

router.post("/", create);
router.put("/", update);
router.delete("/", remove);
router.get("/listOrderByDate", listOrderByDate);
router.get("/listOrderByLike", listOrderByLike);

export default router;