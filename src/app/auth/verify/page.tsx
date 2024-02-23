'use client'
import React from 'react';
import VerifyAdminContent from "@/components/auth/VerifyAdminContent";
import AuthLayout from "@/components/layout/AuthLayout";

const VerifyPage: React.FC = () => {
    return <AuthLayout title="Create Your Password">
        <VerifyAdminContent/>
    </AuthLayout>
};

export default VerifyPage;
