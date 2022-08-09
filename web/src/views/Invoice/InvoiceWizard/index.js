import { useRef, useState } from 'react'
import Wizard from '@components/wizard'
import BasicInfo from './Steps/BasicInfo'
import FeesOptions from './Steps/FeesOptions'
import PayerInfo from './Steps/PayerInfo'
import CompleteInvoice from './Steps/Complete'

const Index = () => {
    const [stepper, setStepper] = useState(null)
    const [dueDate, setDueDate] = useState('')
    const [value, setValue] = useState(0)
    const [finePercentage, setFinePercentage] = useState(0)
    const [fineDate, setFineDate] = useState('')
    const [feesPercentage, setFeePercentage] = useState(0)
    const [feesDate, setFeesDate] = useState('')
    const [discount, setDiscount] = useState(0)
    const [discountDate, setDiscountDate] = useState('')
    const [instructions, setInstructions] = useState('')
    const [payerType, setPayerType] = useState('0')
    const [payerName, setPayerName] = useState('')
    const [payerTaxNumber, setPayerTaxNumber] = useState('')
    const [payerEmail, setPayerEmail] = useState('')
    const [payerPhone, setPayerPhone] = useState('')
    const [payerPostalCode, setPayerPostalCode] = useState('')
    const [payerState, setPayerState] = useState('')
    const [payerCity, setPayerCity] = useState('')
    const [payerDistrict, setPayerDistrict] = useState('')
    const [payerStreet, setPayerStreet] = useState('')
    const [payerComplement, setPayerComplement] = useState('')
    const [payerAddressNumber, setPayerAddressNumber] = useState('')

    const ref = useRef(null)

    const steps = [
        {
            id: 'account-details',
            title: 'Informações Básicas',
            content: <BasicInfo
                dueDate={{value: dueDate, set: setDueDate}}
                value={{value, set: setValue}}
                stepper={stepper}
                type='wizard-vertical'
            />
        },
        {
            id: 'personal-info',
            title: 'Juros, multa e desconto',
            content: <FeesOptions
                finePercentage={{value: finePercentage, set: setFinePercentage}}
                fineDate={{value: fineDate, set: setFineDate}}
                feesPercentage={{value: feesPercentage, set: setFeePercentage}}
                feesDate={{value: feesDate, set: setFeesDate}}
                discount={{value: discount, set: setDiscount}}
                discountDate={{value: discountDate, set: setDiscountDate}}
                instructions={{value: instructions, set: setInstructions}}
                stepper={stepper}
                type='wizard-vertical'
            />
        },
        {
            id: 'step-address',
            title: 'Informações do Pagador',
            content: <PayerInfo
                payerType={{value: payerType, set: setPayerType}}
                payerName={{value: payerName, set: setPayerName}}
                payerTaxNumber={{value: payerTaxNumber, set: setPayerTaxNumber}}
                payerEmail={{value: payerEmail, set: setPayerEmail}}
                payerPhone={{value: payerPhone, set: setPayerPhone}}
                payerPostalCode={{value: payerPostalCode, set: setPayerPostalCode}}
                payerState={{value: payerState, set: setPayerState}}
                payerCity={{value: payerCity, set: setPayerCity}}
                payerDistrict={{value: payerDistrict, set: setPayerDistrict}}
                payerStreet={{value: payerStreet, set: setPayerStreet}}
                payerComplement={{value: payerComplement, set: setPayerComplement}}
                payerAddressNumber={{value: payerAddressNumber, set: setPayerAddressNumber}}
                stepper={stepper}
                type='wizard-vertical'
            />
        },
        {
            id: 'step-complete',
            title: 'Concluir',
            content: <CompleteInvoice
                dueDate={{value: dueDate, set: setDueDate}}
                value={{value, set: setValue}}
                finePercentage={{value: finePercentage, set: setFinePercentage}}
                fineDate={{value: fineDate, set: setFineDate}}
                feesPercentage={{value: feesPercentage, set: setFeePercentage}}
                feesDate={{value: feesDate, set: setFeesDate}}
                discount={{value: discount, set: setDiscount}}
                discountDate={{value: discountDate, set: setDiscountDate}}
                instructions={{value: instructions, set: setInstructions}}
                payerType={{value: payerType, set: setPayerType}}
                payerName={{value: payerName, set: setPayerName}}
                payerTaxNumber={{value: payerTaxNumber, set: setPayerTaxNumber}}
                payerEmail={{value: payerEmail, set: setPayerEmail}}
                payerPhone={{value: payerPhone, set: setPayerPhone}}
                payerPostalCode={{value: payerPostalCode, set: setPayerPostalCode}}
                payerState={{value: payerState, set: setPayerState}}
                payerCity={{value: payerCity, set: setPayerCity}}
                payerDistrict={{value: payerDistrict, set: setPayerDistrict}}
                payerStreet={{value: payerStreet, set: setPayerStreet}}
                payerComplement={{value: payerComplement, set: setPayerComplement}}
                payerAddressNumber={{value: payerAddressNumber, set: setPayerAddressNumber}}
                stepper={stepper}
                type='wizard-vertical'
            />
        }
    ]

    return (
        <div className='vertical-wizard'>
            <Wizard
                type='vertical'
                ref={ref}
                steps={steps}
                options={{
                    linear: false
                }}
                instance={el => setStepper(el)}
            />
        </div>
    )
}

export default Index
