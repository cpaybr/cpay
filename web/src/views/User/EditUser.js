import {Fragment, useEffect, useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import api from '../../services/api'
import defApi from "../../services/defApi"
import {
    Button,
    Input,
    Label,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Form,
    ModalFooter,
    ButtonGroup,
    Spinner
} from 'reactstrap'
import Cleave from 'cleave.js/react'
import classnames from 'classnames'
import { toast } from 'react-toastify'
import { Trash } from "react-feather"
import UserUtils from "../../utility/user/UserUtils"

const EditUser = (props) => {
    const [user, setUser] = useState(null)
    const [address, setAddress] = useState({})
    const [type, setType] = useState('0')
    const [isButtonLoading, setIsButtonLoading] = useState(false)


    const defaultValues = {
        taxNumber: '',
        phone: '',
        postalCode: ''
    }

    const { register, errors, handleSubmit, control, reset } = useForm({defaultValues})

    useEffect(() => {
        if (props.id) {
            api.get(`/users/${props.id}`).then((response) => {
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

    const onSubmit = async data => {
        setIsButtonLoading(true)

        data.type = type
        data.postalCode = address.postalCode

        if (!props.id) {
            const userResponse = await api.get('/user/profile')
            data.businessUnitId = userResponse.data.data.businessUnitId
            await createUser(data)
        } else {
            updateUser(data)
        }

        setIsButtonLoading(false)
    }

    const createUser = async (data) => {
        const defaultParams = await UserUtils.getDefaultFitbankParams()

        const name = data.lastName ? `${data.name} ${data.lastName}` : data.name

        const createFitbankUserParams = {
            Method: "CreateAccount",
            PartnerId: defaultParams.user.partnerId,
            BusinessUnitId: defaultParams.businessUnit.buId,
            TaxNumber: data.taxNumber,
            Mail: data.email,
            Phone: data.phone,
            Name: name,
            Nickname: name
        }

        const createFitbankUser = await defApi.post('/', createFitbankUserParams)

        if (createFitbankUser.data.Success === 'false') {
            toast("Não foi possível criar uma conta para este usuário, verifique os campos e tente novamente", {type: 'error'})
        } else {
            api.post('/users', data).then(() => {
                toast('Usuário criado com sucesso!', { type: 'success' })
                handleModal()
            }).catch(error => {
                const description = error.response.data.description
                toast(description, { type: 'error' })
            })
        }
    }

    const updateUser = (data) => {
        api.put(`/users/${props.id}`, data).then(() => {
            toast('Usuário atualizado com sucesso!', { type: 'success' })
            handleModal()
        }).catch(error => {
            const description = error.response.data.description
            toast(description, { type: 'error' })
        })
    }

    const removeUser = () => {
        api.delete(`/users/${props.id}`).then(() => {
            toast('Usuário removido com sucesso!', { type: 'success' })
            handleModal()
        }).catch(error => {
            const description = error.response.data.description
            toast(description, { type: 'error' })
        })
    }

    return (
        <Fragment>
            <Modal isOpen={props.modal} toggle={handleModal} className="modal-md edit-modal">
                <ModalHeader toggle={handleModal}>Gerenciar Usuário</ModalHeader>
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
                                    <Label className='form-label' for='lastName'>Sobrenome</Label>
                                    <Input
                                        type='text'
                                        id='lastName'
                                        name='lastName'
                                        placeholder='Sobrenome'
                                        innerRef={register({ required: true })}
                                        invalid={errors.lastName && true}
                                    />
                                </FormGroup>
                            }
                            {type === '0' &&
                                <FormGroup tag={Col} md={6} sm={12}>
                                    <Label className='form-label' for='taxNumber'>CPF</Label>
                                    <Controller
                                        as={Cleave}
                                        id='taxNumber'
                                        name='taxNumber'
                                        control={control}
                                        className={classnames('form-control', {
                                            'is-invalid': user !== null && (user.taxNumber === null || !user.taxNumber)
                                        })}
                                        placeholder="123.456.789-10"
                                        options={{delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2], numericOnly: true}}
                                        disabled={props.id}
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
                                            'is-invalid': user !== null && (user.taxNumber === null || !user.taxNumber)
                                        })}
                                        placeholder="12.345.678/0001-00"
                                        options={{delimiters: ['.', '.', '/', '-'], blocks: [2, 3, 3, 4, 2], numericOnly: true}}
                                    />
                                </FormGroup>
                            }
                            <FormGroup tag={Col} md={6} sm={12}>
                                <Label className='form-label' for='phone'>Telefone</Label>
                                <Controller
                                    as={Cleave}
                                    id='phone'
                                    name='phone'
                                    control={control}
                                    className={classnames('form-control', {
                                        'is-invalid': user !== null && (user.phone === null || !user.phone)
                                    })}
                                    placeholder="Telefone"
                                    options={{delimiters: ['(', ') ', '-'], blocks: [0, 2, 5, 4], numericOnly: true}}
                                />
                            </FormGroup>
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
                                <Label className='form-label' for='password'>Senha</Label>
                                <Input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Senha'
                                    innerRef={register({ required: !props.id })}
                                    invalid={errors.lastName && true}
                                    disabled={props.id}
                                />
                            </FormGroup>
                        </Row>
                    </ModalBody>
                    <ModalFooter className='justify-content-center'>
                        {/*{props.id !== null &&*/}
                        {/*    <Button className='modal-remove-button' color='danger' size='sm' onClick={removeUser}><Trash size={15} /></Button>*/}
                        {/*}*/}
                        <Row>
                            <Col md={6} sm={6} xs={6}>
                                <Button color='secondary' onClick={handleModal}>Cancelar</Button>
                            </Col>
                            <Col md={6} sm={6} xs={6}>
                                <Button color='primary' type='submit' disabled={isButtonLoading}>
                                    {isButtonLoading ? <Spinner size='sm' /> : <span>Salvar</span>}
                                </Button>
                            </Col>
                        </Row>
                    </ModalFooter>
                </Form>
            </Modal>
        </Fragment>
    )
}

export default EditUser
