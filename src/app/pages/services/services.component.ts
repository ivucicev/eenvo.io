import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxNumberBoxModule } from 'devextreme-angular';
import { PocketBaseService } from '../../core/services/pocket-base.service';


@Component({
    selector: 'eenvo-services',
    standalone: true,
    imports: [DxDataGridModule, DxNumberBoxModule],
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

    }

    async saved(e: any) {
        if (e.changes[0].type == 'remove') {
            await this.pocketbase.services.delete(e.changes[0].key.id);
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

    onEditorPreparing(e: any) {  
        if(e.dataField === "created" || e.dataField === "updated") {  
            e.editorOptions.disabled = true;  
        }  
    } 

}
