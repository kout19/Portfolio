const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kefyalew:kefie123@portfolio.ks4kt.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio";

async function UserDB() {
  try {
    await mongoose.connect(uri, {
      ssl: true,
      tls: true,
      tlsInsecure: false,
      dbName:"userDB",
    });
    console.log("connected to user mongoDB")
  } catch (err) {
    console.log("Database error", err.message);
    }
}
module.exports = UserDB;