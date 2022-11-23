import mongoose from "mongoose";

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  publishDate: {
    type: Date,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true
  },
  category: {
    type: [String],
    require: true
  },
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  name: String,
  creator: String,
});

const BookModal = mongoose.model("Book", bookSchema);

export default BookModal;
