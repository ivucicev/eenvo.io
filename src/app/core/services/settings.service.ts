import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PocketBaseService } from './pocket-base.service';
import { DateFormats } from '../models/date-formats';
import jsPDF from 'jspdf';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    public settings: any = null;
    public currencies: any[] = [];

    constructor(private pb: PocketBaseService, private activatedRoute: ActivatedRoute, private http: HttpClient) {
    }

    public reinit() {
    }

    public getCurrencyISO = async (): Promise<string> => {
        return new Promise((resolve) => {
            if (this.currencies.length > 0) {
                resolve(this.currencies.find(c => c.symbol == this.settings?.currency)?.code);
                return;
            }
            this.http.get<any[]>('assets/json/currency-list.json').toPromise().then((data: any) => {
                Object.keys(data).forEach((k: string) => {
                    this.currencies.push({ code: k, ...data[k] })
                })
                resolve(this.currencies.find(c => c.symbol == this.settings?.currency)?.code);
            });
        });
    }

}
