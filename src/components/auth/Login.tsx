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

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({email: '', password: ''});
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [error, setError] = useState<string | null>(null);
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

        login(formData.email, formData.password)
            .then(async (response) => {
                const feedback = (await response.json())
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
                setError(error.message)
            })

        if (setUser) setUser({
            bearerToken: "5|s3fJ0MqpWIj2HqsRPQnAUPkm5s9KzizrE76iCg7k8ac563ea",
            name: "Test Admin User",
            email: "admin@core.com",
            status: "active",
            createdAt: "2024-02-21T15:30:36.000000Z"
        })
        return router.push('/overview')
    };

    return (
        <>
            <div className="bg-slate-900 flex h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">

                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Sign in to your account
                                </h2>
                            </div>
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
                                    <Link href="auth/forgot-password"
                                          className="font-semibold text-md">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-lg"
                                        buttonType="submit"
                                        disabled={hasError}>
                                    <span className="flex self-center">Sign in</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
