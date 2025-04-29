import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";
class IdeaForm {
  constructor() {
    this._ideaModal = document.querySelector("#form-modal");
    this._ideaList = new IdeaList();
  }

  addEventListeners() {
    //.bind(this) se koristi u klasama da bi smo vezali this na odredjenu funkciju
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert("Please enter all fields.");
      return;
      //Za sada samo alert.A moze da se zameni da se ispod naslova pojavi poruka na 2s
    }
    //Save user to localStorage
    localStorage.setItem("username", this._form.elements.username.value);

    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    //Add new idea to the server/post request
    const newIdea = await IdeasApi.createIdea(idea);

    // Add idea ti List
    this._ideaList.addIdeaToList(newIdea.data.data); //isti slucaj kao u ideaList.js
    //Clear the fields
    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";
    this.render();
    //Ovaj event slusamo u Modal komponenti!!!
    document.dispatchEvent(new Event("closemodal"));
  }
  render() {
    this._ideaModal.innerHTML = `
        <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" 
            value="${
              localStorage.getItem("username")
                ? localStorage.getItem("username")
                : ""
            }"/>
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>
    `;
    //Mora ovako jer #idea-form mora prvo da se renderuje(tj. da postoji uopste)
    //  da bi je selektovali i pozvali EventListenere
    this._form = document.querySelector("#idea-form");
    this.addEventListeners();
  }
}
export default IdeaForm;
