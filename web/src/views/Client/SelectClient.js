import {Fragment, useState, useEffect} from 'react'
import api from '../../services/api'
import {FormGroup, Input, ModalHeader, ModalBody, Modal, Table} from 'reactstrap'

const SelectClient = (props) => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        api.get('/clients').then((response) => {
            if (response.data.statusCode === 200) {
                setClients(response.data.data)
            }
        })
    }, [props.isOpen])

    const handleModal = () => props.handleModal()

    const select = (data) => {
        props.handleSelect(data)
        handleModal()
    }

    return (
        <Fragment>
            <Modal isOpen={props.isOpen} toggle={handleModal} className='modal-sm'>
                <ModalHeader toggle={handleModal}>Selecionar Cliente</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input type='text' id='search' placeholder='Procurar' bsSize='sm' />
                    </FormGroup>
                    <Table responsive className='table-select'>
                        <tbody>
                        { clients.map(client => (
                            <tr key={client._id} onClick={() => select(client)}>
                                <td><small>{client.name}</small></td>
                                <td><small>{client.email}</small></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default SelectClient
