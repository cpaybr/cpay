// ** Dropdowns Imports
import {Fragment, useState, useEffect} from 'react'

import UserDropdown from './UserDropdown'
import UserUtils from "../../../../utility/user/UserUtils"

// ** Third Party Components
import {Sun, Moon, Menu} from 'react-feather'
import {NavItem, NavLink} from 'reactstrap'

const NavbarUser = props => {
    // ** Props
    const {skin, setSkin, setMenuVisibility} = props
    const [balance, setBalance] = useState()

    useEffect(() => {
        UserUtils.getBalance().then((balance) => setBalance(balance))
    }, [])

    // ** Function to toggle Theme (Light/Dark)
    const ThemeToggler = () => {
        if (skin === 'dark') {
            return <Sun className='ficon' onClick={() => setSkin('light')}/>
        } else {
            return <Moon className='ficon' onClick={() => setSkin('dark')}/>
        }
    }

    return (
        <Fragment>
            <ul className='navbar-nav d-xl-none d-flex align-items-center'>
                <NavItem className='mobile-menu mr-auto'>
                    <NavLink className='nav-menu-main menu-toggle hidden-xs is-active'
                             onClick={() => setMenuVisibility(true)}>
                        <Menu className='ficon'/>
                    </NavLink>
                </NavItem>
            </ul>
            <div className='bookmark-wrapper d-flex align-items-center mr-auto'>
                <NavItem className='d-none d-lg-block'>
                    <NavLink className='nav-link-style'>
                        <ThemeToggler/>
                    </NavLink>
                </NavItem>
            </div>
            <div className='bookmark-wrapper d-flex align-items-center ml-auto mr-auto'>
                <strong>R$ {balance}</strong>
            </div>
            <ul className='nav navbar-nav align-items-center ml-auto'>
                <UserDropdown/>
            </ul>
        </Fragment>
    )
}
export default NavbarUser
