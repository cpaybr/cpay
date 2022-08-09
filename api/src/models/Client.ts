import mongoose from 'mongoose';
import IClient from '../infra/interfaces/ClientInterface';

const { model, Schema } = mongoose;

const ClientSchema = new Schema<IClient>({
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: false,
        default: '0'
    },
    name: {
        type: String,
        required: true
    },
    taxNumber: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    postalCode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    complement: {
        type: String,
        required: false,
    },
    number: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default model<IClient>('Client', ClientSchema);
