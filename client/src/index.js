import "./css/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "./components/Modal";
import IdeaList from "./components/IdeaList";
import IdeaForm from "./components/IdeaForm";

const modal = new Modal();
const ideaList = new IdeaList();
const ideaForm = new IdeaForm();

ideaList.render();
ideaForm.render();
