export type TransactionType = {
    stan?: string
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
    currency?: string

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
    description?: string
}