import mongoose from 'mongoose';
import IBussinesUnit from '../infra/interfaces/BusinessUnitInterface';

const { model, Schema } = mongoose;

const CompanySchema = new Schema<IBussinesUnit>({
    buId: {
        type: String,
        required: false,
        default: null
    },
    marketPlaceId: {
        type: String,
        required: false,
        default: null
    },
    companyName: {
        type: String,
        required: true
    },
    tradingName: {
        type: String,
        required: true
    },
    registeredNumber: {
        type: String,
        required: true
    },
    logoUri: {
        type: String,
        required: false,
        default: null
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    subscriptionPlanId: {
        type: String,
        required: false
    },
    expirationDate: {
        type: Date,
        required: false
    },
}, {
    timestamps: true
});

export default model<IBussinesUnit>('BusinessUnit', CompanySchema);
