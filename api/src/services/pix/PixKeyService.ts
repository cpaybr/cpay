import User from '../../models/User';
import IUser from '../../infra/interfaces/UserInterface';
import IServiceResponse from "../../infra/interfaces/ServiceResponseInterface";
import IPixKey from "../../infra/interfaces/PixKeyInterface";
import Enum from "../../infra/helpers/enum/Enum";

class PixKeyService {
    public userId: IUser['_id'];

    public constructor(userId: IUser['_id']) {
        this.userId = userId;
    }

    public async find(): Promise<IServiceResponse> {
        const user: IUser = await User.findById(this.userId );
        const pixKeys = user.pixKeys ? user.pixKeys : [];

        return { success: true, statusCode: 200, data: pixKeys };
    }

    public async create(pixKey: IPixKey): Promise<IServiceResponse> {
        if (!pixKey.type || !pixKey.type)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.EMPTY_DATA };

        const user = await User.findById(this.userId);

        const alreadyExists: boolean = await this.existsSame(pixKey, user);

        if (alreadyExists)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.ALREADY_EXISTS };

        let pixKeys = user.pixKeys;

        const object = {
            type: pixKey.type,
            key: pixKey.key,
            status: 'pending'
        };

        if (pixKeys) {
            user.pixKeys.push(object);
        } else {
            user.pixKeys = [{
                type: object.type,
                key: object.key,
                status: object.status
            }]
        }

        await user.save();

        return { success: true, statusCode: 200, data: user.pixKeys };
    }

    public async delete(pixKeyType: IPixKey['type']): Promise<IServiceResponse> {
        const user = await User.findById(this.userId);
        const pixKeys = user.pixKeys;

        const key = pixKeys.filter((pixKey) => {
            if (pixKey.type === pixKeyType)
                return pixKey;
        });

        if (!key.length)
            return { success: false, statusCode: 400, description: Enum.MESSAGE.NOT_FOUND };

        const index = pixKeys.indexOf(key[0]);
        pixKeys.splice(index, 1);

        await user.save();

        return { success: true, statusCode: 200, data: user.pixKeys };
    }

    public async existsSame(pixKey: IPixKey, user: IUser): Promise<boolean> {
        let alreadyExists = false;
        const userPixKeys = user.pixKeys ? user.pixKeys : [];

        if (userPixKeys.length) {
            const filterPixKeys = userPixKeys.filter((key) => {
                return key.type === pixKey.type;
            });

            alreadyExists = filterPixKeys.length > 0;
        }

        return alreadyExists;
    }
}

export default PixKeyService;
