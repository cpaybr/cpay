import mongoose from 'mongoose';
import IUser from '../infra/interfaces/UserInterface';

const { model, Schema } = mongoose;

const UserSchema = new Schema<IUser>({
    businessUnitId: {
        type: mongoose.Schema.Types.String,
        ref: 'BusinessUnit',
        required: false
    },
    partnerId: {
        type: mongoose.Schema.Types.String,
        ref: 'BusinessUnit',
        required: false
    },
    type: {
        type: String,
        required: true,
        default: '0',
    },
    taxNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    thumbUri: {
        type: String,
        required: false,
        default: null
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isMaster: {
        type: Boolean,
        required: false,
        default: false
    },
    isMerchant: {
        type: Boolean,
        required: false,
        default: false
    },
    pixKeys: [{
        type: {
            type: String
        },
        key: {
            type: String
        },
        status: {
            type: String
        }
    }]
}, {
    timestamps: true
});

export default model<IUser>('User', UserSchema);
