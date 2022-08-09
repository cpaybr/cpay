import IUser from './UserInterface'

export default interface IClient {
    _id?: string;
    userId?: IUser['_id'];
    type?: string;
    name: string;
    taxNumber: string;
    phone: string;
    email: string;
    postalCode: string;
    state: string;
    city: string;
    district: string;
    street: string;
    complement?: string;
    number: string;
}