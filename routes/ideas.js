const express = require("express");
//express.Router() je Express.js alat koji omogucava organizovanje ruta u manje modularne delove
//tj. posebne fajlve.Fajl se exportuje o pozove u glavni .js fajl sa require(../imefaja.js)
const router = express.Router();

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

//gat all ideas
router.get("/", (request, response) => {
  //Moze ,.json umesto .send ali se onda podrazumeva JSON
  //i samo (ideas) ali bolje je kao objekat sa succes i data
  response.json({ success: true, data: ideas });
});
//single idea - with query params-request.params.id
// a u postmanu ili u browseru se dodaje /id
router.get("/:id", (request, response) => {
  const idea = ideas.find((idea) => idea.id === +request.params.id); //posto vraca string, + je ovde parsuje u broj

  if (!idea) {
    return response
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }
  response.json({ success: true, data: idea });
});

//Post idea router.post('endpoint',function)
router.post("/", (request, response) => {
  //prvo mora da se intalira body parser u galvnom .js fajlu
  //i da bi se ideja zadrzala,mora da sepoveze na bazu
  const idea = {
    id: ideas.length + 1,
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username, //obicno se pre ovoga obavi atentifikacija korisnika
    date: new Date().toISOString().slice(0, 10),
  };
  ideas.push(idea);
  response.json({ success: true, data: idea });
});

module.exports = router;
