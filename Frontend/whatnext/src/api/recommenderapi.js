import axios from "axios";

export default axios.create({
  //our deployed api URl
  baseURL: "https://kvgmrs-api.herokuapp.com/",
  //baseURL: "http://localhost:3000/",
  headers: { "Content-Type": "multipart/form-data" },
});
