import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARD.LIST.DASHBOARD',
        icon: 'las la-house-damage',
        link: '/',
    },
    {
        id: 3,
        label: 'MENUITEMS.AUTH.TEXT',
        icon: 'las la-cog',
        subItems: [
            {
                id: 4,
                label: 'MENUITEMS.AUTH.LIST.SIGNIN',
                parentId: 3,
                link: '/auth/auth-signin',
            },
            {
                id: 5,
                label: 'MENUITEMS.AUTH.LIST.SIGNUP',
                link: '/auth/auth-signup',
                parentId: 3,
            },
            {
                id: 6,
                label: 'MENUITEMS.AUTH.LIST.PASSWORDRESET',
                link: '/auth/auth-pass-reset',
                parentId: 3
            },
            {
                id: 8,
                label: 'MENUITEMS.AUTH.LIST.LOCKSCREEN',
                parentId: 3,
                link: '/auth/auth-lockscreen',
            },
        ]
    },
    {
        id: 52,
        label: 'MENUITEMS.MORE.TEXT',
        icon: 'ri-briefcase-2-line',
        subItems: [
            {
                id: 83,
                label: 'MENUITEMS.MULTILEVEL.TEXT',
                icon: 'bi bi-share',
                subItems: [
                    {
                        id: 84,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
                        parentId: 83
                    },
                    {
                        id: 85,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
                        parentId: 83,
                        childItem: [
                            {
                                id: 86,
                                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
                                parentId: 85
                            },
                            {
                                id: 87,
                                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
                                parentId: 85,
                                childItem: [
                                    {
                                        id: 76,
                                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.LEVEL3.1',
                                        parentId: 87
                                    },
                                    {
                                        id: 76,
                                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.LEVEL3.2',
                                        parentId: 87,

                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
        ]
    },

]
