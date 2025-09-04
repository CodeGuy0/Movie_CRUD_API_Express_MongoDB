// import mongoose from "mongoose";

// const movieSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   director: { type: String, required: true },
//   releaseYear: { type: Number, required: true },
//   genre: { type: String, required: true },
//   rating: { type: Number, min: 0, max: 10 }
// }, { timestamps: true });

// export default mongoose.model("Movie", movieSchema);


import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  duration: { type: Number }, // in minutes
  language: { type: String },
  country: { type: String },
  budget: { type: Number },
  boxOffice: { type: Number },
  cast: [{ type: String }],
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
