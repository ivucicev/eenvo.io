import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { PocketBaseService } from '../../../core/services/pocket-base.service';
import { StatsWidgetComponent } from '../../../core/componate/stats-widget/stats-widget.component';

import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';


@Component({
    selector: 'eenvo-dashboard',
    imports: [
    StatsWidgetComponent,
    FormsModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    ChartModule,
    TranslateModule
],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

    public invoices: any = [];
    public transactions: any = [];
    public expenses: any = [];

    public invoicesPerCustomer: any = [];
    public invoicesPerCategory: any = [];
    public expensesPerCustomer: any = [];
    public expensesPerCategory: any = [];
    public incomeData: any = [];
    public revenueExpenseData: any = [];
    public unpaidInvoices: any = [];
    public cashflowData: any = [];
    public netIncome: any = [];
    public inflow: any = [];

    public revenueExpenseChartData: any = {};
    public revenueExpenseChartOptions: any = {};
    public incomeChartData: any = {};
    public incomeChartOptions: any = {};
    public incomePerCustomerChartData: any = {};
    public expensesPerCustomerChartData: any = {};
    public incomePerCategoryChartData: any = {};
    public expensesPerCategoryChartData: any = {};
    public doughnutChartOptions: any = {};

    private defaultRangeValue: [Date, Date] = [new Date(), new Date()];
    private dateRangeOptionValues = Object.values(DateRangeOptionEnum).filter((v) => !isNaN(Number(v)));
    private chartPalette = ['#0EA5E9', '#22C55E', '#F97316', '#6366F1', '#F43F5E', '#14B8A6', '#8B5CF6', '#F59E0B', '#10B981', '#3B82F6'];

    public dateRangeOptions: { value: DateRangeOptionEnum; text: string }[] = [];

    public selectedPreset?: DateRangeOptionEnum;
    public value: [Date, Date] = this.defaultRangeValue;

    constructor(
        private translateService: TranslateService,
        private pb: PocketBaseService
    ) {
        const initialRange = DateRangeHelper.getYearDateRange(new Date().getFullYear());
        this.selectedPreset = DateRangeOptionEnum.ThisYear;
        this.setDateRange(initialRange);
    }

    public onPresetChange(preset: DateRangeOptionEnum) {
        if (preset === undefined || preset === null) {
            return;
        }
        this.selectedPreset = preset;
        this.onPredefinedOptionClick({ itemData: { value: preset } });
    }

    public onStartDateChange(target: any) {
        const value = target.value;
        const start = this.parseDate(value);
        if (!start) return;
        const end = this.value[1] ?? start;
        this.setDateRange(this.normalizeRange(start, end));
        this.selectedPreset = undefined;
    }

    public onEndDateChange(target: any) {
        const value = target.value;
        const end = this.parseDate(value);
        if (!end) return;
        const start = this.value[0] ?? end;
        this.setDateRange(this.normalizeRange(start, end));
        this.selectedPreset = undefined;
    }

    public async getDataInPeriod() {
        const [start, end] = this.value;
        if (!start || !end) {
            return;
        }
        const invoices: any = await this.pb.invoices.getFullList({
            batch: 9999,
            expand: 'customer,user',
            filter: `date >= "${start.toISOString()}" && date <= "${end.toISOString()}" && isPO != true && isQuote != true`,
            sort: 'date'
        });
        const expenses: any = await this.pb.expenses.getFullList({
            batch: 9999,
            expand: 'customer,category',
            filter: `date >= "${start.toISOString()}" && date <= "${end.toISOString()}"`,
            sort: 'date'
        });
        const transactions: any = await this.pb.transactions.getFullList({
            batch: 9999,
            expand: 'customer,invoice,expense,category',
            filter: `date >= "${start.toISOString()}" && date <= "${end.toISOString()}"`,
            sort: 'date'
        });

        this.invoices = [...invoices];
        this.transactions = [...transactions];
        this.expenses = [...expenses];

        // - per customer invoice
        let customerTotals = this.invoices.reduce((acc: any, invoice: any) => {
            let customerName = invoice.customerData?.name ?? invoice.expand?.customer?.name ?? '-';
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
            let customerName = expense.expand?.customer?.name ?? '-';
            if (!acc[customerName]) {
                acc[customerName] = { name: customerName, val: 0 };
            }
            acc[customerName].val += expense.total;
            return acc;
        }, {});

        // Convert the object to an array
        this.expensesPerCustomer = Object.values(customerExpensesTotals);

        if (this.invoices.length === 0) {
            this.incomeData = [];
        } else {
            let earliestInvoiceDate = new Date(Math.min(...this.invoices.map((invoice: any) => new Date(invoice.date).getTime())));
            let latestInvoiceDate = new Date(Math.max(...this.invoices.map((invoice: any) => new Date(invoice.date).getTime())));
            let period = (latestInvoiceDate.getTime() - earliestInvoiceDate.getTime()) / (1000 * 60 * 60 * 24); // in days

            let groupedInvoices;

            if (period <= 31) {
                groupedInvoices = this.invoices.reduce((acc: any, invoice: any) => {
                    let date = new Date(invoice.date).toISOString().split('T')[0];
                    if (!acc[date]) {
                        acc[date] = { arg: date, val: 0 };
                    }
                    acc[date].val += invoice.total;
                    return acc;
                }, {});
            } else {
                groupedInvoices = this.invoices.reduce((acc: any, invoice: any) => {
                    let date = new Date(invoice.date);
                    let monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
                    if (!acc[monthYear]) {
                        acc[monthYear] = { arg: monthYear, val: 0 };
                    }
                    acc[monthYear].val += invoice.total;
                    return acc;
                }, {});
            }

            this.incomeData = Object.values(groupedInvoices).map((entry: any) => ({
                period: entry.arg,
                value: entry.val
            }));
        }

        const invoiceTimes = this.invoices.map((invoice: any) => new Date(invoice.date).getTime()).filter((time: any) => !isNaN(time));
        const expenseTimes = this.expenses.map((expense: any) => new Date(expense.date).getTime()).filter((time: any) => !isNaN(time));
        const allTimes = [...invoiceTimes, ...expenseTimes];

        const periodInDays = allTimes.length > 1
            ? (Math.max(...allTimes) - Math.min(...allTimes)) / (1000 * 60 * 60 * 24)
            : 0;

        const useDailyGrouping = periodInDays <= 31;
        const revenueData = useDailyGrouping ? this.groupByDay(this.invoices) : this.groupByMonthYear(this.invoices);
        const expenseData = useDailyGrouping ? this.groupByDay(this.expenses) : this.groupByMonthYear(this.expenses);

        const periodKeys = new Set<string>([
            ...Object.keys(revenueData),
            ...Object.keys(expenseData)
        ]);

        this.revenueExpenseData = Array.from(periodKeys).map(period => ({
            period,
            income: revenueData[period]?.value || 0,
            expense: expenseData[period]?.value || 0
        }));

        this.unpaidInvoices = [...this.invoices.filter((d: any) => !d.isPaid)];
        this.cashflowData = [...this.transactions];
        // this.expenses = [...this.allData.filter((s: any) => s.type == 'out')];
        this.inflow = [...this.transactions.filter((s: any) => s.type == 'in')];
        this.netIncome = [...this.transactions.map((s: any) => {
            return {
                ...s,
                total: s.type == 'in' ? s.total : -1 * s.total
            }
        })];

        // - per category invoice
        let expensesPerCategory = this.expenses.reduce((acc: any, expense: any) => {
            let categories = expense.expand?.category;
            if (!categories || categories.length == 0) {
                if (!acc['-']) {
                    acc['-'] = { name: '-', val: 0 };
                }
                acc['-'].val += expense.total;
            } else
                categories.forEach((category: any) => {
                    if (!acc[category.name]) {
                        acc[category.name] = { name: category.name, val: 0 };
                    }
                    acc[category.name].val += expense.total;
                })
            return acc;
        }, {});

        // Convert the object to an array
        this.expensesPerCategory = Object.values(expensesPerCategory);

                // - per category invoice
        let invoicesPerCategory = this.transactions.filter((t: any) => t.type == 'in').reduce((acc: any, transaction: any) => {
            let categories = transaction.expand?.category;
            if (!categories || categories.length == 0) {
                if (!acc['-']) {
                    acc['-'] = { name: '-', val: 0 };
                }
                acc['-'].val += transaction.total;
            } else
                categories.forEach((category: any) => {
                    if (!acc[category.name]) {
                        acc[category.name] = { name: category.name, val: 0 };
                    }
                    acc[category.name].val += transaction.total;
                })
            return acc;
        }, {});

        // Convert the object to an array
        this.invoicesPerCategory = Object.values(invoicesPerCategory);

        this.buildCharts();
    }

    private setDateRange(range: [Date, Date]) {
        const start = new Date(range[0]);
        const end = new Date(range[1]);
        this.value = this.normalizeRange(start, end);
        this.getDataInPeriod();
    }

    private parseDate(value: string): Date | null {
        if (!value) return null;
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
    }

    private normalizeRange(start: Date, end: Date): [Date, Date] {
        if (start.getTime() > end.getTime()) {
            return [end, start];
        }
        return [start, end];
    }

    public formatDate(value: Date | null | undefined): string {
        if (!value) {
            return '';
        }
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private buildCharts() {
        const incomeLabel = this.translateService.instant('Income');
        const expensesLabel = this.translateService.instant('Expenses');
        const amountLabel = this.translateService.instant('Amount');

        const revenueLabels = this.revenueExpenseData.map((item: any) => item.period);
        this.revenueExpenseChartData = {
            labels: revenueLabels,
            datasets: [
                {
                    label: incomeLabel,
                    data: this.revenueExpenseData.map((item: any) => item.income),
                    borderColor: '#22C55E',
                    backgroundColor: 'rgba(34,197,94,0.15)',
                    tension: 0.4,
                    fill: false
                },
                {
                    label: expensesLabel,
                    data: this.revenueExpenseData.map((item: any) => item.expense),
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239,68,68,0.15)',
                    tension: 0.4,
                    fill: false
                }
            ]
        };

        this.revenueExpenseChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#334155'
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#64748B' },
                    grid: { color: '#E2E8F0' }
                },
                y: {
                    ticks: { color: '#64748B' },
                    grid: { color: '#E2E8F0' }
                }
            }
        };

        const incomeLabels = this.incomeData.map((item: any) => item.period);
        this.incomeChartData = {
            labels: incomeLabels,
            datasets: [
                {
                    label: amountLabel,
                    data: this.incomeData.map((item: any) => item.value),
                    backgroundColor: '#6366F1',
                    borderColor: '#4F46E5',
                    borderRadius: 6
                }
            ]
        };

        this.incomeChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: '#64748B' },
                    grid: { display: false }
                },
                y: {
                    ticks: { color: '#64748B' },
                    grid: { color: '#E2E8F0' }
                }
            }
        };

        this.incomePerCustomerChartData = {
            labels: this.invoicesPerCustomer.map((item: any) => item.name),
            datasets: [
                {
                    data: this.invoicesPerCustomer.map((item: any) => item.val),
                    backgroundColor: this.buildColors(this.invoicesPerCustomer.length),
                    hoverBackgroundColor: this.buildColors(this.invoicesPerCustomer.length)
                }
            ]
        };

        this.expensesPerCustomerChartData = {
            labels: this.expensesPerCustomer.map((item: any) => item.name),
            datasets: [
                {
                    data: this.expensesPerCustomer.map((item: any) => item.val),
                    backgroundColor: this.buildColors(this.expensesPerCustomer.length),
                    hoverBackgroundColor: this.buildColors(this.expensesPerCustomer.length)
                }
            ]
        };

        this.incomePerCategoryChartData = {
            labels: this.invoicesPerCategory.map((item: any) => item.name),
            datasets: [
                {
                    data: this.invoicesPerCategory.map((item: any) => item.val),
                    backgroundColor: this.buildColors(this.invoicesPerCategory.length),
                    hoverBackgroundColor: this.buildColors(this.invoicesPerCategory.length)
                }
            ]
        };

        this.expensesPerCategoryChartData = {
            labels: this.expensesPerCategory.map((item: any) => item.name),
            datasets: [
                {
                    data: this.expensesPerCategory.map((item: any) => item.val),
                    backgroundColor: this.buildColors(this.expensesPerCategory.length),
                    hoverBackgroundColor: this.buildColors(this.expensesPerCategory.length)
                }
            ]
        };

        this.doughnutChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#334155'
                    }
                }
            }
        };
    }

    private buildColors(count: number): string[] {
        if (count <= 0) {
            return [];
        }
        return Array.from({ length: count }, (_, idx) => this.chartPalette[idx % this.chartPalette.length]);
    }

    groupByDay(data: any[]) {
        return data.reduce((acc, item) => {
            let date = new Date(item.date).toISOString().split('T')[0]; // get the date part
            if (!acc[date]) {
                acc[date] = { date: date, value: 0 };
            }
            acc[date].value += item.total;
            return acc;
        }, {});
    }

    groupByMonthYear(data: any[]) {
        return data.reduce((acc, item) => {
            let date = new Date(item.date);
            let monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`; // get the month and year
            if (!acc[monthYear]) {
                acc[monthYear] = { monthYear: monthYear, value: 0 };
            }
            acc[monthYear].value += item.total;
            return acc;
        }, {});
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
        this.selectedPreset = e.itemData.value;
        this.setDateRange(value);
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
