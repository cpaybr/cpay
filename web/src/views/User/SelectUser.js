import {Fragment, useState, useEffect} from 'react'
import api from '../../services/api'
import {FormGroup, Input, ModalHeader, ModalBody, Modal, Table} from 'reactstrap'

const SelectUser = (props) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.get('/users').then((response) => {
            if (response.data.statusCode === 200) {
                setUsers(response.data.data)
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
                <ModalHeader toggle={handleModal}>Selecionar Usuário</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input type='text' id='search' placeholder='Procurar' bsSize='sm' />
                    </FormGroup>
                    <Table responsive className='table-select'>
                        <tbody>
                        { users.map(user => (
                            <tr key={user._id} onClick={() => select(user)}>
                                <td><small>{user.name}</small></td>
                                <td><small>{user.email}</small></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default SelectUser
