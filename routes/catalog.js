import { Router } from "express";
const router = Router();

// Require controller modules.
import {
  index,
  newBook,
  createNewBook,
  deleteBook,
  deleteBookSubmit,
  updateBookForm,
  updateBookSubmit,
  bookDetails,
  bookList,
} from "../controllers/bookController.js";
import {
  newAuthor,
  createNewAuthor,
  deleteAuthorForm,
  deleteAuthorSubmit,
  updateAuthorForm,
  updateAuthorSubmit,
  authorDetails,
  authors,
} from "../controllers/authorController.js";
import {
  newGenre,
  createNewGenre,
  deleteGenre,
  deleteGenreSubmit,
  updateGenreForm,
  updateGenreSubmit,
  genreDetails,
  genres,
} from "../controllers/genreController.js";
import {
  newBookInstance,
  createNewBookInstance,
  deleteCopy,
  processDeleteCopy,
  updateBookInstanceForm,
  updateBookInstanceSubmit,
  bookinstanceDetails,
  bookInstanceList,
} from "../controllers/bookInstanceController.js";

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/books/create", newBook);

// POST request for creating Book.
router.post("/books/create", createNewBook);

// GET request to delete Book.
router.get("/books/:id/delete", deleteBook);

// POST request to delete Book.
router.post("/books/:id/delete", deleteBookSubmit);

// GET request to update Book.
router.get("/books/:id/update", updateBookForm);

// POST request to update Book.
router.post("/books/:id/update", updateBookSubmit);

// GET request for one Book.
router.get("/books/:id", bookDetails);

// GET request for list of all Book items.
router.get("/books", bookList);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/authors/create", newAuthor);

// POST request for creating Author.
router.post("/authors/create", createNewAuthor);

// GET request to delete Author.
router.get("/authors/:id/delete", deleteAuthorForm);

// POST request to delete Author.
router.post("/authors/:id/delete", deleteAuthorSubmit);

// GET request to update Author.
router.get("/authors/:id/update", updateAuthorForm);

// POST request to update Author.
router.post("/authors/:id/update", updateAuthorSubmit);

// GET request for one Author.
router.get("/authors/:id", authorDetails);

// GET request for list of all Authors.
router.get("/authors", authors);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genres/create", newGenre);

//POST request for creating Genre.
router.post("/genres/create", createNewGenre);

// GET request to delete Genre.
router.get("/genres/:id/delete", deleteGenre);

// POST request to delete Genre.
router.post("/genres/:id/delete", deleteGenreSubmit);

// GET request to update Genre.
router.get("/genres/:id/update", updateGenreForm);

// POST request to update Genre.
router.post("/genres/:id/update", updateGenreSubmit);

// GET request for one Genre.
router.get("/genres/:id", genreDetails);

// GET request for list of all Genre.
router.get("/genres", genres);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get("/bookinstances/create", newBookInstance);

// POST request for creating BookInstance.
router.post("/bookinstances/create", createNewBookInstance);

// GET request to delete BookInstance.
router.get("/bookinstances/:id/delete", deleteCopy);

// POST request to delete BookInstance.
router.post("/bookinstances/:id/delete", processDeleteCopy);

// GET request to update BookInstance.
router.get("/bookinstances/:id/update", updateBookInstanceForm);

// POST request to update BookInstance.
router.post("/bookinstances/:id/update", updateBookInstanceSubmit);

// GET request for one BookInstance.
router.get("/bookinstances/:id", bookinstanceDetails);

// GET request for list of all BookInstance.
router.get("/bookinstances", bookInstanceList);

export default router;
