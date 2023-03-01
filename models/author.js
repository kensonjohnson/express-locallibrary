import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

AuthorSchema.virtual("formatted_dob").get(function () {
  let dob = "";
  if (this.date_of_birth) {
    dob = this.date_of_birth.toISOString().slice(0, 10);
  }
  return dob;
});

AuthorSchema.virtual("formatted_dod").get(function () {
  let dod = "";
  if (this.date_of_death) {
    dod = this.date_of_death.toISOString().slice(0, 10);
  }
  return dod;
});

AuthorSchema.virtual("local_dob").get(function () {
  let dob = "";
  if (this.date_of_birth) {
    dob = this.date_of_birth.toISOString().slice(0, 10);
  }
  return dob;
});

AuthorSchema.virtual("local_dod").get(function () {
  let dod = "";
  if (this.date_of_death) {
    dod = this.date_of_death.toISOString().slice(0, 10);
  }
  return dod;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/authors/${this._id}`;
});

// Export model
export default model("Author", AuthorSchema);
