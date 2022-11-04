import { IBreweries } from "../entities/Breweries";
import { brewerieFetchApi } from "../service/Api";

export class GetBreweriesData {
  async home(): Promise<IBreweries[]> {
    const { data } = await brewerieFetchApi.get("/breweries");
    return data;
  } //devolve os dados do enpoint /breweries

  async findForTerm(term: string): Promise<IBreweries[]> {
    const { data } = await brewerieFetchApi.get(
      `/breweries/search?query=${term}`
    );
    return data;
  } //devolve os dados de acordo com o termo pesquisado
}
