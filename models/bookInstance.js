import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstances/${this._id}`;
});

BookInstanceSchema.virtual("formatted_due_date").get(function () {
  let date = "";
  if (this.due_back) {
    date = this.due_back.toISOString().slice(0, 10);
  }
  return date;
});

// Export model
export default model("BookInstance", BookInstanceSchema);
