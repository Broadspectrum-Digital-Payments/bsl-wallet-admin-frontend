import {PaginationType} from "@/utils/types/PaginationType";
import {LoanType} from "@/utils/types/LoanType";

export type LoanStoreType = {
    setLoan: (loan: LoanType) => void,
    loan: LoanType,
    setLoans: (data: { pagination: PaginationType, data: LoanType[] }) => void
    loans: { pagination: PaginationType, data: LoanType[] },

    setLoading?: (loading: boolean) => void,
    loading?: boolean,

    resetLoanStore?: () => void,
}