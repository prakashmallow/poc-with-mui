'use client';
import React, { useRef } from 'react';

import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';

interface FilterComponentProps {
    popOverComponent: any;
    updatePopOverVisibility: any;
    filtersData?: Record<string, unknown>;
    isFiltersOpen: boolean;
    stylesClassName?: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
                                                             popOverComponent,
                                                             updatePopOverVisibility,
                                                             filtersData = {},
                                                             isFiltersOpen,
                                                             stylesClassName
                                                         }) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const appliedFiltersCount = Object.keys(filtersData).length;

    const buttonElement = (
        <Button
            size="large"
            variant="outlined"
            color="primary"
            className="bg-white"
            ref={buttonRef}
            onClick={() => updatePopOverVisibility()}
            startIcon={<i className="da da-filter-2" />}
            endIcon={<i className="da da-dropdownfilled dropDownIcon" />}
        >
            Filters
        </Button>
    );

    return (
        <>
            {appliedFiltersCount > 0 ? (
                <Badge badgeContent={appliedFiltersCount} color="primary">
                    {buttonElement}
                </Badge>
            ) : (
                buttonElement
            )}

            <Popover
                open={isFiltersOpen}
                onClose={() => updatePopOverVisibility(false)}
                anchorEl={buttonRef.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transitionDuration={200}
            >
                {popOverComponent}
            </Popover>

        </>
    );
};

export default FilterComponent;
