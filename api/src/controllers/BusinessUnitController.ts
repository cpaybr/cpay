import { Request, Response } from "express";
import IBusinessUnit from "../infra/interfaces/BusinessUnitInterface";
import UserBusinessService from "../services/businessUnit/BusinessUnitService";
import IUserRequest from "../infra/interfaces/UserRequestInterface";

class BusinessUnitController {

    public async show(request: IUserRequest, response: Response) {
        const buinessUnitId = request.params.id;

        const businessUnit = await UserBusinessService.show(buinessUnitId);

        return response.status(businessUnit.statusCode).json(businessUnit);
    }

    public async create(request: Request, response: Response) {
        const businessUnit: IBusinessUnit = {
            buId: request.body.buId,
            marketPlaceId: request.body.marketPlaceId,
            companyName: request.body.companyName,
            tradingName: request.body.tradingName,
            registeredNumber: request.body.registeredNumber,
            isActive: true
        };

        const create = await UserBusinessService.create(businessUnit);

        return response.status(create.statusCode).json(create);
    }
}

export default new BusinessUnitController();
