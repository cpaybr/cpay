import IPixKey from './PixKeyInterface'

export default interface IUser {
    _id?: string;
    businessUnitId?: string;
    partnerId?: string;
    type: string;
    taxNumber: string;
    name: string;
    lastName?: string;
    role: string;
    phone?: string;
    email: string;
    password: string;
    thumbUri?: string;
    isActive: boolean;
    isAdmin: boolean;
    isMaster?: boolean;
    isMerchant?: boolean;
    pixKeys?: Array<IPixKey>;
}