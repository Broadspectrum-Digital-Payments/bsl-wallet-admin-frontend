import React from "react";
import {TransactionType} from "@/utils/types/TransactionType";
import DetailsKeyValue from "@/components/DetailsKeyValue";
import {formatAmount} from "@/utils/helpers";
import {ITransactionDetailsProps} from "@/utils/interfaces/ITransactionDetailsProps";


const TransactionDetails: React.FC<ITransactionDetailsProps> = ({transaction}) => {

    return (
        <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
                <DetailsKeyValue title="Transaction Id" value={transaction?.stan ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Type" value={transaction?.type ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Currency" value={transaction?.currency ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Account Name" value={transaction?.accountName ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Account Number" value={transaction?.accountNumber ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Amount" value={`${formatAmount(transaction.amount)}` ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Balance Before"
                                 value={`${formatAmount(transaction.balanceBefore)}` ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Balance After"
                                 value={`${formatAmount(transaction.balanceAfter)}` ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Fee" value={`${formatAmount(transaction?.fee)}` ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Status" value={transaction?.status ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Created At" value={transaction?.createdAt ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Description" value={transaction?.description ?? ''}></DetailsKeyValue>
                <DetailsKeyValue title="Account Issuer" value={transaction?.accountIssuer ?? ''}></DetailsKeyValue>
            </dl>
        </div>
    );
}

export default TransactionDetails