import { Request, Response } from "express";
import { IBreweries } from "../entities/Breweries";
import { GetBreweriesData } from "../useCases/getBreweriesData";
const getBreweriesData = new GetBreweriesData();

type queryType = {
  query: string;
};

export class BreweriesController {
  async main(req: Request, res: Response): Promise<Response> {
    const { query } = req.query as queryType;
    //verifica se uma query é recebida na requisição, caso seja é exibida o valor da busca da query, caso contrário é enviado os dados iniciais da api.
    if (!query) {
      try {
        const data: IBreweries[] = await getBreweriesData.home();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else {
      try {
        const data: IBreweries[] = await getBreweriesData.findForTerm(query);
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
  }
}
