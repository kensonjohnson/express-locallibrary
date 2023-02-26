import Genre from "../models/genre.js";
import Book from "../models/book.js";

// Display list of all Genre.
export async function genres(req, res) {
  const allGenres = await Genre.find().sort({ name: 1 });
  res.render("genres", {
    title: "All Genres",
    data: allGenres,
    page: "genres",
  });
}

// Display detail page for a specific Genre.
export async function genreDetails(req, res, next) {
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
}

// Display Genre create form on GET.
export function genre_create_get(req, res) {
  res.send("NOT IMPLEMENTED: Genre create GET");
}

// Handle Genre create on POST.
export function genre_create_post(req, res) {
  res.send("NOT IMPLEMENTED: Genre create POST");
}

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
