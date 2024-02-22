"use client"
import {login} from "@/api/auth";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useUserStore} from "@/store/UserStore";
import {useTransactionStore} from "@/store/TransactionStore";
import Button from "@/components/forms/Button";
import Link from "next/link";
import CheckboxInput from "@/components/forms/CheckboxInput";
import TextInput from "@/components/forms/TextInput";
import Alert from "@/components/Alert";
import Loader from "@/components/Loader";
import AuthLayout from "@/components/layout/AuthLayout";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({email: '', password: ''});
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        user,
        setUser,
        setIsAuthenticated,
        resetUserStore,
    } = useUserStore();
    const {resetTransactionStore} = useTransactionStore();

    useEffect(() => {
        handleUserLogout()
    }, [])

    const handleUserLogout = () => {
        if (user?.bearerToken) {
            if (resetTransactionStore) resetTransactionStore()
            if (resetUserStore) resetUserStore()
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (hasError) return;
        setError('')
        setLoading(true)

        login(formData.email, formData.password)
            .then(async (response) => {
                const feedback = (await response.json())
                setLoading(false)
                if (response.ok && feedback.success) {
                    const {data} = feedback;
                    if (setUser) setUser({
                        externalId: data.externalId,
                        email: data.email,
                        name: data.name,
                        bearerToken: data.bearerToken,
                        createdAt: data.createdAt
                    })

                    if (setIsAuthenticated) setIsAuthenticated(true)
                    return router.push('/overview')
                }
                return setError(feedback.message)
            })
            .catch((error) => {
                setLoading(false)
                setError(error.message)
            })
    };

    return (
        <AuthLayout title="Sign in to your account">
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
                                            customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-slate-800"/>}
                        {!loading && <span className="flex self-center">Sign in</span>}
                    </Button>
                </div>
            </form>
        </AuthLayout>
    )
}
