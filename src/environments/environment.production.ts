export const environment = {
    production: true,
    pocketbase: (window as any)['env'].pocketbase || 'http://127.0.0.1:8090',
};
