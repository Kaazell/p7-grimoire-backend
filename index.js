const express = require("express");
const app = express();
const { User } = require("./db/mongo");
const cors = require("cors");

const PORT = 4000;

app.use(cors());
app.use(express.json());

function sayHi(req, res) {
  res.send("Hello World");
}

app.get("/", sayHi);
app.post("/api/auth/signup", signUp);
app.post("/api/auth/login", login);

app.listen(PORT, function () {
  console.log(`Server is running on : ${PORT}`);
});

async function signUp(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const userInDb = await User.findOne({
    email: "email qui n'existe pas",
  });
  if (userInDb != null) {
    res.status(400).send("Email already exists");
    return;
  }
  const user = {
    email: email,
    password: password,
  };
  try {
    await User.create(user);
    throw new Error("db unreachable");
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
    return;
  }
  console.log("users : ", users);
  res.send("Sign up");
}
async function login(req, res) {
  const body = req.body;
  console.log("Body:", body);
  console.log("users in db:", users);

  const userInDb = await User.findOne({ email: body.email });
  if (userInDb == null) {
    res.status(401).send("Wrong email");
    return;
  }
  const passwordInDb = userInDb.password;
  if (passwordInDb != body.password) {
    res.status(401).send("Wrong password");
    return;
  }

  res.send({
    userId: userInDb._id,
    token: "token",
  });
}
