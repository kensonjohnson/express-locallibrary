import Author from "../models/author.js";
import Book from "../models/book.js";

// Display list of all Authors.
export async function authors(req, res) {
  const allAuthors = await Author.find().sort({ family_name: 1 });
  res.render("authors", {
    title: "All Authors",
    data: allAuthors,
    page: "authors",
  });
}

// Display detail page for a specific Author.
export async function authorDetails(req, res, next) {
  const author = Author.findById(req.params.id);
  const booksByAuthor = Book.find({ author: req.params.id }, "title summary");

  const data = { author: await author, booksByAuthor: await booksByAuthor };

  console.log(data);

  if (data === null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }

  res.render("authorDetails", {
    title: "Author Details",
    data,
    page: "authors",
  });
}
// Display Author create form on GET.
export function author_create_get(req, res) {
  res.send("NOT IMPLEMENTED: Author create GET");
}

// Handle Author create on POST.
export function author_create_post(req, res) {
  res.send("NOT IMPLEMENTED: Author create POST");
}

// Display Author delete form on GET.
export function author_delete_get(req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
}

// Handle Author delete on POST.
export function author_delete_post(req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
}

// Display Author update form on GET.
export function author_update_get(req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
}

// Handle Author update on POST.
export function author_update_post(req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
}
