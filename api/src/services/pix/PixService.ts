import User from '../../models/User';
import IUser from '../../infra/interfaces/UserInterface';
import IServiceResponse from "../../infra/interfaces/ServiceResponseInterface";

class PixService {
    public userId: IUser['_id'];

    public constructor(userId: IUser['_id']) {
        this.userId = userId;
    }
}

export default PixService;
