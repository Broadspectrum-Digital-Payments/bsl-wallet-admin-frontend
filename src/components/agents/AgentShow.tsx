import React, {useState} from 'react'
import TextInput from "@/components/forms/TextInput";
import {useParams} from "next/navigation";
import Button from "@/components/forms/Button";
import Loader from "@/components/Loader";
import KycApprovalDecision from "@/components/kyc/KycApprovalDecision";
import {useAgentStore} from "@/store/AgentStore";
import {formatAmount, stringToTitleCase} from "@/utils/helpers";

const AgentShow: React.FC = () => {
    const [activeSection, setActiveSection] = useState('Account');
    const [formData, setFormData] = useState({
        externalId: '',
        name: '',
        ghanaCardNumber: '',
        phoneNumber: '',
        type: '',
        status: '',
        kycStatus: '',
        actualBalance: 0,
        availableBalance: 0,
        createdAt: ''
    });
    const {agent} = useAgentStore()
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const secondaryNavigation = [
        {name: 'Account', href: '#', current: true},
        {name: 'Documents', href: '#', current: false},
        {name: 'Loans', href: '#', current: false},
    ]

    const handleNavigationClick = (sectionName: string) => {
        setActiveSection(sectionName);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleUpdateCustomer = () => {
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

    const handleApproveKyc = () => {

    }

    const handleRejectKyc = () => {

    }
    return (
        <>
            <div className="">
                <main>
                    <header className="border-b border-white/5">
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

                                    <div className="flex lg:px-8 px-4 py-4">
                                        <div className="flex-1 mr-4">
                                            <TextInput
                                                label="Name"
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="Name"
                                                value={agent.name}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <TextInput
                                                label="Phone Number"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                type="text"
                                                placeholder="Phone Number"
                                                value={agent.phoneNumber}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
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
                                                value={agent.ghanaCardNumber}
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
                                                value={formatAmount(agent.actualBalance, '')}
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
                                                placeholder="Actual Balance"
                                                value={formatAmount(agent.actualBalance, '')}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <TextInput
                                                label="KYC Status"
                                                id="kycStatus"
                                                name="kycStatus"
                                                type="text"
                                                placeholder="KYC Status"
                                                value={agent.kycStatus}
                                                required={true}
                                                onInputChange={handleInputChange}
                                                hasError={setHasError}
                                                autoComplete="false"
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className={`sm:mt-4 flex lg:px-8`}>
                                        <Button buttonType="submit" styleType="primary"
                                                customStyles="p-4 md:p-5 rounded-lg"
                                                onClick={handleUpdateCustomer}>
                                            {'Save'}
                                            {loading && <Loader type="default"
                                                                customClasses="relative"
                                                                customAnimationClasses="w-10 h-5 text-white dark:text-gray-600 fill-purple-900"
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
                                                    <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{stringToTitleCase(document.name)}</h3>
                                                    <p className="text-base leading-7 text-gray-600"> Uploaded
                                                        Date: {document.createdAt}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <KycApprovalDecision onApprove={handleApproveKyc} onReject={handleRejectKyc}/>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

        </>
    )
}

export default AgentShow