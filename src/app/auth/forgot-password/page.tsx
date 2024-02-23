"use client"
import React, {useState} from "react"
import {useRouter} from "next/navigation"
import AuthLayout from "@/components/layout/AuthLayout"
import {getError, isValidEmail} from "@/utils/helpers"
import {sendResetEmailLink} from "@/api/auth"
import Loader from "@/components/Loader"
import Button from "@/components/forms/Button"
import TextInput from "@/components/forms/TextInput"
import Alert from "@/components/Alert";

const PasswordResetPage: React.FC = () => {
    const [hasError, setHasError] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('Forgot Your Password');
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('Enter the email linked to your account and we will send you a recovery link.');
    const [formData, setFormData] = useState({email: '',});
    const router = useRouter()

    const isFormValid = () => ![undefined, null, ''].includes(formData.email?.trim())

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        if (isValidEmail(value)) setHasError(false)
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        if (isFormValid()) {
            setLoading(true)
            sendResetEmailLink(formData.email)
                .then(async (response) => {
                    setLoading(false)
                    if (response) {
                        setTitle('Email has been sent')
                        setDescription('Please check your email inbox for a password recovery link.')
                        setEmailSent(true)
                        return setHasError(false)
                    }
                })
                .catch((error) => {
                    setError(getError(error))
                })
        } else
            return setHasError(true);
    };

    const handleReturnToLogin = () => router.push("/")

    return (
        <AuthLayout title={title} description={description}>
            <form method="POST" onSubmit={handleSubmit}>
                {error && <Alert alertType="error" description={error}/>}

                {!emailSent && <div className="flex mt-6">
                    <TextInput
                        label="email address"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        required={true}
                        value={formData.email}
                        onInputChange={handleInputChange}
                        hasError={setHasError}
                        autoComplete="email"
                        customClasses="w-full"
                        customLabelClasses="flex capitalize"
                    />
                </div>}

                <div className="mt-3 sm:grid-cols-10 relative">
                    {!emailSent && <Button styleType="primary"
                                           customStyles="justify-center p-4 md:p-5 rounded-lg my-4 relative"
                                           buttonType="submit"
                                           disabled={hasError || loading}>
                        {!loading && <span className="flex self-center">Reset Password</span>}
                        {loading && <Loader type="default"
                                            customClasses="relative"
                                            customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-purple-900"
                        />}
                    </Button>}

                    <Button styleType="tertiary"
                            customStyles="justify-center p-4 md:p-5 rounded-lg"
                            buttonType="button"
                            onClick={handleReturnToLogin}
                    >
                        <span className="flex self-center font-semibold">Back to login</span>
                    </Button>
                </div>
            </form>
        </AuthLayout>
    )
}

export default PasswordResetPage