import axios from "axios";

// faz uma chamada no endereço da api.
const brwerieFetchApi = axios.create({
  baseURL: "https://api.openbrewerydb.org",
});

export { brwerieFetchApi };
