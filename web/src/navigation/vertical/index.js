import { Home, List, User, FileText, Users, Smartphone, Phone, Tv, PlayCircle, Briefcase, Grid, Share } from 'react-feather'
import { lazy } from 'react'
import { getUserData } from '@utils'

const navigationItems = [
  {
    id: 'home',
    title: 'Início',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'clients',
    title: 'Clientes',
    icon: <Users size={20} />,
    navLink: '/clients'
  },
  {
    header: 'Boletos'
  },
  {
    id: 'invoice',
    title: 'Gerenciar Boletos',
    icon: <FileText size={20} />,
    navLink: '/invoice'
  },
  {
    header: 'Pagamentos'
  },
  {
    id: 'pix',
    title: 'PIX',
    icon: <Grid size={20} />,
    navLink: '/pix'
  },
  {
    id: 'transfer',
    title: 'TED',
    icon: <Share size={20} />,
    navLink: '/ted'
  },
  {
    header: 'Recargas'
  },
  {
    id: 'phone',
    title: 'Recarga de Celular',
    icon: <Smartphone size={20} />,
    navLink: '/phone-credits'
  },
  {
    id: 'landline',
    title: 'Recarga de Fixo',
    icon: <Phone size={20} />,
    navLink: '/landline-credits'
  },
  {
    id: 'tv',
    title: 'TV Pré-Pago',
    icon: <Tv size={20} />,
    navLink: '/tv'
  },
  {
    id: 'games',
    title: 'Jogos e Conteúdo',
    icon: <PlayCircle size={20} />,
    navLink: '/games'
  },
  {
    id: 'passages',
    title: 'Passagens',
    icon: <Briefcase size={20} />,
    navLink: '/passages'
  },
  {
    header: 'Conta'
  },
  {
    id: 'bankStatement',
    title: 'Extrato',
    icon: <List size={20} />,
    navLink: '/bank-report'
  },
  {
    id: 'profile',
    title: 'Perfil',
    icon: <User size={20} />,
    navLink: '/profile'
  },
  {
    header: 'Administrador',
    onlyAdmin: true
  },
  {
    id: 'users',
    title: 'Usuários',
    icon: <User size={20} />,
    navLink: '/users',
    onlyAdmin: true
  }
]

const navItemsFiltered = navigationItems.filter((route) => {
  return (!route.onlyAdmin) || (route.onlyAdmin && (getUserData() && getUserData().isAdmin))
})

export default navItemsFiltered
