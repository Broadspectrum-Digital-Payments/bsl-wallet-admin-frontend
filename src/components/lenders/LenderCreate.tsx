import React, {useState} from 'react'
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import {PhotoIcon} from "@heroicons/react/24/solid";
import {LenderType} from "@/utils/types/LenderType";
import DragAndDrop from "@/components/forms/DragAndDrop";

const LenderCreate: React.FC = () => {
    const [formData, setFormData] = useState<LenderType>({
        name: '',
        ghanaCardNumber: '',
        phoneNumber: '',
        email: '',
        address: '',
        businessRegistrationNumber: '',
        businessCertificate: '',
    });

    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<File>();
    const [uploadedFileName, setUploadedFileName] = useState<string>();

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleFileUploaded = (files: FileList) => {
        console.log(files)
        console.log(files[0])
        setUploadedFile(files[0])
        const fileNames = Array.from(files).map((file) => file.name);
        setUploadedFileName(fileNames[0])

        console.log(uploadedFile)
        console.log(uploadedFileName)
    }

    return (
        <>
            <form>
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
                                    label="Address"
                                    id="address"
                                    name="addresss"
                                    type="text"
                                    placeholder="Address"
                                    value={formData.address}
                                    required={true}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError}
                                    autoComplete="false"
                                />
                            </div>


                            <div className="col-span-full">
                                <TextInput
                                    label="Business Register Number"
                                    id="businessRegisterNumber"
                                    name="businessRegisterNumber"
                                    type="text"
                                    placeholder="Business Registration Number"
                                    value={formData.businessRegistrationNumber}
                                    required={true}
                                    onInputChange={handleInputChange}
                                    hasError={setHasError}
                                    autoComplete="false"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                            <div className="col-span-full">
                                <label htmlFor="cover-photo"
                                       className="block text-sm font-medium leading-6 text-gray-900">
                                    Business Certificate
                                </label>

                                <div className="flex flex-col mt-4">
                                    <DragAndDrop filesUploaded={handleFileUploaded} maximumFileSize={10} types={['image/jpg', 'image/jpeg', 'image/png']}/>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">

                    <Button styleType="primary" customStyles="justify-center p-4 md:p-5 rounded-lg"
                            buttonType="submit"
                            disabled={hasError}>
                        <span className="flex self-center">Save</span>
                    </Button>
                </div>
            </form>

        </>
    )
}

export default LenderCreate