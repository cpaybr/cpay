import {Fragment, useState, useEffect} from "react"
import api from '../../services/api'
import {Row, Col, Nav, NavItem, NavLink, TabPane, TabContent} from 'reactstrap'
import ProfileCard from "./ProfileCard"
import TabAccount from "./TabAccount"
import TabSecurity from "./TabSecurity"
import defApi from "../../services/defApi"
import StringUtils from "../../utility/string/StringUtils"
import DateUtils from "../../utility/date/DateUtils"

const Profile = () => {
    const [uuid, setUuid] = useState('')
    const [profileModal, setProfileModal] = useState(false)
    const [tabActive, setTabActive] = useState('1')
    const [user, setUser] = useState({})
    const [userAccount, setUserAccount] = useState({})

    useEffect(async () => {
        const userResponse = await api.get('/user/profile')

        const buResponse = await api.get(`/businessUnit/${userResponse.data.data.businessUnitId}`)
        const buObj = {
            buId: buResponse.data.data.buId,
            marketPlaceId: buResponse.data.data.marketPlaceId,
            companyName: buResponse.data.data.companyName,
            tradingName: buResponse.data.data.tradingName,
            registeredNumber: buResponse.data.data.registeredNumber
        }

        const object = {
            Method: 'GetAccount',
            PartnerId: userResponse.data.data.partnerId,
            BusinessUnitId: buObj.buId,
            TaxNumber: userResponse.data.data.taxNumber
        }

        const responseAccount = await defApi.post('/', object)
        let accounts = []
        if (responseAccount.data.AccountData) {
            accounts = responseAccount.data.AccountData.Accounts
        }
        const defaultAccount = accounts.filter(account => {
            return account.Bank !== null
        })

        if (defaultAccount.length) {
            setUserAccount(defaultAccount[0])
        }

        const responseAccountBalance = await defApi.post('/', { ...object,
            Method: 'GetAccountEntry',
            StartDate: "2022/01/01",
            EndDate: DateUtils.getYMD(),
            OnlyBalance: true
        })

        userResponse.data.data.balance = responseAccountBalance.data.Balance
        setUser(userResponse.data.data)

    }, [uuid])

    const toggleTab = tab => {
        setTabActive(tab)
    }

    const handleProfileModal = () => {
        if (profileModal) {
            setUuid(StringUtils.generateUuid())
        }

        setProfileModal(!profileModal)
    }

    return (
        <Fragment>
            <Row>
                <Col md={4} sm={12}>
                    <ProfileCard user={user} profileModal={profileModal} handleProfileModal={handleProfileModal} />
                </Col>
                <Col md={8} sm={12}>
                    <Nav pills>
                        <NavItem>
                            <NavLink
                                active={tabActive === '1'}
                                onClick={() => {
                                    toggleTab('1')
                                }}
                            >
                                Conta
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                active={tabActive === '2'}
                                onClick={() => {
                                    toggleTab('2')
                                }}
                            >
                                Segurança
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent className='py-50' activeTab={tabActive}>
                        <TabPane tabId='1'>
                            <TabAccount account={userAccount} />
                        </TabPane>
                        <TabPane tabId='2'>
                            <TabSecurity />
                        </TabPane>
                    </TabContent>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Profile
