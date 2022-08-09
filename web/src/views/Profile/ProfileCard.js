import {Fragment, useEffect, useState} from "react"
import {
    Card,
    CardBody,
    ListGroup,
    ListGroupItem,
    Button,
    Badge
} from 'reactstrap'
import Avatar from '@components/avatar'
import DateUtils from '../../utility/date/DateUtils'
import UILoader from '@components/ui-loader'
import EditProfile from "./EditProfile"

const ProfileCard = (props) => {
    const [fullName, setFullName] = useState('')
    const [blocking, setBlocking] = useState(true)

    useEffect(() => {
        const fullName = `${props.user.name} ${props.user.lastName}`
        setFullName(fullName)

        props.user.name !== undefined ? setBlocking(false) : setBlocking(true)

    }, [props.user])

    const handleModal = () => props.handleProfileModal()

    const CardData = () => {
        return (
            <Fragment>
                <Card className='text-center px-1 py-2'>
                    <CardBody>
                        <h6>Saldo</h6>
                        <h4 className='pb-1'>
                            <span className='small'>R$ </span>
                            { props.user.balance ? <span>{props.user.balance}</span> : <span>0,00</span> }
                        </h4>

                        <Avatar
                            initials
                            color='light-primary'
                            className='rounded'
                            content={fullName}
                            contentStyles={{
                                borderRadius: 0,
                                fontSize: 'calc(36px)',
                                width: '100%',
                                height: '100%'
                            }}
                            style={{
                                height: '90px',
                                width: '90px'
                            }}
                        />
                        <h3 className='pt-2'>{fullName}</h3>

                        { props.user.type === '0' ? <Badge color='primary' className='badge-glow'>Pessoa Física</Badge> : <Badge color='primary' className='badge-glow'>Pessoa Jurídica</Badge> }

                        <div className='text-left pt-2'>
                            <h4 className='font-weight-bolder'>Detalhes</h4>
                            <hr className='m-0 mb-1' />
                            <ListGroup className='no-border no-padding no-hover font-size-18'>
                                <ListGroupItem>
                                    <span className='font-weight-bolder'>Documento: </span>
                                    <span>{props.user.taxNumber}</span>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <span className='font-weight-bolder'>E-mail: </span>
                                    <span>{props.user.email}</span>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <span className='font-weight-bolder'>Celular: </span>
                                    <span>{props.user.phone}</span>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <span className='font-weight-bolder'>Ativo desde: </span>
                                    <span>{DateUtils.formatDate(props.user.createdAt)}</span>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <span className='font-weight-bolder'>Última atualização: </span>
                                    <span>{DateUtils.formatDateWithTime(props.user.updatedAt)}</span>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <span className='font-weight-bolder'>Status: </span>
                                    { props.user.isActive ? <Badge color='light-success'>Conta Ativa</Badge> : <Badge color='light-danger'>Conta Inativa</Badge>  }
                                </ListGroupItem>
                            </ListGroup>
                        </div>

                        <Button className='mt-3' color='primary' outline onClick={() => handleModal()}>Editar Informações</Button>
                    </CardBody>
                </Card>
                <EditProfile user={props.user} modal={props.profileModal} handle={handleModal} />
            </Fragment>
        )
    }

    const LoadingCardData = () => {
        return (
            <Fragment>
                <UILoader blocking={blocking}>
                    <Card className='text-center px-1 py-4'>
                        <CardBody className='mt-2'>
                            <h5 className='mt-5'>Carregando...</h5>
                        </CardBody>
                    </Card>
                </UILoader>
            </Fragment>
        )
    }

    return props.user.name !== undefined ? <CardData /> : <LoadingCardData />

}

export default ProfileCard
