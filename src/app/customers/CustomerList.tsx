import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";


const CustomerList: React.FC = () => {

    const [formData, setFormData] = useState({externalId: '', name: '', phone: '', status: ''});
    const [hasError, setHasError] = useState<boolean | undefined>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedAdmin, setSelectedCustomer] = useState<{
        externalId: string;
        name: string;
        phone: string;
        status: string;
    } | null>(null);

    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Phone', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]
    const customers = [
        {externalId: 'bhjsdhvsg', name: 'Lindsay Walton', phone: '0244554456', status: 'Active'},
        {externalId: 'ajhvskdaj', name: 'Joana Mensah', phone: '0244538475', status: 'Inactive'}
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

    const handleOpenAdminModal = () => {
        setFormData({name: '', phone: '', status: '', externalId: ''});
        setModalOpen(true)
    }

    const handleAddAdmin = () => {
        console.log(formData)
        setModalOpen(false)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleEditCustomer = (customer: {
        externalId: string;
        name: string;
        phone: string;
        status: string;
    }) => {
        setSelectedCustomer(customer);
        setFormData({...customer});
        setModalOpen(true);
    };

    return (
        <>
            <div>
                <Table onButtonClick={() => {
                }}>
                    {{
                        headers: tableHeaders,
                        body:
                            <>
                                {customers.map((customer) => (
                                    <tr key={customer.externalId}>
                                        <TData label={customer.externalId}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={customer.name}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={customer.phone}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={customer.status}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>

                                        <TData label=""
                                               customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                            <a
                                                href="#"
                                                onClick={() => handleEditCustomer(customer)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View <span className="sr-only">, {customer.name}</span>
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
        </>
    )
}

export default CustomerList