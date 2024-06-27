// controllers/movieController.js
const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.addMovie = async (req, res) => {
    try {
        const { title, description, releaseYear, genre } = req.body;
        const newMovie = new Movie({ title, description, releaseYear, genre });
        const movie = await newMovie.save();
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.editMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, releaseYear, genre } = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(id, { title, description, releaseYear, genre }, { new: true });
        res.json(updatedMovie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        await Movie.findByIdAndDelete(id);
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.toggleWatched = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        movie.watched = !movie.watched;
        await movie.save();
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.rateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        movie.rating = rating;
        await movie.save();
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.reviewMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { review } = req.body;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        movie.review = review;
        await movie.save();
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
