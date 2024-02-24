import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Link from "next/link";
import {listUsers} from "@/api/user";
import {extractPaginationData, formatAmount, formatDate, getError} from "@/utils/helpers";
import {useAgentStore} from "@/store/AgentStore";
import Badge from "@/components/Badge";
import {UserType} from "@/utils/types/UserType";

const AgentList: React.FC = () => {
    const tableHeaders = [
        {label: 'Id', classes: 'py-3.5 pl-4 pr-3 text-left  sm:pl-0'},
        {label: 'Name', classes: 'hidden px-3 py-3.5 text-left lg:table-cell'},
        {label: 'Phone', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Available Balance', classes: 'hidden px-3 py-3.5 text-left sm:table-cell'},
        {label: 'Status', classes: 'px-3 py-3.5 text-left'},
        {label: 'Date Created', classes: 'px-3 py-3.5 text-left'},
        {label: 'Action', classes: 'relative py-3.5 pl-3 pr-4 sm:pr-0'},
    ]

    useEffect(() => {
        fetchAgents(filterQueryString)
    }, [])

    const [error, setError] = useState<string | null>(null);
    const {agents, setAgents, setAgent} = useAgentStore()
    const [pageOption, setPageOption] = useState<IListBoxItem>({
        label: '10',
        value: '10'
    });
    const perPageOptions: IListBoxItem [] = [
        {label: '10', value: '10'},
        {label: '20', value: '20'},
    ]
    const [filterQueryString, setFilterQueryString] = useState<string>('pageSize=10');

    const fetchAgents = (params: string = 'type=agent') => {
        listUsers(params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    const {users, meta} = feedback.data
                    const pagination = extractPaginationData(meta)
                    console.log(feedback)
                    if (setAgents) setAgents({pagination, data: users});
                }
            })
            .catch((error) => {
                setError(getError(error))
            })
    }

    const handleSetSelectedAgent = (agent: UserType) => {
        setAgent(agent)
    }

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

    return (
        <div>
            <Table onButtonClick={() => {
            }}>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {agents && agents.data.map((agent) => (
                                <tr key={agent.externalId}>
                                    <TData label={agent.externalId}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={agent.name}
                                           customClasses="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0"/>
                                    <TData label={agent.phoneNumber}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label={formatAmount(agent.availableBalance)}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label=""
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        <Badge text={agent.status ?? ''} customClasses="capitalize"/>
                                    </TData>
                                    <TData label={formatDate(agent.createdAt)}
                                           customClasses="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell"/>
                                    <TData label=""
                                           customClasses="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-0">
                                        <Link
                                            onClick={() => setAgent(agent)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                            href={`/agents/${agent.externalId}`}>
                                            View <span className="sr-only">, {agent.name}</span>
                                        </Link>
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
                pagination={agents?.pagination}
            />
        </div>
    )
}

export default AgentList