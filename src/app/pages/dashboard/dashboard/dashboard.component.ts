import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxChartModule, DxDateRangeBoxModule, DxDropDownBoxModule, DxDropDownButtonModule, DxPieChartModule } from 'devextreme-angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { PocketBaseService } from '../../../core/services/pocket-base.service';


@Component({
    selector: 'eenvo-dashboard',
    standalone: true,
    imports: [DxDateRangeBoxModule, DxChartModule, DxPieChartModule, DxDropDownButtonModule, TranslateModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    public invoices: any = [];
    public transactions: any = [];
    public expenses: any = [];

    public invoicesPerCustomer: any = [];
    public expensesPerCustomer: any = [];
    public incomeData: any = [];

    private defaultRangeValue: [Date, Date] = [new Date(), new Date()];
    private dateRangeOptionValues = Object.values(DateRangeOptionEnum).filter((v) => !isNaN(Number(v)));

    public dateRangeOptions: any;

    public dropdownOptions = {
        width: 200,
    };

    public value: [Date, Date] = this.defaultRangeValue;

    constructor(
        private translateService: TranslateService,
        private pb: PocketBaseService
    ) {
    }

    public onValueChanged(event: any) {
        this.valueChanged(event.value);
    }

    private valueChanged(value: [Date, Date]) {
        const start = this.value[0];
        const end = this.value[1];
        if (start && end) {
            this.getDataInPeriod();
        }
    }

    private async getDataInPeriod() {
        const start = this.value[0];
        const end = this.value[1];
        const invoices: any = await this.pb.invoices.getFullList({
            batch: 9999,
            expand: 'customer,user',
            filter: `date >= "${start.toISOString()}" && date <= "${end.toISOString()}"`,
            sort: '-date'
        });
        const expenses: any = await this.pb.expenses.getFullList({
            batch: 9999,
            expand: 'customer',
            ilter: `date >= "${start.toISOString()}" && date <= "${end.toISOString()}"`,
            sort: '-date'
        });
        const transactions: any = await this.pb.transactions.getFullList({
            batch: 9999,
            expand: 'customer,invoice,expense',
            ilter: `date >= "${start.toISOString()}" && date <= "${end.toISOString()}"`,
            sort: '-date'
        });

        this.invoices = [...invoices];
        this.transactions = [...transactions];
        this.expenses = [...expenses];

        // - per customer invoice
        let customerTotals = this.invoices.reduce((acc: any, invoice: any) => {
            let customerName = invoice.customerData.name;
            if (!acc[customerName]) {
                acc[customerName] = { name: customerName, val: 0 };
            }
            acc[customerName].val += invoice.total;
            return acc;
        }, {});

        // Convert the object to an array
        this.invoicesPerCustomer = Object.values(customerTotals);

        // - per customer invoice
        let customerExpensesTotals = this.expenses.reduce((acc: any, expense: any) => {
            let customerName = expense.expand.customer.name;
            if (!acc[customerName]) {
                acc[customerName] = { name: customerName, val: 0 };
            }
            acc[customerName].val += expense.total;
            return acc;
        }, {});

        // Convert the object to an array
        this.expensesPerCustomer = Object.values(customerExpensesTotals);

        // Calculate the period
        let earliestInvoiceDate = new Date(Math.min(...this.invoices.map((invoice: any) => new Date(invoice.date))));
        let latestInvoiceDate = new Date(Math.max(...this.invoices.map((invoice: any) => new Date(invoice.date))));
        let period = (latestInvoiceDate.getTime() - earliestInvoiceDate.getTime()) / (1000 * 60 * 60 * 24); // in days

        let groupedInvoices;

        if (period <= 31) {
            // Group by day
            groupedInvoices = this.invoices.reduce((acc: any, invoice: any) => {
                let date = new Date(invoice.date).toISOString().split('T')[0]; // get the date part
                if (!acc[date]) {
                    acc[date] = { arg: date, val: 0 };
                }
                acc[date].val += invoice.total;
                return acc;
            }, {});
        } else {
            // Group by month and year
            groupedInvoices = this.invoices.reduce((acc: any, invoice: any) => {
                let date = new Date(invoice.date);
                let monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // get the month and year
                if (!acc[monthYear]) {
                    acc[monthYear] = { arg: monthYear, val: 0 };
                }
                acc[monthYear].val += invoice.total;
                return acc;
            }, {});
        }

        // Convert the object to an array
        this.incomeData = Object.values(groupedInvoices);


    }

    public onPredefinedOptionClick(e: any) {
        const today = new Date();
        let value: [Date, Date] = [new Date(), new Date()];

        switch (e.itemData.value) {
            case DateRangeOptionEnum.ThisYear:
                value = DateRangeHelper.getYearDateRange(today.getFullYear());
                break;
            case DateRangeOptionEnum.LastYear:
                value = DateRangeHelper.getYearDateRange(today.getFullYear() - 1);
                break;
            case DateRangeOptionEnum.ThisMonth:
                value = DateRangeHelper.getCurrentMonthDateRange();
                break;
            case DateRangeOptionEnum.LastMonth:
                value = DateRangeHelper.getLastMonthDateRange();
                break;
            case DateRangeOptionEnum.ThisWeek:
                value = DateRangeHelper.getCurrentWeekDateRange();
                break;
            case DateRangeOptionEnum.LastWeek:
                value = DateRangeHelper.getLastWeekDateRange();
                break;
            case DateRangeOptionEnum.Last7Days:
                value = DateRangeHelper.getLastNDaysRange(7);
                break;
            case DateRangeOptionEnum.Last30Days:
                value = DateRangeHelper.getLastNDaysRange(30);
                break;
            case DateRangeOptionEnum.Last60Days:
                value = DateRangeHelper.getLastNDaysRange(60);
                break;
            case DateRangeOptionEnum.Last90Days:
                value = DateRangeHelper.getLastNDaysRange(90);
                break;
            case DateRangeOptionEnum.FirstQuarter:
                value = DateRangeHelper.getQuarterDateRange(today.getFullYear(), 0)
                break;
            case DateRangeOptionEnum.SecondQuarter:
                value = DateRangeHelper.getQuarterDateRange(today.getFullYear(), 1)
                break;
            case DateRangeOptionEnum.ThirdQuarter:
                value = DateRangeHelper.getQuarterDateRange(today.getFullYear(), 2)
                break;
            case DateRangeOptionEnum.FourthQuarter:
                value = DateRangeHelper.getQuarterDateRange(today.getFullYear(), 3)
                break;
            default:
                value = [new Date(), new Date()];
                break;
        }
        this.value = value;
    }

    ngOnInit(): void {
        const translationKeys = this.dateRangeOptionValues.map((v: any) => {
            return `${DateRangeOptionEnum[v]}`;
        })
        this.translateService.get(translationKeys)
            .pipe(take(1))
            .subscribe(translations => {
                this.dateRangeOptions = this.dateRangeOptionValues.map((v: any) => {
                    return {
                        value: v,
                        text: translations[`${DateRangeOptionEnum[v]}`],
                    }
                });
            });
    }
}

export enum DateRangeOptionEnum {
    ThisYear,
    LastYear,
    ThisMonth,
    LastMonth,
    ThisWeek,
    LastWeek,
    Last7Days,
    Last30Days,
    Last60Days,
    Last90Days,
    FirstQuarter,
    SecondQuarter,
    ThirdQuarter,
    FourthQuarter
}

export class DateRangeHelper {
    private static readonly QUARTER_DURATION = 3;

    public static getLastNDaysRange(days: number): [Date, Date] {
        const today = new Date();

        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - (days - 1));

        return [startDate, endDate];
    }

    public static getQuarterDateRange(year: number, quarter: 0 | 1 | 2 | 3): [Date, Date] {
        const firstMonth = quarter * DateRangeHelper.QUARTER_DURATION;
        const firstDay = new Date(year, firstMonth, 1);
        const lastDay = new Date(
            year,
            firstMonth + DateRangeHelper.QUARTER_DURATION - 1,
            new Date(year, firstMonth + DateRangeHelper.QUARTER_DURATION, 0).getDate()
        );

        return [firstDay, lastDay];
    }

    public static getYearDateRange(year: number): [Date, Date] {
        const firstDay = new Date(year, 0, 1, 0, 0, 0, 0);
        const lastDay = new Date(year, 11, 31, 0, 0, 0, 0);

        return [firstDay, lastDay];
    }

    public static getCurrentMonthDateRange(): [Date, Date] {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0, 0, 0, 0, 0);

        return [firstDay, lastDay];
    }

    public static getLastMonthDateRange(): [Date, Date] {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
        const lastDay = new Date(today.getFullYear(), today.getMonth(), 0, 0, 0, 0, 0);
        firstDay.setMonth(firstDay.getMonth() - 1);

        return [firstDay, lastDay];
    }

    /**
     * Calculates date range for LAST WEEK.
     * Adjust to monday being the start of the week.
     * @returns dateRange: [Date, Date]
    */
    public static getLastWeekDateRange(): [Date, Date] {
        const [startOfWeek, endOfWeek] = this.getCurrentWeekDateRange();
        const startOfLastWeek = new Date(startOfWeek);
        const endOfLastWeek = new Date(endOfWeek);

        startOfLastWeek.setDate(startOfWeek.getDate() - 7);
        endOfLastWeek.setDate(endOfWeek.getDate() - 7);

        return [startOfLastWeek, endOfLastWeek];
    }

    /**
     * Calculates date range for THIS WEEK.
     * Adjusts to monday being the start of the week.
     * @returns dateRange: [Date, Date]
    */
    public static getCurrentWeekDateRange(): [Date, Date] {
        const today = new Date();

        const currentDayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const daysUntilMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

        startOfWeek.setDate(startOfWeek.getDate() - daysUntilMonday);
        endOfWeek.setDate(endOfWeek.getDate() + (6 - daysUntilMonday));

        return [startOfWeek, endOfWeek];
    }
}

