"use client";

import { clientsActions } from '@/redux/clients/ClientsState';
import { RootState } from '@/redux/store';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BusinessIcon from '@mui/icons-material/Business';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Paper, Typography } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BillingAddressImportFileHistorySection from './BillingAddressImportFileHistorySection';
import BillingAddressImportSection from './BillingAddressImportSection';
import BillingAddressModal from './BillingAddressModal';
import BillingAddressSection from './BillingAddressSection';
import ProfileSection from './ProfileSection';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
    { id: 'profile', label: 'Profile', icon: <PersonIcon /> },
    { id: 'billing-address', label: 'Billing Address', icon: <HomeIcon /> },
    { id: 'division', label: 'Division', icon: <BusinessIcon /> },
    { id: 'department', label: 'Department', icon: <AccountTreeIcon /> },
    { id: 'sub-department', label: 'Sub Department', icon: <AccountTreeIcon /> },
    { id: 'sites', label: 'Sites', icon: <BusinessIcon /> },
    { id: 'history', label: 'History', icon: <HistoryIcon /> },
    { id: 'appointment-types', label: 'Appointment Types', icon: <SettingsIcon /> },
    { id: 'configurations', label: 'Configurations', icon: <SettingsIcon /> },
];

const ClientEdit: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const clientId = params?.id as string;
    const activeSection = searchParams.get('section') || 'profile';
    const isImportFromUrl = searchParams.get('import') === 'true';
    const isImportFileHistoryFromUrl = searchParams.get('import-history') === 'true';

    // Sync import mode with URL
    useEffect(() => {
        if (isImportFromUrl && activeSection === 'billing-address') {
            setIsImportMode(true);
            setIsImportFileHistoryMode(false);
        } else if (isImportFileHistoryFromUrl && activeSection === 'billing-address') {
            setIsImportFileHistoryMode(true);
            setIsImportMode(false);
        } else {
            setIsImportMode(false);
            setIsImportFileHistoryMode(false);
        }
    }, [isImportFromUrl, isImportFileHistoryFromUrl, activeSection]);

    const clientDetails = useSelector((state: RootState) => state.clients.clientDetails);
    const clientLoading = useSelector((state: RootState) => state.clients.clientLoading);

    // Billing Address section hooks - must be at top level
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<Record<string, unknown>>({});
    const [isBillingAddressModalOpen, setIsBillingAddressModalOpen] = useState(false);
    const [isImportMode, setIsImportMode] = useState(false);
    const [isImportFileHistoryMode, setIsImportFileHistoryMode] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [importHistoryPage, setImportHistoryPage] = useState(0);
    const [importHistoryRowsPerPage, setImportHistoryRowsPerPage] = useState(25);

    // Sample import file history data - replace with actual data from API/state
    const [importHistoryData] = useState([
        { id: '1', dateTime: '13/11/2025 11:23', fileName: 'billing_address.xlsx', user: 'Gayathri Muralitharan', importStatus: '0/0', fileStatus: 'Completed', hasError: false },
        { id: '2', dateTime: '10/11/2025 04:30', fileName: 'billing_address (7).xlsx', user: 'Hari Prasad A', importStatus: '0/0', fileStatus: 'Completed', hasError: false },
        { id: '3', dateTime: '30/10/2025 04:13', fileName: 'billing_address (6).xlsx', user: 'Ashley Taylor', importStatus: '0/1', fileStatus: 'Completed', hasError: true },
        { id: '4', dateTime: '29/10/2025 13:44', fileName: 'billing_address_19303.xlsx', user: 'Ashley Taylor', importStatus: '1/2', fileStatus: 'Completed', hasError: true },
        { id: '5', dateTime: '17/07/2025 10:49', fileName: 'SubContractor (1).xlsx', user: 'Ashley Taylor', importStatus: '0/1', fileStatus: 'Completed', hasError: true },
        { id: '6', dateTime: '11/07/2025 11:22', fileName: 'billing_address_sample 7.xlsx', user: 'Bhvi mallow', importStatus: '3/8', fileStatus: 'Completed', hasError: true },
    ]);
    const [billingAddressFormData, setBillingAddressFormData] = useState({
        name: '',
        country: '',
        postcode: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
    });

    const [formData, setFormData] = useState({
        accountStatus: 'Suspended',
        suspensionType: 'General',
        name: 'Elijah Suarez',
        prefixAccountRef: 'Incidunt dolores vom',
        type: 'Prospect',
        defaultRate: '21',
        sector: 'Public Sector',
        contractPurchaseOrderNumber: '732',
        consortium: 'South West Police',
        vriLiveSupport: true,
        notes: 'Quisquam ipsum et li kjlknklm',
        industry: 'Central Government (e.g. Digital Cabinet Office, ...)',
        appointmentTypeCategory: 'Adhoc',
        availableServices: ['Translation / Transcription', 'Telephone interpreting', 'Interpreting', 'Video remote interpreting'] as string[],
        defaultInterpreterType: 'Trainee Sign Language Interpreters (TSLI)',
        languageType: ['Sign', 'Spoken'] as string[],
        telephoneInterpretingProcess: 'Automation',
        tiAccessNumber: '67012345688',
        spokenInterpretingServiceEmail: 'tufoqyl@mailinator.com',
        nonSpokenInterpretingServiceEmail: 'fygapolyhy@mailinator.com',
        providerSalesManager: 'Anxxxxxxxx Samxxxx',
        providerAccountManager: 'Vixxx Ramxxxx',
        country: 'India',
        postcode: '638103',
        location: 'Ea vel elit fugiat',
        mainTelephone: '43 42.',
        onDemandTIOnly: false,
        clientMasterEmail: 'culicyhe@mailinator.com',
        translationTranscriptionServiceEmail: 'vukubo@mailinator.com',
    });

    useEffect(() => {
        if (clientId) {
            dispatch(clientsActions.getClient({ id: clientId }));
        }
    }, [clientId, dispatch]);

    useEffect(() => {
        if (clientDetails && Object.keys(clientDetails).length > 0) {
            setFormData(prev => ({
                ...prev,
                accountStatus: clientDetails.accountStatus || prev.accountStatus,
                suspensionType: clientDetails.suspensionType || prev.suspensionType,
                name: clientDetails.name || prev.name,
                prefixAccountRef: clientDetails.prefixAccountRef || prev.prefixAccountRef,
                type: clientDetails.type || prev.type,
                defaultRate: clientDetails.defaultRate || prev.defaultRate,
                sector: clientDetails.sector || prev.sector,
                contractPurchaseOrderNumber: clientDetails.contractPurchaseOrderNumber || prev.contractPurchaseOrderNumber,
                consortium: clientDetails.consortium || prev.consortium,
                vriLiveSupport: clientDetails.vriLiveSupport !== undefined ? clientDetails.vriLiveSupport : prev.vriLiveSupport,
                notes: clientDetails.notes || prev.notes,
                industry: clientDetails.industry || prev.industry,
                appointmentTypeCategory: clientDetails.appointmentTypeCategory || prev.appointmentTypeCategory,
                availableServices: clientDetails.availableServices || prev.availableServices,
                defaultInterpreterType: clientDetails.defaultInterpreterType || prev.defaultInterpreterType,
                languageType: clientDetails.languageType || prev.languageType,
                telephoneInterpretingProcess: clientDetails.telephoneInterpretingProcess || prev.telephoneInterpretingProcess,
                tiAccessNumber: clientDetails.tiAccessNumber || prev.tiAccessNumber,
                spokenInterpretingServiceEmail: clientDetails.spokenInterpretingServiceEmail || prev.spokenInterpretingServiceEmail,
                nonSpokenInterpretingServiceEmail: clientDetails.nonSpokenInterpretingServiceEmail || prev.nonSpokenInterpretingServiceEmail,
                providerSalesManager: clientDetails.providerSalesManager || prev.providerSalesManager,
                providerAccountManager: clientDetails.providerAccountManager || prev.providerAccountManager,
                country: clientDetails.country || prev.country,
                postcode: clientDetails.postcode || prev.postcode,
                location: clientDetails.location || prev.location,
                mainTelephone: clientDetails.mainTelephone || prev.mainTelephone,
                onDemandTIOnly: clientDetails.onDemandTIOnly !== undefined ? clientDetails.onDemandTIOnly : prev.onDemandTIOnly,
                clientMasterEmail: clientDetails.clientMasterEmail || prev.clientMasterEmail,
                translationTranscriptionServiceEmail: clientDetails.translationTranscriptionServiceEmail || prev.translationTranscriptionServiceEmail,
            }));
        }
    }, [clientDetails]);

    const handleSectionChange = (sectionId: string) => {
        router.push(`/staff/clients/${clientId}?section=${sectionId}`);
    };

    const handleCancel = () => {
        router.push('/staff/clients');
    };

    const handleUpdate = () => {
        // TODO: Implement update logic
        console.log('Update client:', formData);
    };

    const handleFieldChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleMultiSelectChange = (field: string, value: string[]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleChipDelete = (field: string, chipToDelete: string) => {
        setFormData(prev => {
            const currentValue = prev[field as keyof typeof prev];
            if (Array.isArray(currentValue)) {
                return {
                    ...prev,
                    [field]: currentValue.filter((item: string) => item !== chipToDelete),
                };
            }
            return prev;
        });
    };


    // Sample billing address data - replace with actual data from API/state
    const [billingAddresses] = useState([
        { id: '1', name: '', address: 'Kirkstall Ln' },
        { id: '2', name: 'alrk Valley Community School', address: '10 Waterloo St, Leeds' },
        { id: '3', name: 'alrk Valley Community School BKD', address: '10 Waterloo St' },
        { id: '4', name: 'Connell Co-op College OCQ', address: '301 Alan Turing Way' },
        { id: '5', name: 'Day Nursery at Bridgend CollegeSEG', address: 'Cowbridge Rd' },
        { id: '6', name: 'Denton Community CollegeWPT', address: '16 Elm Grove, Denton' },
        { id: '7', name: 'East High School', address: '123 Main St' },
        { id: '8', name: 'West Elementary', address: '456 Oak Ave' },
        { id: '9', name: 'North Middle School', address: '789 Pine Rd' },
        { id: '10', name: 'South Academy', address: '321 Elm St' },
        { id: '11', name: 'Central University', address: '654 Maple Dr' },
        { id: '12', name: 'Tech Institute', address: '987 Cedar Ln' },
        { id: '13', name: 'Business College', address: '147 Birch Way' },
        { id: '14', name: 'Arts School', address: '258 Spruce Ave' },
        { id: '15', name: 'Science Academy', address: '369 Willow St' },
        { id: '16', name: 'Language Center', address: '741 Ash Rd' },
        { id: '17', name: 'Music School', address: '852 Poplar Dr' },
        { id: '18', name: 'Sports Academy', address: '963 Hickory Ln' },
        { id: '19', name: 'Medical College', address: '159 Chestnut St' },
        { id: '20', name: 'Law School', address: '357 Walnut Ave' },
        { id: '21', name: 'Engineering Institute', address: '468 Sycamore Rd' },
        { id: '22', name: 'Design College', address: '579 Magnolia Dr' },
    ]);

    const handlePageChange = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleExport = () => {
        console.log('Export billing addresses');
    };

    const handleImport = () => {
        setIsImportMode(true);
        router.push(`/staff/clients/${clientId}?section=billing-address&import=true`);
    };

    const handleBackToBillingAddressList = () => {
        setIsImportMode(false);
        setUploadedFile(null);
        router.push(`/staff/clients/${clientId}?section=billing-address`);
    };

    const handleImportFileHistory = () => {
        setIsImportFileHistoryMode(true);
        router.push(`/staff/clients/${clientId}?section=billing-address&import-history=true`);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDownloadSample = () => {
        console.log('Download sample file');
        // TODO: Implement sample file download
    };

    const handleImportSubmit = () => {
        if (uploadedFile) {
            console.log('Import file:', uploadedFile);
            // TODO: Implement file import logic
        }
    };

    const handleNewBillingAddress = () => {
        setIsBillingAddressModalOpen(true);
    };

    const handleCloseBillingAddressModal = () => {
        setIsBillingAddressModalOpen(false);
        setBillingAddressFormData({
            name: '',
            country: '',
            postcode: '',
            city: '',
            addressLine1: '',
            addressLine2: '',
            addressLine3: '',
        });
    };

    const handleBillingAddressFieldChange = (field: string, value: string) => {
        setBillingAddressFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmitBillingAddress = () => {
        // TODO: Implement submit logic
        console.log('Submit billing address:', billingAddressFormData);
        handleCloseBillingAddressModal();
    };

    const handleEdit = (id: string) => {
        console.log('Edit billing address:', id);
    };

    const updateFilterVisibility = (visible?: boolean) => {
        setIsFilterOpen(prev => (typeof visible === 'boolean' ? visible : !prev));
    };

    const handleResetFilters = () => {
        setAppliedFilters({});
    };

    const handleApplyFilters = () => {
        // Apply filters logic
        updateFilterVisibility(false);
    };



    const handleImportHistoryPageChange = (event: unknown, newPage: number) => {
        setImportHistoryPage(newPage);
    };

    const handleImportHistoryRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setImportHistoryRowsPerPage(parseInt(event.target.value, 10));
        setImportHistoryPage(0);
    };

    const handleBackToBillingAddressListFromHistory = () => {
        setIsImportFileHistoryMode(false);
        router.push(`/staff/clients/${clientId}?section=billing-address`);
    };

    const handleDownloadError = (id: string) => {
        console.log('Download error details for:', id);
        // TODO: Implement error download
    };

    const handleFileNameClick = (fileName: string) => {
        console.log('Download file:', fileName);
        // TODO: Implement file download
    };

    const clientName = clientDetails?.name || formData?.name || 'Elijah Suarez';
    const totalImportHistoryRows = 209; // Total from API

    const renderContent = () => {
        // Show import file history section if in import file history mode and billing address section is active
        if (activeSection === 'billing-address' && isImportFileHistoryMode) {
            return (
                <BillingAddressImportFileHistorySection
                    importHistoryData={importHistoryData}
                    page={importHistoryPage}
                    rowsPerPage={importHistoryRowsPerPage}
                    totalRows={totalImportHistoryRows}
                    onPageChange={handleImportHistoryPageChange}
                    onRowsPerPageChange={handleImportHistoryRowsPerPageChange}
                    onBackToBillingAddressList={handleBackToBillingAddressListFromHistory}
                    onDownloadError={handleDownloadError}
                    onFileNameClick={handleFileNameClick}
                />
            );
        }

        // Show import section if in import mode and billing address section is active
        if (activeSection === 'billing-address' && isImportMode) {
            return (
                <BillingAddressImportSection
                    clientName={clientName}
                    uploadedFile={uploadedFile}
                    onBackToBillingAddressList={handleBackToBillingAddressList}
                    onImportFileHistory={handleImportFileHistory}
                    onFileUpload={handleFileUpload}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDownloadSample={handleDownloadSample}
                    onImportSubmit={handleImportSubmit}
                />
            );
        }

        switch (activeSection) {
            case 'profile':
                return (
                    <ProfileSection
                        formData={formData}
                        onFieldChange={handleFieldChange}
                        onMultiSelectChange={handleMultiSelectChange}
                        onChipDelete={handleChipDelete}
                        onCancel={handleCancel}
                        onUpdate={handleUpdate}
                    />
                );
            case 'billing-address':
                return (
                    <BillingAddressSection
                        billingAddresses={billingAddresses}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        isFilterOpen={isFilterOpen}
                        appliedFilters={appliedFilters}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                        onExport={handleExport}
                        onImport={handleImport}
                        onNewBillingAddress={handleNewBillingAddress}
                        onEdit={handleEdit}
                        updateFilterVisibility={updateFilterVisibility}
                        onResetFilters={handleResetFilters}
                        onApplyFilters={handleApplyFilters}
                    />
                );
            case 'division':
                return <Box sx={{ p: 3 }}><Typography variant="h6">Division</Typography></Box>;
            case 'department':
                return <Box sx={{ p: 3 }}><Typography variant="h6">Department</Typography></Box>;
            case 'sub-department':
                return <Box sx={{ p: 3 }}><Typography variant="h6">Sub Department</Typography></Box>;
            case 'sites':
                return <Box sx={{ p: 3 }}><Typography variant="h6">Sites</Typography></Box>;
            case 'history':
                return <Box sx={{ p: 3 }}><Typography variant="h6">History</Typography></Box>;
            case 'appointment-types':
                return <Box sx={{ p: 3 }}><Typography variant="h6">Appointment Types</Typography></Box>;
            case 'configurations':
                return <Box sx={{ p: 3 }}><Typography variant="h6">Configurations</Typography></Box>;
            default:
                return (
                    <ProfileSection
                        formData={formData}
                        onFieldChange={handleFieldChange}
                        onMultiSelectChange={handleMultiSelectChange}
                        onChipDelete={handleChipDelete}
                        onCancel={handleCancel}
                        onUpdate={handleUpdate}
                    />
                );
        }
    };

    return (
        <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 170px)' }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 250,
                    bgcolor: '#f0efeb',
                    borderRight: '2px solid #e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'auto',
                }}
            >
                {sidebarItems.map((item) => (
                    <Box
                        key={item.id}
                        onClick={() => handleSectionChange(item.id)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            cursor: 'pointer',
                            bgcolor: activeSection === item.id ? '#bec2b9' : 'transparent',
                            '&:hover': {
                                bgcolor: '#bec2b9',
                            },
                        }}
                    >
                        {item.icon}
                        <Typography variant="body2">{item.label}</Typography>
                    </Box>
                ))}
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Paper sx={{ flex: 1, m: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {renderContent()}
                </Paper>
            </Box>

            {/* Billing Address Modal */}
            <BillingAddressModal
                open={isBillingAddressModalOpen}
                formData={billingAddressFormData}
                onClose={handleCloseBillingAddressModal}
                onSubmit={handleSubmitBillingAddress}
                onFieldChange={handleBillingAddressFieldChange}
            />
        </Box>
    );
};

export default ClientEdit;

