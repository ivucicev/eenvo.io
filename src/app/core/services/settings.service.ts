import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PocketBaseService } from './pocket-base.service';
import DataGrid, { DataGridPredefinedToolbarItem, Properties } from "devextreme/ui/data_grid";
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DateFormats } from '../models/date-formats';
import dxNumberBox from 'devextreme/ui/number_box';
import { DxNumberBoxTypes } from 'devextreme-angular/ui/number-box';
import { locale } from 'devextreme/localization';

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
                        "addRowButton",
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
        if (this.settings?.numberFormat != 'comma') {
            locale("us");
        } else {
            locale("de");
        }
        dxNumberBox.defaultOptions<DxNumberBoxTypes.Properties>({
            options: {
                useLargeSpinButtons: false,
                showSpinButtons: true,
                rtlEnabled: true,
                step: 1,
                format: `#,##0.00`,
                min: 0,
                onInitialized: (e) => {
                    const element = e.element;
                    const isCurrency = !!(element?.dataset['currency']);
                    const isUnit = !!(element?.dataset['unit']);
                    if (e.component?.option('format')?.toString()?.includes('%')) {
                        e.component.resetOption('max');
                        e.component.option('max', 1);
                    }
                    if (!e.component?.instance()) return
                    if (isCurrency && e.component?.instance()) {
                        e.component.resetOption('format');
                        e.component.option('format', ` ${this.settings.currency} #,##0.00`);
                    }
                    if (isUnit && e.component?.instance()) {
                        let unit = element?.dataset['unit'];
                        unit = unit?.padEnd(3, ' ');
                        unit = unit?.slice(0, 3);
                        e.component.resetOption('format');
                        e.component.option('format', ` ${unit} #,##0.00`);
                    }
                },
                onValueChanged: (e) => {
                    if (e && e.value) {
                        if (e.component.option('format')?.toString()?.includes('%')) return;
                        const magnitude = Math.pow(10, Math.floor(Math.log10(e.value)) - 1);
                        const step = Math.max(magnitude, 1);
                        e.component.resetOption('step');
                        e.component.option('step', step);
                    }
                }
            }
        })
    }

}
