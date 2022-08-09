import { Response } from "express";
import IUserRequest from "../infra/interfaces/UserRequestInterface";
import IInvoice from "../infra/interfaces/InvoiceInterface";
import InvoiceService from "../services/invoice/InvoiceService";

class ClientController {

    public async index(request: IUserRequest, response: Response) {
        const invoiceService = new InvoiceService(request.user._id);

        const invoices = await invoiceService.find();

        return response.status(invoices.statusCode).json(invoices);
    }

    public async show(request: IUserRequest, response: Response) {
        const invoiceId = request.params.id;

        const invoiceService = new InvoiceService(request.user._id);

        const invoice = await invoiceService.show(invoiceId);

        return response.status(invoice.statusCode).json(invoice);
    }

    public async create(request: IUserRequest, response: Response) {
        const invoiceService = new InvoiceService(request.user._id);

        const invoice: IInvoice = {
            identifier: request.body.identifier,
            externalNumber: request.body.externalNumber,
            documentNumber: request.body.documentNumber,
            clientName: request.body.clientName,
            status: request.body.status,
            value: request.body.value,
            dueDate: request.body.dueDate,
            url: request.body.url
        };

        const create = await invoiceService.create(invoice);

        return response.status(create.statusCode).json(create);
    }
}

export default new ClientController();
