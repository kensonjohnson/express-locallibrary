import Book from "../models/book.js";
import Author from "../models/author.js";
import Genre from "../models/genre.js";
import BookInstance from "../models/bookinstance.js";
import async from "async";

export async function index(req, res) {
  const bookCount = Book.countDocuments({});
  const bookInstanceCount = BookInstance.countDocuments({});
  const bookInstanceAvailableCount = BookInstance.countDocuments({
    status: "Available",
  });
  const authorCount = Author.countDocuments({});
  const genreCount = Genre.countDocuments({});

  const data = {
    bookCount: await bookCount,
    bookInstanceCount: await bookInstanceCount,
    bookInstanceAvailableCount: await bookInstanceAvailableCount,
    authorCount: await authorCount,
    genreCount: await genreCount,
  };

  res.render("index", { title: "Local Library Home", data, page: "home" });
}

// Display list of all books.
export async function bookList(req, res) {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author");

  console.log(allBooks);

  res.render("books", { title: "All Books", data: allBooks, page: "books" });
}

// Display detail page for a specific book.
export function book_detail(req, res) {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
}

// Display book create form on GET.
export function book_create_get(req, res) {
  res.send("NOT IMPLEMENTED: Book create GET");
}

// Handle book create on POST.
export function book_create_post(req, res) {
  res.send("NOT IMPLEMENTED: Book create POST");
}

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
