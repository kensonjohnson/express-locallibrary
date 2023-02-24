import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for bookinstance's URL
GenreSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/genre/${this._id}`;
});

// Export model
export default model("Genre", GenreSchema);
