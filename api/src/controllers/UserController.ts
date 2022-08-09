import { Request, Response } from "express";
import IUserRequest from "../infra/interfaces/UserRequestInterface";
import IUser from "../infra/interfaces/UserInterface";
import UserService from "../services/user/UserService";

class UserController {

    public async index(request: IUserRequest, response: Response) {
        const users = await UserService.find();

        return response.status(users.statusCode).json(users);
    }

    public async show(request: IUserRequest, response: Response) {
        const userId = request.params.id;

        const user = await UserService.show(userId);

        return response.status(user.statusCode).json(user);
    }

    public async profile(request: IUserRequest, response: Response) {
        const userId = request.user._id;

        const user = await UserService.show(userId);

        return response.status(user.statusCode).json(user);
    }

    public async register(request: Request, response: Response) {
        const user: IUser = {
            businessUnitId: request.body.businessUnitId,
            type: request.body.type,
            taxNumber: request.body.taxNumber,
            name: request.body.name,
            lastName: request.body.lastName,
            phone: request.body.phone,
            role: 'Converso Digital',
            email: request.body.email,
            password: request.body.password,
            isActive: true,
            isAdmin: false,
            isMerchant: request.body.isMerchant
        };

        const create = await UserService.register(user);

        return response.status(create.statusCode).json(create);
    }

    public async signIn(request: Request, response: Response) {
        const { taxNumber, password }: IUser = request.body;

        const signIn = await UserService.signin(taxNumber, password);

        return response.status(signIn.statusCode).json(signIn);
    }

    public async update(request: IUserRequest, response: Response) {
        const userId = request.user._id;

        const user = {
            _id: userId,
            name: request.body.name,
            lastName: request.body.lastName,
            phone: request.body.phone,
            email: request.body.email
        };

        const update = await UserService.update(user._id, user.name, user.lastName, user.phone, user.email);

        return response.status(update.statusCode).json(update);
    }

    public async updatePassword(request: IUserRequest, response: Response) {
        const userId = request.user._id;

        const user = {
            _id: userId,
            oldPassword: request.body.oldPassword,
            newPassword: request.body.newPassword,
        };

        const update = await UserService.updatePassword(user._id, user.oldPassword, user.newPassword);

        return response.status(update.statusCode).json(update);
    }

    public async delete(request: IUserRequest, response: Response) {
        const id: string = request.params.id;

        const del = await UserService.delete(id);

        return response.status(del.statusCode).json(del);
    }
}

export default new UserController();
