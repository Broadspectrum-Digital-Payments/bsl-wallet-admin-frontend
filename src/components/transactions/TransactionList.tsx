import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Badge from "@/components/Badge";

const TransactionList: React.FC = () => {
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Account Number', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Amount', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Balance Before', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Balance After', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Fee', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Created  At', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Description', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
    ]
    const lenders = [
        {
            "externalId": "a52bb4b1-a87f-4c9f-bd1d-85eb96792e52",
            "stan": "240221175802534960",
            "processorReference": null,
            "type": "transfer",
            "currency": "GHS",
            "accountNumber": "0249621938",
            "accountIssuer": "gmo",
            "amount": 312,
            "balanceBefore": 2468,
            "balanceAfter": 2156,
            "fee": 0,
            "feeInMajorUnits": "0.00",
            "amountInMajorUnits": "3.12",
            "balanceBeforeInMajorUnits": "24.68",
            "balanceAfterInMajorUnits": "21.56",
            "description": "cashing in solomon 0192398",
            "status": "completed",
            "createdAt": "2024-02-21T17:58:02.000000Z",
            "updatedAt": "2024-02-21T17:58:02.000000Z"
        },
        {
            "externalId": "717d0b89-93f4-4327-bcae-b5e20e86c076",
            "stan": "240221175345345068",
            "processorReference": null,
            "type": "transfer",
            "currency": "GHS",
            "accountNumber": "0249621938",
            "accountIssuer": "gmo",
            "amount": 102,
            "balanceBefore": 2570,
            "balanceAfter": 2468,
            "fee": 0,
            "feeInMajorUnits": "0.00",
            "amountInMajorUnits": "1.02",
            "balanceBeforeInMajorUnits": "25.70",
            "balanceAfterInMajorUnits": "24.68",
            "description": "cashing in solomon 0192398",
            "status": "completed",
            "createdAt": "2024-02-21T17:53:45.000000Z",
            "updatedAt": "2024-02-21T17:53:45.000000Z"
        },
        {
            "externalId": "ae48f1ef-c2f9-42bb-9d8c-6b00ce9e0bef",
            "stan": "240221175128939654",
            "processorReference": null,
            "type": "transfer",
            "currency": "GHS",
            "accountNumber": "0249621938",
            "accountIssuer": "gmo",
            "amount": 253,
            "balanceBefore": 2570,
            "balanceAfter": 2317,
            "fee": 0,
            "feeInMajorUnits": "0.00",
            "amountInMajorUnits": "2.53",
            "balanceBeforeInMajorUnits": "25.70",
            "balanceAfterInMajorUnits": "23.17",
            "description": "cashing in for user",
            "status": "queued",
            "createdAt": "2024-02-21T17:51:28.000000Z",
            "updatedAt": "2024-02-21T17:51:28.000000Z"
        }
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

    const perPageOptions: IListBoxItem [] = [
        {label: '10', value: '10'},
        {label: '20', value: '20'},
    ]

    return (
        <>
            <div>
                <Table onButtonClick={() => {
                }}>
                    {{
                        headers: tableHeaders,
                        body:
                            <>
                                {lenders.map((lender) => (
                                    <tr key={lender.externalId}>
                                        <TData label={lender.externalId}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={lender.accountNumber}
                                               customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                        <TData label={`${lender.amount}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={`${lender.balanceBefore}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={`${lender.balanceAfter}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={`${lender.fee}`}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={lender.createdAt}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label={lender.description}
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                        <TData label=""
                                               customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                            <Badge text={lender.status} customClasses="capitalize"/>
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

export default TransactionList