const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
//povezivanje sa bazom
const connectDB = require("./config/db");
connectDB();

//Static folder
app.use(express.static(path.join(__dirname, "public"))); //nas public folder postaje statican

//Body parser middlewere-za parsovanje sirovih podataka,kada saljemo na server u 'body'
app.use(express.json()); //za slanje sirovog jsona
app.use(express.urlencoded({ extended: false }));

//CORS midlewere-Cros Origin Resourse Sharing
//Posto koristimo dva domena(localhost:5000 i localhost:3000)
// mora da se instalira 'cors' u terminalu da bi radilo

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credantials: true,
  })
);

//ROUTS
app.get("/", (request, response) => {
  // Express automatski prepoznaje koji je content-type(html,json,css)
  response.send({ message: "Welcome to the RandomIdeas API" });
});

app.get("/website", (request, response) => {
  response.send("<h1>Welcome to RandomIdeas API</h1>");
});
//Poziveamo poseban fajl sa idejama i rutama
const ideasRouter = require("./routes/ideas");
//app.use()- u zagradi krajnja url tacka (endpoint) i odakle pozivamo
app.use("/api/ideas", ideasRouter);
app.listen(port, () => console.log(`Server is listening at ${port}`));
