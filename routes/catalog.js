import { Router } from "express";
const router = Router();

// Require controller modules.
import {
  index,
  newBook,
  createNewBook,
  book_delete_get,
  book_delete_post,
  book_update_get,
  book_update_post,
  bookDetails,
  bookList,
} from "../controllers/bookController.js";
import {
  newAuthor,
  createNewAuthor,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post,
  authorDetails,
  authors,
} from "../controllers/authorController.js";
import {
  newGenre,
  createNewGenre,
  genre_delete_get,
  genre_delete_post,
  genre_update_get,
  genre_update_post,
  genreDetails,
  genres,
} from "../controllers/genreController.js";
import {
  newBookInstance,
  createNewBookInstance,
  bookinstance_delete_get,
  bookinstance_delete_post,
  bookinstance_update_get,
  bookinstance_update_post,
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
router.get("/books/:id/delete", book_delete_get);

// POST request to delete Book.
router.post("/books/:id/delete", book_delete_post);

// GET request to update Book.
router.get("/books/:id/update", book_update_get);

// POST request to update Book.
router.post("/books/:id/update", book_update_post);

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
router.get("/authors/:id/delete", author_delete_get);

// POST request to delete Author.
router.post("/authors/:id/delete", author_delete_post);

// GET request to update Author.
router.get("/authors/:id/update", author_update_get);

// POST request to update Author.
router.post("/authors/:id/update", author_update_post);

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
router.get("/genres/:id/delete", genre_delete_get);

// POST request to delete Genre.
router.post("/genres/:id/delete", genre_delete_post);

// GET request to update Genre.
router.get("/genres/:id/update", genre_update_get);

// POST request to update Genre.
router.post("/genres/:id/update", genre_update_post);

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
router.get("/bookinstances/:id/delete", bookinstance_delete_get);

// POST request to delete BookInstance.
router.post("/bookinstances/:id/delete", bookinstance_delete_post);

// GET request to update BookInstance.
router.get("/bookinstances/:id/update", bookinstance_update_get);

// POST request to update BookInstance.
router.post("/bookinstances/:id/update", bookinstance_update_post);

// GET request for one BookInstance.
router.get("/bookinstances/:id", bookinstanceDetails);

// GET request for list of all BookInstance.
router.get("/bookinstances", bookInstanceList);

export default router;
