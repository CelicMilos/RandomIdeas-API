import axios from "axios";
//instalira se prvo axios u terminalu 'npm install axios'
class IdeasApi {
  constructor() {
    this._apiUrl = "http://localhost:5000/api/ideas";
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }
  //Add idea to api

  createIdea(data) {
    return axios.post(this._apiUrl, data);
  }
  updateIdea(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }
  deleteIdea(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        username,
      },
    });
  }
}
export default new IdeasApi();
//ovako nakom importa u drugi fajl,odmah moze da se koristi
//bez pravljenja constante i nove klase
