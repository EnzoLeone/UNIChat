import { Request, Response } from "express";

import { GetLast3MessageService } from "../services/GetLast3MessagesService";


class GetLast3MessagesController {
    async Last3Messages(request: Request, response: Response) {
        const getLast3MessagesService = new GetLast3MessageService();

        const result = await getLast3MessagesService.execute();

        return response.json(result);
    }
}

export { GetLast3MessagesController }