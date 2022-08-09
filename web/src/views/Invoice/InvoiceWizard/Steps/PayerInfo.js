import {Fragment, useState} from 'react'
import defApi from '../../../../services/defApi'
import api from "../../../../services/api"
import {ArrowLeft, ArrowRight} from 'react-feather'
import {Label, FormGroup, Row, Col, Input, Form, Button, ButtonGroup} from 'reactstrap'
import Cleave from 'cleave.js/react'
import SelectClient from '../../../Client/SelectClient'

const PayerInfo = (props) => {

    const [clientModal, setClientModal] = useState(false)

    const handleClientModal = () => {
        setClientModal(!clientModal)
    }

    const selectClient = (client) => {
        props.payerType.set(client.type)
        props.payerName.set(client.name)
        props.payerTaxNumber.set(client.taxNumber)
        props.payerEmail.set(client.email)
        props.payerPhone.set(client.phone)
        props.payerPostalCode.set(client.postalCode)
        props.payerState.set(client.state)
        props.payerCity.set(client.city)
        props.payerDistrict.set(client.district)
        props.payerStreet.set(client.street)
        props.payerComplement.set(client.complement)
        props.payerAddressNumber.set(client.number)

        handleClientModal()
    }

    const clearAddressFields = () => {
        props.payerDistrict.set('')
        props.payerStreet.set('')
        props.payerCity.set('')
        props.payerState.set('')
    }

    const onChangePostalCode = (value) => {
        props.payerPostalCode.set(value)

        if (value.length === 9) {
            const cepUrl = `https://viacep.com.br/ws/${value}/json`
            defApi.get(cepUrl, {}).then((response) => {
                if (!response.data.erro) {
                    props.payerDistrict.set(response.data.bairro)
                    props.payerStreet.set(response.data.logradouro)
                    props.payerCity.set(response.data.localidade)
                    props.payerState.set(response.data.uf)
                }
            })
        } else {
            clearAddressFields()
        }
    }

    const nextStep = async () => {
        props.stepper.next()
    }

    return (
        <Fragment>
            <div className='content-header'>
                <Row>
                    <Col md='8' sm='12'>
                        <h5 className='mb-0'>Informações do Pagador</h5>
                        <small>Preencha as informações do pagador deste boleto</small>
                    </Col>
                    <Col md='4' sm='12'>
                        <Button color='primary' size='sm' onClick={handleClientModal}>Selecionar Cliente</Button>
                    </Col>
                </Row>
            </div>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <Col md='12' lg='12'>
                        <ButtonGroup className='mb-1 mt-1'>
                            <Button className='btn-sm' color='primary' onClick={() => props.payerType.set(0)} active={props.payerType.value === '0'}>
                                Pessoa Física
                            </Button>
                            <Button className='btn-sm' color='primary' onClick={() => props.payerType.set(1)} active={props.payerType.value === '1'}>
                                Pessoa Jurídica
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row>
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-payer-name'>Nome</Label>
                        <Input
                            type='text'
                            id='invoice-payer-name'
                            name='invoice-payer-name'
                            placeholder='Nome'
                            value={props.payerName.value}
                            onChange={(e) => {
                                props.payerName.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    {props.payerType.value === '0' &&
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='invoice-payer-tax-number'>CPF</Label>
                            <Cleave
                                id='invoice-payer-tax-number'
                                className='form-control'
                                placeholder="123.456.789-10"
                                options={{delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2], numericOnly: true}}
                                value={props.payerTaxNumber.value}
                                onChange={(e) => {
                                    props.payerTaxNumber.set(e.target.value)
                                }}
                            />
                        </FormGroup>
                    }
                    {props.payerType.value === '1' &&
                        <FormGroup tag={Col} md='6'>
                            <Label className='form-label' for='invoice-payer-tax-number'>CNPJ</Label>

                            <Cleave
                                id='invoice-payer-tax-number'
                                className='form-control'
                                placeholder="12.345.678/0001-00"
                                options={{delimiters: ['.', '.', '/', '-'], blocks: [2, 3, 3, 4, 2], numericOnly: true}}
                                value={props.payerTaxNumber.value}
                                onChange={(e) => {
                                    props.payerTaxNumber.set(e.target.value)
                                }}
                            />
                        </FormGroup>
                    }
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-payer-email'>Email</Label>
                        <Input
                            type='email'
                            id='invoice-payer-email'
                            name='invoice-payer-email'
                            placeholder='E-mail'
                            value={props.payerEmail.value}
                            onChange={(e) => {
                                props.payerEmail.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-payer-phone'>Telefone</Label>
                        <Cleave
                            id='invoice-payer-phone'
                            className='form-control'
                            placeholder="Telefone"
                            options={{delimiters: ['(', ') ', '-'], blocks: [0, 2, 5, 4], numericOnly: true}}
                            value={props.payerPhone.value}
                            onChange={(e) => {
                                props.payerPhone.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='12'>
                        <Label className='form-label' for='invoice-payer-postal-code'>CEP</Label>
                        <Cleave
                            id='invoice-payer-postal-code'
                            className='form-control'
                            placeholder="CEP"
                            options={{delimiters: ['-'], blocks: [5, 3], numericOnly: true}}
                            value={props.payerPostalCode.value}
                            onChange={(e) => {
                                onChangePostalCode(e.target.value)
                            }}
                        />
                        <small>
                            <a href='https://buscacepinter.correios.com.br/app/endereco/index.php' target='_blank'>Não
                            sei meu CEP</a>
                        </small>
                    </FormGroup>
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-payer-uf'>Estado</Label>
                        <Input
                            type='text'
                            id='invoice-payer-uf'
                            name='invoice-payer-uf'
                            placeholder='Estado'
                            readOnly
                            value={props.payerState.value}
                            onChange={(e) => {
                                props.payerState.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-payer-city'>Cidade</Label>
                        <Input
                            type='text'
                            id='invoice-payer-city'
                            name='invoice-payer-city'
                            placeholder='Cidade'
                            readOnly
                            value={props.payerCity.value}
                            onChange={(e) => {
                                props.payerCity.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-payer-district'>Bairro</Label>
                        <Input
                            type='text'
                            id='invoice-payer-district'
                            name='invoice-payer-district'
                            placeholder='Bairro'
                            readOnly
                            value={props.payerDistrict.value}
                            onChange={(e) => {
                                props.payerDistrict.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-payer-street'>Rua</Label>
                        <Input
                            type='text'
                            id='invoice-payer-street'
                            name='invoice-payer-street'
                            placeholder='Rua'
                            readOnly
                            value={props.payerStreet.value}
                            onChange={(e) => {
                                props.payerStreet.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='9'>
                        <Label className='form-label' for='invoice-payer-complement'>Complemento</Label>
                        <Input
                            type='text'
                            id='invoice-payer-complement'
                            name='invoice-payer-complement'
                            placeholder='Complemento'
                            value={props.payerComplement.value}
                            onChange={(e) => {
                                props.payerComplement.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='3'>
                        <Label className='form-label' for='invoice-payer-number'>Número</Label>
                        <Cleave
                            className='form-control'
                            placeholder="Número"
                            options={{blocks: [6], onlyNumeric: true}}
                            id='invoice-payer-number'
                            value={props.payerAddressNumber.value}
                            onChange={(e) => {
                                props.payerAddressNumber.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                </Row>
                <div className='d-flex justify-content-between pt-2'>
                    <Button.Ripple color='secondary' className='btn-prev' onClick={() => props.stepper.previous()}>
                        <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Anterior</span>
                    </Button.Ripple>
                    <Button.Ripple color='primary' className='btn-next' onClick={() => nextStep()}>
                        <span className='align-middle d-sm-inline-block d-none'>Próxima Etapa</span>
                        <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                    </Button.Ripple>
                </div>
            </Form>

            <SelectClient isOpen={clientModal} handleModal={handleClientModal} handleSelect={selectClient} />
        </Fragment>
    )
}

export default PayerInfo
