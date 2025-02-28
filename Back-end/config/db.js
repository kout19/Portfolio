const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGO_URI;

async function runDB() {
  try {
    await mongoose.connect(uri, {
      ssl: true,
      tls: true,
      tlsInsecure: false,
      dbName:"contacts",
    });
    console.log("connected to contact mongoDB")
  } catch (err) {
    console.log("Database error", err.message);
    }
}
module.exports = runDB;