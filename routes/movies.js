// routes/movies.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getMovies);
router.post('/', movieController.addMovie);
router.put('/:id', movieController.editMovie);
router.delete('/:id', movieController.deleteMovie);
router.put('/toggle-watched/:id', movieController.toggleWatched);
router.put('/rate/:id', movieController.rateMovie);
router.put('/review/:id', movieController.reviewMovie);

module.exports = router;
