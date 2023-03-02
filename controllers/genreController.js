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
export async function updateGenreForm(req, res) {
  try {
    const genre = await Genre.findById(req.params.id);
    if (genre === null) {
      res.redirect("/catalog/genres", { title: "All Genres" });
    }
    res.render("newGenre", { title: "Update Genre", genre });
  } catch (error) {
    res.render("error", error);
  }
}

const processUpdateGenre = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("newGenre", {
      title: "Update Genre",
      genre: req.body,
      errors: errors.array(),
    });
    return;
  } else {
    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    });
    Genre.findByIdAndUpdate(req.params.id, genre, {}, (error, updatedGenre) => {
      if (error) {
        return next(error);
      }
      res.redirect(updatedGenre.url);
    });
  }
};

// Handle Genre update on POST.
export const updateGenreSubmit = [validateGenreName, processUpdateGenre];
