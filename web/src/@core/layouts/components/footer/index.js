const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-left d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='https://converso.express/' target='_blank' rel='noopener noreferrer'>
          Converso
        </a>
        <span className='d-none d-sm-inline-block'>, Todos os direitos reservados</span>
      </span>
      <span className='float-md-right d-none d-md-block'>
        Precisa de ajuda?  <a href='https://converso.express/' target='_blank' rel='noopener noreferrer'>Clique aqui</a>
      </span>
    </p>
  )
}

export default Footer
