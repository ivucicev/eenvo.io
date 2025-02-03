import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Menu',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'las la-house-damage',
        link: '/',
    },
    {
        id: 2,
        label: 'Invoices',
        icon: 'las la-file-invoice-dollar',
        link: '/invoices',
    },
    {
        id: 2,
        label: 'Quotes',
        icon: 'las la-paper-plane',
        link: '/quotes',
    },
    {
        id: 2,
        label: 'Purchase Orders',
        icon: 'las la-paste',
        link: '/purchase',
    },
    {
        id: 2,
        label: 'Expenses',
        icon: 'las la-hand-holding-usd',
        link: '/expenses',
    },
    {
        id: 2,
        label: 'Transactions',
        icon: 'las la-exchange-alt',
        link: '/expenses',
    },
    {
        id: 2,
        label: 'Customers',
        icon: 'las la-industry',
        link: '/customers',
    },
    {
        id: 2,
        label: 'Vendors',
        icon: ' las la-truck',
        link: '/customers',
    },
    {
        id: 52,
        label: 'Settings',
        icon: 'las la-cog',
        subItems: [
            {
                id: 53,
                label: 'General',
                link: '/settings',
                parentId: 52
            },
            {
                id: 53,
                label: 'My Company',
                link: '/company',
                parentId: 52
            },
            {
                id: 55,
                label: 'Users',
                link: '/users',
                parentId: 52
            },
            {
                id: 55,
                label: 'Services',
                link: '/services',
                parentId: 52
            },
            {
                id: 55,
                label: 'Templates',
                link: '/templates',
                parentId: 52
            },
           /* {
                id: 55,
                label: 'Taxes',
                link: '/taxes',
                parentId: 52
            },*/
        ]
    },
]
