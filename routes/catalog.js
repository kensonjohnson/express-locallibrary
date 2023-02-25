import { Router } from "express";
const router = Router();

// Require controller modules.
import {
  index,
  book_create_get,
  book_create_post,
  book_delete_get,
  book_delete_post,
  book_update_get,
  book_update_post,
  book_detail,
  bookList,
} from "../controllers/bookController.js";
import {
  author_create_get,
  author_create_post,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post,
  author_detail,
  authorList,
} from "../controllers/authorController.js";
import {
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_get,
  genre_update_post,
  genre_detail,
  genre_list,
} from "../controllers/genreController.js";
import {
  bookinstance_create_get,
  bookinstance_create_post,
  bookinstance_delete_get,
  bookinstance_delete_post,
  bookinstance_update_get,
  bookinstance_update_post,
  bookinstance_detail,
  bookInstanceList,
} from "../controllers/bookInstanceController.js";

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get("/books/create", book_create_get);

// POST request for creating Book.
router.post("/books/create", book_create_post);

// GET request to delete Book.
router.get("/books/:id/delete", book_delete_get);

// POST request to delete Book.
router.post("/books/:id/delete", book_delete_post);

// GET request to update Book.
router.get("/books/:id/update", book_update_get);

// POST request to update Book.
router.post("/books/:id/update", book_update_post);

// GET request for one Book.
router.get("/books/:id", book_detail);

// GET request for list of all Book items.
router.get("/books", bookList);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get("/author/create", author_create_get);

// POST request for creating Author.
router.post("/author/create", author_create_post);

// GET request to delete Author.
router.get("/author/:id/delete", author_delete_get);

// POST request to delete Author.
router.post("/author/:id/delete", author_delete_post);

// GET request to update Author.
router.get("/author/:id/update", author_update_get);

// POST request to update Author.
router.post("/author/:id/update", author_update_post);

// GET request for one Author.
router.get("/author/:id", author_detail);

// GET request for list of all Authors.
router.get("/authors", authorList);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_list);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get("/bookinstances/create", bookinstance_create_get);

// POST request for creating BookInstance.
router.post("/bookinstances/create", bookinstance_create_post);

// GET request to delete BookInstance.
router.get("/bookinstances/:id/delete", bookinstance_delete_get);

// POST request to delete BookInstance.
router.post("/bookinstances/:id/delete", bookinstance_delete_post);

// GET request to update BookInstance.
router.get("/bookinstances/:id/update", bookinstance_update_get);

// POST request to update BookInstance.
router.post("/bookinstances/:id/update", bookinstance_update_post);

// GET request for one BookInstance.
router.get("/bookinstances/:id", bookinstance_detail);

// GET request for list of all BookInstance.
router.get("/bookinstances", bookInstanceList);

export default router;
