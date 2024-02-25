import React, {useState} from 'react'
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import DragAndDrop from "@/components/forms/DragAndDrop";
import {storeLender} from "@/api/lenders";
import {useLenderStore} from "@/store/LenderStore";
import Toast from "@/components/Toast";
import {useRouter} from "next/navigation";

const LenderCreate: React.FC = () => {
    const [formData, setFormData] = useState<{
        name: string,
        ghanaCardNumber: string,
        phoneNumber: string,
        email: string,
        password: string,
        passwordConfirmation: string,
    }>({
        name: '',
        ghanaCardNumber: '',
        phoneNumber: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File>();
    const [uploadedFileName, setUploadedFileName] = useState<string>();
    const [toastData, setToastData] = useState<{ type: string, description: string }>(
        {type: '', description: ''}
    );
    const {setLenders, lenders} = useLenderStore()
    const router = useRouter()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleFileUploaded = (files: FileList) => {
        setUploadedFile(files[0])
        const fileNames = Array.from(files).map((file) => file.name);
        setUploadedFileName(fileNames[0])
    }

    const handleAddLender = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        storeLender(formData)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const lender = feedback.data
                    const {pagination, data} = lenders

                    if (setLenders) setLenders({pagination, data: [lender, ...data]});
                    return router.push('/lenders')
                }

                setToastData({type: 'error', description: feedback.message})
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    return (
        <>
            <form onSubmit={handleAddLender}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Add Lender</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <TextInput
                                    label="Name"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    required={true}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError}
                                    autoComplete="false"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <TextInput
                                    label="Phone Number"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="0244XXXXXXX"
                                    value={formData.phoneNumber}
                                    required={true}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError}
                                    autoComplete="false"
                                />
                            </div>


                            <div className="sm:col-span-3">
                                <TextInput
                                    label="email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="email"
                                    value={formData.email}
                                    required={true}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError} autoComplete="false"/>
                            </div>

                            <div className="sm:col-span-3">
                                <TextInput
                                    label="Ghana Card Number"
                                    id="ghanaCardNumber"
                                    name="ghanaCardNumber"
                                    type="text"
                                    placeholder="GH-XXXXXXXX..."
                                    value={formData.ghanaCardNumber}
                                    required={true}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError}
                                    autoComplete="false"
                                />
                            </div>


                            <div className="col-span-full">
                                <TextInput
                                    label="Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Address"
                                    value={formData.password}
                                    required={true}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError}
                                    autoComplete="false"
                                />
                            </div>


                            <div className="col-span-full">
                                <TextInput
                                    label="Password Confirmation"
                                    id="passwordConfirmation"
                                    name="passwordConfirmation"
                                    type="password"
                                    placeholder="Password Confirmation"
                                    value={formData.passwordConfirmation}
                                    required={true}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError}
                                    autoComplete="false"
                                />
                            </div>
                        </div>

                    </div>

                    {/*<div className="border-b border-gray-900/10 pb-12">*/}
                    {/*    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">*/}


                    {/*        <div className="col-span-full">*/}
                    {/*            <label htmlFor="cover-photo"*/}
                    {/*                   className="block text-sm font-medium leading-6 text-gray-900">*/}
                    {/*                Business Certificate*/}
                    {/*            </label>*/}

                    {/*            <div className="flex flex-col mt-4">*/}
                    {/*                <DragAndDrop filesUploaded={handleFileUploaded} maximumFileSize={10}*/}
                    {/*                             types={['image/jpg', 'image/jpeg', 'image/png']}/>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-lg"
                            buttonType="submit"
                            disabled={hasError}>
                        <span className="flex self-center">Save</span>
                    </Button>
                </div>
            </form>

            {toastData.type && <Toast toastType={toastData.type} toastDescription={toastData.description}/>}
        </>
    )
}

export default LenderCreate