import { Response } from "express";
import IUserRequest from "../infra/interfaces/UserRequestInterface";
import IPixKey from "../infra/interfaces/PixKeyInterface";
import PixKeyService from "../services/pix/PixKeyService";

class PixKeyController {

    public async index(request: IUserRequest, response: Response) {
        const pixKeyService = new PixKeyService(request.user._id);

        const pixKeys = await pixKeyService.find();

        return response.status(pixKeys.statusCode).json(pixKeys);
    }

    public async create(request: IUserRequest, response: Response) {
        const pixKeyService = new PixKeyService(request.user._id);

        const pixKey: IPixKey = {
            type: request.body.type,
            key: request.body.key
        };

        const create = await pixKeyService.create(pixKey);

        return response.status(create.statusCode).json(create);
    }

    public async delete(request: IUserRequest, response: Response) {
        const type: string = request.params.type;

        const pixKeyService = new PixKeyService(request.user._id);

        const del = await pixKeyService.delete(type);

        return response.status(del.statusCode).json(del);
    }
}

export default new PixKeyController();
