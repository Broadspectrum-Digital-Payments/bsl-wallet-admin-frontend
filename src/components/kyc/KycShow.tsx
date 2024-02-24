import React, {useEffect, useState} from 'react'
import {useParams, useRouter} from "next/navigation";
import KycApprovalDecision from "@/components/kyc/KycApprovalDecision";
import {useAdminStore} from "@/store/AdminStore";
import {useUserStore} from "@/store/UserStore";
import {showUser, updateUser} from "@/api/user";
import Toast from "@/components/Toast";


const secondaryNavigation = [
  { name: 'Documents', href: '#', current: false },
]
const KycShow: React.FC = () => {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState('Documents');

  const [hasError, setHasError] = useState<boolean | undefined>(false);
  const [approvedLoading, setApprovedLoading] = useState<boolean>(false);
  const [declinedLoading, setDeclinedLoading] = useState<boolean>(false);

  const [toastInfo, setToastInfo] = useState<{
    type: string,
    description: string,
  }>({
    type: '',
    description: '',
  });

  const userId = useParams()?.user.toString();

  const {user, setUser} = useUserStore()
  const {authenticatedAdmin} = useAdminStore()


  useEffect(() => {
    fetchUser()

  }, [])


  const fetchUser = () => {
    showUser(authenticatedAdmin?.bearerToken, userId)
        .then(async response => {
          const feedback = await response.json();
          if (response.ok && feedback.success) {
            const {data} = feedback

            console.log('data: ', data)

            if (setUser) setUser(data);
          }
        })
        .catch((error) => {
          console.log('error: ', error)
        })
  }



  const handleNavigationClick = (sectionName: string) => {
    setActiveSection(sectionName);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setUser({...user, [name]: value});
  };


  const resolveDocumentName = (name: string) => {
    let resolvedName = name
    switch (name) {
      case 'ghana-card-back':
        resolvedName = 'Ghana Card Back'
        break
      case 'ghana-card-front':
        resolvedName = 'Ghana Card Front'
        break
      default:
        resolvedName = 'Selfie'
    }

    return resolvedName
  }


  const handleApproveKyc = () => {
    setApprovedLoading(true)
    const approvedData = {kycStatus: 'approved'}
    updateUser(user.externalId, approvedData)
        .then(async response => {

          if (response.status == 204) {
             setToastInfo({type: 'success', description: 'Kyc Approved'})

            setTimeout(() => {
              router.push('/kyc');
            }, 2000);
          }else{
            return setToastInfo({type: 'error', description: 'Something went wrong'})
          }

        }).catch((error) => {
      setToastInfo({type: 'error', description: 'Something went wrong'});
      console.log('error: ', error)
    })

  }


  const handleRejectKyc = () => {
    setDeclinedLoading(true)
    const declinedData = {kycStatus: 'declined'}
    updateUser(user.externalId, declinedData)
        .then(async response => {

          if (response.status == 204) {
            setToastInfo({type: 'success', description: 'Kyc Declined'})

            setTimeout(() => {
              router.push('/kyc');
            }, 2000);
          }else{
            return setToastInfo({type: 'error', description: 'Something went wrong'})
          }

        }).catch((error) => {
      setToastInfo({type: 'error', description: 'Something went wrong'});
      console.log('error: ', error)
    })
  }

  return (
      <>
        <div className="">
          <main>
            <header className="border-b border-white/5">
              {/* Secondary navigation */}
              <nav className="flex overflow-x-auto py-4">
                <ul
                    role="list"
                    className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                  {secondaryNavigation.map((item) => (
                      <li key={item.name}>
                        <a
                            href={item.href} className={item.name == activeSection ? 'text-indigo-400' : ''}
                            onClick={() => handleNavigationClick(item.name)}
                        >
                          {item.name}
                        </a>
                      </li>
                  ))}
                </ul>
              </nav>
            </header>


            {/* Documents */}

            <div className="divide-y divide-white/5">

              <div className="lg:px-8">

                <div className="bg-white">
                  <div className="">
                    <ul
                        role="list"
                        className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                    >

                      {user.files && user.files.length > 0 ? user.files.map((document) => (
                          <li key={document.name}>
                            <img className="aspect-[3/2] w-full rounded-2xl object-cover"
                                 src={document.url}
                                 alt=""/>
                            <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{resolveDocumentName(document.name)}</h3>
                            <p className="text-base leading-7 text-gray-600"> Uploaded
                              Date: {document.createdAt}</p>
                          </li>
                      )) : (<p>No documents uploaded yet</p>)}
                    </ul>
                  </div>


                  <KycApprovalDecision onApprove={handleApproveKyc}
                                       onReject={handleRejectKyc}
                                       approvedLoading={approvedLoading} declinedLoading={declinedLoading} >
                  </KycApprovalDecision>

                </div>
              </div>
            </div>
          </main>
        </div>
        {toastInfo.type && <Toast toastType={toastInfo.type} toastDescription={toastInfo.description}/>}
      </>
  )
  }


export default KycShow