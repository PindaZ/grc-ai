'use client';

import {
    Table,
    TableHeader,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    TableSelectionCell,
    useTableFeatures,
    useTableSelection,
    useTableSort,
    TableColumnDefinition,
    makeStyles,
    tokens,
} from '@fluentui/react-components';
import React from 'react';
import { TableSkeleton } from '../atoms/Skeletons';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
});

export interface DataTableProps<T> {
    columns: TableColumnDefinition<T>[];
    items: T[];
    loading?: boolean;
    onSelectionChange?: (selected: Set<string | number>) => void;
    getRowId: (item: T) => string | number;
}

export function DataTable<T>({ columns, items, loading, onSelectionChange, getRowId }: DataTableProps<T>) {
    const styles = useStyles();

    const {
        getRows,
        selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
        sort: { getSortDirection, toggleColumnSort, sort },
    } = useTableFeatures(
        {
            columns,
            items,
        },
        [
            useTableSelection({
                selectionMode: 'multiselect',
                defaultSelectedItems: new Set(),
                onSelectionChange: (e, data) => onSelectionChange?.(data.selectedItems),
            }),
            useTableSort({
                sortState: { sortDirection: 'ascending', sortColumn: columns[0]?.columnId },
            }),
        ]
    );

    const rows = getRows();

    if (loading) {
        return <TableSkeleton rows={5} />;
    }

    return (
        <div className={styles.root}>
            <Table sortable aria-label="Data table">
                <TableHeader>
                    <TableRow>
                        <TableSelectionCell
                            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
                            onClick={toggleAllRows}
                        />
                        {columns.map((column) => (
                            <TableHeaderCell
                                key={column.columnId}
                                {...(!!column.compare ? {
                                    sortable: true,
                                    sortDirection: getSortDirection(column.columnId),
                                    onClick: (e: React.SyntheticEvent) => toggleColumnSort(e, column.columnId)
                                } : {})}
                            >
                                {column.renderHeaderCell()}
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map(({ item }) => {
                        const rowId = getRowId(item);
                        return (
                            <TableRow
                                key={rowId}
                                aria-selected={isRowSelected(rowId)}
                            >
                                <TableSelectionCell
                                    checked={isRowSelected(rowId)}
                                    onClick={(e) => toggleRow(e, rowId)}
                                />
                                {columns.map((column) => (
                                    <TableCell key={column.columnId}>
                                        {column.renderCell(item)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
