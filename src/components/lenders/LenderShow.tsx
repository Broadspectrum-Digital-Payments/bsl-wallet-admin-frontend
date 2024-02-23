import React, {useEffect, useState} from 'react'
import TextInput from "@/components/forms/TextInput";
import {useParams} from "next/navigation";
import Button from "@/components/forms/Button";
import Loader from "@/components/Loader";
import {useLenderStore} from "@/store/LenderStore";
import {showLender, updateLender} from "@/api/lenders";
import {useAdminStore} from "@/store/AdminStore";
import {DropdownInput} from "@/components/forms/DropdownInput";
import {DropdownInputItemType} from "@/utils/types/DropdownInputItemType";
import {getError, isObjectEmpty} from "@/utils/helpers";
import Toast from "@/components/Toast";

type UpdatedData = {
    status: string;
    kycStatus: string;
    [key: string]: string;
};

const LenderShow: React.FC = () => {
    const [activeSection, setActiveSection] = useState('Account');
    const {lender, setLender} = useLenderStore()
    const {authenticatedAdmin} = useAdminStore()


    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const secondaryNavigation = [
        {name: 'Account', href: '#', current: true},
        {name: 'Documents', href: '#', current: false},
        {name: 'Loans', href: '#', current: false},
    ]

    const lenderId = useParams()?.lender.toString();

    useEffect(() => {
        fetchLender(lenderId)
    }, [lenderId])


    const fetchLender = (lenderId: string) => {
        showLender(authenticatedAdmin?.bearerToken, lenderId)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {data} = feedback

                    console.log('data: ', data)

                    if (setLender) setLender(data);
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const statuses: DropdownInputItemType[] = [
        {name: 'created', id: 'created'},
        {name: 'activated', id: 'activated'},
        {name: 'deactivated', id: 'deactivated'}
    ]

    const lenderStatus = lender.status == 'created' ? statuses[0] : statuses[1]
    const [selectedStatus, setSelectedStatus] = useState(lenderStatus)


    const kycStatuses: DropdownInputItemType[] = [
        {name: 'queued', id: 'queued'},
        {name: 'approved', id: 'approved'},
        {name: 'rejected', id: 'rejected'},
        {name: 'submitted', id: 'submitted'},
    ]

    const lenderKycStatus = kycStatuses.filter((status) => status.name === lender.kycStatus)

    const [selectedKycStatus, setSelectedKycStatus] = useState(lenderKycStatus[0])

    const [error, setError] = useState<string | null>(null);
    const [toastInfo, setToastInfo] = useState<{
        type: string,
        description: string,
    }>({
        type: '',
        description: '',
    });

    const handleNavigationClick = (sectionName: string) => {
        setActiveSection(sectionName);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setLender({...lender, [name]: value});
    };

    const lenderStatusUpdate = () => {
        lender.status = selectedStatus.name;
    }

    const lenderKycStatusUpdate = () => {
        lender.kycStatus = selectedKycStatus.name;
    }

    const isLenderStatusUpdated = (selectedStatus?.name !== lender.status)

    const isLenderKycStatusUpdated = (selectedKycStatus?.name !== lender.kycStatus)

    const handleUpdateLender = () => {

        setLoading(true)

        const updatedData: UpdatedData = {status: '', kycStatus: ''}

        if (isLenderStatusUpdated){
            updatedData.status = selectedStatus.name
        }

        if (isLenderKycStatusUpdated){
            updatedData.kycStatus = selectedKycStatus.name
        }


        Object.keys(updatedData).forEach(key => updatedData[key] === '' && delete updatedData[key]);


        !isObjectEmpty(updatedData) && lender.externalId && updateLender(authenticatedAdmin.bearerToken, lender.externalId, updatedData)
            .then(async response => {

                setLoading(false)
                if (response.status == 204) {

                    if (isLenderStatusUpdated){
                        lenderStatusUpdate()
                    }

                    if (isLenderKycStatusUpdated){
                        lenderKycStatusUpdate()
                    }

                    if (setLender) setLender(lender)
                    return setToastInfo({type: 'success', description: 'Updated Successfully'})
                }

                return setToastInfo({type: 'error', description: 'Something went wrong'})

            }).catch((error) => {setToastInfo({type: 'error', description: 'Something went wrong'}); console.log('error: ', error)})

        setLoading(false)
    }

    const resolveDocumentName = (name: string) => {
        let resolvedName = name
        switch (name) {
            case 'ghana-card-back':
                resolvedName = 'Ghana Card Back'
                break
            case 'ghana-card-front':
                resolvedName = 'Ghana Card Front'
                break
            default:
                resolvedName = 'Selfie'
        }

        return resolvedName
    }

    const documents = [
        {
            name: 'ghana-card-back',
            url:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            createdAt: "2024-02-20 22:09:20",
        },
        {
            name: 'ghana-card-front',
            url:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            createdAt: "2024-02-20 22:09:20",
        },
        {
            name: 'selfie',
            url:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
            createdAt: "2024-02-20 22:09:20",
        },
    ]

    return (
        <>
            <div className="">
                <main>
                    <header className="border-b border-white/5">
                        {/* Secondary navigation */}
                        <nav className="flex overflow-x-auto py-4">
                            <ul
                                role="list"
                                className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                            >
                                {secondaryNavigation.map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.href}
                                            className={item.name == activeSection ? 'text-indigo-400' : ''}
                                            onClick={() => handleNavigationClick(item.name)}
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </header>

                    {/* Accounts */}
                    {activeSection == 'Account' && (
                        <div className="divide-y divide-white/5">

                            <div className="">

                                <form className="">

                                    <div className="flex lg:px-8 px-4 py-t">
                                        <div className="flex-1 mr-4">
                                            <TextInput
                                                label="Name"
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Name"
                                                value={lender?.name}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <TextInput
                                                label="Phone Number"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="text"
                                                placeholder="Phone Number"
                                                value={lender?.phoneNumber}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex lg:px-8 px-4">
                                        <div className="flex-1 mr-4">
                                            <TextInput
                                                label="Ghana Card Number"
                                                id="ghanaCardNumber"
                                                name="ghanaCardNumber"
                                                type="text"
                                                placeholder="Ghana Card Number"
                                                value={lender?.ghanaCardNumber}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>


                                    </div>

                                    <div className="flex lg:px-8 px-4">
                                        <div className="flex-1 mr-4">
                                            <TextInput
                                                label="Available Balance"
                                                id="availableBalance"
                                                name="availableBalance"
                                                type="text"
                                                placeholder="Available Balance"
                                                value={lender?.availableBalance}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <TextInput
                                                label="Actual Balance"
                                                id="actualBalance"
                                                name="actualBalance"
                                                type="text"
                                                placeholder="Actual Balance"
                                                value={lender?.actualBalance}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex lg:px-8 px-4">

                                        <div className="flex-1 mr-4">
                                            <DropdownInput label="Status" data={statuses}
                                                           selected={selectedStatus}
                                                           setSelected={setSelectedStatus}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <DropdownInput label="KYC Status" data={kycStatuses}
                                                           selected={selectedKycStatus}
                                                           setSelected={setSelectedKycStatus}
                                            />
                                        </div>
                                    </div>


                                    <div
                                        className={`sm:mt-4 flex lg:px-8 pt-4`}>
                                        <Button buttonType="button" styleType="primary"
                                                customStyles="p-4 md:p-5 rounded-lg"
                                                onClick={handleUpdateLender}>
                                            {'Save'}
                                            {loading && <Loader type="default"
                                                                customClasses="relative"
                                                                customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-purple-900"
                                            />}
                                        </Button>
                                    </div>
                                </form>
                            </div>


                        </div>
                    )}


                    {/* Documents */}
                    {activeSection == 'Documents' && (
                        <div className="divide-y divide-white/5">

                            <div className="lg:px-8">

                                <div className="bg-white">
                                    <div className="">
                                        <ul
                                            role="list"
                                            className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                                        >
                                            {documents.map((document) => (
                                                <li key={document.name}>
                                                    <img className="aspect-[3/2] w-full rounded-2xl object-cover"
                                                         src={document.url}
                                                         alt=""/>
                                                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{resolveDocumentName(document.name)}</h3>
                                                    <p className="text-base leading-7 text-gray-600"> Uploaded
                                                        Date: {document.createdAt}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/*{toastInfo.type && <Toast toastType={toastInfo.type} toastDescription={toastInfo.description}/>}*/}

        </>
    )
}

export default LenderShow