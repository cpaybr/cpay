import {Fragment, useState} from "react"
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap"
import {Controller, useForm} from "react-hook-form"
import Cleave from "cleave.js/react"
import classnames from "classnames"
import api from "../../services/api"
import {toast} from "react-toastify"

const EditProfile = (props) => {
    const [profile, setProfile] = useState(null)

    const defaultValues = {
        name: props.user.name,
        lastName: props.user.lastName,
        phone: props.user.phone,
        email: props.user.email
    }

    const { register, errors, handleSubmit, control, reset } = useForm({defaultValues})

    const handleModal = () => props.handle()

    const onSubmit = data => {
        api.put(`/user/profile`, data).then(() => {
            toast('Perfil atualizado com sucesso!', { type: 'success' })
            handleModal()
        }).catch(error => {
            const description = error.response.data.description
            toast(description, { type: 'error' })
        })
    }

    return (
        <Fragment>
            <Modal isOpen={props.modal} toggle={handleModal} className="modal-sm edit-modal">
                <ModalHeader>Perfil</ModalHeader>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody>
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
                            <FormGroup tag={Col} md={12} sm={12}>
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
                            <FormGroup tag={Col} md={12} sm={12}>
                                <Label className='form-label' for='phone'>Telefone</Label>
                                <Controller
                                    as={Cleave}
                                    id='phone'
                                    name='phone'
                                    control={control}
                                    className={classnames('form-control', {
                                        'is-invalid': profile !== null && (client.phone === null || !profile.phone)
                                    })}
                                    placeholder="Telefone"
                                    options={{delimiters: ['(', ') ', '-'], blocks: [0, 2, 5, 4], numericOnly: true}}
                                />
                            </FormGroup>
                        </Row>
                    </ModalBody>
                    <ModalFooter className='justify-content-center'>
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

export default EditProfile
