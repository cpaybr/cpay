import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import notAuthImg from '@src/assets/images/pages/not-authorized.svg'

import themeConfig from '@configs/themeConfig'

import '@styles/base/pages/page-misc.scss'

const NotAuthorized = () => {
  return (
    <div className='misc-wrapper'>
      <a className='brand-logo' href='/'>
        <h2 className='brand-text text-primary ml-1'>{themeConfig.app.appName}</h2>
      </a>
      <div className='misc-inner p-2 p-sm-3'>
        <div className='w-100 text-center'>
          <h2 className='mb-1'>Você não tem permissão! 🔐</h2>
          <p className='mb-2'>Sua conta não possui permissão para entrar aqui.</p>
          <Button.Ripple tag={Link} to='/' color='primary' className='btn-sm-block mb-1'>
            Voltar
          </Button.Ripple>
          <img className='img-fluid d-block' src={notAuthImg} alt='Not authorized page' />
        </div>
      </div>
    </div>
  )
}
export default NotAuthorized
