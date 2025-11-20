'use client';
import ClientListFilter, { ClientListFilterHandle } from '@/app/staff/clients/ClientListFilter';
import FilterComponent from '@/components/shared/FilterComponent';
import { Button } from "@mui/material";
import React from 'react';
// import AssignToStaffForm from '@/components/linguistList/AssignToStaffForm';
// import {
//     copyContactRestrictionMessage,
//     copyContentAllowLessThanLimit
// } from '@/components/linguistList/constant';
// import { handleExportItems } from '@/components/linguistList/helper';
// import LinguistListCopy from '@/components/linguistList/LinguistListCopy';
// import LinguistListFilter from '@/components/linguistList/LinguistListFilters/LinguistListFilter';
// import PopoverButton from '@/components/shared/CustomTable/PopoverButton';
// import FilterComponent from '@/components/shared/Header/FilterComponent';
// import { modalActions } from '@/components/shared/redux/Modals/ModalsState';
// import { getSortingData } from '@/components/shared/utils';
//
// import { linguistAssignToStaffActions } from '@/redux/linguistAssignToStaff/LinguistAssignToStaffState';
// import { linguistListActions } from '@/redux/linguistList/LinguistListState';
// import { RootState } from '@/redux/store';
//
// import styles from '@/styles/LinguistList.module.scss';

const ClientListActions: React.FC<any> = () => {
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
        // <>
        //     {isAllLinguistSelected || selectedLinguists?.length ? (
        //         <>
        //             <Button
        //                 size="large"
        //                 onClick={() => handleATSAction('unassign')}
        //                 icon={<i className={'da da-minus-circle'} />}
        //                 disabled={assignedStaffCountLoader}
        //             >
        //                 Remove Assignee
        //             </Button>
        //             <Button
        //                 size="large"
        //                 onClick={() => handleATSAction('assign')}
        //                 type={'primary'}
        //                 icon={<i className={'da da-configurations'} />}
        //                 disabled={assignedStaffCountLoader}
        //             >
        //                 Assign to
        //             </Button>
        //         </>
        //     ) : (
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
                New Linguist
            </Button>
            {/*)}*/}
        </>
        //     )}
        // </>
    );
};

export default ClientListActions;
