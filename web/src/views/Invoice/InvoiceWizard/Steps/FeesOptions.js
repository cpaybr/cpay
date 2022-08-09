import {Fragment, useState} from 'react'
import Select from 'react-select'
import {ArrowLeft, ArrowRight} from 'react-feather'
import {selectThemeColors} from '@utils'
import {Label, FormGroup, Row, Col, Form, Input, Button} from 'reactstrap'
import Cleave from 'cleave.js/react'
import classnames from 'classnames'

import '@styles/react/libs/react-select/_react-select.scss'

const FeesOptions = (props) => {
    return (
        <Fragment>
            <div className='content-header'>
                <h5 className='mb-0'>Juros, multa e desconto</h5>
                <small>Preencha os campos para definir juros, multa e desconto</small>
            </div>
            <Form onSubmit={e => e.preventDefault()}>
                <Row>
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-fine-percentage'>
                            Porcentagem da multa
                        </Label>
                        <Cleave
                            className='form-control'
                            placeholder="Porcentagem da multa"
                            options={{delimiters: ['.'], blocks: [3, 2], uppercase: true, onlyNumeric: true}}
                            id='invoice-fine-percentage'
                            value={props.finePercentage.value}
                            onChange={(e) => {
                                props.finePercentage.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-fine-date'>
                            Data para cobrança da multa
                        </Label>
                        <Input
                            type='date'
                            name='invoice-fine-date'
                            id='invoice-fine-date'
                            placeholder='Data para cobrança da multa'
                            value={props.fineDate.value}
                            onChange={(e) => {
                                props.fineDate.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                </Row>
                <Row>
                    {/*<FormGroup tag={Col} md='6'>*/}
                    {/*    <Label className='form-label' for='invoice-fees-percentage'>*/}
                    {/*        Porcentagem dos juros*/}
                    {/*    </Label>*/}
                    {/*    <Cleave*/}
                    {/*        className='form-control'*/}
                    {/*        placeholder="Porcentagem dos juros"*/}
                    {/*        options={{delimiters: ['.'], blocks: [3, 2], uppercase: true, onlyNumeric: true}}*/}
                    {/*        id='invoice-fees-percentage'*/}
                    {/*        value={props.feesPercentage.value}*/}
                    {/*        onChange={(e) => {*/}
                    {/*            props.feesPercentage.set(e.target.value)*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup tag={Col} md='6'>*/}
                    {/*    <Label className='form-label' for='invoice-fees-date'>*/}
                    {/*        Data para cobrança dos juros*/}
                    {/*    </Label>*/}
                    {/*    <Input*/}
                    {/*        type='date'*/}
                    {/*        name='invoice-fees-date'*/}
                    {/*        id='invoice-fees-date'*/}
                    {/*        placeholder='Data para cobrança da multa'*/}
                    {/*        value={props.feesDate.value}*/}
                    {/*        onChange={(e) => {*/}
                    {/*            props.feesDate.set(e.target.value)*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</FormGroup>*/}
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-discount'>
                            Desconto
                        </Label>
                        <Cleave
                            className='form-control'
                            placeholder="Desconto"
                            options={{
                                numeral: true,
                                numeralThousandsGroupStyle: 'thousand',
                                numeralDecimalScale: 2,
                                numeralIntegerScale: 5,
                                numeralDecimalMark: ',',
                                delimiter: '.'
                            }}
                            id='invoice-discount'
                            value={props.discount.value}
                            onChange={(e) => {
                                props.discount.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='6'>
                        <Label className='form-label' for='invoice-discount-date'>
                            Data limite do desconto
                        </Label>
                        <Input
                            type='date'
                            name='invoice-discount-date'
                            id='invoice-discount-date'
                            placeholder='Data limite do desconto'
                            value={props.discountDate.value}
                            onChange={(e) => {
                                props.discountDate.set(e.target.value)
                            }}
                        />
                    </FormGroup>
                    <FormGroup tag={Col} md='12'>
                        <Label className='form-label' for='invoice-instructions'>
                            Instruções
                        </Label>
                        <div className='form-label-group mb-0'>
                            <Input
                                type='textarea'
                                name='invoice-instructions'
                                id='invoice-instructions'
                                placeholder='Instruções'
                                value={props.instructions.value}
                                onChange={(e) => {
                                    props.instructions.set(e.target.value)
                                }}
                            />
                            <span
                                className={classnames('textarea-counter-value float-right bg-light-success', {'bg-light-danger': props.instructions.value.length > 140})}>{`${props.instructions.value.length}/140`}</span>
                        </div>
                    </FormGroup>
                </Row>
                <div className='d-flex justify-content-between pt-2'>
                    <Button.Ripple color='secondary' className='btn-prev' onClick={() => props.stepper.previous()}>
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

export default FeesOptions
