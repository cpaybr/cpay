import {Fragment, useState} from "react"
import {Card, CardHeader, CardBody, Row, Col, FormGroup, Label, Form, Button, Badge} from "reactstrap"
import InputPasswordToggle from '@components/input-password-toggle'
import Mastercard from '../../assets/images/icons/mastercard.png'
import Visa from '../../assets/images/icons/visa.png'
import {toast} from "react-toastify"
import api from "../../services/api"

const TabSecurity = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onSubmitChangePassword = (e) => {
        e.preventDefault()

        const isFieldEmpty = !oldPassword || !password || !confirmPassword

        if (isFieldEmpty) {
            toast("Preencha todos os campos necessários", { type: 'error' })
            return
        }

        const isCorrectlyConfirmation = password === confirmPassword

        if (!isCorrectlyConfirmation) {
            toast("Confirme a nova senha corretamente", { type: 'error' })
            return
        }

        const isOldEqualsNew = oldPassword === password

        if (isOldEqualsNew) {
            toast("A nova senha não pode ser igual à atual", { type: 'error' })
            return
        }

        const data = { oldPassword, newPassword: password }

        api.put(`/user/profile/password`, data).then(() => {
            toast('Senha atualizada com sucesso!', { type: 'success' })

            setOldPassword('')
            setPassword('')
            setConfirmPassword('')
        }).catch(error => {
            const description = error.response.data.description
            toast(description, { type: 'error' })
        })
    }

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <h4 className='p-0 m-0'>Mudar senha</h4>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={(e) => onSubmitChangePassword(e) }>
                        <Row>
                            <FormGroup tag={Col} md={4} sm={12}>
                                <Label className='form-label' for='password'>
                                    Senha atual
                                </Label>
                                <InputPasswordToggle value={oldPassword} className='input-group-merge' onChange={(e) => setOldPassword(e.target.value)} id='password'/>
                            </FormGroup>
                            <FormGroup tag={Col} md={4} sm={12}>
                                <Label className='form-label' for='password'>
                                    Nova senha
                                </Label>
                                <InputPasswordToggle value={password} className='input-group-merge' onChange={(e) => setPassword(e.target.value)} id='password'/>
                            </FormGroup>
                            <FormGroup tag={Col} md={4} sm={12}>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='confirm-password'>
                                        Confirmar Nova senha
                                    </Label>
                                </div>
                                <InputPasswordToggle value={confirmPassword} className='input-group-merge' onChange={(e) => setConfirmPassword(e.target.value)} id='confirm-password'/>
                            </FormGroup>
                        </Row>
                        <Button color='primary' type='submit'>Mudar senha</Button>
                    </Form>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <h4 className='p-0 m-0'>Cartões</h4>
                </CardHeader>
                <CardBody>
                    <Card className='border p-2'>
                        <div className='d-flex justify-content-between flex-sm-row flex-column'>
                            <div>
                                <img src={Mastercard} alt='Mastercard' className='pb-1' />
                                <h5>Lorem Ipsum</h5>
                                <span className='d-block'>**** **** **** 5678</span>
                                <span className='d-block'>Expira em: 17/08/2025</span>
                                <Badge color='light-info' className='mt-1 badge-glow'>Cartão Físico</Badge>
                            </div>
                            <div>
                                <div className='d-flex justify-content-center align-items-center flex-row pt-1'>
                                    <div className='pr-1'>
                                        <Button color='primary' outline>Bloquear</Button>
                                    </div>
                                    <div className='pl-1'>
                                        <Button color='secondary' outline disabled>Remover</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className='border p-2'>
                        <div className='d-flex justify-content-between flex-sm-row flex-column'>
                            <div>
                                <img src={Visa} alt='Visa' className='pb-1' />
                                <h5>Lorem Ipsum</h5>
                                <span className='d-block'>**** **** **** 9876</span>
                                <span className='d-block'>Expira em: 25/08/2025</span>
                                <Badge color='light-info' className='mt-1 badge-glow'>Cartão Virtual</Badge>
                            </div>
                            <div>
                                <div className='d-flex justify-content-center align-items-center flex-row pt-1'>
                                    <div className='pr-1'>
                                        <Button color='primary' outline>Bloquear</Button>
                                    </div>
                                    <div className='pl-1'>
                                        <Button color='secondary' outline>Remover</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default TabSecurity
