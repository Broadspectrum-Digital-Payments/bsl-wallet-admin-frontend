import React, {useEffect} from "react";
import {useLoanStore} from "@/store/LoanStore";
import ListItem from "@/components/ListItem";
import Button from "@/components/forms/Button";
import Badge from "../Badge";
import {useLenderStore} from "@/store/LenderStore";
import {ILoanSummary} from "@/utils/interfaces/ILoanSummary";
import {showLoan} from "@/api/loan";

const LoanSummary: React.FC<ILoanSummary> = ({onApproveLoan, onRejectLoan}) => {
    const {loan, setLoan} = useLoanStore()
    const {authenticatedLender} = useLenderStore()

    useEffect(() => {
        loan.externalId && showLoan(loan.externalId)
            .then(async response => {
                const feedback = await response.json();
                if (response.ok && feedback.success) {
                    if (setLoan) setLoan(feedback.data.loan)
                }
            })
            .catch((error) => {
                console.log('error: ', error)
            })
    }, []);

    const lenderCanApproveLoan = () => {
        if (authenticatedLender && authenticatedLender?.availableBalance) {
            if (loan && loan.principalInGHS) {
                return loan.principalInGHS <= authenticatedLender?.availableBalance
            }
        }
        return false
    }
    return (
        <div className="h-full overflow-y-auto bg-white p-8">
            <div className="space-y-6 pb-10">
                <div>
                    <h3 className="font-medium text-gray-900">Loan Information</h3>
                    <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                        <ListItem title="Customer Name" description={loan?.borrower?.name ?? ''}/>
                        <ListItem title="Customer Phone" description={loan?.borrower?.phoneNumber ?? ''}/>
                        <ListItem title="Application Date" description={loan.createdAt}/>
                        <ListItem title="Amount" description={loan.principalInGHS}/>
                        {/*<ListItem title="Duration" description={loan.amount, '')}/>*/}
                        <ListItem title="Interest" description={loan.interestInGHS}/>
                        <ListItem title="Total Repayment Amount" description={loan.totalRepaymentAmountInGHS}/>
                        <ListItem title="Monthly Installment" description={loan.monthlyInstallmentInGHS}/>
                        <ListItem title="Taxes" description={loan.taxesInGHS}/>
                        {/*<ListItem title="Total Repayment Paid" description={loan.amount}/>*/}
                        {/*<ListItem title="Repayment Balance" description={loan.amount}/>*/}
                        {/*<ListItem title="Repayment Date" description={loan.updatedAt}/>*/}
                        <ListItem title="Approved Date" description={loan.approvedAt ?? 'N/A'}/>
                        <ListItem title="Disbursed Date" description={loan.disbursedAt ?? 'N/A'}/>
                        <ListItem title="Stan" description={loan.stan}/>
                        <ListItem title="Status" customClasses="capitalize">
                            <Badge text={loan.status ?? ''}></Badge>
                        </ListItem>


                        {loan.lender && (<div>
                                <ListItem title="Lender Name" description={loan?.lender?.name ?? ''}/>
                                <ListItem title="Lender Phone" description={loan?.lender?.phoneNumber ?? ''}/></div>
                        )}


                    </dl>
                </div>
                {/*<div>*/}
                {/*    <h3 className="font-medium text-gray-900">Description</h3>*/}
                {/*    <div className="mt-2 flex items-center justify-between">*/}
                {/*        <p className="text-sm italic text-gray-500">Add a description to this image.</p>*/}
                {/*        <button*/}
                {/*            type="button"*/}
                {/*            className="-mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"*/}
                {/*        >*/}
                {/*            <PencilIcon className="h-5 w-5" aria-hidden="true"/>*/}
                {/*            <span className="sr-only">Add description</span>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div>
                    <h3 className="font-medium text-gray-900">Documents</h3>
                    {loan.documents && (
                        loan.documents.map(document => (
                            <ul role="list" className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                <li className="flex items-center justify-between py-3">
                                    <div className="flex items-center">
                                        <img
                                            src={document.url}
                                            alt=""
                                            className="h-8 w-8 rounded-full"
                                        />
                                        <p className="ml-4 text-sm font-medium text-gray-900 capitalize">{document.name}</p>
                                    </div>
                                    <a
                                        type="button"
                                        target="_blank"
                                        className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        href={document.url}>
                                        View<span className="sr-only"> {loan.externalId}</span>
                                    </a>
                                </li>
                            </ul>

                        ))
                    )}

                    {
                        !loan.documents || loan.documents?.length == 0 && (
                            <div>
                                <p>No documents uploaded</p>
                            </div>
                        )
                    }
                </div>
                <div className="flex justify-start gap-4 mt-4">
                    {/*<Button*/}
                    {/*    styleType="tertiary"*/}
                    {/*    customStyles="flex-1 rounded-md border px-3 py-2"*/}
                    {/*    buttonType="button">*/}
                    {/*    <span className="text-red-500">Delete</span>*/}
                    {/*</Button>*/}
                    {/*<Button*/}
                    {/*    styleType="primary"*/}
                    {/*    customStyles="flex-1 rounded-md bg-indigo-600 px-3 py-5"*/}
                    {/*    buttonType="button">*/}
                    {/*    Download*/}
                    {/*</Button>*/}

                    {(Object.keys(authenticatedLender).length !== 0 && loan.status == 'submitted') && (
                        <>
                            <Button
                                styleType=""
                                customStyles="flex-1 rounded-md bg-green-500 px-3 py-5"
                                onClick={onApproveLoan}
                                buttonType="button">
                                Approve
                            </Button>
                            <Button
                                styleType=""
                                customStyles="flex-1 rounded-md bg-red-500 px-3 py-2"
                                onClick={onRejectLoan}
                                buttonType="button">
                                <span className="">Reject</span>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoanSummary