import { body, validationResult } from "express-validator";
import Genre from "../models/genre.js";
import Book from "../models/book.js";

// Display list of all Genre.
export async function genres(req, res) {
  try {
    const data = await Genre.find().sort({ name: 1 });

    if (data === null) {
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    res.render("genres", {
      title: "All Genres",
      data,
      page: "genres",
    });
  } catch (error) {
    res.render("error", { error });
  }
}

// Display detail page for a specific Genre.
export async function genreDetails(req, res, next) {
  try {
    const genre = Genre.findById(req.params.id);
    const genreBooks = Book.find({ genre: req.params.id });
    const data = { genre: await genre, genreBooks: await genreBooks };

    if (data === null) {
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    res.render("genreDetails", {
      title: `${req.params.id} Genre Books`,
      data,
      page: "genres",
    });
  } catch (error) {
    res.render("error", { error });
  }
}

// Display Genre create form on GET.
export function newGenre(req, res, next) {
  res.render("newGenre", { title: "Create Genre" });
}

// Handle Genre create on POST.
const validateGenreName = body("name", "Genre name required")
  .trim()
  .isLength({ min: 1 })
  .escape();

const processNewGenre = (req, res, next) => {
  const errors = validationResult(req);
  const genre = new Genre({ name: req.body.name });
  if (!errors.isEmpty()) {
    res.render("newGenre", {
      title: "Create Genre",
      genre,
      errors: errors.array(),
    });
    return;
  } else {
    Genre.findOne({ name: req.body.name }).exec((err, foundGenre) => {
      if (err) {
        return next(err);
      }
      if (foundGenre) {
        res.redirect(foundGenre.url);
      } else {
        genre.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect(genre.url);
        });
      }
    });
  }
};

export const createNewGenre = [validateGenreName, processNewGenre];

// Display Genre delete form on GET.
export function genre_delete_get(req, res) {
  res.send("NOT IMPLEMENTED: Genre delete GET");
}

// Handle Genre delete on POST.
export function genre_delete_post(req, res) {
  res.send("NOT IMPLEMENTED: Genre delete POST");
}

// Display Genre update form on GET.
export function genre_update_get(req, res) {
  res.send("NOT IMPLEMENTED: Genre update GET");
}

// Handle Genre update on POST.
export function genre_update_post(req, res) {
  res.send("NOT IMPLEMENTED: Genre update POST");
}
