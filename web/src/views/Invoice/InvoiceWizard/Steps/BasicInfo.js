import {Fragment} from 'react'
import {ArrowLeft, ArrowRight} from 'react-feather'
import {Label, FormGroup, Row, Col, Input, Form, Button} from 'reactstrap'
import Cleave from 'cleave.js/react'

const BasicInfo = (props) => {
    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>Informações Básicas</h5>
                <small className='text-muted'>Preencha as informações básicas do boleto.</small>
            </div>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <FormGroup tag={Col} md='12'>
                        <Label className='form-label' for='invoice-due-date'>
                            Data de vencimento
                        </Label>
                        <Input
                            type='date'
                            name='invoice-due-date'
                            id='invoice-due-date'
                            placeholder='Data de vencimento'
                            value={props.dueDate.value}
                            onChange={(e) => {
                                props.dueDate.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='12'>
                        <Label className='form-label' for='invoice-value'>
                            Valor
                        </Label>
                        <Cleave
                            className='form-control'
                            name='invoice-value'
                            placeholder='Valor'
                            options={{
                                numeral: true,
                                numeralThousandsGroupStyle: 'thousand',
                                numeralDecimalScale: 2,
                                numeralIntegerScale: 5,
                                numeralDecimalMark: ',',
                                delimiter: '.'
                            }}
                            id='invoice-value'
                            value={props.value.value}
                            onChange={(e) => {
                                props.value.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                </Row>
                <div className='d-flex justify-content-between pt-2'>
                    <Button.Ripple color='secondary' className='btn-prev' outline disabled>
                        <ArrowLeft size={14} className='align-middle mr-sm-25 mr-0'></ArrowLeft>
                        <span className='align-middle d-sm-inline-block d-none'>Anterior</span>
                    </Button.Ripple>
                    <Button.Ripple color='primary' className='btn-next' onClick={() => props.stepper.next()}>
                        <span className='align-middle d-sm-inline-block d-none'>Próxima Etapa</span>
                        <ArrowRight size={14} className='align-middle ml-sm-25 ml-0'></ArrowRight>
                    </Button.Ripple>
                </div>
            </Form>
        </Fragment>
    )
}

export default BasicInfo
