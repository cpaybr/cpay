import api from '../../services/api'
import { useState, useEffect } from 'react'
import {useSkin} from '@hooks/useSkin'
import useJwt from '@src/@core/auth/jwt/useJwt'
import {Link, useHistory} from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import {Row, Col, CardTitle, CardText, Form, FormGroup, Label, Button, ButtonGroup} from 'reactstrap'
import Cleave from 'cleave.js/react'
import { toast } from 'react-toastify'
import '@styles/base/pages/page-auth.scss'
import { isUserLoggedIn } from '@utils'
import themeConfig from '@configs/themeConfig'


const Login = () => {
    const [skin, setSkin] = useSkin()
    const [type, setType] = useState('0')
    const [taxNumber, setTaxNumber] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
        source = require(`@src/assets/images/pages/${illustration}`).default

    useEffect(() => {
        if (isUserLoggedIn()) {
            history.push('/')
        }
    }, [])

    const submitForm = (e) => {
        e.preventDefault()

        api.post('/authentication/signin', { taxNumber, password }).then(response => {

            const data = response.data.data
            const user = data.user
            const username = user.lastName ? `${user.name} ${user.lastName}` : user.name

            const userData = { username, role: user.role, isAdmin: user.isAdmin, isMaster: user.isMaster }

            useJwt().jwt.setToken(data.token)
            useJwt().jwt.setUserData(userData)

            history.go(0)

        }).catch(error => {
            const description = error.response.data.description
            toast(description, { type: 'error' })
        })
    }

    return (
        <div className='auth-wrapper auth-v2'>
            <Row className='auth-inner m-0'>
                <Link className='brand-logo' to='/'>
                    <h2 className='brand-text text-primary'>{themeConfig.app.appName}</h2>
                </Link>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={source} alt='Login V2'/>
                    </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                        <CardTitle tag='h2' className='font-weight-bold mb-1'>Seja bem vindo ao {themeConfig.app.appName}!</CardTitle>
                        <CardText className='mb-2'>Por favor, insira seu CPF e senha para entrar no seu painel
                            digital</CardText>

                        <Row>
                            <Col md='12' lg='12'>
                                <ButtonGroup className='w-100'>
                                    <Button className='btn-sm' color='primary' outline onClick={() => setType('0')} active={type === '0'}>
                                        Pessoa Física
                                    </Button>
                                    <Button className='btn-sm' color='primary' outline onClick={() => setType('1')} active={type === '1'}>
                                        Pessoa Jurídica
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>

                        <Form className='auth-login-form mt-2' onSubmit={e => submitForm(e)}>
                            {type === '0' &&
                                <FormGroup>
                                    <Label className='form-label' for='login-taxnumber'>
                                        CPF
                                    </Label>
                                    <Cleave
                                        value={taxNumber}
                                        className='form-control'
                                        placeholder="123.456.789-10"
                                        options={{delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2], numericOnly: true}}
                                        onChange={(e) => setTaxNumber(e.target.value)}
                                        id='login-taxnumber'
                                    />
                                </FormGroup>
                            }
                            {type === '1' &&
                                <FormGroup>
                                    <Label className='form-label' for='login-taxnumber'>
                                        CNPJ
                                    </Label>
                                    <Cleave
                                        value={taxNumber}
                                        className='form-control'
                                        placeholder="12.345.678/0001-00"
                                        options={{delimiters: ['.', '.', '/', '-'], blocks: [2, 3, 3, 4, 2], numericOnly: true}}
                                        onChange={(e) => setTaxNumber(e.target.value)}
                                        id='login-taxnumber'
                                    />
                                </FormGroup>
                            }
                            <FormGroup>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='login-password'>
                                        Senha
                                    </Label>
                                    {/*<Link to='/'>*/}
                                    {/*    <small>Esqueceu sua senha?</small>*/}
                                    {/*</Link>*/}
                                </div>
                                <InputPasswordToggle value={password} className='input-group-merge' onChange={(e) => setPassword(e.target.value)} id='login-password'/>
                            </FormGroup>
                            <FormGroup>
                                {/*<CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Lembre-se de mim' />*/}
                            </FormGroup>
                            <Button.Ripple type='submit' color='primary' block>
                                Entrar
                            </Button.Ripple>
                        </Form>
                        <p className='text-center mt-2'>
                            {/*<span className='mr-25'>É novo por aqui?</span>*/}
                            {/*<Link to='/register'>*/}
                            {/*    <span>Crie uma conta gratuitamente</span>*/}
                            {/*</Link>*/}
                        </p>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default Login
