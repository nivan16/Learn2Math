const express = require("express"); 
const app = express(); 
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const lessons = require("./routes/api/lessons");
const flashcards = require("./routes/api/flashcards");
const questions = require("./routes/api/questions");
const quizzes = require("./routes/api/quizzes");
const quizscores = require("./routes/api/quiz_score");
const comments = require("./routes/api/comments");

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static('frontend/build'));
  // app.get('/', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  // })

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../frontend/build")));
  app.use(cors());

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);

//CORS
app.use(cors())

app.get("/", (req, res) => res.send("Using Nodemon"));

app.use("/api/users", users);
app.use("/api/lessons", lessons);
app.use("/api/questions", questions);
app.use("/api/flashcards", flashcards);
app.use("/api/quizzes", quizzes)
app.use("/api/quizscores", quizscores);
app.use("/api/comments", comments);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

console.log(process.env.NODE_ENV);