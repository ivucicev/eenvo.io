import { Component, effect, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CountUpModule } from 'ngx-countup';

@Component({
    selector: 'eenvo-stats-widget',
    imports: [CountUpModule, TranslateModule],
    templateUrl: './stats-widget.component.html',
    styleUrl: './stats-widget.component.scss'
})
export class StatsWidgetComponent {

    public stats: any = {};
    public defaultCurrency = '€';

    public readonly data = input<any>([]);
    public readonly color = input<any>();
    public readonly secondaryColor = input<any>();
    public readonly title = input<any>();
    public readonly name = input<any>();

    public dateRange = input<[Date, Date]>();

    constructor() {
        effect(() => {
            this.calculateInvoiceStats(this.data())
        });
        effect(() => {
            if (this.dateRange())
                this.calculateInvoiceStats(this.data())
        });
    }

    calculateInvoiceStats(data: any) {

        let from, to;
        if (this.dateRange()?.[0])
            from = new Date(this.dateRange()?.[0] ?? new Date());
        if (this.dateRange()?.[1])
            to = new Date(this.dateRange()?.[1] ?? new Date());


        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Normalize to start of day

        if (to) today = to;

        let last31DaysStart = new Date(today);
        last31DaysStart.setDate(today.getDate() - 31);

        if (from) last31DaysStart = from;

        const prev32To63DaysStart = new Date(today);
        prev32To63DaysStart.setDate(today.getDate() - 63);

        const prev32To63DaysEnd = new Date(today);
        prev32To63DaysEnd.setDate(today.getDate() - 32);

        let totalLast31 = 0;
        let totalLast31Count = 0;
        let totalPrevPeriod = 0;

        data?.forEach((invoice: any) => {
            const date = new Date(invoice.date);
            const isPaid = invoice.isPaid;
            const total = invoice.total;

            // Last 31 days
            if (isPaid && date >= last31DaysStart) {
                totalLast31 += total;
                totalLast31Count++;
            }

            if (!isPaid && date >= last31DaysStart) {
                totalLast31 += total;
                totalLast31Count++;
            }

            // Previous 32-63 days period
            if (date >= prev32To63DaysStart && date <= prev32To63DaysEnd && isPaid) {
                totalPrevPeriod += total;
            }

            if (date >= prev32To63DaysStart && date <= prev32To63DaysEnd && isPaid) {
                totalPrevPeriod += total;
            }
        });

        let totalChange = 0;
        if (totalPrevPeriod !== 0) {
            totalChange = ((totalLast31 - totalPrevPeriod) / totalPrevPeriod) * 100;
        }

        this.stats = {
            totalLast31: totalLast31.toFixed(2),
            totalChange: totalChange.toFixed(2),
            totalChangePrefix: totalPrevPeriod > totalLast31 ? '' : '+',
            totalLast31Count
        };

    }

}
