import { Response } from "express";
import IUserRequest from "../infra/interfaces/UserRequestInterface";
import IClient from "../infra/interfaces/ClientInterface";
import ClientService from "../services/client/ClientService";

class ClientController {

    public async index(request: IUserRequest, response: Response) {
        const clientService = new ClientService(request.user._id);

        const clients = await clientService.find();

        return response.status(clients.statusCode).json(clients);
    }

    public async show(request: IUserRequest, response: Response) {
        const clientId = request.params.id;

        const clientService = new ClientService(request.user._id);

        const clients = await clientService.show(clientId);

        return response.status(clients.statusCode).json(clients);
    }

    public async create(request: IUserRequest, response: Response) {
        const clientService = new ClientService(request.user._id);

        const client: IClient = {
            type: request.body.type,
            name: request.body.name,
            taxNumber: request.body.taxNumber,
            phone: request.body.phone,
            email: request.body.email,
            postalCode: request.body.postalCode,
            state: request.body.state,
            city: request.body.city,
            district: request.body.district,
            street: request.body.street,
            complement: request.body.complement,
            number: request.body.number
        };

        const create = await clientService.create(client);

        return response.status(create.statusCode).json(create);
    }

    public async update(request: IUserRequest, response: Response) {
        const clientService = new ClientService(request.user._id);

        const client: IClient = {
            _id: request.params.id,
            userId: request.user._id,
            type: request.body.type,
            name: request.body.name,
            taxNumber: request.body.taxNumber,
            phone: request.body.phone,
            email: request.body.email,
            postalCode: request.body.postalCode,
            state: request.body.state,
            city: request.body.city,
            district: request.body.district,
            street: request.body.street,
            complement: request.body.complement,
            number: request.body.number
        };

        const update = await clientService.update(client);

        return response.status(update.statusCode).json(update);
    }

    public async delete(request: IUserRequest, response: Response) {
        const id: string = request.params.id;

        const clientService = new ClientService(request.user._id);

        const del = await clientService.delete(id);

        return response.status(del.statusCode).json(del);
    }
}

export default new ClientController();
