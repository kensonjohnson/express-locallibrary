import { body, validationResult } from "express-validator";
import BookInstance from "../models/bookInstance.js";
import Book from "../models/book.js";

// Display list of all BookInstances.
export async function bookInstanceList(req, res) {
  try {
    const data = await BookInstance.find().populate("book");

    if (data === null) {
      error = new Error("Server failed to fetch data.");
      error.status = 404;
      next(error);
    }
    data.sort((a, b) => {
      return a.book.title.charCodeAt(0) - b.book.title.charCodeAt(0);
    });
    res.render("bookInstances", {
      title: "All Available Books",
      data,
      page: "book instances",
    });
  } catch (error) {
    res.render("error", { error });
  }
}

// Display detail page for a specific BookInstance.
export async function bookinstanceDetails(req, res, next) {
  try {
    const data = await BookInstance.findById(req.params.id).populate("book");

    if (data === null) {
      const error = new Error("Book availablity not found");
      error.status = 404;
      return next(error);
    }

    res.render("bookInstanceDetails", {
      title: "Book Availability",
      data,
      page: "book instances",
    });
  } catch (error) {
    res.render("error", { error });
  }
}

// Display BookInstance create form on GET.
export async function newBookInstance(req, res) {
  Book.find({}, "title")
    .sort({ title: 1 })
    .exec((error, books) => {
      if (error) {
        return next(error);
      }

      res.render("newBookInstance", {
        title: "Add Book to Library Inventory",
        books,
      });
    });
}

// Handle BookInstance create on POST.
const validateBookSelection = body("book", "Book must be specified")
  .trim()
  .isLength({ min: 1 })
  .escape();
const validateImprint = body("imprint", "Imprint must be specified")
  .trim()
  .isLength({ min: 1 })
  .escape();
const validateStatus = body("status").escape();
const validateDueBack = body("due_back", "Invalid date")
  .optional({ checkFalsy: true })
  .isISO8601()
  .toDate();
const processNewBookInstance = (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a BookInstance object with escaped and trimmed data.
  const bookInstance = new BookInstance({
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back,
  });

  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values and error messages.
    Book.find({}, "title")
      .sort({ title: 1 })
      .exec(function (error, books) {
        if (error) {
          return next(error);
        }
        // Successful, so render.
        res.render("newBookInstance", {
          title: "Add Book to Library Inventory",
          books,
          selectedBook: bookInstance.book._id,
          errors: errors.array(),
          bookInstance,
        });
      });
    return;
  }

  // Data from form is valid.
  bookInstance.save((error) => {
    if (error) {
      return next(error);
    }
    // Successful: redirect to new record.
    res.redirect(bookInstance.url);
  });
};

export const createNewBookInstance = [
  validateBookSelection,
  validateImprint,
  validateStatus,
  validateDueBack,
  processNewBookInstance,
];

// Display BookInstance delete form on GET.
export async function bookinstance_delete_get(req, res, next) {}

// Handle BookInstance delete on POST.
export function bookinstance_delete_post(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
}

// Display BookInstance update form on GET.
export async function updateBookInstanceForm(req, res, next) {
  try {
    const books = Book.find({}, "title").sort({ title: 1 });
    const bookInstance = BookInstance.findById(req.params.id);
    const data = { books: await books, bookInstance: await bookInstance };
    if (bookInstance === null) {
      const error = new Error("Book instance not found.");
      error.status = 404;
      next(error);
    }
    res.render("newBookInstance", {
      title: "Update Book Copy",
      bookinstance: data.bookInstance,
      books: data.books,
      selectedBook: data.bookInstance.book._id,
    });
  } catch (error) {
    res.render("error", error);
  }
}

// Handle bookInstance update on POST.
const processUpdateBookInstance = (req, res, next) => {
  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a BookInstance object with escaped and trimmed data.
  const bookInstance = new BookInstance({
    book: req.body.book,
    imprint: req.body.imprint,
    status: req.body.status,
    due_back: req.body.due_back,
    _id: req.params.id,
  });

  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values and error messages.
    Book.find({}, "title")
      .sort({ title: 1 })
      .exec(function (error, books) {
        if (error) {
          return next(error);
        }
        // Successful, so render.
        res.render("newBookInstance", {
          title: "Update Book Copy",
          books,
          selectedBook: bookInstance.book._id,
          errors: errors.array(),
          bookInstance,
        });
      });
    return;
  }

  // Data from form is valid.
  BookInstance.findByIdAndUpdate(
    req.params.id,
    bookInstance,
    {},
    (error, updatedCopy) => {
      if (error) {
        return next(error);
      }
      // Successful: redirect to new record.
      res.redirect(updatedCopy.url);
    }
  );
};

export const updateBookInstanceSubmit = [
  validateBookSelection,
  validateImprint,
  validateStatus,
  validateDueBack,
  processUpdateBookInstance,
];
