import {
    basePathNames,
    linguistPermissionSlugs
} from '@/utils/constants';
import { useDispatch } from 'react-redux';
import LinguistsListActions from '@/app/staff/linguists/LinguistListAction';
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
    return {};
};
