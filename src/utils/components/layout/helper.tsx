import ClientsListActions from '@/app/staff/clients/ClientListAction';
import LinguistsListActions from '@/app/staff/linguists/LinguistListAction';
import { ClientEditHeaderTitle } from '@/components/staff/clients/ClientEditHeaderContent';
import {
    basePathNames
} from '@/utils/constants';
import { useDispatch } from 'react-redux';
import { getLinguistById } from '@/utils/linguistData';
// import ClientListActions from "@/components/staff/clients/ClientListActions";
type Dispatch = ReturnType<typeof useDispatch>;
export const getSiteHeaderDetails = (
    pathName: string,
    dispatch: Dispatch,
    params?: Record<any, any>,
    details?: any
) => {
    const {
        linguistHistory: { contentPaths }
    } = basePathNames;
    const paths: string[] = pathName?.split('/') || [];
    if (pathName === '/staff/linguists') {
        return {
            title: 'Linguists',
            children: <LinguistsListActions />
        };
    }
    else if (pathName === '/staff/clients') {
        return {
            title: 'Clients',
            children: <ClientsListActions />
        }
    }
    // Handle client edit route - use LinguistLayout with custom header
    else if (pathName?.startsWith('/staff/clients/') && paths.length === 4) {
        return {
            title: <ClientEditHeaderTitle />,
            children: null
        };
    }

    return {};
};
