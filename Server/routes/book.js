import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createBook,
  deleteBook,
  getRelatedBooks,
  getBook,
  getBooks,
  getBooksBySearch,
  getBooksByCategory,
  getBooksByUser,
  updateBook,
} from "../controllers/book.js";

router.get("/search", getBooksBySearch);
router.get("/category/:category", getBooksByCategory);
router.post("/relatedBooks", getRelatedBooks);
router.get("/", getBooks);
router.get("/:id", getBook);

router.post("/", auth, createBook);
router.delete("/:id", auth, deleteBook);
router.patch("/:id", auth, updateBook);
router.get("/userBooks/:id", auth, getBooksByUser);

export default router;
