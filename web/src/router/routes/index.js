import { lazy } from 'react'
import { getUserData } from '@utils'

// ** Document title
const TemplateTitle = '%s - Banco Digital'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home/'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/Authentication/Register')),
    layout: 'BlankLayout'
  },
  {
    path: '/invoice',
    component: lazy(() => import('../../views/Invoice'))
  },
  {
    path: '/clients',
    component: lazy(() => import('../../views/Client'))
  },
  {
    path: '/users',
    component: lazy(() => import('../../views/User')),
    onlyAdmin: true
  },
  {
    path: '/bank-report',
    component: lazy(() => import('../../views/BankReport'))
  },
  {
    path: '/profile',
    component: lazy(() => import('../../views/Profile'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

Routes.map((route) => {
  if ((!getUserData() || !getUserData().isAdmin) && route.onlyAdmin) {
    route.component = lazy(() => import('../../views/NotAuthorized'))
  }
})

export { DefaultRoute, TemplateTitle, Routes }
