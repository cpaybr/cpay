import { Fragment, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import Datatable from '../../layouts/components/Datatable'
import EditClient from "./EditClient"
import { Plus } from 'react-feather'
import {Card, CardHeader, CardTitle, Button} from 'reactstrap'
import StringUtils from "../../utility/string/StringUtils"

const Clients = () => {
    const [id, setId] = useState(null)
    const [uuid, setUuid] = useState('')
    const [modal, setModal] = useState(false)
    const [columns, setColumns] = useState([
        {
            name: 'Cliente',
            selector: 'name',
            sortable: true
        },
        {
            name: 'Telefone',
            selector: 'phone',
            sortable: true
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true
        }
    ])

    const handleModal = (isNew, isToUpdateDataTable) => {
        if (isNew) setId(null)
        if (isToUpdateDataTable) setUuid(StringUtils.generateUuid())
        setModal(!modal)
    }

    const onRowClick = (event) => {
        setId(event._id)
        handleModal()
    }

    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Todos os clientes' breadCrumbParent='Clientes' breadCrumbActive='Todos os Clientes' />
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Todos os Clientes</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <Button className='ml-2' color='primary' onClick={() => handleModal(true)}>
                            <Plus size={15} />
                            <span className='align-middle ml-50'>Novo Cliente</span>
                        </Button>
                    </div>
                </CardHeader>
                <Datatable columns={columns} filter='name' route='/clients' onRowClick={onRowClick} uuid={uuid} />
            </Card>
            <EditClient modal={modal} handle={handleModal} id={id} />
        </Fragment>
    )
}

export default Clients
