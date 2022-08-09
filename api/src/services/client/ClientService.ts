import Client from '../../models/Client';
import IClient from '../../infra/interfaces/ClientInterface';
import IUser from '../../infra/interfaces/UserInterface';
import IServiceResponse from "../../infra/interfaces/ServiceResponseInterface";
import Enum from "../../infra/helpers/enum/Enum";

class ClientService {
    public userId: IUser['_id'];

    public constructor(userId: IUser['_id']) {
        this.userId = userId;
    }

    public async find(): Promise<IServiceResponse> {
        const clients = await Client.find({ userId: this.userId });

        return { success: true, statusCode: 200, data: clients };
    }

    public async show(id: string): Promise<IServiceResponse> {
        const client = await Client.findOne({ _id: id, userId: this.userId });

        if (!client)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.NOT_FOUND };

        return { success: true, statusCode: 200, data: client };
    }

    public async create(client: IClient): Promise<IServiceResponse> {
        if (!client.name || !client.email || !client.taxNumber)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.EMPTY_DATA };

        const alreadyExists: boolean = await this.existsSame(client);

        if (alreadyExists)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.ALREADY_EXISTS };

        const create = await Client.create({
            userId: this.userId,
            type: client.type,
            name: client.name,
            taxNumber: client.taxNumber,
            phone: client.phone,
            email: client.email,
            postalCode: client.postalCode,
            state: client.state,
            city: client.city,
            district: client.district,
            street: client.street,
            complement: client.complement,
            number: client.number
        });

        return { success: true, statusCode: 200, data: create };
    }

    public async update(client: IClient): Promise<IServiceResponse> {
        if (!client._id || !client.name || !client.email || !client.taxNumber)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.EMPTY_DATA };

        const exists: boolean = await this.existsById(client._id);

        if (!exists)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.NOT_FOUND };

        const alreadyExists: boolean = await this.existsSameById(client);

        if (alreadyExists)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.ALREADY_EXISTS };

        await Client.updateOne({ _id: client._id }, {
            userId: this.userId,
            type: client.type,
            name: client.name,
            taxNumber: client.taxNumber,
            phone: client.phone,
            email: client.email,
            postalCode: client.postalCode,
            state: client.state,
            city: client.city,
            district: client.district,
            street: client.street,
            complement: client.complement,
            number: client.number
        });

        return { success: true, statusCode: 200, data: client };
    }

    public async delete(id: IClient['_id']): Promise<IServiceResponse> {
        if (!id)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.EMPTY_ID };

        const exists: boolean = await this.existsById(id);

        if (!exists)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.NOT_FOUND };

        await Client.deleteOne({ _id: id });

        return { success: true, statusCode: 200 };
    }

    public async existsById(id: string): Promise<boolean> {
        const client = await Client.findOne({ _id: id, userId: this.userId });

        if (!client)
            return false;

        return true;
    }

    public async existsSame(client: IClient): Promise<boolean> {
        const alreadyExists = await Client.findOne({ userId: this.userId, taxNumber: client.taxNumber });

        if (!alreadyExists)
            return false;

        return true;
    }

    public async existsSameById(client: IClient): Promise<boolean> {
        const alreadyExists = await Client.findOne({
            $and: [
                { _id: { $ne: client._id } },
                { userId: this.userId },
                { taxNumber: client.taxNumber }
            ]
        });

        if (!alreadyExists)
            return false;

        return true;
    }
}

export default ClientService;
