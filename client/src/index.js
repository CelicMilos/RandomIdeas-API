import "./css/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "./components/Modal";
import IdeaList from "./components/IdeaList";
import IdeaForm from "./components/IdeaForm";

new Modal();
new IdeaList();
const ideaForm = new IdeaForm();

// ideaList.render();
ideaForm.render();
