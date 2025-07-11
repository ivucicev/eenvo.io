import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { PocketBaseService } from '../services/pocket-base.service';
import { SettingsService } from '../services/settings.service';

export const settingsResolver: ResolveFn<any> = async (route, state) => {
    
    const pb = inject(PocketBaseService);
    const settings = inject(SettingsService);
    try {
        settings.settings = await pb.settings.getFirstListItem(`company="${pb.auth.company}"`);
    } catch(e) {}
    settings.reinit();
    return settings.settings;
};
