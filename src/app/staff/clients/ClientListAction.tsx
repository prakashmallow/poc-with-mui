'use client';
import ClientListFilter, { ClientListFilterHandle } from '@/app/staff/clients/ClientListFilter';
import FilterComponent from '@/components/shared/FilterComponent';
import { Button } from "@mui/material";
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

const ClientListActions: React.FC<any> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [appliedFilters, setAppliedFilters] = React.useState<Record<string, unknown>>({});
    const filterRef = React.useRef<ClientListFilterHandle>(null);

    const updateFilterVisibility = (visible?: boolean) => {
        setIsFilterOpen(prev => (typeof visible === 'boolean' ? visible : !prev));
    };

    const handleResetFilters = () => {
        filterRef.current?.resetFilters();
        setAppliedFilters({});
    };

    const handleApplyFilters = () => {
        const values = filterRef.current?.getFilters();
        if (values) {
            setAppliedFilters(values);
        }
    };

    return (
        <>
            <Button variant="outlined"
                color="primary"
                size="large"
                className="bg-white">
                Export
            </Button>
            <Button variant="outlined"
                color="primary"
                size="large"
                className="bg-white">
                Import
            </Button>
            <FilterComponent
                popOverComponent={<ClientListFilter ref={filterRef} />}
                updatePopOverVisibility={updateFilterVisibility}
                isFiltersOpen={isFilterOpen}
                filtersData={appliedFilters}
                onResetFilters={handleResetFilters}
                onApplyFilters={handleApplyFilters}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<i className="da da-plus" />}
            >
                New Client
            </Button>
        </>
    );
};

export default ClientListActions;

