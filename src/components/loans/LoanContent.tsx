import React, {useEffect, useState} from "react";
import {extractPaginationData} from "@/utils/helpers";
import {useLoanStore} from "@/store/LoanStore";
import {ILoanList} from "@/utils/interfaces/ILoanList";
import {LoanStatItemType} from "@/utils/types/LoanStatItemType";
import {LoanStatType} from "@/utils/types/LoanStatType";
import {listLenderLoans} from "@/api/lenders";
import LoanList from "@/components/loans/LoanList";
import {useLenderStore} from "@/store/LenderStore";
import EmptyState from "@/components/EmptyState";

const LoanContent: React.FC<ILoanList> = ({downloadable = false, filter = false}) => {

    useEffect(() => {
        fetchLoans()
    }, [])

    const {setLoans, loans} = useLoanStore()
    const {authenticatedLender} = useLenderStore()
    const [loanStats, setLoanStats] = useState<LoanStatItemType[] | undefined>(undefined);

    const fetchLoans = (params: string = '') => {
        listLenderLoans(authenticatedLender?.externalId, params)
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

    return (<>
        {loans.data.length > 0 &&
            <LoanList stats={loanStats} downloadable={downloadable ?? false} filter={filter ?? false}/>}
        {!loans.data.length && <EmptyState/>}
    </>)
}

export default LoanContent