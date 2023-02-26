import BookInstance from "../models/bookinstance.js";

// Display list of all BookInstances.
export async function bookInstanceList(req, res) {
  const allBookInstances = BookInstance.find().populate("book");
  try {
    const data = await allBookInstances;

    if (data === null) {
      error = new Error("Server failed to fetch data.");
      error.status = 404;
      next(error);
    }

    res.render("bookInstances", {
      title: "All Book Instances",
      data,
      page: "book instances",
    });
  } catch (error) {
    res.render("error", { error });
  }
}

// Display detail page for a specific BookInstance.
export async function bookinstanceDetails(req, res, next) {
  const bookInstance = BookInstance.findById(req.params.id).populate("book");
  try {
    const data = await bookInstance;

    if (data === null || data === []) {
      const err = new Error("Book availablity not found");
      err.status = 404;
      return next(err);
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
export function bookinstance_create_get(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
}

// Handle BookInstance create on POST.
export function bookinstance_create_post(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
}

// Display BookInstance delete form on GET.
export function bookinstance_delete_get(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
}

// Handle BookInstance delete on POST.
export function bookinstance_delete_post(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
}

// Display BookInstance update form on GET.
export function bookinstance_update_get(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
}

// Handle bookinstance update on POST.
export function bookinstance_update_post(req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
}
