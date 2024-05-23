import express from "express";
import add from "../controllers/like/add.js";
import remove from "../controllers/like/remove.js";

const router = express.Router();

router.post("/", add);
router.delete("/", remove);

export default router;