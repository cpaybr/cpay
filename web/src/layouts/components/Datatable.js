import {Fragment, useEffect, useState, forwardRef} from 'react'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import {Input, Label, Row, Col, Spinner, Button} from 'reactstrap'
import api from '../../services/api'

const Datatable = (props) => {
    const [selectedRows, setSelectedRows] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [columns, setColumns] = useState(props.columns)
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        api.get(props.route).then((response) => {
            if (response.data.statusCode === 200) {
                setData(response.data.data)
                setLoaded(true)
            }
        })
    }, [props.uuid])

    const onRowClick = (event) => props.onRowClick(event)

    const handleFilter = e => {
        const value = e.target.value
        let updatedData = []
        setSearchValue(value)

        if (value.length) {
            updatedData = data.filter(item => {
                const startsWith =
                    item[props.filter].toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item[props.filter].toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            setFilteredData(updatedData)
            setSearchValue(value)
        }
    }

    const handlePagination = page => {
        setCurrentPage(page.selected)
    }

    // const handleSelectChange = ({ selectedRows }) => {
    //     console.log(selectedRows)
    // }

    const CustomPagination = () => (
        <ReactPaginate
            previousLabel=''
            nextLabel=''
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={searchValue.length ? filteredData.length / 10 : data.length / 10 || 1}
            breakLabel='...'
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName='active'
            pageClassName='page-item'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            nextLinkClassName='page-link'
            nextClassName='page-item next'
            previousClassName='page-item prev'
            previousLinkClassName='page-link'
            pageLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'
        />
    )

    // const BootstrapCheckbox = forwardRef(({ onClick, ...rest }, ref) => (
    //     <div className='custom-control custom-checkbox'>
    //         <input type='checkbox' className='custom-control-input' ref={ref} {...rest} />
    //         <label className='custom-control-label cursor-pointer' onClick={onClick} />
    //     </div>
    // ))

    const Data = () => {
        return (
            <DataTable
                noHeader
                // selectableRows
                pagination
                columns={columns}
                paginationPerPage={10}
                className='react-dataTable pt-2 selectable'
                sortIcon={<ChevronDown size={10} />}
                paginationDefaultPage={currentPage + 1}
                paginationComponent={CustomPagination}
                data={searchValue.length ? filteredData : data}
                onRowClicked={onRowClick}
                // selectableRowsComponent={BootstrapCheckbox}
                // onSelectedRowsChange={handleSelectChange}
            />
        )
    }

    const NotFound = () => {
        if (!loaded) {
            return (
                <Row>
                    <Col sm={12} className='p-2 text-center'>
                        <span className='pb-1 d-block'>Carregando informações...</span>
                        <Spinner color='primary' size='lg' />
                    </Col>
                </Row>
            )
        } else {
            return (
                <Row>
                    <Col sm={12} className='text-center p-2'>
                        <span>Nenhuma informação encontrada</span>
                    </Col>
                </Row>
            )
        }
    }

    return (
        <Fragment>
            <Row className='justify-content-start mx-0'>
                <Col className='d-flex align-items-center mt-1' md='3' sm='12'>
                    <Label className='mr-1' for='search-input'>
                        Procurar
                    </Label>
                    <Input
                        className='dataTable-filter mb-50'
                        type='text'
                        bsSize='sm'
                        id='search-input'
                        value={searchValue}
                        onChange={handleFilter}
                        placeholder="Pesquisar"
                    />
                </Col>
            </Row>

            { (data.length && !searchValue) || (searchValue && filteredData.length) ? <Data /> : <NotFound /> }

            {selectedRows.length > 0 &&
            <Row className='justify-content-start mx-0'>
                <Col className='d-flex align-items-center pb-3' md='3' sm='12'>
                    <Button color='primary'>Remover selecionado(s)</Button>
                </Col>
            </Row>
            }
        </Fragment>
    )
}

export default Datatable
