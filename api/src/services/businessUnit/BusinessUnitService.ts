import BusinessUnit from '../../models/BusinessUnit';
import IBusinessUnit from '../../infra/interfaces/BusinessUnitInterface';
import IServiceResponse from "../../infra/interfaces/ServiceResponseInterface";
import Enum from "../../infra/helpers/enum/Enum";

class BusinessUnitService {

    public async find(): Promise<IServiceResponse> {
        const companies = await BusinessUnit.find();

        return { success: true, statusCode: 200, data: companies };
    }

    public async show(id: string): Promise<IServiceResponse> {
        const company = await BusinessUnit.findById(id);

        if (!company)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.NOT_FOUND };

        return { success: true, statusCode: 200, data: company };
    }

    public async existsById(id: string): Promise<boolean> {
        const company = await BusinessUnit.findById(id);

        if (!company)
            return false;

        return true;
    }

    public async create(businessUnit: IBusinessUnit): Promise<IServiceResponse> {

        if (!businessUnit.tradingName)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.EMPTY_DATA };

        const subscriptionPlanId = 1;

        const create = await BusinessUnit.create({
            buId: businessUnit.buId,
            marketPlaceId: businessUnit.marketPlaceId,
            companyName: businessUnit.companyName,
            tradingName: businessUnit.tradingName,
            registeredNumber: businessUnit.registeredNumber,
            isActive: true,
            subscriptionPlanId
        });

        return { success: true, statusCode: 200, data: create };
    }
}

export default new BusinessUnitService();
