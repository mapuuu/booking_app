import BookModal from "../models/book.js";
import mongoose from "mongoose";

export const createBook = async (req, res) => {
  const book = req.body;
  const newBook = new BookModal({
    ...book,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBooks = async (req, res) => {
  const { page } = req.query;
  try {
    // const books = await BookModal.find();
    // res.status(200).json(books);

    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await BookModal.countDocuments({});
    const books = await BookModal.find().limit(limit).skip(startIndex);
    res.json({
      data: books,
      currentPage: Number(page),
      totalbooks: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModal.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBooksByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User doesn't exist" });
  }
  const userbooks = await BookModal.find({ creator: id });
  res.status(200).json(userbooks);
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No book exist with id: ${id}` });
    }
    await BookModal.findByIdAndRemove(id);
    res.json({ message: "book deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, publishDate, pageCount, creator, imageFile, category } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No book exist with id: ${id}` });
    }

    const updatedbook = {
      creator,
      title,
      author,
      description,
      publishDate,
      pageCount,
      category,
      imageFile,
      _id: id,
    };
    await BookModal.findByIdAndUpdate(id, updatedbook, { new: true });
    res.json(updatedbook);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBooksBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const books = await BookModal.find({ title });
    res.json(books);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getBooksByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const books = await BookModal.find({ category: { $in: category } });
    res.json(books);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getRelatedBooks = async (req, res) => {
  const category = req.body;
  try {
    const books = await BookModal.find({ category: { $in: category } });
    res.json(books);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

