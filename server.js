const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
app.use(express.json());
app.use(cors());

const {
  signup,
  login,

  verify,
} = require("./api/auth/user");

app.get("/", (req, res) => {
  res.send("hey, Its working");
});
app.post("/signup", signup);
app.post("/login", login);

app.get("/verify", verify);

const db_url =
  "mongodb+srv://subhendu:subhendu@cluster0.qthyq.mongodb.net/roohas-test?retryWrites=true&w=majority";
mongoose.connect(
  db_url,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongoDB ..");
  }
);
//Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running at port", PORT);
});
