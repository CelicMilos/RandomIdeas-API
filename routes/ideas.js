const express = require("express");
//express.Router() je Express.js alat koji omogucava organizovanje ruta u manje modularne delove
//tj. posebne fajlve.Fajl se exportuje o pozove u glavni .js fajl sa require(../imefaja.js)
const router = express.Router();
const Idea = require("../models/Idea");

//gat all ideas
router.get("/", async (request, response) => {
  try {
    const ideas = await Idea.find(); //.find() je asinhron,vraca obecanje
    response.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ succes: false, error: "Something went wrong." });
  }
  //Moze ,.json umesto .send ali se onda podrazumeva JSON
  //i samo (ideas) ali bolje je kao objekat sa succes i data
});
//single idea - with query params-request.params.id
// a u postmanu ili u browseru se dodaje /id
router.get("/:id", async (request, response) => {
  try {
    const idea = await Idea.findById(request.params.id); //.findById-mongoose metod
    response.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});

//Post idea router.post('endpoint',function)
router.post("/", async (request, response) => {
  //prvo mora da se instalira body parser u galvnom .js fajlu
  //i da bi se ideja zadrzala,mora da sepoveze na bazu
  const idea = new Idea({
    text: request.body.text,
    tag: request.body.tag,
    username: request.body.username, //obicno se pre ovoga obavi autentifikacija korisnika
  });
  try {
    const savedIdea = await idea.save();
    response.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});
//Update idea
router.put("/:id", async (request, response) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      //isto mongoose metod
      request.params.id,
      {
        $set: {
          text: request.body.text,
          tag: request.body.tag,
        },
      },
      { new: true }
    );
    response.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
});

//Delete Idea
router.delete("/:id", async (request, response) => {
  try {
    await Idea.findByIdAndDelete(request.params.id);
    response.json({ succes: true, data: {} });
  } catch (error) {
    console.log(error);
    response.status(500).json({ succes: false, error: "Something went wrong" });
  }
});

module.exports = router;
