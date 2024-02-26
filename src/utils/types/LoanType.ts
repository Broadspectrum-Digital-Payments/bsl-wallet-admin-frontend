import {BorrowerType} from "@/utils/types/BorrowerType";
import {LenderType} from "@/utils/types/LenderType";
import {DocumentType} from "@/utils/types/DocumentType";

export type LoanType = {
    externalId?: string,
    internalId?: string,
    accountIssuer?: string,
    type?: string,
    amount?: number,
    status?: string,
    clientReference?: string,
    narration?: string,
    scheduled?: boolean
    createdAt?: string,
    updatedAt?: string,
    balanceBefore?: number,
    balanceAfter?: number,
    processAt?: string | null,
    accountName?: string | null,
    accountNumber?: string,
    initiatorName?: string,
    callbackUrl?: string | null,
    batchExternalId?: string | null
    emailPaymentLink?: string | null,
    fee?: number,

    id?: string,
    date?: string,
    time?: string,
    recipient?: string,
    client?: string,
    batchNumber?: string,
    phone?: string,
    reference?: string,
    email?: string,
    channel?: string,
    sender?: string,
    balance?: string,
    description?: string,
    stan?: string,
    principal?: number;
    principalInGHS?: string;
    interest?: number;
    interestInGHS?: string;
    interestRate?: number;
    monthlyInstallment?: number;
    monthlyInstallmentInGHS?: string;
    totalRepaymentAmount?: number;
    totalRepaymentAmountInGHS?: string;
    taxes?: number;
    taxesInGHS?: string;
    fees?: string | null
    feesInGHS?: string;
    approvedAt?: string | null;
    disbursedAt?: string | null;
    borrower?: BorrowerType;
    documents?: DocumentType[];
    lender?: LenderType;
}