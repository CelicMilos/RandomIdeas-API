const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
//povezivanje sa bazom
const connectDB = require("./config/db");
connectDB();

//Body parser middlewere-za parsovanje sirovih podataka,kada saljemo na server u 'body'
app.use(express.json()); //za slanje sirovog jsona
app.use(express.urlencoded({ extended: false })); //
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
