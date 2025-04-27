class IdeaForm {
  constructor() {
    this._ideaModal = document.querySelector("#form-modal");
  }

  addEventListeners() {
    //.bind(this) se koristi u klasama da bi smo vezali this na odredjenu funkciju
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }
  handleSubmit(e) {
    e.preventDefault();
    //Za sada samo console.log(),kasnije ovde ubacujemo vezu sa serverom i bazom
    const idea = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };
    console.log(idea);

    //Clear the fields
    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";

    //Ovaj event slusamo u Modal komponenti!!!
    document.dispatchEvent(new Event("closemodal"));
  }
  render() {
    this._ideaModal.innerHTML = `
        <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" />
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
