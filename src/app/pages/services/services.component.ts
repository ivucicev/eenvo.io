import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxNumberBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
    selector: 'eenvo-services',
    standalone: true,
    imports: [DxDataGridModule, DxNumberBoxModule, TranslatePipe],
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss'
})
export class ServicesComponent {

    public data: any;

    @ViewChild('grid')
    public grid?: DxDataGridComponent;

    constructor(private pocketbase: PocketBaseService) {
        this.getData();
    }

    async getData() {
        this.data = await this.pocketbase.services.getFullList();
    }

    async newRow(e: any) {
        e.data.unit = '-';
        e.data.quantity = 1;
        e.data.price = 0;
        e.data.discount = 0;
        e.data.tax = 0;
    }

    async saved(e: any) {
        if (e.changes[0]?.type == 'remove') {
            await this.pocketbase.services.delete(e.changes[0].key.id);
            this.data = [...this.data.filter((f : any) => f.id != e.changes[0].key.id)]
        } else {
            const data = e.changes[0].data;
            data.company = this.pocketbase.auth.company;
            if (data.id) {
                await this.pocketbase.services.update(data.id, data);
            } else {
                await this.pocketbase.services.create(data);
            }
        }
    }

    async reload() {
        this.grid?.instance.refresh();
    }

}
