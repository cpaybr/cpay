import { Row, Col, Card, CardBody } from 'reactstrap'
import Avatar from '@components/avatar'
import { ShoppingBag, Share, Download, Smartphone, Phone, Tv, PlayCircle, Briefcase } from 'react-feather'

const Index = () => {
    return (
        <div>
            <h1 className='pb-1'>Serviços</h1>
            <Row className='home-options'>
                <Col xl='3' md='4' sm='6'>
                    <Card className='bg-primary'>
                        <CardBody className='text-center'>
                            <Avatar icon={<ShoppingBag size={20} />} className='shadow' color='primary' size='xl' />
                            <div className='text-center pt-2'>
                                <h3 className='text-white font-weight-bolder'>Empréstimo</h3>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='3' md='4' sm='6'>
                    <Card>
                        <CardBody className='text-center'>
                            <Avatar icon={<Share size={20} />} className='shadow' color='light-primary' size='xl' />
                            <div className='text-center pt-2'>
                                <h3 className='font-weight-bolder'>Pagamento</h3>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='3' md='4' sm='6'>
                    <Card>
                        <CardBody className='text-center'>
                            <Avatar icon={<Download size={20} />} className='shadow' color='light-primary' size='xl' />
                            <div className='text-center pt-2'>
                                <h3 className='font-weight-bolder'>Recebimento</h3>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='3' md='4' sm='6'>
                    <Card>
                        <CardBody className='text-center'>
                            <Avatar icon={<Smartphone size={20} />} className='shadow' color='light-primary' size='xl' />
                            <div className='text-center pt-2'>
                                <h3 className='font-weight-bolder'>Recarga Celular</h3>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='3' md='4' sm='6'>
                    <Card>
                        <CardBody className='text-center'>
                            <Avatar icon={<Phone size={20} />} className='shadow' color='light-primary' size='xl' />
                            <div className='text-center pt-2'>
                                <h3 className='font-weight-bolder'>Recarga Fixo</h3>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='3' md='4' sm='6'>
                    <Card>
                        <CardBody className='text-center'>
                            <Avatar icon={<Tv size={20} />} className='shadow' color='light-primary' size='xl' />
                            <div className='text-center pt-2'>
                                <h3 className='font-weight-bolder'>TV Pré-pago</h3>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='3' md='4' sm='6'>
                    <Card>
                        <CardBody className='text-center'>
                            <Avatar icon={<PlayCircle size={20} />} className='shadow' color='light-primary' size='xl' />
                            <div className='text-center pt-2'>
                                <h3 className='font-weight-bolder'>Jogos e Conteúdo</h3>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col xl='3' md='4' sm='6'>
                    <Card>
                        <CardBody className='text-center'>
                            <Avatar icon={<Briefcase size={20} />} className='shadow' color='light-primary' size='xl' />
                            <div className='text-center pt-2'>
                                <h3 className='font-weight-bolder'>Passagens</h3>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Index
