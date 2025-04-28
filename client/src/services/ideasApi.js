import axios from "axios";
//instalira se prvo axios u terminalu 'npm install axios'
class IdeasApi {
  constructor() {
    this._apiUrl = "http://localhost:5000/api/ideas";
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }
}
export default new IdeasApi();
//ovako nakom importa u drugi fajl,odmah moze da se koristi
//bez pravljenja constante i nove klase
