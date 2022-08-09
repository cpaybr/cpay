import mongoose from 'mongoose';
import IInvoice from '../infra/interfaces/InvoiceInterface';

const { model, Schema } = mongoose;

const InvoiceSchema = new Schema<IInvoice>({
    identifier: {
        type: String,
        required: false,
        default: ''
    },
    externalNumber: {
        type: String,
        required: false,
        default: ''
    },
    documentNumber: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'User',
        required: true
    },
    clientName: {
        type: mongoose.Schema.Types.String,
        ref: 'Client',
        required: false
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    value: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model<IInvoice>('Invoice', InvoiceSchema);
