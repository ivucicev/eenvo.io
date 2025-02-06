import { Component, effect, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'eenvo-stats-widget',
  standalone: true,
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

    constructor() {
        effect(() => {
            this.calculateInvoiceStats(this.data())
        });
    }

    calculateInvoiceStats(data: any) {

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Normalize to start of day

        const last31DaysStart = new Date(today);
        last31DaysStart.setDate(today.getDate() - 31);

        const prev32To63DaysStart = new Date(today);
        prev32To63DaysStart.setDate(today.getDate() - 63);

        const prev32To63DaysEnd = new Date(today);
        prev32To63DaysEnd.setDate(today.getDate() - 32);

        let totalLast31 = 0;
        let totalLast31Count = 0;
        let totalPrevPeriod = 0;

        data?.forEach((invoice: any) => {
            const date = new Date(invoice.date);
            const isPaid = invoice.isPayed;
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
            totalChangePrefix: totalPrevPeriod > totalLast31 ? '-' : '+',
            totalLast31Count
        };

    }

}
