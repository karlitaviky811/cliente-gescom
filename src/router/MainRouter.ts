import CalculationsApp from '@/views/pages/CalculationsApp.vue';
import CommissionsApp from '@/views/pages/CommissionsApp.vue';
import CreateCalculationApp from '@/views/pages/CreateCalculationApp.vue';
import CreateCommissionsApp from '@/views/pages/CreateCommissionsApp.vue';
import CreateTechnicianApp from '@/views/pages/CreateTechnicianApp.vue';
import CreateUserApp from '@/views/pages/CreateUserApp.vue';
import ReportsListApp from '@/views/pages/ReportsListApp.vue';
import TablesApp from '@/views/pages/TablesApp.vue';
import TechnicianApp from '@/views/pages/TechnicianApp.vue';
import TechnicianModule from '@/views/pages/TechnicianModule.vue';

import UsersModule from '@/views/pages/UsersModule.vue';
import { Table } from '@fullcalendar/daygrid/internal.js';

const MainRoutes = {
  path: '/home',
  meta: {
    requiresAuth: true
  },
  component: () => import('@/layouts/DashboardLayout.vue'),
  children: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/pages/DashboardApp.vue')
    },
    {
      name: 'Técnicos',
      path: '/technician',
      component: TechnicianModule,
      children: [{
        path: '',
        component: TechnicianApp
      },
      {
        path: 'create',
        component: () => CreateTechnicianApp
      }

      ]
    },
    {
      path: '/commissions',
      name: 'Comisiones',
      component: () => import('@/views/pages/CommissionsModule.vue'),
      children: [{
        path: '',
        component: CommissionsApp
      },
      {
        path: 'create',
        component: () => CreateCommissionsApp
      }]
    },
    {
      path: '/calculations',
      name: 'Calculos',
      component: () => import('@/views/pages/CalculationsModuleApp.vue'),
      children: [{
        path: '',
        component: CalculationsApp
      },
      {
        path: 'create',
        component: () => CreateCalculationApp
      }]
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: () => import('@/views/pages/UsersModule.vue'),
      children: [{
        path: '',
        component: TablesApp
      },
      {
        path: 'create',
        component: () => CreateUserApp
      }]
    },
    {
      path: '/reports',
      name: 'Reportes',
      component: () => import('@/views/pages/ReportsModuleApp.vue'),
      children: [{
        path: '',
        component: ReportsListApp
      },
     ]
    },
    {
      path: '/calendar',
      name: 'Calendario',
      component: () => import('@/views/pages/CalendarTicketsApp.vue'),
      children: [{
        path: '',
        component: ReportsListApp
      },
     ]
    }
  ]
}

export default MainRoutes;