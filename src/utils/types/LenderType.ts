import {FileType} from "@/utils/types/FileType";

export type LenderType = {
    externalId?: string,
    name?: string,
    email?: string,
    status: string,
    verificationToken?: string,
    bearerToken?: string,
    createdAt?: string,
    ghanaCardNumber?: string,
    phoneNumber?: string,
    type?: string,
    kycStatus: string
    actualBalance?: string
    availableBalance?: string,
    address?: string,
    businessRegistrationNumber?: string
    businessCertificate?: string
    files?: [FileType]
}