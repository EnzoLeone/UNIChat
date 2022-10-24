import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";


class AuthenticateUserController {
    async authenticateUser(request: Request, response: Response) {

        const { code } = request.body;

        const service = new AuthenticateUserService();

        try {

            const result = await service.execute(code);
            return response.json(result);

        } catch (err) {

            return response.json({ error: err.message });

        }
    }
}

export { AuthenticateUserController }