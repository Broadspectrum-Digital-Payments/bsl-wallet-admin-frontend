import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import {Dialog} from "@headlessui/react";
import Button from "@/components/forms/Button";
import Loader from "@/components/Loader";
import React, {useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import TextInput from "@/components/forms/TextInput";
import {DropdownInput} from "@/components/forms/DropdownInput";
import {DropdownInputItemType} from "@/utils/types/DropdownInputItemType";
import SuccessBadge from "@/components/badge/SuccessBadge";
import DangerBadge from "@/components/badge/DangerBadge";




const AdminList : React.FC = () => {

    const [formData, setFormData] = useState({externalId: '', name: '', email: '', status: ''});
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedAdmin, setSelectedAdmin] = useState<{
        externalId: string;
        name: string;
        email: string;
        status: string;
    } | null>(null);


    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Email', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]
    const admins = [
        {externalId: 'bhjsdhvsg', name: 'Lindsay Walton', email: 'lindsay.walton@example.com', status: 'active'},
        {externalId: 'ajhvskdaj', name: 'Joana Mensah', email: 'joana.walton@example.com', status: 'inactive'}
    ]


    const handlePrevious = () => {
        // if (collections) {
        //     const {pagination} = collections
        //     const previousPageNumber = pagination.pageNumber - 1
        //     return pagination.firstPage ? null : getCollectionTransactions(`rows=${pageOption.value}&pageNumber=${previousPageNumber}`)
        // }
    }
    const handleNext = () => {
        // if (collections) {
        //     const {pagination} = collections
        //     const nextPageNumber = pagination.pageNumber + 1
        //     return pagination.lastPage ? null : getCollectionTransactions(`rows=${pageOption.value}&pageNumber=${nextPageNumber}`)
        // }
    }

    const [pageOption, setPageOption] = useState<IListBoxItem>({
        label: '10',
        value: '10'
    });

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const perPageOptions: IListBoxItem [] = [
        {label: '10', value: '10'},
        {label: '20', value: '20'},
    ]

    const statuses : DropdownInputItemType[] = [{name: 'Active', id: 'Active'}, {name: 'Inactive', id: 'Inactive'}]

    const [selected, setSelected] = useState(statuses[0])

    const handleOpenAdminModal = () => {
        setFormData({name: '', email: '', status: '', externalId: ''});
        setModalOpen(true)
    }

    const handleAddAdmin = () => {
        if (formData.externalId){
            formData.status = selected.name.toLowerCase()
        }
        console.log(formData)
        setModalOpen(false)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleEditAdmin = (admin: {
        externalId: string;
        name: string;
        email: string;
        status: string;
    }) => {
        setSelectedAdmin(admin);
        setFormData({...admin});

        const selectedStatus = admin.status === 'active' ? statuses[0] : statuses[1]

        setSelected(selectedStatus)

        setModalOpen(true);
    };


    const handleSetStatus = (status: DropdownInputItemType) => {
        setSelected(status)
    }


    return (
        <>
        <div>
            <Table buttonText="Add Admin" onButtonClick={handleOpenAdminModal}>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {admins.map((admin) => (
                                <tr key={admin.externalId}>
                                    <TData label={admin.externalId}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={admin.name}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={admin.email}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label=""
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        {admin.status == 'active' ? <SuccessBadge text="Active"></SuccessBadge> : <DangerBadge text="Inactive"></DangerBadge> }
                                    </TData>

                                    <TData label=""
                                           customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                        <a
                                            href="#"
                                            onClick={() => handleEditAdmin(admin)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit<span className="sr-only">, {admin.name}</span>
                                        </a>
                                    </TData>
                                </tr>
                            ))}
                        </>
                }}
            </Table>
            <Pagination
                perPageOptions={perPageOptions}
                setPageOption={setPageOption}
                pageOption={pageOption}/>
        </div>

    <Modal showCloseButton={true} setModalOpen={setModalOpen} showModal={modalOpen}
           customClasses="relative z-50">

        <div className="flex flex-col p-10">
            {error && <Alert alertType="error" description={error} customClasses="rounded p-2 mt-3 mb-1"/>}
            <div className="sm:flex sm:items-start justify-center">
                <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3"
                                  className="text-base font-semibold leading-6 text-gray-900 text-center">
                        {formData?.externalId && formData?.externalId?.length > 0 ? 'Edit Admin' : 'Add New Admin'}
                    </Dialog.Title>
                    <div className="mt-4">
                        <p className="text-xs text-gray-500 text-center">

                        </p>
                    </div>
                </div>
            </div>

            <div className="">
                <TextInput
                    label="name"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="name"
                    value={formData?.name}
                    required={true}
                    onInputChange={handleInputChange}
                    hasError={setHasError} autoComplete="false"/>

                <TextInput
                    label="email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email"
                    value={formData?.email}
                    required={true}
                    onInputChange={handleInputChange}
                    hasError={setHasError} autoComplete="false"/>


                {formData.externalId && <DropdownInput label="Status" data={[{name: 'Active', id: 'Active'}, {name: 'Inactive', id: 'Inactive'}]}
                               selected={selected}
                               setSelected={(value) => handleSetStatus(value)}
                ></DropdownInput>}

            </div>

            <div
                className={`sm:mt-4 sm:flex sm:flex-row-reverse`}>
                <Button buttonType="submit" styleType="primary" customStyles="p-4 md:p-5 rounded-lg"
                        onClick={handleAddAdmin}>
                    { formData?.externalId && formData?.externalId?.length > 0 ? 'Update Admin' : 'Add Admin'}
                    {loading && <Loader type="default"
                                        customClasses="relative"
                                        customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-purple-900"
                    />}
                </Button>
            </div>
        </div>
    </Modal>
        </>
)
}

export default AdminList