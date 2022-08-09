import {Fragment, useEffect, useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import defApi from "../../services/defApi"
import api from '../../services/api'
import {Button, Input, Label, Row, Col, Modal, ModalHeader, ModalBody, FormGroup, Form, ModalFooter, ButtonGroup} from 'reactstrap'
import Cleave from 'cleave.js/react'
import classnames from 'classnames'
import { toast } from 'react-toastify'
import { Trash } from "react-feather"

const EditClient = (props) => {
    const [client, setClient] = useState(null)
    const [address, setAddress] = useState({})
    const [type, setType] = useState('0')

    const defaultValues = {
        taxNumber: '',
        phone: '',
        postalCode: ''
    }

    const { register, errors, handleSubmit, control, reset } = useForm({defaultValues})

    useEffect(() => {
        if (props.id) {
            api.get(`/clients/${props.id}`).then((response) => {
                const data = response.data.data
                const { street, district, city, state, postalCode } = data

                setType(data.type)
                setAddress({street, district, city, state, postalCode})

                reset(data)
            })
        } else {
            setAddress({})
            reset(defaultValues)
        }
    }, [props.id])

    const handleModal = () => props.handle(false, true)

    const onChangePostalCode = (value) => {
        if (value.length === 9) {
            const cepUrl = `https://viacep.com.br/ws/${value}/json`
            defApi.get(cepUrl, {}).then((response) => {
                if (!response.data.erro) {
                    const responseAddress = {
                        street: response.data.logradouro,
                        district: response.data.bairro,
                        city: response.data.localidade,
                        state: response.data.uf,
                        postalCode: value
                    }

                    setAddress(responseAddress)
                }
            })
        } else {
            clearAddressFields()
        }
    }

    const clearAddressFields = () => {
        setAddress({})
    }

    const onSubmit = data => {
        data.type = type
        data.postalCode = address.postalCode

        if (!props.id) {
            createClient(data)
        } else {
            updateClient(data)
        }
    }

    const createClient = (data) => {
        api.post('/clients', data).then(() => {
            toast('Cliente criado com sucesso!', { type: 'success' })
            handleModal()
        }).catch(error => {
            const description = error.response.data.description
            toast(description, { type: 'error' })
        })
    }

    const updateClient = (data) => {
        api.put(`/clients/${props.id}`, data).then(() => {
            toast('Cliente atualizado com sucesso!', { type: 'success' })
            handleModal()
        }).catch(error => {
            const description = error.response.data.description
            toast(description, { type: 'error' })
        })
    }

    const removeClient = () => {
        api.delete(`/clients/${props.id}`).then(() => {
            toast('Cliente removido com sucesso!', { type: 'success' })
            handleModal()
        }).catch(error => {
            const description = error.response.data.description
            toast(description, { type: 'error' })
        })
    }

    return (
        <Fragment>
            <Modal isOpen={props.modal} toggle={handleModal} className="modal-md edit-modal">
                <ModalHeader toggle={handleModal}>Gerenciar Cliente</ModalHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
                        <Row>
                            <Col md='12' lg='12'>
                                <ButtonGroup className='mb-1 mt-1 w-100'>
                                    <Button className='btn-sm' color='primary' outline onClick={() => setType('0')} active={type === '0'}>
                                        Pessoa Física
                                    </Button>
                                    <Button className='btn-sm' color='primary' outline onClick={() => setType('1')} active={type === '1'}>
                                        Pessoa Jurídica
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <Row>
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='name'>Nome</Label>
                                <Input
                                    type='text'
                                    id='name'
                                    name='name'
                                    placeholder='Nome'
                                    innerRef={register({ required: true })}
                                    invalid={errors.name && true}
                                />
                            </FormGroup>
                            {type === '0' &&
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='taxNumber'>CPF</Label>
                                <Controller
                                    as={Cleave}
                                    id='taxNumber'
                                    name='taxNumber'
                                    control={control}
                                    className={classnames('form-control', {
                                        'is-invalid': client !== null && (client.taxNumber === null || !client.taxNumber)
                                    })}
                                    placeholder="123.456.789-10"
                                    options={{delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2], numericOnly: true}}
                                />
                            </FormGroup>
                            }
                            {type === '1' &&
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='taxNumber'>CNPJ</Label>
                                <Controller
                                    as={Cleave}
                                    id='taxNumber'
                                    name='taxNumber'
                                    control={control}
                                    className={classnames('form-control', {
                                        'is-invalid': client !== null && (client.taxNumber === null || !client.taxNumber)
                                    })}
                                    placeholder="12.345.678/0001-00"
                                    options={{delimiters: ['.', '.', '/', '-'], blocks: [2, 3, 3, 4, 2], numericOnly: true}}
                                />
                            </FormGroup>
                            }
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='email'>Email</Label>
                                <Input
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='E-mail'
                                    innerRef={register({ required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid"} })}
                                    invalid={errors.email && true}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='phone'>Telefone</Label>
                                <Controller
                                    as={Cleave}
                                    id='phone'
                                    name='phone'
                                    control={control}
                                    className={classnames('form-control', {
                                        'is-invalid': client !== null && (client.phone === null || !client.phone)
                                    })}
                                    placeholder="Telefone"
                                    options={{delimiters: ['(', ') ', '-'], blocks: [0, 2, 5, 4], numericOnly: true}}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} md={12} sm={12}>
                                <Label className='form-label' for='postal-code'>CEP</Label>
                                <Cleave
                                    id='postalCode'
                                    name='postalCode'
                                    className='form-control'
                                    onChange={(e) => onChangePostalCode(e.target.value)}
                                    options={{delimiters: ['-'], blocks: [5, 3], numericOnly: true}}
                                    placeholder='CEP'
                                    value={address.postalCode}
                                />
                                <small>
                                    <a href='https://buscacepinter.correios.com.br/app/endereco/index.php' target='_blank'>Não
                                        sei meu CEP</a>
                                </small>
                            </FormGroup>
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='state'>Estado</Label>
                                <Input
                                    type='text'
                                    id='state'
                                    name='state'
                                    placeholder='Estado'
                                    readOnly
                                    value={address.state}
                                    innerRef={register({ required: true })}
                                    invalid={errors.state && true}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='city'>Cidade</Label>
                                <Input
                                    type='text'
                                    id='city'
                                    name='city'
                                    placeholder='Cidade'
                                    readOnly
                                    value={address.city}
                                    innerRef={register({ required: true })}
                                    invalid={errors.city && true}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='district'>Bairro</Label>
                                <Input
                                    type='text'
                                    id='district'
                                    name='district'
                                    placeholder='Bairro'
                                    readOnly
                                    value={address.district}
                                    innerRef={register({ required: true })}
                                    invalid={errors.district && true}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='street'>Rua</Label>
                                <Input
                                    type='text'
                                    id='street'
                                    name='street'
                                    placeholder='Rua'
                                    readOnly
                                    value={address.street}
                                    innerRef={register({ required: true })}
                                    invalid={errors.street && true}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} md={9} xs={6}>
                                <Label className='form-label' for='complement'>Complemento</Label>
                                <Input
                                    type='text'
                                    id='complement'
                                    name='complement'
                                    placeholder='Complemento'
                                    innerRef={register({ required: false })}
                                />
                            </FormGroup>
                            <FormGroup tag={Col} md={3} xs={6}>
                                <Label className='form-label' for='number'>Número</Label>
                                <Input
                                    type='text'
                                    maxLength='6'
                                    id='number'
                                    name='number'
                                    placeholder='Número'
                                    innerRef={register({ required: true })}
                                    invalid={errors.number && true}
                                />
                            </FormGroup>
                        </Row>
                    </ModalBody>
                    <ModalFooter className='justify-content-center'>
                        {props.id !== null &&
                            <Button className='modal-remove-button' color='danger' size='sm' onClick={removeClient}><Trash size={15} /></Button>
                        }
                        <Row>
                            <Col md={6} sm={6} xs={6}>
                                <Button color='secondary' onClick={handleModal}>Cancelar</Button>
                            </Col>
                            <Col md={6} sm={6} xs={6}>
                                <Button color='primary' type='submit'>Salvar</Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default EditClient
