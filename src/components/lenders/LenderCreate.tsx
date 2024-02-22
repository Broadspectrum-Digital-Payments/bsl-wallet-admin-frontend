import React, {useState} from 'react'
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import {PhotoIcon} from "@heroicons/react/24/solid";
import {LenderType} from "@/utils/types/LenderType";

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

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };


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
                                <div
                                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file"
                                                       className="sr-only"/>
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
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