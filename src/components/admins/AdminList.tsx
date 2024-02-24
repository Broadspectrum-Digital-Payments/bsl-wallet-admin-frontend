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
import {listAdmins, storeAdmin, updateAdmin} from "@/api/admin";
import {useAdminStore} from "@/store/AdminStore";
import {extractPaginationData, getError} from "@/utils/helpers";
import {DropdownInputItemType} from "@/utils/types/DropdownInputItemType";
import {DropdownInput} from "@/components/forms/DropdownInput";
import {AdminType} from "@/utils/types/AdminType";
import Badge from "@/components/Badge";
import Link from "next/link";
import {FilterQueryType} from "@/utils/types/FilterQueryType";
import Toast from "@/components/Toast";

const AdminList: React.FC = () => {
    const [formData, setFormData] = useState<AdminType>({externalId: '', name: '', email: '', status: ''});
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [error, setError] = useState<string | null>(null);
    const [toastInfo, setToastInfo] = useState<{
        type: string,
        description: string,
    }>({
        type: '',
        description: '',
    });
    const [selectedAdmin, setSelectedAdmin] = useState<AdminType | null>({
        externalId: '',
        name: '',
        email: '',
        status: ''
    });
    const [filterQueryString, setFilterQueryString] = useState<string>('pageSize=10');
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Email', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]

    const {admins, setAdmins, authenticatedAdmin} = useAdminStore()
    useEffect(() => {
        fetchAdmins(filterQueryString)
    }, [])

    const fetchAdmins = (params: string = '') => {
        listAdmins(authenticatedAdmin?.bearerToken, params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
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
                return pagination.firstPage ? null : fetchAdmins(`pageSize=${pageOption.value}&page=${previousPageNumber}`)
            }
        }
    }
    const handleNext = () => {
        if (admins) {
            const {pagination} = admins
            if (pagination.currentPage) {
                const nextPageNumber = pagination.currentPage + 1
                return pagination.lastPage ? null : fetchAdmins(`pageSize=${pageOption.value}&page=${nextPageNumber}`)
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
        {label: '2', value: '2'},
        {label: '5', value: '5'},
        {label: '10', value: '10'},
        {label: '20', value: '20'},
    ]

    const handleOpenAdminModal = () => {
        setModalOpen(!modalOpen)
        setError('')
        setFormData({externalId: '', name: '', email: '', status: ''})
    }

    const handleSubmitAdminData = () => formData?.externalId && formData.externalId !== '' ? handleEditAdminAction() : handleAddAdmin()

    const handleAddAdmin = () => {
        setLoading(true)
        storeAdmin(authenticatedAdmin.bearerToken, {
            ...formData,
            password: 'P@$$w0rd?',
            password_confirmation: 'P@$$w0rd?'
        })
            .then(async response => {
                const feedback = await response.json()
                setLoading(false)
                if (response.ok && feedback.success) {
                    const {data, message} = feedback
                    if (setAdmins) setAdmins({pagination: admins.pagination, data: [data, ...admins.data]})
                    setModalOpen(false)
                    return setToastInfo({type: 'success', description: message})
                }
                setError(getError(feedback))
            }).catch((error) => console.log('error: ', error))
    }

    const handleEditAdminAction = () => {
        updateAdmin(authenticatedAdmin?.bearerToken, authenticatedAdmin?.externalId, {...formData})
            .then(async response => {
                const feedback = await response.json();
                setLoading(false)

                if (response.ok && feedback.success) {
                    const updatedAdminIndex = admins.data.findIndex(admin => admin.externalId === formData.externalId)
                    if (updatedAdminIndex !== -1) {
                        const updatedAdminsData = [...admins.data];
                        updatedAdminsData[updatedAdminIndex] = {...updatedAdminsData[updatedAdminIndex], ...formData}

                        if (setAdmins) setAdmins({pagination: admins.pagination, data: updatedAdminsData});
                    }
                    setModalOpen(false)
                    return setToastInfo({type: 'success', description: feedback.message})
                }
                setError(getError(feedback))
            }).catch((error) => {
            console.log('error: ', error)
        })
    };

    const handleEditAdmin = (admin: AdminType) => {
        setSelectedAdmin(admin)
        setFormData(admin)
        setModalOpen(true)
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const statuses: DropdownInputItemType[] = [{name: 'Active', id: 'Active'}, {name: 'Inactive', id: 'Inactive'}]
    const [selectedStatus, setSelectedStatus] = useState(statuses[0])

    const handleSetPageOption = (pageOption: IListBoxItem) => {
        const queryString = prepareFilterQueryString({pageSize: pageOption.value})
        setFilterQueryString(queryString);
        fetchAdmins(queryString)
        setPageOption(pageOption)
    }

    const prepareFilterQueryString = (queryObject: FilterQueryType) => {
        const queryParams = filterQueryString.split('&')
            .map(param => param.split('='))
            .reduce((obj: Record<string, string>, [key, value]) => {
                if (key !== '' && value != undefined)
                    return {...obj, [key]: value};

                return obj;
            }, {});

        const {startDate, endDate, ...remainingParams} = queryParams;

        const mergedParams = {
            ...remainingParams,
            ...queryObject,
        };

        const filteredParams = Object.fromEntries(
            Object.entries(mergedParams).filter(([key, value]) => {
                return ![undefined, ''].includes(String(value));
            })
        );

        return Object.entries(filteredParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
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
                                        <TData customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                            <Badge text={admin.status ?? ''} customClasses="capitalize"/>
                                        </TData>

                                        <TData label=""
                                               customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                            <Link
                                                href=""
                                                onClick={() => handleEditAdmin(admin)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit<span className="sr-only">, {admin.name}</span>
                                            </Link>
                                        </TData>
                                    </tr>
                                ))}
                            </>
                    }}
                </Table>
                <Pagination
                    perPageOptions={perPageOptions}
                    setPageOption={handleSetPageOption}
                    pageOption={pageOption}
                    handlePrevious={handlePrevious}
                    handleNext={handleNext}
                    pagination={admins?.pagination}
                />
            </div>

            <Modal showCloseButton={true} setModalOpen={handleOpenAdminModal} showModal={modalOpen}
                   customClasses="relative z-50">

                <div className="flex flex-col p-10">
                    <div className="sm:flex sm:items-start justify-center">
                        <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3"
                                          className="text-base font-semibold leading-6 text-gray-900 text-center mb-4">
                                {formData?.externalId && formData.externalId !== '' ? 'Edit Admin' : 'Add New Admin'}
                            </Dialog.Title>
                        </div>
                    </div>

                    {error && <Alert alertType="error" description={error} customClasses="rounded p-2 mt-3 mb-1"/>}

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

                        {formData?.externalId && <DropdownInput label="Status" data={statuses}
                                                                selected={selectedStatus}
                                                                setSelected={setSelectedStatus}
                        />}
                    </div>

                    <div
                        className={`sm:mt-4 sm:flex sm:flex-row-reverse`}>
                        <Button buttonType="submit" styleType="primary" customStyles="p-4 md:p-5 rounded-lg"
                                onClick={handleSubmitAdminData} disabled={loading || hasError}>
                            {!loading && <span>
                                {formData?.externalId && formData.externalId !== '' ? 'Update Admin' : 'Add Admin'}
                            </span>}
                            {loading && <Loader type="default"
                                                customClasses="relative"
                                                customAnimationClasses="w-10 h-10 text-white dark:text-gray-600 fill-purple-900"
                            />}
                        </Button>
                    </div>
                </div>
            </Modal>

            {toastInfo.type && <Toast toastType={toastInfo.type} toastDescription={toastInfo.description}/>}
        </>
    )
}

export default AdminList