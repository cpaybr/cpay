import api from "../../services/api"
import DateUtils from "../date/DateUtils"
import defApi from "../../services/defApi"

class UserUtils {
    async getBalance() {
        const data = await this.getDefaultFitbankParams()

        const object = {
            Method: 'GetAccountEntry',
            PartnerId: data.user.partnerId,
            BusinessUnitId: data.businessUnit.buId,
            TaxNumber: data.user.taxNumber,
            StartDate: "2022/01/01",
            EndDate: DateUtils.getYMD(),
            OnlyBalance: true
        }

        const balance = await defApi.post('/', object)

        return balance.data.Balance
    }

    async getDefaultFitbankParams() {
        const user = await this.getUserInfo()
        const businessUnit = await this.getBusinessUnitInfo()

        return { user, businessUnit }
    }

    async getBusinessUnitInfo() {
        const userObj = await this.getUserInfo()
        const buResponse = await api.get(`/businessUnit/${userObj.businessUnitId}`)
        return {
            buId: buResponse.data.data.buId,
            marketPlaceId: buResponse.data.data.marketPlaceId,
            companyName: buResponse.data.data.companyName,
            tradingName: buResponse.data.data.tradingName,
            registeredNumber: buResponse.data.data.registeredNumber
        }
    }

    async getUserInfo() {
        const userResponse = await api.get('/user/profile')
        return {
            businessUnitId: userResponse.data.data.businessUnitId,
            partnerId: userResponse.data.data.partnerId,
            name: userResponse.data.data.name,
            lastName: userResponse.data.data.lastName,
            taxNumber: userResponse.data.data.taxNumber,
            email: userResponse.data.data.email,
            phone: userResponse.data.data.phone
        }
    }
}

export default new UserUtils()
