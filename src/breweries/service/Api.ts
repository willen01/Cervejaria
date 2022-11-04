import axios from "axios";

// faz uma chamada no endereço da api.
const brewerieFetchApi = axios.create({
  baseURL: "https://api.openbrewerydb.org",
});

export { brewerieFetchApi };
