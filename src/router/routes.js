
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: 'index.html', component: () => import('pages/index') }

    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
