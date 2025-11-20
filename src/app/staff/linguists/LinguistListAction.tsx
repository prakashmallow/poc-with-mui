'use client';
import React from 'react';
import { Button, CardContent, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import FilterComponent from '@/components/shared/FilterComponent';
import LinguistListFilter from '@/app/staff/linguists/LinguistListFilter';
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
import {basePathNames} from '@/utils/constants';

//
// import { linguistAssignToStaffActions } from '@/redux/linguistAssignToStaff/LinguistAssignToStaffState';
// import { linguistListActions } from '@/redux/linguistList/LinguistListState';
// import { RootState } from '@/redux/store';
//
// import styles from '@/styles/LinguistList.module.scss';

const LinguistsListActions: React.FC<any> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
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
                        popOverComponent={<LinguistListFilter />}
                        updatePopOverVisibility={()=>setIsFilterOpen(!isFilterOpen)}
                        isFiltersOpen={isFilterOpen}
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

export default LinguistsListActions;
