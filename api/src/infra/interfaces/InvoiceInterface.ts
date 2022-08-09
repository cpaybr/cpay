import IUser from "./UserInterface";
import IClient from "./ClientInterface";

export default interface IInvoice {
    _id?: string;
    identifier?: string;
    externalNumber?: string;
    documentNumber: string;
    userId?: IUser['_id'];
    clientName?: IClient['name'];
    status: string;
    value: number;
    dueDate: Date;
    url: string;
}