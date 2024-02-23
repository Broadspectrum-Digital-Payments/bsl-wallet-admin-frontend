import React, { Fragment, useState } from 'react'
import Button from "@/components/forms/Button";

interface KycApprovalDecisionProps {
    onApprove: () => void;
    onReject: () => void;
}

const KycApprovalDecision: React.FC<KycApprovalDecisionProps> = ({ onApprove, onReject }) => {

    return (
        <div className="flex justify-between mt-20 lg:gap-x-80">
            <Button customStyles="bg-green-500 rounded border justify-center p-4 md:p-5 rounded-lg text-white"
                    buttonType="button" styleType=""
                    onClick={onApprove}
            >
                <span className="flex self-center">Approve</span>
            </Button>

            <Button customStyles="bg-red-500 rounded border justify-center p-4 md:p-5 rounded-lg"
                    buttonType="button" styleType=""
                    onClick={onReject}
            >
                <span className="flex self-center">Reject</span>
            </Button>
        </div>
    )
}

export default KycApprovalDecision