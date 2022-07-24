// App initialization
const serverless = require('serverless-http');
const express = require('express');
const app = express();
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true 
}));
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

// Routes
const userRouter = require('./routes/user.route');
const articleRouter = require('./routes/article.route');
const commentRouter = require('./routes/comment.route');
app.use('/user', userRouter);
app.use('/articles', articleRouter);
app.use('/comments', commentRouter);
app.use("/.netlify/back/server", router) // path must route to lambda
app.use("/", router);



// Run the server
server.listen(5000);

module.exports.handler = serverless(app);

