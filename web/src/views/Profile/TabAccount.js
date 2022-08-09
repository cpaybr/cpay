import {Fragment} from "react"
import {Card, CardBody, CardHeader, Row, Col, ListGroup, ListGroupItem, Button} from "reactstrap"
import './profile.scss'

const TabAccount = (props) => {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <h4 className='p-0 m-0'>Colocar dinheiro na conta</h4>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md={6} sm={12}>
                            <div className='bg-light-item'>
                                <h5>Transferência TED</h5>
                                <ListGroup className='no-border no-padding no-hover small'>
                                    <ListGroupItem>
                                        <span className='font-weight-bolder'>Banco {props.account.Bank}</span>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <span className='font-weight-bolder'>Agência: </span>
                                        <span>{props.account.BankBranch}</span>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <span className='font-weight-bolder'>Conta: </span>
                                        <span>{props.account.BankAccount}-{props.account.BankAccountDigit}</span>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Col>
                        <Col md={6} sm={12}>
                            <div className='bg-light-item'>
                                <h5>Boleto Bancário</h5>
                                <div className='text-center p-2'>
                                    <Button color='outline-primary' size='md'>Gerar Boleto</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <h4 className='p-0 m-0'>Suas chaves PIX</h4>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col md={12} sm={12}>
                            <div className='bg-light-item hover mh-0'>
                                <h5>CPF/CNPJ</h5>
                                <span className='text-danger'>Chave não definida</span>
                            </div>
                            <div className='bg-light-item hover mh-0'>
                                <h5>E-mail</h5>
                                <span className='text-danger'>Chave não definida</span>
                            </div>
                            <div className='bg-light-item hover mh-0'>
                                <h5>Celular</h5>
                                <span className='text-danger'>Chave não definida</span>
                            </div>
                            <div className='bg-light-item hover mh-0'>
                                <h5>Chave aleatória</h5>
                                <span className='text-danger'>Chave não definida</span>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default TabAccount