// App initialization
const express = require('express');  
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true 
}));
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser('my-secret'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Server initialization
var credentials;
var server = require('http').createServer(credentials, app);
const db_url = process.env.DATABASE_URL;

// Mongoose initizalization
const mongoose = require('mongoose');
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('connected', () => console.log('Database connected'));

// Middlewares
const identificationMiddleware = require('./middlewares/identification.middleware.js');
app.use('/', identificationMiddleware.checkCookie);

// Routes
const userRouter = require('./routes/user.route');
const articleRouter = require('./routes/article.route');
const commentRouter = require('./routes/comment.route');
const subscribeRouter = require('./routes/subscribe.route');
app.use('/user', userRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use('/sub', subscribeRouter);

// Run the server
server.listen(5000);



