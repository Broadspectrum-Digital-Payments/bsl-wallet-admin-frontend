"use client"
import React from 'react'
import {IDashboardLayout} from "@/utils/interfaces/IDashboardLayout";
import {IAuthLayout} from "@/utils/interfaces/IAuthLayout";

const AuthLayout: React.FC<IAuthLayout> = ({children, title, description}) => {
    return (
        <div className="bg-slate-900 flex h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="my-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5">
                        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            {title}
                        </h2>
                        <p className="text-center py-2">{description}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout