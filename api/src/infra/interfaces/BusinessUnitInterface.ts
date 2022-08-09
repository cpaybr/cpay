export default interface IBussinesUnit {
    _id?: string;
    buId?: string;
    marketPlaceId?: string;
    companyName: string;
    tradingName: string;
    registeredNumber?: string;
    logoUri?: string;
    subscriptionPlanId?: string;
    isActive: boolean;
    expirationDate?: Date;
}