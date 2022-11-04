import { IBrweries } from "../entities/Brweries";
import { brwerieFetchApi } from "../service/Api";

export class GetBrweriesData {
  async home(): Promise<IBrweries[]> {
    const { data } = await brwerieFetchApi.get("/breweries");
    return data;
  } //devolve os dados do enpoint /breweries

  async findForTerm(term: string): Promise<IBrweries[]> {
    const { data } = await brwerieFetchApi.get(
      `/breweries/search?query=${term}`
    );
    return data;
  } //devolve os dados de acordo com o termo pesquisado
}
