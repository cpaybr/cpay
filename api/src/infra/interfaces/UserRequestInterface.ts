import { Request } from 'express';
import IUser from './UserInterface';

export default interface IUserRequest extends Request {
    user: {
        _id: IUser['_id'],
        businessUnitId: IUser['businessUnitId'],
        isAdmin: IUser['isAdmin']
    }
}
