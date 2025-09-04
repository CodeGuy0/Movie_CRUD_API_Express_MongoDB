// import Movie from "../models/Movie.js";

// export const createMovie = async (req, res) => {
//   try {
//     const movie = await Movie.create(req.body);
//     res.status(201).json(movie);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getMovies = async (req, res) => {
//   try {
//     const movies = await Movie.find();
//     res.status(200).json(movies);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateMovie = async (req, res) => {
//   try {
//     const movie = await Movie.findOneAndUpdate(
//       { title: req.body.title },
//       req.body,
//       { new: true }
//     );
//     if (!movie) return res.status(404).json({ message: "Movie not found" });
//     res.status(200).json(movie);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteMovie = async (req, res) => {
//   try {
//     const movie = await Movie.findByIdAndDelete(req.params.id);
//     if (!movie) return res.status(404).json({ message: "Movie not found" });
//     res.status(200).json({ message: "Movie deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import mongoose from "mongoose";
import Movie from "../models/Movie.js";

/**
 * Create Movie
 */
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      director,
      releaseYear,
      genre,
      rating,
      duration,
      language,
      country,
      budget,
      boxOffice,
      cast,
      releaseDate,
    } = req.body;

    
    if (
      !title || !title.trim() ||
      !director || !director.trim() ||
      releaseYear == null ||
      !genre || !genre.trim() ||
      rating == null ||
      duration == null ||
      !language || !language.trim() ||
      !country || !country.trim() ||
      budget == null ||
      boxOffice == null ||
      !Array.isArray(cast) || cast.length === 0
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Prevent duplicate by title
    const existingMovie = await Movie.findOne({ title: title.trim() });
    if (existingMovie) {
      return res.status(409).json({ message: "Movie with this title already exists" });
    }

    // Create new movie
    const movie = await Movie.create({
      title: title.trim(),
      director: director.trim(),
      releaseYear,
      genre: genre.trim(),
      rating,
      duration,
      language: language.trim(),
      country: country.trim(),
      budget,
      boxOffice,
      cast,
      releaseDate,
    });

    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get All Movies
 */
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update Movie
 */
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid Movie ID is required" });
    }

    const {
      title,
      director,
      releaseYear,
      genre,
      rating,
      duration,
      language,
      country,
      budget,
      boxOffice,
      cast,
      releaseDate,
    } = req.body;

    // Require ALL main fields for update (same as create)
    if (
      !title || !title.trim() ||
      !director || !director.trim() ||
      releaseYear == null ||
      !genre || !genre.trim() ||
      rating == null ||
      duration == null ||
      !language || !language.trim() ||
      !country || !country.trim() ||
      budget == null ||
      boxOffice == null ||
      !Array.isArray(cast) || cast.length === 0
    ) {
      return res.status(400).json({ message: "All required fields must be provided for update" });
    }

    // Prevent duplicate title (exclude current movie)
    const existingMovie = await Movie.findOne({
      title: title.trim(),
      _id: { $ne: id },
    });
    if (existingMovie) {
      return res.status(409).json({ message: "Another movie with this title already exists" });
    }

    // Perform update (with validators)
    const movie = await Movie.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        director: director.trim(),
        releaseYear,
        genre: genre.trim(),
        rating,
        duration,
        language: language.trim(),
        country: country.trim(),
        budget,
        boxOffice,
        cast,
        ...(releaseDate ? { releaseDate } : {}),
      },
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete Movie
 */
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Valid Movie ID is required" });
    }

    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




