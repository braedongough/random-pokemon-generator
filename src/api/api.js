import axios from "axios";

const api = axios.create({
  baseURL: `https://pokeapi.co/api/v2/pokemon`
});

const randomNum = () => Math.floor(Math.random() * 807 + 1).toString();

export default () => {
  return api.get(randomNum());
};
