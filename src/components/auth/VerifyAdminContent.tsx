import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {resetPassword} from "@/api/auth";
import {getError} from "@/utils/helpers";
import {useAdminStore} from "@/store/AdminStore";
import {useDashboardStore} from "@/store/DashboardStore";
import CreatePassword from "@/components/auth/CreatePassword";
import Alert from "@/components/Alert";

const VerifyAdminContent: React.FC = () => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {
        setIsAuthenticated,
        setAuthenticatedAdmin,
        setFirstTimeLogin,
    } = useAdminStore();
    const {mainMenuItemsList, setActiveSidebarMenu} = useDashboardStore();

    const token = useSearchParams().get('token')

    const handleEmailLinkVerification = (password: string) => {
        if (setLoading) setLoading(true);
        resetPassword(token, password)
            .then(async (response) => {
                const feedback = await response.json()
                if (setLoading) setLoading(false);

                if (response.ok && feedback.success) {
                    const {data} = feedback
                    if (setAuthenticatedAdmin) setAuthenticatedAdmin({
                        externalId: data.externalId,
                        email: data.email,
                        name: data.name,
                        status: data.status,
                        userType: data.userType,
                        bearerToken: data.bearerToken,
                        createdAt: data.createdAt
                    })

                    if (setIsAuthenticated) setIsAuthenticated(true)
                    if (setFirstTimeLogin) setFirstTimeLogin(true)
                    if (setActiveSidebarMenu) setActiveSidebarMenu(mainMenuItemsList[0]);
                    return router.push('/overview')
                } else
                    return setError(getError(feedback))
            })
            .catch((error) => {
                setLoading(false)
                setError(error.message)
            })
    }

    const handleError = (error: string) => setError(error)

    return (
        <>
            {error && <Alert alertType="error" description={error} customClasses="mb-6"/>}
            <CreatePassword handleError={handleError} handleSubmit={handleEmailLinkVerification} loading={loading}/>
        </>
    );
}

export default VerifyAdminContent;