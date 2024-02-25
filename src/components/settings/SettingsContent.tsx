import React, {useState} from 'react'
import TextInput from "@/components/forms/TextInput";
import {useAdminStore} from "@/store/AdminStore";
import Button from "@/components/forms/Button";
import Loader from "@/components/Loader";
import Toast from "@/components/Toast";

const SettingsContent: React.FC = () => {
    const {authenticatedAdmin} = useAdminStore()
    const [formData, setFormData] = useState<{ currentPassword: string, newPassword: string, confirmPassword: string }>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [toastData, setToastData] = useState<{ type: string, description: string }>({
        type: '',
        description: ''
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleChangePassword = () => {
        const {newPassword, confirmPassword} = formData
        if (newPassword !== confirmPassword) {
            setHasError(true)
            return setToastData({
                type: 'error',
                description: 'New password and confirm password mismatch.'
            })
        }

        setToastData({
            type: 'success',
            description: 'Update Successful.'
        })
        return setLoading(false)
    };

    return (
        <>
            <main>

                <div className="divide-y divide-gray-100">
                    <div
                        className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 pb-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-base font-semibold leading-7">Personal Information</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                Use a permanent address where you can receive mail.
                            </p>
                        </div>

                        <form className="md:col-span-2">
                            <div className="flex w-full lg:px-8 px-4 py-t">
                                <div className="flex w-full gap-2">
                                    <TextInput
                                        label="Name"
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder=""
                                        value={authenticatedAdmin?.name}
                                        required={false}
                                        autoComplete="false"
                                        disabled={true}
                                        customClasses="w-full"
                                    />
                                    <TextInput
                                        label="Ghana Card Number"
                                        id="ghanaCardNumber"
                                        name="ghanaCardNumber"
                                        type="text"
                                        placeholder=""
                                        value={authenticatedAdmin?.ghanaCardNumber}
                                        required={false}
                                        autoComplete="false"
                                        disabled={true}
                                        customClasses="w-full"/>
                                </div>
                            </div>

                            <div className="flex lg:px-8 px-4">
                                <div className="flex w-full gap-2">
                                    <TextInput
                                        label="Phone Number"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="Phone Number"
                                        value={authenticatedAdmin?.phoneNumber}
                                        required={true}
                                        autoComplete="false"
                                        disabled={true}
                                        customClasses="w-full"
                                    />
                                    <TextInput
                                        label="Email"
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder=""
                                        value={authenticatedAdmin?.email}
                                        required={false}
                                        autoComplete="false"
                                        disabled={true}
                                        customClasses="w-full"/>
                                </div>
                            </div>

                            <div className="flex lg:px-8 px-4">
                                <div className="flex w-full gap-2">
                                    <TextInput
                                        label="Available Balance"
                                        id="availableBalance"
                                        name="availableBalance"
                                        type="text"
                                        placeholder="Phone Number"
                                        value={authenticatedAdmin?.availableBalance}
                                        required={true}
                                        autoComplete="false"
                                        disabled={true}
                                        customClasses="w-full"
                                    />
                                    <TextInput
                                        label="Actual Balance"
                                        id="actualBalance"
                                        name="actualBalance"
                                        type="text"
                                        placeholder=""
                                        value={authenticatedAdmin?.actualBalance}
                                        required={false}
                                        autoComplete="false"
                                        disabled={true}
                                        customClasses="w-full"/>
                                </div>
                            </div>

                            <div className="flex lg:px-8 px-4">
                                <div className="flex w-full gap-2">
                                    <TextInput
                                        label="Status"
                                        id="status"
                                        name="status"
                                        type="text"
                                        placeholder=""
                                        value={authenticatedAdmin?.status}
                                        required={true}
                                        autoComplete="false"
                                        disabled={true}
                                        customClasses="w-full"
                                    />
                                    <TextInput
                                        label="Date Created"
                                        id="actualBalance"
                                        name="actualBalance"
                                        type="text"
                                        placeholder=""
                                        value={authenticatedAdmin?.createdAt}
                                        required={false}
                                        autoComplete="false"
                                        disabled={true}
                                        customClasses="w-full"/>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div
                        className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                        <div>
                            <h2 className="text-base font-semibold leading-7">Change password</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-400">
                                Update the password associated with your account.
                            </p>
                        </div>

                        <form className="md:col-span-2">
                            <div className="flex lg:px-8 px-4">
                                <div className="flex w-full gap-2">
                                    <TextInput
                                        label="Current Password"
                                        id="currentPassword"
                                        name="currentPassword"
                                        type="password"
                                        placeholder=""
                                        value={formData?.currentPassword}
                                        onInputChange={handleInputChange}
                                        hasError={setHasError}
                                        required={true}
                                        autoComplete="false"
                                        disabled={false}
                                        customClasses="w-full"
                                        passwordIcon
                                    />
                                </div>
                            </div>

                            <div className="flex lg:px-8 px-4">
                                <div className="flex w-full gap-2">
                                    <TextInput
                                        label="New Password"
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        placeholder=""
                                        value={formData?.newPassword}
                                        onInputChange={handleInputChange}
                                        hasError={setHasError}
                                        required={true}
                                        autoComplete="false"
                                        disabled={false}
                                        customClasses="w-full"
                                        passwordIcon
                                    />
                                    <TextInput
                                        label="Confirm Password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder=""
                                        value={formData?.confirmPassword}
                                        onInputChange={handleInputChange}
                                        hasError={setHasError}
                                        required={true}
                                        autoComplete="false"
                                        disabled={false}
                                        customClasses="w-full"
                                        passwordIcon
                                    />
                                </div>
                            </div>

                            <div
                                className="sm:mt-4 sm:flex sm:flex-row-reverse flex lg:px-8 px-4">
                                <Button buttonType="button" styleType="primary" customStyles="p-4 md:p-5 rounded-lg"
                                        onClick={handleChangePassword} disabled={loading || hasError}>
                                    {!loading && <span>Change Password</span>}
                                    {loading && <Loader type="default"
                                                        customClasses="relative"
                                                        customAnimationClasses="w-5 h-5 text-white dark:text-gray-600 fill-purple-900"
                                    />}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {toastData.type && <Toast toastType={toastData.type} toastDescription={toastData.description}/>}
        </>
    )
}

export default SettingsContent
