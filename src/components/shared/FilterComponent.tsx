'use client';
import React, { useRef } from 'react';

import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';

interface FilterComponentProps {
    popOverComponent: React.ReactNode;
    updatePopOverVisibility: (visible?: boolean) => void;
    filtersData?: Record<string, unknown>;
    isFiltersOpen: boolean;
    stylesClassName?: string;
    onResetFilters?: () => void;
    onApplyFilters?: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
    popOverComponent,
    updatePopOverVisibility,
    filtersData = {},
    isFiltersOpen,
    stylesClassName,
    onResetFilters,
    onApplyFilters
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
                PaperProps={{
                    sx: {
                        p: 0,
                        maxWidth: 720
                    }
                }}
            >
                <div className={`flex flex-col ${stylesClassName ?? ''}`}>
                    <div className="p-6 overflow-auto max-h-[70vh]">
                        {popOverComponent}
                    </div>
                    <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-3 gap-3">
                        <Button
                            variant="outlined"
                            onClick={() => onResetFilters?.()}
                        >
                            Reset
                        </Button>
                        <div className="flex gap-2">
                            <Button
                                variant="outlined"
                                onClick={() => updatePopOverVisibility(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    onApplyFilters?.();
                                    updatePopOverVisibility(false);
                                }}
                            >
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            </Popover>

        </>
    );
};

export default FilterComponent;
