import {Fragment, useEffect, useState} from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import {ChevronDown, Plus, ExternalLink} from 'react-feather'
import {
    Card,
    CardHeader,
    CardTitle,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Badge
} from 'reactstrap'
import InvoiceWizard from './InvoiceWizard'
import DateUtils from "../../utility/date/DateUtils"
import Datatable from "../../layouts/components/Datatable"

const Index = () => {
    const [uuid, setUuid] = useState('')
    const [modal, setModal] = useState(false)
    const [columns, setColumns] = useState([
        {
            name: 'Cliente',
            selector: 'clientName',
            sortable: true,
            cell: row => {
                const clientName = !row.clientName ? 'Não identificado' : row.clientName
                return <span>{clientName}</span>
            }
        },
        {
            name: 'Valor',
            selector: 'value',
            sortable: true,
            cell: row => {
                return <span>R$ {row.value}</span>
            }
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
            cell: row => {
                if (row.status === 'paid') {
                    return <Badge className='badge-glow' color='success'>Pago</Badge>
                } else if (row.status === 'pending') {
                    return <Badge className='badge-glow' color='warning'>Pendente</Badge>
                } else {
                    return <Badge className='badge-glow' color='secondary'>Não Informado</Badge>
                }
            }
        },
        {
            name: 'Vencimento',
            selector: 'dueDate',
            sortable: true,
            cell: row => {
                const dueDate = DateUtils.formatDate(row.dueDate)
                return <span>{dueDate}</span>
            }
        },
        {
            name: 'Criado Em',
            selector: 'createdAt',
            sortable: true,
            cell: row => {
                const createdAt = DateUtils.formatDateWithTime(row.createdAt)
                return <span>{createdAt}</span>
            }
        },
        {
            name: 'Ações',
            selector: 'url',
            allowOverflow: true,
            cell: row => {
                return (
                    <Button color='primary' size='sm' onClick={() => window.open(row.url)}>
                        <ExternalLink size='12' /> Acessar
                    </Button>
                )
            }
        }
    ])

    const handleModal = () => setModal(!modal)

    const onRowClick = (event) => {
        window.open(event.url)
    }

    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Emitir Boleto' breadCrumbParent='Boletos' breadCrumbActive='Emitir Boleto' />
            <Card>
                <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                    <CardTitle tag='h4'>Todos os Boletos</CardTitle>
                    <div className='d-flex mt-md-0 mt-1'>
                        <Button className='ml-2' color='primary' onClick={handleModal}>
                            <Plus size={15} />
                            <span className='align-middle ml-50'>Novo Boleto</span>
                        </Button>
                    </div>
                </CardHeader>
                <Datatable columns={columns} filter='clientName' route='/invoices' onRowClick={onRowClick} uuid={uuid} />
            </Card>
            <Modal isOpen={modal} toggle={handleModal} className="modal-lg">
                <ModalHeader toggle={handleModal}>Gerenciar Boleto</ModalHeader>
                <ModalBody>
                    <InvoiceWizard />
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default Index
