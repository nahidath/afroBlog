// App initialization
const express = require('express');  
const app = express();
const cors = require('cors');
app.use(cors({ 
    origin: "http://localhost:3000", 
    credentials: true 
}));
app.use(express.json());

// Server initialization
var credentials;
var server = require('http').createServer(credentials, app);  

// Mongoose initizalization
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://afroAdm:afroAdm@afroblogdb.aa9d0.mongodb.net/AB_v1?retryWrites=true&w=majority', {
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

// Run the server
server.listen(5000);



