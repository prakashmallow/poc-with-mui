'use client';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import "./LinguistLayout.scss";
type HeaderDetails = {
    title?: string | React.ReactNode;
    children?: React.ReactNode;
    breadCrumbItems?: any[];
};

interface LinguistLayoutProps {
    children?: React.ReactNode;
    headerDetails?: HeaderDetails;
}

const LinguistLayout: React.FC<LinguistLayoutProps> = ({
    children,
    headerDetails
}) => {
    const tenantDetails = useSelector(
        (state: RootState) => state.tenant.projectDetails
    );
    const {
        title,
        children: siteHeaderChildren
    }: HeaderDetails = headerDetails || {};
    return (
        <div>
            <div
                style={{
                    backgroundImage: tenantDetails?.header_img_url
                        ? `url(${tenantDetails.header_img_url})`
                        : undefined,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height: 120
                }}
            >
                <div className="flex justify-between items-center px-4 h-full">
                    <div className="flex flex-col">
                        <h2 className="py-1 text-white text-[32px] bressay-font">{title}</h2>
                    </div>
                    <div className="flex gap-2">{siteHeaderChildren}</div>
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default LinguistLayout;
