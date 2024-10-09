// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const moviesRouter = require('./routes/movies');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://movie-watchlist-frontend.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Movie Watchlist API');
});

mongoose.connect(process.env.MONGO_URL).then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/movies', moviesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
