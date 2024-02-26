import React, {useEffect, useState} from "react";
import {extractPaginationData} from "@/utils/helpers";
import {useLoanStore} from "@/store/LoanStore";
import {ILoanList} from "@/utils/interfaces/ILoanList";
import {LoanStatItemType} from "@/utils/types/LoanStatItemType";
import {LoanStatType} from "@/utils/types/LoanStatType";
import LoanList from "@/components/loans/LoanList";
import {listLoans} from "@/api/loan";
import EmptyState from "@/components/EmptyState";
import {useLenderStore} from "@/store/LenderStore";
import {useAdminStore} from "@/store/AdminStore";

const LoanContent: React.FC<ILoanList> = ({downloadable = false, filter = false, stats = false}) => {

    useEffect(() => {
        fetchLoans()
    }, [])

    const {loans, setLoans} = useLoanStore()
    const [loanStats, setLoanStats] = useState<LoanStatItemType[] | undefined>(undefined);
    const {lender} = useLenderStore()
    const {authenticatedAdmin} = useAdminStore()

    const fetchLoans = (params: string = '') => {
        if(authenticatedAdmin.externalId == lender?.externalId) {
            params = 'status=submitted'
        }
        listLoans(params)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {

                    const {loans, meta, stats} = feedback.data;
                    generateLoanStats(stats)
                    const pagination = extractPaginationData(meta)
                    if (setLoans) setLoans({pagination, data: loans})
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }

    const generateLoanStats = (stats: LoanStatType) => {
        const statsList: LoanStatItemType[] = [];

        for (const [key, value] of Object.entries(stats)) {
            statsList.push({name: key, value: value.toString()});
        }
        return setLoanStats(statsList);
    }

    const authIsLender = authenticatedAdmin.externalId == lender?.externalId

    return (<>
        {loans.data.length > 0 &&
            (<div>
                {authenticatedAdmin.externalId == lender?.externalId ? (<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-indigo-600">Available Balance</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{lender.availableBalance ?? 0}</dd>
                </div>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-indigo-600">Actual Balance</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{lender.actualBalance ?? 0}</dd>
                </div>
            </dl>) : ''}
        </div>)}
        <LoanList filter={!authIsLender} stats={loanStats} passedParam={authIsLender ? 'status=submitted' : ''}/>
    </>)

}

export default LoanContent