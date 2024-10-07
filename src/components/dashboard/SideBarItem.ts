import menu from '@/assets/icons/menu.svg'
import chart from '@/assets/icons/chart.svg'
import table from '@/assets/icons/table.svg'
import setting from '@/assets/icons/settings.svg'
import user from '@/assets/icons/user.svg'

const sidebarItem: any[] = [
    {
        title: 'General',
        icon: 'src/assets/icons/menu.svg',
        to: '/dashboard',
        show: true
    },
    {
        title: 'Calendario',
        icon: 'src/assets/icons/calendar.svg',
        to: '/calendar',
        show: true
    },
    {
        title: 'Calculos',
        icon: 'src/assets/icons/ticket.svg',
        to: '/tickets',
        show: true
    },
    {
        title: 'Reportes',
        icon: 'src/assets/icons/reports.svg',
        to: '/reports',
        show: true,
    },
    {
        title: 'Técnicos',
        icon: 'src/assets/icons/technician.svg',
        to: '/technician',
        show: true,
    },
    {
        title: 'Usuarios',
        icon: 'src/assets/icons/user.svg',
        to: '/usuarios',
        show: true,
    },
];

export default sidebarItem;
