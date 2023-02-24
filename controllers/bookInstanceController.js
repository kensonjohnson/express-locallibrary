import BookInstance from "../models/bookinstance.js";

// Display list of all BookInstances.
export async function bookInstanceList(req, res) {
  const allBookInstances = await BookInstance.find().populate("book");
  console.log(allBookInstances);

  res.render("bookInstances", {
    title: "All Book Instances",
    data: allBookInstances,
    page: "book instances",
  });
}

// Display detail page for a specific BookInstance.
export function bookinstance_detail(req, res) {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
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
