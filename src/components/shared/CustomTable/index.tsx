'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
} from '@mui/material';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any, row: T) => React.ReactNode;
  renderCell?: (row: T) => React.ReactNode;
}

export interface CustomTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  page?: number;
  rowsPerPage?: number;
  totalRows?: number;
  onPageChange?: (event: unknown, newPage: number) => void;
  onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rowsPerPageOptions?: number[];
  stickyHeader?: boolean;
  maxHeight?: number | string;
  emptyMessage?: string;
  getRowId?: (row: T) => string | number;
  className?: string;
}

function CustomTable<T extends Record<string, any>>({
  columns,
  rows,
  page = 0,
  rowsPerPage = 10,
  totalRows,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
  stickyHeader = false,
  maxHeight = 'calc(100vh - 170px)',
  emptyMessage = 'No data available',
  getRowId,
  className,
}: CustomTableProps<T>) {
  const displayRows = totalRows !== undefined ? rows : rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const count = totalRows !== undefined ? totalRows : rows.length;

  const getRowKey = (row: T, index: number): string | number => {
    if (getRowId) {
      return getRowId(row);
    }
    return (row as any).id ?? index;
  };

  return (
    <Paper className={className}>
      <TableContainer sx={{ maxHeight: maxHeight }}>
        <Table stickyHeader={stickyHeader} aria-label="custom table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: stickyHeader ? 'background.paper' : undefined,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              displayRows.map((row, index) => (
                <TableRow hover key={getRowKey(row, index)}>
                  {columns.map((column) => {
                    const cellValue = column.id in row ? row[column.id as keyof T] : null;
                    let content: React.ReactNode;

                    if (column.renderCell) {
                      content = column.renderCell(row);
                    } else if (column.format) {
                      content = column.format(cellValue, row);
                    } else {
                      content = cellValue ?? '';
                    }

                    return (
                      <TableCell key={String(column.id)} align={column.align || 'left'}>
                        {content}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {onPageChange && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </Paper>
  );
}

export default CustomTable;

