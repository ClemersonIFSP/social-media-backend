import express from "express";
import create from "../controllers/user/create.js";
import update from "../controllers/user/update.js";
import remove from "../controllers/user/remove.js";

const router = express.Router();

router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
