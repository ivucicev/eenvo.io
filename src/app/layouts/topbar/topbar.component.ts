import { Component, EventEmitter, Inject, Output, Signal, signal } from '@angular/core';
import { SimplebarAngularModule } from 'simplebar-angular';
import { Store } from '@ngrx/store';
import { getLayoutMode, getSidebarSize } from '../../store/layouts/layout-selector';
import { LAYOUT_MODE, SIDEBAR_SIZE } from '../../store/layouts/layout';
import { changeMode } from '../../store/layouts/layout-action';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'eenvo-topbar',
    standalone: true,
    imports: [SimplebarAngularModule, NgbDropdownModule, CommonModule, TranslatePipe],
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

    MODE = LAYOUT_MODE;
    SIDEBAR_SIZE = SIDEBAR_SIZE
    currantMode!: string;
    sidebarSize!: string;
    element: any;

    selectedItem!: any;
    cookieValue: any;
    flagvalue: any;
    valueset: any;
    countryName: any;
    userData: any;
    isDemo = false;

    // Add new properties for user details
    currentUser: {
        email: string;
        avatar: string;
        company: any,
        name: string;
    } = {
            email: '',
            avatar: '',
            name: '',
            company: ''
        };

    countdownMinutes: Signal<number> = signal(0);

    @Output() mobileMenuButtonClicked = new EventEmitter();

    listLang = [
        { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
        { text: 'Española', flag: 'assets/images/flags/spain.svg', lang: 'sp' },
        { text: 'Deutsche', flag: 'assets/images/flags/germany.svg', lang: 'gr' },
        { text: 'Italiana', flag: 'assets/images/flags/italy.svg', lang: 'it' },
        { text: 'Francias', flag: 'assets/images/flags/fr.svg', lang: 'fr' },
        { text: 'Hrvatski', flag: 'assets/images/flags/hr.svg', lang: 'hr' }
    ];


    constructor(private store: Store, private router: Router, private pocketbase: PocketBaseService, @Inject(DOCUMENT) private document: any, public languageService: LanguageService, public _cookiesService: CookieService) {
        this.element = document.documentElement;

        this.store.select(getLayoutMode).subscribe((mode) => {
            this.currantMode = mode
        })
        this.store.select(getSidebarSize).subscribe((sSize) => {
            this.sidebarSize = sSize
        })

        this.pocketbase.authStore$.subscribe(user => {
            this.loadUserDetails(user);
        })

        this.isDemo = this.pocketbase.isDemoSubdomain();

        if (this.isDemo)
            this.startCountdownToCron()


    }

    private loadUserDetails(user: any) {
        if (user) {
            this.currentUser = {
                company: (user as any)['expand']['company']['name'],
                email: user['email'],
                avatar: user['avatar'] ? this.pocketbase.files.getURL(user, user['avatar']) : 'assets/images/users/user-dummy-img.jpg',
                name: user['name'] || user['email'].split('@')[0]
            };
        }
    }

    async logout() {
        try {
            this.pocketbase.logout();
            await this.router.navigate(['/auth']);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    ngOnInit(): void {

        // Cookies wise Language set
        this.cookieValue = this._cookiesService.get('lang');
        const val = this.listLang.filter(x => x.lang === this.cookieValue);
        this.countryName = val.map(element => element.text);
        if (val.length === 0) {
            if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.svg'; }
        } else {
            this.flagvalue = val.map(element => element.flag);
        }

    }

    modeChange() {
        const mode = this.currantMode === this.MODE.LIGHTMODE ? this.MODE.DARKMODE : this.MODE.LIGHTMODE
        this.store.dispatch(changeMode({ mode }));
    }

    windowScroll() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            if ((document.getElementById('back-to-top') as HTMLElement)?.style) {
                (document.getElementById('back-to-top') as HTMLElement).style.display = "block";
            }
            document.getElementById('page-topbar')?.classList.add('topbar-shadow')
        } else {
            if ((document.getElementById('back-to-top') as HTMLElement)?.style)
                (document.getElementById('back-to-top') as HTMLElement).style.display = "none";
            document.getElementById('page-topbar')?.classList.remove('topbar-shadow')
        }
    }

    toggleMobileMenu(event: any) {
        // const sidebarSize = this.sidebarSize === this.SIDEBAR_SIZE.SMALL ? this.SIDEBAR_SIZE.LARGE : this.SIDEBAR_SIZE.SMALL;
        // this.store.dispatch(changeSidebarSize({ sidebarSize }));
        document.querySelector('.hamburger-icon')?.classList.toggle('open')
        event.preventDefault();
        this.mobileMenuButtonClicked.emit();
    }

    fullscreen() {
        document.body.classList.toggle('fullscreen-enable');
        if (
            !document.fullscreenElement && !this.element.mozFullScreenElement &&
            !this.element.webkitFullscreenElement) {
            if (this.element.requestFullscreen) {
                this.element.requestFullscreen();
            } else if (this.element.mozRequestFullScreen) {
                /* Firefox */
                this.element.mozRequestFullScreen();
            } else if (this.element.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                this.element.webkitRequestFullscreen();
            } else if (this.element.msRequestFullscreen) {
                /* IE/Edge */
                this.element.msRequestFullscreen();
            }
        } else {
            if (this.document.exitFullscreen) {
                this.document.exitFullscreen();
            } else if (this.document.mozCancelFullScreen) {
                /* Firefox */
                this.document.mozCancelFullScreen();
            } else if (this.document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                this.document.webkitExitFullscreen();
            } else if (this.document.msExitFullscreen) {
                /* IE/Edge */
                this.document.msExitFullscreen();
            }
        }
    }

    setLanguage(text: string, lang: string, flag: string) {
        this.countryName = text;
        this.flagvalue = flag;
        this.cookieValue = lang;
        this.languageService.setLanguage(lang);
    }

    /**
     * Timer method that counts down to the next execution of the cron expression "0 *\/3 * * *"
     * The cron expression executes every 3 hours on the server in Etc/UTC timezone.
     */

    startCountdownToCron() {
        const cronIntervalHours = 3;
        const utcNow = new Date();
        const currentUTCHours = utcNow.getUTCHours();
        const currentUTCMinutes = utcNow.getUTCMinutes();
        const nextExecutionHour = Math.floor(currentUTCHours / cronIntervalHours) * cronIntervalHours + cronIntervalHours;
        const nextExecutionDate = new Date(utcNow);

        if (nextExecutionHour >= 24) {
            nextExecutionDate.setUTCDate(utcNow.getUTCDate() + 1);
            nextExecutionDate.setUTCHours(nextExecutionHour % 24, 0, 0, 0);
        } else {
            nextExecutionDate.setUTCHours(nextExecutionHour, 0, 0, 0);
        }

        const countdownMilliseconds = nextExecutionDate.getTime() - utcNow.getTime();
        const countdownMinutes = Math.ceil(countdownMilliseconds / (1000 * 60));
        this.countdownMinutes = signal(countdownMinutes);

        const to = setTimeout(() => {
            this.startCountdownToCron();
        }, 60000);
    }

}
