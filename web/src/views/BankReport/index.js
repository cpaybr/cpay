import { Fragment } from 'react'

import Breadcrumbs from '@components/breadcrumbs'

const BankReport = () => {
    return (
        <Fragment>
            <Breadcrumbs breadCrumbTitle='Extrato' breadCrumbParent='Relatórios' breadCrumbActive='Extrato' />
        </Fragment>
    )
}

export default BankReport
