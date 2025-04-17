// Mongoose je ODM (Object Data Modeling) biblioteka za Node.js koja pomaže da se komunicira sa MongoDB bazom preko JavaScript objekata.
// 📦 Zašto se koristi?
//     Lakše kreiranje modele (šeme) podataka
//     Validacija podataka pre nego što se upišu u bazu
//     Middleware (npr. "uradi nešto pre nego što se sačuva")
//     Lakše manipulacije podacima (find, update, delete...)
// Prvo se instalira u terminalu 'npm install mongoose',onda se pozove sa require(),
// poveze se sa bazom sa mongoose.connect(),exportuje i poveze se sa glavnim js fajlom

const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI); //conn = connection
  console.log(`MongoDB connected:${conn.connection.host} `);
};
mongoose.set("strictQuery", true); //za potiskivanje upozorenja,ako ih ima u terminalu
module.exports = connectDB;
