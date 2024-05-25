import express from "express";
import create from "../controllers/post/create.js";
import update from "../controllers/post/update.js";
import remove from "../controllers/post/remove.js";
import getById from "../controllers/post/getById.js";
import listNewPosts from "../controllers/post/listNewPosts.js";
import listOldPosts from "../controllers/post/listOldPosts.js";
import listUserPosts from "../controllers/post/listUserPosts.js";

const router = express.Router();

router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.get("/getById/:id", getById);
router.get("/listNewPosts", listNewPosts);
router.get("/listOldPosts", listOldPosts);
router.get("/user/:id", listUserPosts);

export default router;
