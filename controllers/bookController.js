import { body, validationResult } from "express-validator";
import Book from "../models/book.js";
import Author from "../models/author.js";
import Genre from "../models/genre.js";
import BookInstance from "../models/bookinstance.js";

export async function index(req, res, next) {
  const bookCount = Book.countDocuments({});
  const bookInstanceCount = BookInstance.countDocuments({});
  const bookInstanceAvailableCount = BookInstance.countDocuments({
    status: "Available",
  });
  const authorCount = Author.countDocuments({});
  const genreCount = Genre.countDocuments({});
  try {
    const data = {
      bookCount: await bookCount,
      bookInstanceCount: await bookInstanceCount,
      bookInstanceAvailableCount: await bookInstanceAvailableCount,
      authorCount: await authorCount,
      genreCount: await genreCount,
    };

    if (data === null) {
      error = new Error("Server failed to fetch data.");
      error.status = 404;
      next(error);
    }
    res.render("index", {
      title: "Local Library Home",
      data,
      page: "home",
    });
  } catch (error) {
    res.render("error", { error });
  }
}

// Display list of all books.
export async function bookList(req, res) {
  const allBooks = Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author");
  try {
    const data = await allBooks;

    if (data === null) {
      error = new Error("Server failed to fetch data.");
      error.status = 404;
      next(error);
    }

    res.render("books", {
      title: "All Books",
      data,
      page: "books",
    });
  } catch (error) {
    res.render("error", { error });
  }
}

// Display detail page for a specific book.
export async function bookDetails(req, res, next) {
  const book = Book.findById(req.params.id)
    .populate("author")
    .populate("genre");

  const bookInstance = BookInstance.find({ book: req.params.id });

  const data = { book: await book, bookInstance: await bookInstance };

  if (data === null) {
    const err = new Error("Book not found.");
    err.status = 404;
    return next(err);
  }

  res.render("bookDetails", { title: "Book Details", data, page: "books" });
}

// Display book create form on GET.
export async function newBook(req, res) {
  try {
    const authors = Author.find({}, "first_name family_name").sort({
      family_name: 1,
    });
    const genres = Genre.find();
    const data = { authors: await authors, genres: await genres };

    if (data === null) {
      const err = new Error("Book not found.");
      err.status = 404;
      return next(err);
    }
    res.render("newBook", {
      title: "Create Book",
      data,
    });
  } catch (error) {
    res.render("error", { error });
  }
}

// Handle book create on POST.
const genreToArray = (req, res, next) => {
  if (!Array.isArray(req.body.genre)) {
    req.body.genre =
      typeof req.body.genre === "undefined" ? [] : [req.body.genre];
  }
  next();
};
const validateBookTitle = body("title", "Title must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape();
const validateBookAuthor = body("author", "Author must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape();
const validateBookSummary = body("summary", "Summary must not be empty.")
  .trim()
  .isLength({ min: 1 })
  .escape();
const validateBookISBN = body("isbn", "ISBN must not be empty")
  .trim()
  .isLength({ min: 1 })
  .escape();
const validateBookGenre = body("genre.*").escape();
const processNewBook = async (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a Book object with escaped and trimmed data.
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    summary: req.body.summary,
    isbn: req.body.isbn,
    genre: req.body.genre,
  });

  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/error messages.

    // Get all authors and genres for form.

    try {
      const authors = await Author.find({}, "first_name family_name").sort({
        family_name: 1,
      });
      const genres = await Genre.find();
      if (!authors || !genres) {
        const error = new Error("Failed to fetch new book data.");
        error.status = 404;
        return next(error);
      }

      for (const genre of genres) {
        if (book.genre.includes(genre._id)) {
          genre.checked = "true";
        }
      }
      const data = { authors, genres };

      res.render("newBook", {
        title: "Create Book",
        authors,
        genres,
        book,
        errors: errors.array(),
      });
    } catch (error) {
      return next(error);
    }
  }

  // Data from form is valid. Save book.
  book.save((err) => {
    if (err) {
      return next(err);
    }
    // Successful: redirect to new book record.
    res.redirect(book.url);
  });
};

export const createNewBook = [
  genreToArray,
  validateBookTitle,
  validateBookAuthor,
  validateBookSummary,
  validateBookISBN,
  validateBookGenre,
  processNewBook,
];

// Display book delete form on GET.
export function book_delete_get(req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
}

// Handle book delete on POST.
export function book_delete_post(req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST");
}

// Display book update form on GET.
export function book_update_get(req, res) {
  res.send("NOT IMPLEMENTED: Book update GET");
}

// Handle book update on POST.
export function book_update_post(req, res) {
  res.send("NOT IMPLEMENTED: Book update POST");
}
