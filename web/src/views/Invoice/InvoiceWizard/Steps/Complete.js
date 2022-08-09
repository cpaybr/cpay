import {Fragment} from 'react'
import defApi from '../../../../services/defApi'
import api from '../../../../services/api'
import {ArrowLeft, ArrowRight, Calendar} from 'react-feather'
import {Button, Card, CardTitle, CardBody, Badge, UncontrolledTooltip} from 'reactstrap'
import {toast} from "react-toastify"
import StringUtils from '../../../../utility/string/StringUtils'
import DateUtils from "../../../../utility/date/DateUtils"

const CompleteInvoice = (props) => {

    const submitForm = async (e) => {
        e.preventDefault()

        const uuid = StringUtils.generateUuid()

        const userResponse = await api.get('/user/profile')
        const userObj = {
            businessUnitId: userResponse.data.data.businessUnitId,
            partnerId: userResponse.data.data.partnerId,
            name: userResponse.data.data.name,
            lastName: userResponse.data.data.lastName,
            taxNumber: userResponse.data.data.taxNumber,
            email: userResponse.data.data.email,
            phone: userResponse.data.data.phone
        }
        userObj.personType = userObj.taxNumber.length > 14 ? 1 : 0

        const buResponse = await api.get(`/businessUnit/${userObj.businessUnitId}`)
        const buObj = {
            buId: buResponse.data.data.buId,
            marketPlaceId: buResponse.data.data.marketPlaceId,
            companyName: buResponse.data.data.companyName,
            tradingName: buResponse.data.data.tradingName,
            registeredNumber: buResponse.data.data.registeredNumber
        }

        const object = {
            Method: 'GenerateBoleto',
            MktPlaceId: buObj.marketPlaceId,
            PartnerId: userObj.partnerId,
            BusinessUnitId: buObj.buId,
            GroupTemplate: '2',
            CustomerName: props.payerName.value,
            CustomerTaxNumber: props.payerTaxNumber.value,
            CustomerMail: props.payerEmail.value,
            CustomerPhone: props.payerPhone.value,
            Neighborhood: props.payerDistrict.value,
            City: props.payerCity.value,
            State: props.payerState.value,
            ZipCode: props.payerPostalCode.value,
            SupplierTaxNumber: userObj.taxNumber,
            SupplierFullName: `${userObj.name} ${userObj.lastName}`,
            SupplierTradingName: buObj.tradingName,
            SupplierLegalName: `${userObj.name} ${userObj.lastName}`,
            SupplierMail: userObj.email,
            SupplierPhone: userObj.phone,
            RateValue: 2,
            RateSent: 1,
            AddressLine1: `${props.payerStreet.value}, ${props.payerAddressNumber.value}`,
            ExternalNumber: `en_${uuid}`,
            Identifier: `id_${uuid}`,
            Comments: props.instructions.value,
            MailToSend: userObj.email,
            PhoneToSend: userObj.phone,
            Products: [
                {
                    SellerPersonType: userObj.personType,
                    SellerName: `${userObj.name} ${userObj.lastName}`,
                    SellerTaxNumber: userObj.taxNumber,
                    ReceiverPersonType: props.payerType.value,
                    ReceiverName: props.payerName.value,
                    ReceiverTaxNumber: props.payerTaxNumber.value,
                    Reference: 1,
                    ProductCode: 1,
                    ProductName: props.instructions.value,
                    ProductQty: 1,
                    ProductValue: props.value.value
                }
            ],
            DueDate: props.dueDate.value,
            TotalValue: props.value.value,
            FineDate: props.fineDate.value,
            FinePercent: props.finePercentage.value,
            // InterestPercent: props.feesPercentage.value
            // InterestValue: props.feesDate.value,
            DiscountDate: props.discountDate.value,
            DiscountValue: props.discount.value
        }

        defApi.post('/', object).then(response => {
            if (response.data.Success === 'false') {
                toast("Não foi possível criar o boleto, verifique os campos e tente novamente", { type: 'error' })
            } else {
                if (response.data.Url) {
                    toast("Boleto criado com sucesso!", { type: 'success' })

                    const invoiceToSave = {
                        identifier: object.Identifier,
                        externalNumber: object.ExternalNumber,
                        documentNumber: response.data.DocumentNumber,
                        clientName: object.CustomerName,
                        status: 'pending',
                        value: object.TotalValue,
                        dueDate: object.DueDate,
                        url: response.data.Url
                    }

                    api.post('/invoices', invoiceToSave)

                    addClient()

                    setTimeout(() => {
                        window.open(response.data.Url)
                    }, 2000)
                } else {
                    toast("Não foi possível criar o boleto, verifique os campos e tente novamente", { type: 'error' })
                }
            }
        })
    }

    const addClient = async () => {
        const object = {
            type: props.payerType.value,
            name: props.payerName.value,
            taxNumber: props.payerTaxNumber.value,
            email: props.payerEmail.value,
            phone: props.payerPhone.value,
            postalCode: props.payerPostalCode.value,
            state: props.payerState.value,
            city: props.payerCity.value,
            district: props.payerDistrict.value,
            street: props.payerStreet.value,
            complement: props.payerComplement.value,
            number: props.payerAddressNumber.value
        }

        return await api.post('/clients', object)
    }

    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>Concluir</h5>
                <small className='text-muted'>Verifique se todas as informações estão corretas para a emissão do boleto.</small>
            </div>
            <div>
                <Card className='card-developer-meetup'>
                    <CardBody>
                        <div className='meetup-header d-flex align-items-center'>
                            <div className='meetup-day'>
                                <h6 className='mb-0'>R$</h6>
                                <h3 className='mb-0'>{props.value.value}</h3>
                            </div>
                            <div className='my-auto w-100'>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <CardTitle tag='h4' className='mb-25'>
                                            {props.payerName.value ? props.payerName.value : 'Pagador não' +
                                                ' definido'}
                                        </CardTitle>
                                    </div>
                                    <div>
                                        <Badge color='primary' className='badge-glow' id="badge-due-date">
                                            <Calendar size={12} className='align-middle' />
                                            <span className='align-middle'>
                                                {props.dueDate.value ? ` ${DateUtils.formatDate(props.dueDate.value)}` : ' Não' +
                                                    ' definido'}
                                            </span>
                                        </Badge>
                                        <UncontrolledTooltip placement='top' target='badge-due-date'>
                                            Data de vencimento
                                        </UncontrolledTooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pt-1 mt-1 border-top'>
                            <h6 className='section-label'>Descontos</h6>
                            {props.discount.value > 0 &&
                                <div className='d-flex'>
                                    <h6>R$ {props.discount.value}</h6>
                                    <span className='text-muted pl-1 pr-1'>até</span>
                                    <h6>{props.discountDate.value ? DateUtils.formatDate(props.discountDate.value) : <span className='text-primary font-weight-bold'>sem data definida</span>}</h6>
                                </div>
                            }

                            {!props.discount.value &&
                                <div className='d-flex'>
                                    <span className='text-primary font-weight-bold'>Sem descontos</span>
                                </div>
                            }
                        </div>
                        <div className='pt-1'>
                            <h6 className='section-label'>Multa</h6>
                            {props.finePercentage.value > 0 &&
                                <div className='d-flex'>
                                    <h6>{props.finePercentage.value}%</h6>
                                    <span className='text-muted pl-1 pr-1'>à partir de</span>
                                    <h6>{props.fineDate.value ? DateUtils.formatDate(props.fineDate.value) : <span className='text-primary font-weight-bold'>sem data definida</span>}</h6>
                                </div>
                            }

                            {!props.finePercentage.value &&
                                <div className='d-flex'>
                                    <span className='text-primary font-weight-bold'>Sem multas</span>
                                </div>
                            }
                        </div>
                        <div className='pt-1'>
                            <h6 className='section-label'>Juros</h6>
                            {props.feesPercentage.value > 0 &&
                                <div className='d-flex'>
                                    <h6>{props.feesPercentage.value}%</h6>
                                    <span className='text-muted pl-1 pr-1'>à partir de</span>
                                    <h6>{props.feesDate.value ? DateUtils.formatDate(props.feesDate.value) : <span className='text-primary font-weight-bold'>sem data definida</span>}</h6>
                                </div>
                            }

                            {!props.feesPercentage.value &&
                                <div className='d-flex'>
                                    <span className='text-primary font-weight-bold'>Sem juros</span>
                                </div>
                            }
                        </div>
                        <div className='pt-1'>
                            <h6 className='section-label'>Observações</h6>
                            <div className='d-flex'>
                                <h6 className='text-secondary'>{props.instructions.value ? props.instructions.value : <span className='text-primary font-weight-bold'>Sem observações</span>}</h6>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='d-flex justify-content-between pt-2'>
                <Button.Ripple color='secondary' className='btn-prev' onClick={() => props.stepper.previous()}>
                    <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                    <span className='align-middle d-sm-inline-block d-none'>Anterior</span>
                </Button.Ripple>
                <Button.Ripple color='primary' className='btn-next' onClick={submitForm}>
                    <span className='align-middle d-sm-inline-block d-none'>Emitir Boleto</span>
                    <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                </Button.Ripple>
            </div>
        </Fragment>
    )
}

export default CompleteInvoice
