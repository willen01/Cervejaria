import { Request, Response } from "express";
import { IBrweries } from "../entities/Brweries";
import { GetBrweriesData } from "../useCases/getBrweriesData";
const getBrweriesData = new GetBrweriesData();

type queryType = {
  query: string;
};

export class BrweriesController {
  async main(req: Request, res: Response): Promise<Response> {
    const { query } = req.query as queryType;
    //verifica se uma query é recebida na requisição, caso seja é exibida o valor da busca da query, caso contrário é enviado os dados iniciais da api.
    if (!query) {
      try {
        const data: IBrweries[] = await getBrweriesData.home();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else {
      try {
        const data: IBrweries[] = await getBrweriesData.findForTerm(query);
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
  }
}
