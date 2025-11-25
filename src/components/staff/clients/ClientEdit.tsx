"use client";

import { clientsActions } from '@/redux/clients/ClientsState';
import { RootState } from '@/redux/store';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BusinessIcon from '@mui/icons-material/Business';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Checkbox, Chip, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Paper, Select, Switch, TextField, Typography } from '@mui/material';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SectionHeader from './SectionHeader';

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

    const clientDetails = useSelector((state: RootState) => state.clients.clientDetails);
    const clientLoading = useSelector((state: RootState) => state.clients.clientLoading);

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

    const renderProfileSection = () => {
        const inputFontSize = { fontSize: '12px' };
        const inputSx = {
            ...inputFontSize,
            '& .MuiInputBase-input': inputFontSize,
            '& .MuiInputLabel-root': inputFontSize,
            '& .MuiSelect-select': inputFontSize,
            '& .MuiMenuItem-root': inputFontSize,
            '& .MuiChip-label': inputFontSize,
            '& .MuiFormLabel-root': inputFontSize,
            '& .MuiFormControlLabel-label': inputFontSize,
        };

        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                {/* Fixed Profile Header */}
                <SectionHeader
                    title="Profile"
                    onCancel={handleCancel}
                    onUpdate={handleUpdate}
                />
                {/* Scrollable Content Area */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, }}>
                        {/* Left Column */}
                        <Box>
                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Account Status *</InputLabel>
                                <Select
                                    value={formData.accountStatus}
                                    label="Account Status *"
                                    onChange={(e) => handleFieldChange('accountStatus', e.target.value)}
                                >
                                    <MenuItem value="Suspended">Suspended</MenuItem>
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">Inactive</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Suspension Type *</InputLabel>
                                <Select
                                    value={formData.suspensionType}
                                    label="Suspension Type *"
                                    onChange={(e) => handleFieldChange('suspensionType', e.target.value)}
                                >
                                    <MenuItem value="General">General</MenuItem>
                                    <MenuItem value="Temporary">Temporary</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Name *"
                                value={formData.name}
                                onChange={(e) => handleFieldChange('name', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <TextField
                                fullWidth
                                label="Prefix / Accounts Ref *"
                                value={formData.prefixAccountRef}
                                onChange={(e) => handleFieldChange('prefixAccountRef', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Type *</InputLabel>
                                <Select
                                    value={formData.type}
                                    label="Type *"
                                    onChange={(e) => handleFieldChange('type', e.target.value)}
                                >
                                    <MenuItem value="Prospect">Prospect</MenuItem>
                                    <MenuItem value="Client">Client</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Default Rate (Pence per min) *"
                                value={formData.defaultRate}
                                onChange={(e) => handleFieldChange('defaultRate', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Sector *</InputLabel>
                                <Select
                                    value={formData.sector}
                                    label="Sector *"
                                    onChange={(e) => handleFieldChange('sector', e.target.value)}
                                >
                                    <MenuItem value="Public Sector">Public Sector</MenuItem>
                                    <MenuItem value="Private Sector">Private Sector</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Contract / Purchase Order Number"
                                value={formData.contractPurchaseOrderNumber}
                                onChange={(e) => handleFieldChange('contractPurchaseOrderNumber', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Consortium *</InputLabel>
                                <Select
                                    value={formData.consortium}
                                    label="Consortium *"
                                    onChange={(e) => handleFieldChange('consortium', e.target.value)}
                                >
                                    <MenuItem value="South West Police">South West Police</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>

                            <Box sx={{ mb: 2, ...inputSx }}>
                                <FormLabel component="legend" sx={{ mb: 1, fontSize: '12px', color: 'text.primary' }}>
                                    VRI Configurations
                                </FormLabel>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.vriLiveSupport}
                                            onChange={(e) => handleFieldChange('vriLiveSupport', e.target.checked)}
                                            color="success"
                                        />
                                    }
                                    label="Live support : VRI Live Support"
                                />
                            </Box>
                        </Box>

                        {/* Middle Column */}
                        <Box>
                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Industry *</InputLabel>
                                <Select
                                    value={formData.industry}
                                    label="Industry *"
                                    onChange={(e) => handleFieldChange('industry', e.target.value)}
                                >
                                    <MenuItem value="Central Government (e.g. Digital Cabinet Office, ...)">Central Government (e.g. Digital Cabinet Office, ...)</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Appointment Type Category *</InputLabel>
                                <Select
                                    value={formData.appointmentTypeCategory}
                                    label="Appointment Type Category *"
                                    onChange={(e) => handleFieldChange('appointmentTypeCategory', e.target.value)}
                                >
                                    <MenuItem value="Adhoc">Adhoc</MenuItem>
                                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Available Services *</InputLabel>
                                <Select
                                    multiple
                                    value={formData.availableServices}
                                    label="Available Services *"
                                    onChange={(e) => handleMultiSelectChange('availableServices', e.target.value as string[])}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {(selected as string[]).map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    onDelete={() => handleChipDelete('availableServices', value)}
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    <MenuItem value="Translation / Transcription">Translation / Transcription</MenuItem>
                                    <MenuItem value="Telephone interpreting">Telephone interpreting</MenuItem>
                                    <MenuItem value="Interpreting">Interpreting</MenuItem>
                                    <MenuItem value="Video remote interpreting">Video remote interpreting</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Default Interpreter type *</InputLabel>
                                <Select
                                    value={formData.defaultInterpreterType}
                                    label="Default Interpreter type *"
                                    onChange={(e) => handleFieldChange('defaultInterpreterType', e.target.value)}
                                >
                                    <MenuItem value="Trainee Sign Language Interpreters (TSLI)">Trainee Sign Language Interpreters (TSLI)</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Language Type *</InputLabel>
                                <Select
                                    multiple
                                    value={formData.languageType}
                                    label="Language Type *"
                                    onChange={(e) => handleMultiSelectChange('languageType', e.target.value as string[])}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {(selected as string[]).map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    onDelete={() => handleChipDelete('languageType', value)}
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    <MenuItem value="Sign">Sign</MenuItem>
                                    <MenuItem value="Spoken">Spoken</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Telephone Interpreting Process *</InputLabel>
                                <Select
                                    value={formData.telephoneInterpretingProcess}
                                    label="Telephone Interpreting Process *"
                                    onChange={(e) => handleFieldChange('telephoneInterpretingProcess', e.target.value)}
                                >
                                    <MenuItem value="Automation">Automation</MenuItem>
                                    <MenuItem value="Manual">Manual</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="TI Access Number *"
                                value={formData.tiAccessNumber}
                                onChange={(e) => handleFieldChange('tiAccessNumber', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.onDemandTIOnly}
                                        onChange={(e) => handleFieldChange('onDemandTIOnly', e.target.checked)}
                                    />
                                }
                                label="On Demand TI only"
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <TextField
                                fullWidth
                                label="Client Master Email"
                                value={formData.clientMasterEmail}
                                onChange={(e) => handleFieldChange('clientMasterEmail', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <TextField
                                fullWidth
                                label="Translation / Transcription Service Email *"
                                value={formData.translationTranscriptionServiceEmail}
                                onChange={(e) => handleFieldChange('translationTranscriptionServiceEmail', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />
                        </Box>

                        {/* Right Column */}
                        <Box>
                            <TextField
                                fullWidth
                                label="Spoken Interpreting Service Email *"
                                value={formData.spokenInterpretingServiceEmail}
                                onChange={(e) => handleFieldChange('spokenInterpretingServiceEmail', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <TextField
                                fullWidth
                                label="Non Spoken Interpreting Service Email *"
                                value={formData.nonSpokenInterpretingServiceEmail}
                                onChange={(e) => handleFieldChange('nonSpokenInterpretingServiceEmail', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Provider Sales Manager</InputLabel>
                                <Select
                                    value={formData.providerSalesManager}
                                    label="Provider Sales Manager"
                                    onChange={(e) => handleFieldChange('providerSalesManager', e.target.value)}
                                >
                                    <MenuItem value="Anxxxxxxxx Samxxxx">Anxxxxxxxx Samxxxx</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Provider Account Manager</InputLabel>
                                <Select
                                    value={formData.providerAccountManager}
                                    label="Provider Account Manager"
                                    onChange={(e) => handleFieldChange('providerAccountManager', e.target.value)}
                                >
                                    <MenuItem value="Vixxx Ramxxxx">Vixxx Ramxxxx</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2, ...inputSx }}>
                                <InputLabel>Country</InputLabel>
                                <Select
                                    value={formData.country}
                                    label="Country"
                                    onChange={(e) => handleFieldChange('country', e.target.value)}
                                >
                                    <MenuItem value="India">India</MenuItem>
                                    <MenuItem value="UK">UK</MenuItem>
                                    <MenuItem value="USA">USA</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Postcode"
                                value={formData.postcode}
                                onChange={(e) => handleFieldChange('postcode', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <TextField
                                fullWidth
                                label="Location"
                                value={formData.location}
                                onChange={(e) => handleFieldChange('location', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />

                            <TextField
                                fullWidth
                                label="Main Telephone"
                                value={formData.mainTelephone}
                                onChange={(e) => handleFieldChange('mainTelephone', e.target.value)}
                                sx={{ mb: 2, ...inputSx }}
                            />
                        </Box>
                    </Box>
                    <TextField
                        fullWidth
                        label="Notes"
                        value={formData.notes}
                        onChange={(e) => handleFieldChange('notes', e.target.value)}
                        multiline
                        rows={4}
                        sx={{ ...inputSx }}
                    />
                </Box>
            </Box>
        );
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return renderProfileSection();
            case 'billing-address':
                return <Box sx={{ p: 3 }}><Typography variant="h6">Billing Address</Typography></Box>;
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
                return renderProfileSection();
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
        </Box>
    );
};

export default ClientEdit;

