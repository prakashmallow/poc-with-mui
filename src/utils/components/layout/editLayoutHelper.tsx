import { getLinguistById } from '@/utils/linguistData';

type HeaderDetails = {
    title?: string | React.ReactNode;
    children?: React.ReactNode;
    breadCrumbItems?: any[];
};

export const getEditLayoutHeaderDetails = (
    pathName: string
): HeaderDetails | null => {
    const paths: string[] = pathName?.split('/') || [];
    
    // Check if this is an edit page: /staff/linguists/[id]/basic-information, etc.
    if (pathName?.startsWith('/staff/linguists/') && paths.length >= 5) {
        const linguistId = paths[3];
        const linguist = getLinguistById(linguistId);
        if (linguist) {
            return {
                title: `${linguist.name} / ${linguist.ref}`,
                children: null
            };
        }
        return {
            title: 'Linguist Edit',
            children: null
        };
    }
    
    return null;
};

export const isEditPage = (pathName: string): boolean => {
    const paths: string[] = pathName?.split('/') || [];
    return pathName?.startsWith('/staff/linguists/') && paths.length >= 5;
};

