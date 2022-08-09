import User from '../../models/User';
import BusinessUnit from '../../models/BusinessUnit';
import BcryptHelper from '../../infra/helpers/bcrypt/BcryptHelper';
import JWTHelper from '../../infra/helpers/jwt/JWTHelper';
import IServiceResponse from '../../infra/interfaces/ServiceResponseInterface';
import IUser from '../../infra/interfaces/UserInterface';
import IBusinessUnit from '../../infra/interfaces/BusinessUnitInterface';
import Enum from '../../infra/helpers/enum/Enum';

class UserService {
    public async find(): Promise<IServiceResponse> {
        const users = await User.find().select("-password");

        return { success: true, statusCode: 200, data: users };
    }

    public async show(id: IUser['_id']): Promise<IServiceResponse> {
        const user: IUser = await User.findById(id).select("-password");

        return { success: true, statusCode: 200, data: user };
    }

    public async register({ businessUnitId, type, taxNumber, name, lastName, role, email, phone, password, isActive, isAdmin, isMerchant }: IUser): Promise<IServiceResponse> {
        if (password.length < 8)
            return { success: false, statusCode: 400, description: "Password must be 8 characters or more" };

        const alreadyExistsUser = await User.findOne({
            $or: [
                { email: email },
                { taxNumber: taxNumber },
            ]
        });

        if (alreadyExistsUser)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.ALREADY_EXISTS };

        const hashPassword = await BcryptHelper.encrypt(password);

        const create = await User.create({
            businessUnitId,
            type,
            taxNumber,
            name,
            lastName,
            phone,
            role,
            email,
            password: hashPassword,
            isActive,
            isAdmin,
            isMerchant
        });

        return { success: true, statusCode: 200, data: create };
    }

    public async signin(taxNumber: IUser['taxNumber'], password: IUser['password']): Promise<IServiceResponse> {
        const user: IUser = await User.findOne({ taxNumber: taxNumber });

        if (!user)
            return { success: false, statusCode: 400, description: "Incorrect tax number or password" };

        if (!await BcryptHelper.compare(password, user.password))
            return { success: false, statusCode: 400, description: "Incorrect tax number or password" };

        if (!user.isActive)
            return { success: false, statusCode: 400, description: "User is not active" };

        const businessUnit: IBusinessUnit = await BusinessUnit.findById(user.businessUnitId);

        if (!businessUnit.isActive)
            return { success: false, statusCode: 400, description: "Business Unit is not active" };

        const token: string = JWTHelper.generateToken(user._id, user.businessUnitId, user.isAdmin);

        return {
            success: true,
            statusCode: 200,
            data: {
                token: token,
                user: user
            }
        };
    }

    public async update(_id, name, lastName, phone, email): Promise<IServiceResponse> {
        const alreadyExistsUser = await User.findOne({
            $and: [
                { _id: { $ne: _id } },
                { email: email }
            ]
        });

        if (alreadyExistsUser)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.ALREADY_EXISTS };

        await User.updateOne({ _id }, {
            name,
            lastName,
            phone,
            email
        });

        return { success: true, statusCode: 200 };
    }

    public async updatePassword(_id, oldPassword, newPassword): Promise<IServiceResponse> {
        if (newPassword.length < 8)
            return { success: false, statusCode: 400, description: "Password must be 8 characters or more" };

        const user: IUser = await User.findById(_id);

        if (!await BcryptHelper.compare(oldPassword, user.password))
            return { success: false, statusCode: 400, description: "Incorrect old password" };

        const hashPassword = await BcryptHelper.encrypt(newPassword);

        await User.updateOne({ _id }, {
            password: hashPassword
        });

        return { success: true, statusCode: 200 };
    }

    public async delete(id: IUser['_id']): Promise<IServiceResponse> {
        if (!id)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.EMPTY_ID };

        const exists: boolean = await this.existsById(id);

        if (!exists)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.NOT_FOUND };

        await User.deleteOne({ _id: id });

        return { success: true, statusCode: 200 };
    }

    public async existsById(id: IUser['_id']): Promise<boolean> {
        const user = await User.findById(id);

        if (!user)
            return false;

        return true;
    }
}

export default new UserService();
