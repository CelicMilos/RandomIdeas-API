const express = require("express");
const app = express();
const port = 5000;
const ideas = [
  {
    id: 1,
    text: "Positive Newsletter,a newsletter that only shares positive,uplifting news",
    tag: "Technology",
    username: "Clem Fandango",
    date: "2025-04-15",
  },
  {
    id: 2,
    text: "Milk cartons that turn a different color the lder that your milk is getting",
    tag: "Inventions",
    username: "Aurelio Buendia",
    date: "2025-04-15",
  },
  {
    id: 3,
    text: "ATM location app wicth lets you know where the closest ATm is and if it is in service",
    tag: "Softwere",
    username: "Aurelio Buendia",
    date: "2025-04-15",
  },
];
//ROUTS
app.get("/website", (request, response) => {
  response.send("<h1>Welcome to RandomIdeas API</h1>");
});
app.get("/", (request, response) => {
  // Express automatski prepoznaje koji je content-type(html,json,css)
  response.send({ message: "Welcome to the RandomIdeas API" });
});
//gat all ideas
app.get("/api/ideas", (request, response) => {
  //Moze ,.json umesto .send ali se onda podrazumeva JSON
  //i samo (ideas) ali bolje je kao objekat sa succes i data
  response.json({ success: true, data: ideas });
});

//single idea with query params-request.params.id
// a u postmanu ili u browseru se dodaje /id
app.get("/api/ideas/:id", (request, response) => {
  const idea = ideas.find((idea) => idea.id === +request.params.id); //posto vraca string, + je ovde parsuje u broj

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  response.json({ success: true, data: idea });
});
app.listen(port, () => console.log(`Server is litening at ${port}`));
