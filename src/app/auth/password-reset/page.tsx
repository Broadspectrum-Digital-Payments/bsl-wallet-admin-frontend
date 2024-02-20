"use client"
import React from "react";
import {useRouter} from "next/navigation"

const PasswordResetPage: React.FC = () => {
    const router = useRouter()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        return router.push('/overview')
    }
    return (
        <>
            <div className="flex min-h-screen flex-1 bg-white">
                password-reset works
            </div>
        </>
    )
}

export default PasswordResetPage