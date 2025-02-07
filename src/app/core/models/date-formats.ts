export const DateFormats: any = {
    'numeric': {
        id: 'numeric',
        display: '12/31/2024',
        locale: 'en',
        options: {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        }
    },
    'numeric-eu': {
        id: 'numeric-eu',
        display: '31/12/2024',
        locale: 'de',
        options: {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
    },
    'numeric-dots': {
        id: 'numeric-dots',
        display: '31.12.2024',
        locale: 'de',
        options: {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
    },
    'numeric-dashes': {
        id: 'numeric-dashes',
        locale: 'de',
        display: '31-12-2024',
        options: {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }
    },
    'iso': {
        id: 'iso',
        locale: 'en',
        display: '2024-12-31',
        options: {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }
    }
} as const;

export type DateFormatKey = keyof typeof DateFormats;