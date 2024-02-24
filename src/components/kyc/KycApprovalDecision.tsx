import React, { Fragment, useState } from 'react'
import Button from "@/components/forms/Button";
import Loader from "@/components/Loader";

interface KycApprovalDecisionProps {
    onApprove: () => void;
    onReject: () => void;
    approvedLoading?: boolean
    declinedLoading?: boolean
}

const KycApprovalDecision: React.FC<KycApprovalDecisionProps> = ({ onApprove, onReject, approvedLoading = false, declinedLoading = false }) => {

    return (
        <div className="flex justify-between mt-20 lg:gap-x-80">
            <Button customStyles="bg-green-500 rounded border justify-center p-4 md:p-5 rounded-lg text-white"
                    buttonType="button" styleType=""
                    onClick={onApprove}
            >
                <span className="flex self-center">Approve</span>
                {approvedLoading && <Loader type="default"
                                    customClasses="relative"
                                    customAnimationClasses="w-5 h-5 text-white dark:text-gray-600 fill-purple-900"
                />}
            </Button>

            <Button customStyles="bg-red-500 rounded border justify-center p-4 md:p-5 rounded-lg"
                    buttonType="button" styleType=""
                    onClick={onReject}
            >
                <span className="flex self-center">Reject</span>
                {declinedLoading && <Loader type="default"
                                            customClasses="relative"
                                            customAnimationClasses="w-5 h-5 text-white dark:text-gray-600 fill-purple-900"
                />}
            </Button>
        </div>
    )
}

export default KycApprovalDecision