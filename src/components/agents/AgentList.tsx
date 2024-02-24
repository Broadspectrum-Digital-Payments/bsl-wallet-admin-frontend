import Table from "@/components/table/Table";
import TData from "@/components/table/TData";
import Pagination from "@/components/table/Pagination";
import React, {useEffect, useState} from "react";
import {IListBoxItem} from "@/utils/interfaces/IDropdownProps";
import Link from "next/link";
import {listUsers} from "@/api/user";
import {extractPaginationData, formatAmount, formatDate, getError, prepareFilterQueryString} from "@/utils/helpers";
import {useAgentStore} from "@/store/AgentStore";
import Badge from "@/components/Badge";
import FilterWrapper from "@/components/FilterWrapper";
import {FilterFormDataType} from "@/utils/types/FilterFormDataType";
import AgentFilter from "@/components/agents/AgentFilter";

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
    const [hasError, setHasError] = useState<boolean>(false);
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
    const [resetFilter, setResetFilter] = useState<boolean>(false);
    const [submitFilter, setSubmitFilter] = useState<boolean>(false);
    const [formData, setFormData] = useState<FilterFormDataType>({
        externalId: '',
        startDate: '',
        endDate: '',
        status: ''
    });

    const fetchAgents = (params: string = '') => {
        listUsers(`type=agent&${params}`)
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

    const handleFilterSubmitButtonClicked = (submit: boolean) => {
        setSubmitFilter(submit)
        const queryString = prepareFilterQueryString(formData, filterQueryString)
        setFilterQueryString(queryString)
        fetchAgents(queryString)
    }

    const handleResetFilter = (reset: boolean) => {
        setResetFilter(reset)
        return fetchAgents('pageSize=10')
    }

    const handleFilterChange = (data: FilterFormDataType) => {
        if (Object.values(data).every(value => value.trim() === '')) {
            return setHasError(true)
        } else {
            setFormData({...data})
            return setHasError(false)
        }
    }

    const handleFilterError = (error: boolean) => {
        setHasError(error)
    }

    const handlePrevious = () => {
        if (agents) {
            const {pagination} = agents
            if (pagination.currentPage) {
                const previousPageNumber = pagination.currentPage - 1
                return pagination.firstPage ? null : fetchAgents(`pageSize=${pageOption.value}&page=${previousPageNumber}`)
            }
        }
    }
    const handleNext = () => {
        if (agents) {
            const {pagination} = agents
            if (pagination.currentPage) {
                const nextPageNumber = pagination.currentPage + 1
                return pagination.lastPage ? null : fetchAgents(`pageSize=${pageOption.value}&page=${nextPageNumber}`)
            }
        }
    }

    return (
        <div>
            <FilterWrapper onSubmit={handleFilterSubmitButtonClicked} onReset={handleResetFilter}
                           hasError={hasError}>
                <AgentFilter
                    submit={submitFilter}
                    reset={resetFilter}
                    onChange={handleFilterChange}
                    hasError={hasError}
                    setHasError={handleFilterError}
                />
            </FilterWrapper>

            <Table onButtonClick={() => {
            }}>
                {{
                    headers: tableHeaders,
                    body:
                        <>
                            {agents && agents.data.map((agent) => (
                                <tr key={agent.ghanaCardNumber}>
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
                handlePrevious={handlePrevious}
                handleNext={handleNext}
            />
        </div>
    )
}

export default AgentList