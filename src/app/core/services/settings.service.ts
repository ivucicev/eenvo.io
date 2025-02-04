import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PocketBaseService } from './pocket-base.service';
import DataGrid, { DataGridPredefinedToolbarItem, Properties } from "devextreme/ui/data_grid";
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DateFormats } from '../models/date-formats';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    public settings: any = null;

    constructor(private pb: PocketBaseService, private activatedRoute: ActivatedRoute) {
       this.setDxOptions()
    }

    public reinit() {
        this.setDxOptions();
    }

    setDxOptions() {
        DataGrid.defaultOptions<DxDataGridTypes.Properties>({
            options: {
                showColumnLines: false,
                showRowLines: true,
                showBorders: false,
                hoverStateEnabled: true,
                rowAlternationEnabled: false,
                columnResizingMode: 'widget',
                columnAutoWidth: true,
                allowColumnReordering: true,
                allowColumnResizing: true,
                wordWrapEnabled: true,
                stateStoring: {
                    savingTimeout: 200
                },
                headerFilter: {
                    visible: true,
                    search: { enabled: true }
                },
                selection: {
                    mode: 'single'
                },
                paging: {
                    enabled: true,
                    pageSize: 20
                },
                sorting: {
                    mode: 'multiple'
                },
                remoteOperations: {
                    filtering: false,
                    sorting: false,
                    grouping: false,
                    groupPaging: false,
                    paging: false
                },
                pager: {
                    visible: true,
                    allowedPageSizes: [20, 50, 100],
                    showPageSizeSelector: true,
                    showInfo: true,
                    showNavigationButtons: true
                },
                searchPanel: {
                    visible: true,
                    width: 200
                },
                columnChooser: {
                    enabled: true,
                    mode: 'select'
                },
                toolbar: {
                    visible: true,
                    items: [
                        "columnChooserButton",
                        "searchPanel"
                    ] as DataGridPredefinedToolbarItem[]
                },
                customizeColumns: (columns) => {
                    columns.forEach(c => {
                        switch (c.dataType) {
                            case "date":
                                c.format = DateFormats[this.settings.dateFormat].display;
                                break;
                            case "datetime":
                                c.format = DateFormats[this.settings.dateFormat].display;
                                break;
                        }
                    })
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false,
                    formats: ['pdf', 'xlsx']
                }
            }
        });
    }

}
