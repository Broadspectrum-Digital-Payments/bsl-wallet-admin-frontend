import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import {Dialog} from "@headlessui/react";
import Button from "@/components/forms/Button";
import Loader from "@/components/Loader";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import TextInput from "@/components/forms/TextInput";
import {listAdmins} from "@/api/admin";
import {useAdminStore} from "@/store/AdminStore";
import {useUserStore} from "@/store/UserStore";
import {extractPaginationData} from "@/utils/helpers";
import {UserType} from "@/utils/types/UserType";

const AdminList: React.FC = () => {

    const [formData, setFormData] = useState<UserType>({externalId: '', name: '', email: '', status: ''});
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedAdmin, setSelectedAdmin] = useState<UserType | null>({
        externalId: '',
        name: '',
        email: '',
        status: ''
    });

    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Email', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]

    const {user} = useUserStore()
    const {admins, setAdmins} = useAdminStore()

    useEffect(() => {
        fetchAdmins()
    }, [])

    const fetchAdmins = (params: string = '') => {
        listAdmins(user?.bearerToken, params)
            .then(async (response) => {
                if (response) {
                    const feedback = await response.json();
                    const {data, meta} = feedback
                    const pagination = extractPaginationData(meta)
                    if (setAdmins) setAdmins({pagination, data});
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const handlePrevious = () => {
        if (admins) {
            const {pagination} = admins
            if (pagination.currentPage) {
                const previousPageNumber = pagination.currentPage - 1
                return pagination.firstPage ? null : fetchAdmins(`perPage=${pageOption.value}&page=${previousPageNumber}`)
            }
        }
    }
    const handleNext = () => {
        if (admins) {
            const {pagination} = admins
            if (pagination.currentPage) {
                const nextPageNumber = pagination.currentPage + 1
                return pagination.lastPage ? null : fetchAdmins(`perPage=${pageOption.value}&page=${nextPageNumber}`)
            }
        }
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

    const handleOpenAdminModal = () => {
        setFormData({name: '', email: '', status: '', externalId: ''});
        setModalOpen(true)
    }

    const handleAddAdmin = () => {
        setModalOpen(false)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleEditAdmin = (admin: UserType) => {
        setSelectedAdmin(admin);
        setFormData(admin);
        setModalOpen(true);
    };

    return (
        <>
            <div>
                <Table buttonText="Add Admin" onButtonClick={handleOpenAdminModal}>
                    {{
                        headers: tableHeaders,
                        body:
                            <>
                                {admins && admins.data.map((admin) => (
                                    <tr key={admin.externalId}>
                                        <TData label={admin?.externalId ?? ''}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={admin.name ?? ''}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={admin.email ?? ''}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={admin.status ?? ''}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>

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
                    pageOption={pageOption}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    pagination={admins?.pagination}
                />
            </div>

            <Modal showCloseButton={true} setModalOpen={setModalOpen} showModal={modalOpen}
                   customClasses="relative z-50">

                <div className="flex flex-col p-10">
                    {error && <Alert alertType="error" description={error} customClasses="rounded p-2 mt-3 mb-1"/>}
                    <div className="sm:flex sm:items-start justify-center">
                        <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3"
                                          className="text-base font-semibold leading-6 text-gray-900 text-center">
                                {formData?.externalId && formData.externalId !== '' ? 'Edit Admin' : 'Add New Admin'}
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
                            value={formData?.name ?? ''}
                            required={true}
                            onInputChange={handleInputChange}
                            hasError={setHasError} autoComplete="false"/>

                        <TextInput
                            label="email"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="email"
                            value={formData?.email ?? ''}
                            required={true}
                            onInputChange={handleInputChange}
                            hasError={setHasError} autoComplete="false"/>

                    </div>

                    <div
                        className={`sm:mt-4 sm:flex sm:flex-row-reverse`}>
                        <Button buttonType="submit" styleType="primary" customStyles="p-4 md:p-5 rounded-lg"
                                onClick={handleAddAdmin}>
                            {formData?.externalId && formData.externalId !== '' ? 'Update Admin' : 'Add Admin'}
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