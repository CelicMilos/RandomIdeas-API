import IdeasApi from "../services/ideasApi";
class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector("#idea-list");
    //hardcoded ideas,just for practise
    this._ideas = [];
    this.getIdeas();
    //For differnet tag colors
    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("softwere");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }
  adEventListeners() {
    this._ideaListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }
  async getIdeas() {
    try {
      const response = await IdeasApi.getIdeas(); //iz services/IdeasApi.js
      this._ideas = response.data.data; //iz bekenda, routes/ideas.js
      //response.data.data- prvi data je od axiosa,drugi data od api zahteva
      //sucajnost samo, da smo u api zahtevu(get)umestu data:ideas napisali
      // ideas:idea,bilo bi response.ideas.data
      this.render();
    } catch (error) {
      console.log(error);
    }
  }
  async deleteIdea(ideaId) {
    try {
      const response = await IdeasApi.deleteIdea(ideaId);
      this._ideas.filter((idea) => idea._id !== ideaId); //daje sve osim one koju smo izbrisali
      this.getIdeas();
    } catch (error) {
      alert("You can not delete this resource"); //zato sto se korisnicka imena ne slazu
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    //zato sto je  this._validTags set,moze .has() zato sto je to ugradjeni metod setova
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }
  //render ideas in cards
  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        const tagClass = this.getTagClass(idea.tag);
        const deleteBtn =
          idea.username === localStorage.getItem("username")
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : "";
        return `
        <div class="card" data-id="${idea._id}"> <!-- MongoDB id -->
         ${deleteBtn}
          <h3>
           ${idea.text}
          </h3>
          <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.username}</span>
          </p>
        </div>`;
      })
      .join("");

    this.adEventListeners(); //posle renderovanja
  }
}
export default IdeaList;
