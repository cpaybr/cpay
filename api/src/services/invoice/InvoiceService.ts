import Invoice from '../../models/Invoice';
import IInvoice from '../../infra/interfaces/InvoiceInterface';
import IUser from '../../infra/interfaces/UserInterface';
import IServiceResponse from "../../infra/interfaces/ServiceResponseInterface";
import Enum from "../../infra/helpers/enum/Enum";

class InvoiceService {
    public userId: IUser['_id'];

    public constructor(userId: IUser['_id']) {
        this.userId = userId;
    }

    public async find(): Promise<IServiceResponse> {
        const invoices = await Invoice.find({ userId: this.userId });

        return { success: true, statusCode: 200, data: invoices };
    }

    public async show(id: string): Promise<IServiceResponse> {
        const invoice = await Invoice.findOne({ _id: id, userId: this.userId });

        if (!invoice)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.NOT_FOUND };

        return { success: true, statusCode: 200, data: invoice };
    }

    public async create(invoice: IInvoice): Promise<IServiceResponse> {
        if (!invoice.value || !invoice.dueDate || !invoice.url)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.EMPTY_DATA };

        const create = await Invoice.create({
            identifier: invoice.identifier,
            externalNumber: invoice.externalNumber,
            documentNumber: invoice.documentNumber,
            userId: this.userId,
            clientName: invoice.clientName,
            status: invoice.status,
            value: invoice.value,
            dueDate: invoice.dueDate,
            url: invoice.url
        });

        return { success: true, statusCode: 200, data: create };
    }
}

export default InvoiceService;
