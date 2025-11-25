'use client';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import React from 'react';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: any, row: T) => React.ReactNode;
  renderCell?: (row: T) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  pinned?: 'left' | 'right';
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc';
  onSort?: () => void;
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

  // Separate columns by pinning position
  const leftPinnedColumns = columns.filter(col => col.pinned === 'left');
  const rightPinnedColumns = columns.filter(col => col.pinned === 'right');
  const unpinnedColumns = columns.filter(col => !col.pinned);

  // Calculate left offset for left-pinned columns
  const calculateLeftOffset = (columnIndex: number) => {
    let offset = 0;
    for (let i = 0; i < columnIndex; i++) {
      offset += leftPinnedColumns[i]?.minWidth || 150;
    }
    return offset;
  };

  // Calculate right offset for right-pinned columns
  const calculateRightOffset = (columnIndex: number) => {
    let offset = 0;
    for (let i = columnIndex + 1; i < rightPinnedColumns.length; i++) {
      offset += rightPinnedColumns[i]?.minWidth || 150;
    }
    return offset;
  };

  const renderCell = (column: Column<T>, row: T, isHeader = false) => {
    const isLeftPinned = column.pinned === 'left';
    const isRightPinned = column.pinned === 'right';
    const columnIndex = isLeftPinned
      ? leftPinnedColumns.indexOf(column)
      : isRightPinned
        ? rightPinnedColumns.indexOf(column)
        : -1;

    const stickyStyles: React.CSSProperties = {};
    if (isLeftPinned) {
      stickyStyles.position = 'sticky';
      stickyStyles.left = calculateLeftOffset(columnIndex);
      stickyStyles.zIndex = isHeader ? 3 : 2;
    } else if (isRightPinned) {
      stickyStyles.position = 'sticky';
      stickyStyles.right = calculateRightOffset(columnIndex);
      stickyStyles.zIndex = isHeader ? 3 : 2;
    }

    if (isHeader) {
      return (
        <TableCell
          key={String(column.id)}
          align={column.align || 'left'}
          style={{
            minWidth: column.minWidth,
            ...stickyStyles,
          }}
          sx={{
            fontWeight: 600,
            backgroundColor: stickyHeader || isLeftPinned || isRightPinned ? 'background.paper' : undefined,
            ...((isLeftPinned || isRightPinned) && {
              boxShadow: isLeftPinned
                ? '2px 0 4px rgba(0,0,0,0.1)'
                : '-2px 0 4px rgba(0,0,0,0.1)',
            }),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {column.renderHeader ? column.renderHeader() : column.label}
            {column.sortable && (
              <Box
                component="span"
                onClick={column.onSort}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '10px',
                  opacity: column.sortDirection ? 1 : 0.3,
                  '&:hover': { opacity: 1 },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    lineHeight: 0.7,
                    color: column.sortDirection === 'asc' ? 'primary.main' : 'inherit',
                  }}
                >
                  ▲
                </Box>
                <Box
                  component="span"
                  sx={{
                    lineHeight: 0.7,
                    color: column.sortDirection === 'desc' ? 'primary.main' : 'inherit',
                  }}
                >
                  ▼
                </Box>
              </Box>
            )}
          </Box>
        </TableCell>
      );
    }

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
      <TableCell
        key={String(column.id)}
        align={column.align || 'left'}
        style={stickyStyles}
        sx={{
          backgroundColor: (isLeftPinned || isRightPinned) ? 'background.paper' : undefined,
          ...((isLeftPinned || isRightPinned) && {
            boxShadow: isLeftPinned
              ? '2px 0 4px rgba(0,0,0,0.1)'
              : '-2px 0 4px rgba(0,0,0,0.1)',
          }),
        }}
      >
        {content}
      </TableCell>
    );
  };

  const allColumns = [...leftPinnedColumns, ...unpinnedColumns, ...rightPinnedColumns];

  return (
    <Paper className={className}>
      <TableContainer sx={{ maxHeight: maxHeight, overflowX: 'auto' }}>
        <Table stickyHeader={stickyHeader} aria-label="custom table">
          <TableHead>
            <TableRow>
              {allColumns.map((column) => renderCell(column, {} as T, true))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={allColumns.length} align="center" sx={{ py: 4 }}>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              displayRows.map((row, index) => (
                <TableRow hover key={getRowKey(row, index)}>
                  {allColumns.map((column) => renderCell(column, row, false))}
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

