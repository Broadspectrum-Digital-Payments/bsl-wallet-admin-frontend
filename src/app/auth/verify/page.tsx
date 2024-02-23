'use client'
import React, {Suspense} from 'react';
import VerifyAdminContent from "@/components/auth/VerifyAdminContent";
import AuthLayout from "@/components/layout/AuthLayout";

const VerifyPage: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthLayout title="Create Your Password">
                <VerifyAdminContent/>
            </AuthLayout>
        </Suspense>
    )
};

export default VerifyPage;
