import React from "react";
import {useLoanStore} from "@/store/LoanStore";
import ListItem from "@/components/ListItem";
import Button from "@/components/forms/Button";
import Badge from "../Badge";
import { useLenderStore } from "@/store/LenderStore";
import {ILoanSummary} from "@/utils/interfaces/ILoanSummary";

const LoanSummary: React.FC<ILoanSummary> = ({onApproveLoan, onRejectLoan}) => {
    const {loan} = useLoanStore()
    const {authenticatedLender} = useLenderStore()

    const lenderCanApproveLoan = () => {
        if (authenticatedLender && authenticatedLender?.availableBalance ) {
           if (loan && loan.principalInGHS){
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

                        <ListItem title="Status"  customClasses="capitalize">
                            <Badge text={loan.status ?? ''}></Badge>
                        </ListItem>
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
                {/*<div>*/}
                {/*    <h3 className="font-medium text-gray-900">Documents</h3>*/}
                {/*    <ul role="list" className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">*/}
                {/*        <li className="flex items-center justify-between py-3">*/}
                {/*            <div className="flex items-center">*/}
                {/*                <img*/}
                {/*                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"*/}
                {/*                    alt=""*/}
                {/*                    className="h-8 w-8 rounded-full"*/}
                {/*                />*/}
                {/*                <p className="ml-4 text-sm font-medium text-gray-900">Aimee Douglas</p>*/}
                {/*            </div>*/}
                {/*            <button*/}
                {/*                type="button"*/}
                {/*                className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
                {/*            >*/}
                {/*                Download<span className="sr-only"> {loan.externalId}</span>*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*        <li className="flex items-center justify-between py-3">*/}
                {/*            <div className="flex items-center">*/}
                {/*                <img*/}
                {/*                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
                {/*                    alt=""*/}
                {/*                    className="h-8 w-8 rounded-full"*/}
                {/*                />*/}
                {/*                <p className="ml-4 text-sm font-medium text-gray-900">Andrea McMillan</p>*/}
                {/*            </div>*/}
                {/*            <button*/}
                {/*                type="button"*/}
                {/*                className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"*/}
                {/*            >*/}
                {/*                Download<span className="sr-only"> Andrea McMillan</span>*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
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

                    {(Object.keys(authenticatedLender).length !==  0 && loan.status == 'submitted')  && (
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