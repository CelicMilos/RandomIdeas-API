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
        return `
        <div class="card">
          <button class="delete"><i class="fas fa-times"></i></button>
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
  }
}
export default IdeaList;
