// import express from "express";
// import {
//   createMovie,
//   getMovies,
//   updateMovie,
//   deleteMovie
// } from "../controllers/movieControllers.js";

// const router = express.Router();

// router.post("/create", createMovie);
// router.get("/read", getMovies);
// router.put("/update", updateMovie);
// router.delete("/delete/:id", deleteMovie);

// export default router;


import express from "express";
import { createMovie, getMovies, updateMovie, deleteMovie } from "../controllers/movieControllers.js";

const router = express.Router();

// Routes
router.post("/create", createMovie);
router.get("/read", getMovies);
router.put("/update/:id", updateMovie); 
router.delete("/delete/:id", deleteMovie);  

export default router;
