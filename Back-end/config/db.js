const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kefyalew:kefie123@portfolio.ks4kt.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio";

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