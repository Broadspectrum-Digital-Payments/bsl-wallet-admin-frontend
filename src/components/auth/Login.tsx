"use client"
import {login} from "@/api/auth";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useTransactionStore} from "@/store/TransactionStore";
import Button from "@/components/forms/Button";
import Link from "next/link";
import CheckboxInput from "@/components/forms/CheckboxInput";
import TextInput from "@/components/forms/TextInput";
import Alert from "@/components/Alert";
import Loader from "@/components/Loader";
import AuthLayout from "@/components/layout/AuthLayout";
import {useAdminStore} from "@/store/AdminStore";
import {useDashboardStore} from "@/store/DashboardStore";
import {capitalizeFirstLetter} from "@/utils/helpers";
import {useLenderStore} from "@/store/LenderStore";

export default function Login() {
    const router = useRouter()
    const [formData, setFormData] = useState({email: '', password: ''})
    const [hasError, setHasError] = useState<boolean | undefined>(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [activeUser, setActiveUser] = useState<string>('admin')
    const {
        authenticatedAdmin,
        setAuthenticatedAdmin,
        setIsAuthenticated,
        resetAdminStore,
    } = useAdminStore()
    const {resetTransactionStore} = useTransactionStore()
    const {mainMenuItemsList, setMainMenuItemsList, setActiveSidebarMenu} = useDashboardStore();
    const {setAuthenticatedLender, resetLenderStore} = useLenderStore();

    useEffect(() => {
        handleUserLogout()
    }, [])

    const handleUserLogout = () => {
        if (authenticatedAdmin?.bearerToken) {
            if (resetTransactionStore) resetTransactionStore()
            if (resetAdminStore) resetAdminStore()
            if (resetLenderStore) resetLenderStore()
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const resolveUserType = () => activeUser === 'admin' ? 'lender' : 'admin'

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (hasError) return;
        setError('')
        setLoading(true)

        login(formData.email, formData.password, activeUser)
            .then(async (response) => {
                const feedback = (await response.json())
                if (response.ok && feedback.success) {
                    const {data} = feedback;

                    if (setIsAuthenticated) setIsAuthenticated(true)
                    if (setActiveSidebarMenu) setActiveSidebarMenu(mainMenuItemsList[0]);

                    const authData = {
                        externalId: data.externalId,
                        email: data.email,
                        name: data.name,
                        status: data.status,
                        bearerToken: data.bearerToken,
                        createdAt: data.createdAt,
                        userType: activeUser === 'lender' ? data.type : data.userType,
                    };

                    if (activeUser === 'lender') {
                        Object.assign(authData, {
                            ghanaCardNumber: data.ghanaCardNumber,
                            phoneNumber: data.phoneNumber,
                            actualBalance: data.actualBalance,
                            availableBalance: data.availableBalance,
                            files: data.files,
                        });
                        if (setAuthenticatedLender) setAuthenticatedLender(authData)
                        if (setMainMenuItemsList) setMainMenuItemsList([
                            {name: 'overview', label: 'Overview', href: '/overview', icon: true, category: 'Dashboard'},
                            {name: 'loans', label: 'Loans', href: '/loans', icon: true, category: 'Core'},
                        ])
                    } else {
                        if (setMainMenuItemsList) setMainMenuItemsList([
                            {name: 'overview', label: 'Overview', href: '/overview', icon: true, category: 'Dashboard'},
                            {name: 'admins', label: 'Admins', href: '/admins', icon: true, category: 'Management'},
                            {name: 'lenders', label: 'Lenders', href: '/lenders', icon: true, category: ''},
                            {name: 'agents', label: 'Agents', href: '/agents', icon: true, category: ''},
                            {name: 'customers', label: 'Customers', href: '/customers', icon: true, category: ''},
                            {name: 'kyc', label: 'KYC', href: '/kyc', icon: true, category: ''},
                            {name: 'loans', label: 'Loans', href: '/loans', icon: true, category: 'Core'},
                            {
                                name: 'transactions',
                                label: 'Transactions',
                                href: '/transactions',
                                icon: true,
                                category: ''
                            },
                            {
                                name: 'reports',
                                label: 'Reports & Analytics',
                                href: 'reports',
                                icon: true,
                                category: 'Other'
                            },
                        ])
                    }


                    if (setAuthenticatedAdmin) setAuthenticatedAdmin(authData)
                    return router.push('/overview')
                }
                setLoading(false)
                return setError(feedback.message)
            })
            .catch((error) => {
                setLoading(false)
                setError(error.message)
            })
    };

    const handleSwitchLogin = () => {
        setError('')
        resolveUserType() === 'lender' ? setActiveUser('lender') : setActiveUser('admin')
    }

    return (
        <AuthLayout title={`${capitalizeFirstLetter(activeUser)} Login`}>
            <form className="space-y-5 mb-5" action="#" method="POST" onSubmit={handleSubmit}>
                {error && <Alert alertType="error" description={error}/>}
                <TextInput
                    label="email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    required={true}
                    value={formData.email}
                    onInputChange={handleInputChange}
                    hasError={setHasError} autoComplete="false"/>
                <TextInput
                    label="password"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    required={true}
                    value={formData.password}
                    onInputChange={handleInputChange}
                    hasError={setHasError} autoComplete="false"/>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <CheckboxInput label="Remember me"/>
                    </div>

                    <div className="text-sm leading-6">
                        <Link href="/auth/forgot-password"
                              className="font-semibold text-md">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-y-2">
                    <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-lg mt-3"
                            buttonType="submit"
                            disabled={loading}>
                        {loading && <Loader type="default" customClasses="relative"
                                            customAnimationClasses="w-5 h-5 text-white dark:text-gray-600 fill-slate-800"/>}
                        {!loading && <span className="flex self-center">Sign in</span>}
                    </Button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Not an {activeUser}?{' '}
                <Link onClick={handleSwitchLogin} href=""
                      className="font-semibold leading-6 text-slate-900 hover:text-slate-500">
                    Login as <span className="capitalize">{resolveUserType()}</span>
                </Link>
            </p>
        </AuthLayout>
    )
}
