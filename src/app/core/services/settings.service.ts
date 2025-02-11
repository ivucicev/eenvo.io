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
import jsPDF from 'jspdf';
import * as excel from 'devextreme-angular/common/export/excel';
import * as pdf from 'devextreme-angular/common/export/pdf';
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';


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
                columns: [
                    {
                        type: 'buttons',
                        fixed: true,
                        fixedPosition: 'right',
                        alignment: 'left',
                        buttons: [
                            {
                                name: 'edit'
                            }, {
                                name: 'delete'
                            }
                        ]
                    }
                ],
                showColumnLines: false,
                showRowLines: true,
                showBorders: false,
                hoverStateEnabled: true,
                rowAlternationEnabled: false,
                columnResizingMode: 'nextColumn',
                columnAutoWidth: true,
                allowColumnReordering: true,
                allowColumnResizing: true,
                wordWrapEnabled: true,
                scrolling: {
                    mode: 'virtual'
                },
                stateStoring: {
                    savingTimeout: 200
                },
                editing: {
                    allowAdding: true,
                    allowDeleting: true,
                    allowUpdating: true,
                    mode: 'popup',
                    form: {
                        labelLocation: 'top',
                        colCount: 1,
                        showColonAfterLabel: false,
                    },
                    popup: {
                        width: '400px',
                        height: 'auto',
                        maxHeight: '80vh',
                        enableBodyScroll: true,
                        showTitle: true,
                        onShowing: function (e) {
                            const popup = e.component;
                            const items: any = e.component.option('toolbarItems');
                            const instance = items[0].editorPopupGridInstance.instance();
                            if (!instance) return;
                            if (items && items.length) {
                                items.forEach((i: any) => {
                                    if (i.options.name == 'save') {
                                        i.options.onClick = instance.saveEditData;
                                    } else if (i.options.name == 'cancel') {
                                        i.options.onClick = instance.cancelEditData;
                                    }
                                })
                                popup.option('toolbarItems', items);
                            }
                        },
                        toolbarItems: [
                            {
                                widget: 'dxButton',
                                location: 'after',
                                toolbar: 'bottom',

                                options: {
                                    text: 'Cancel', ariaLabel: 'Cancel', name: 'cancel', onClick: () => { }
                                }
                            },
                            {
                                widget: 'dxButton',
                                location: 'after',
                                toolbar: 'bottom',
                                options: { text: 'Save', name: 'save', onClick: () => { } }
                            }
                        ]
                    }
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
                groupPanel: {
                    visible: true
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
                        "refresh",
                        "exportButton",
                        "columnChooserButton",
                        "searchPanel",
                    ] as DataGridPredefinedToolbarItem[]
                },
                onInitNewRow: (e: any) => {
                    e.component.option('editing.popup.toolbarItems')[0].editorPopupGridInstance = e.component;
                },
                onEditingStart: (e: any) => {
                    e.component.option('editing.popup.toolbarItems')[0].editorPopupGridInstance = e.component;
                },
                customizeColumns: (columns) => {
                    columns.forEach(c => {
                        switch (c.dataType) {
                            case "date":
                                c.format = DateFormats[this.settings?.dateFormat]?.format || 'dd.MM.yyyy';
                                break;
                            case "datetime":
                                c.format = DateFormats[this.settings?.dateFormat]?.format || 'dd.MM.yyyy';
                                break;
                        }
                    })
                },
                onExporting: (e) => {
                    if (e.format == "pdf") {
                        const doc = new jsPDF();
                        pdf.exportDataGrid({
                            jsPDFDocument: doc,
                            component: e.component,
                            indent: 5,
                        }).then(() => {
                            doc.save(`export_${new Date().toISOString().split('T')[0]}.pdf`);
                        });
                        return;
                    }
                    const workbook = new Workbook();
                    const worksheet = workbook.addWorksheet('Employees');
                    excel.exportDataGrid({
                        component: e.component,
                        worksheet,
                        autoFilterEnabled: true,
                    }).then(() => {
                        workbook.xlsx.writeBuffer().then((buffer) => {
                            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), `export_${new Date().toISOString().split('T')[0]}.xlsx`);
                        });
                    });
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
                        e.component.option('format', ` ${this.settings?.currency || '€'} #,##0.00`);
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
