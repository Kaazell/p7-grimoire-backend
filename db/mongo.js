const mongoose = require("mongoose");

const PASSWORD = "Q6ed5ubDQ3Z4wClq";
const USER = "Kaz";
const DB_URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.ra2crok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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

module.exports = {};
