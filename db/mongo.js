require("dotenv").config();
const mongoose = require("mongoose");

("cluster0.ra2crok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const DB_URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_DOMAIN}`;
console.log("DB_URL:", DB_URL);

async function connect() {
  try {
    const res = await mongoose.connect(DB_URL);
    console.log("Connected to DB");
  } catch (e) {
    console.error(e);
  }
}
connect();

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
