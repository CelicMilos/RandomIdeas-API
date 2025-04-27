class Modal {
  constructor() {
    this._modal = document.querySelector("#modal");
    this._modalBtn = document.querySelector("#modal-btn");
    this.addEventListeners();
  }
  addEventListeners() {
    //.bind(this) se koristi u klasama da bi smo vezali this na odredjenu funkciju
    this._modalBtn.addEventListener("click", this.open.bind(this));
    window.addEventListener("click", this.outsideClick.bind(this));
    //Ovaj event pravimo ovde ali ga pozivamo u IdeaForm komponenti
    document.addEventListener("closemodal", () => {
      this.close();
    });
  }
  open() {
    this._modal.style.display = "block";
  }

  close() {
    this._modal.style.display = "none";
  }

  outsideClick(e) {
    if (e.target === this._modal) {
      this.close();
    }
  }
}
export default Modal;
