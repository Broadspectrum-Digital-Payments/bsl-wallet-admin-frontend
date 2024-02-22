import React, { Fragment, useState } from 'react'
import TextInput from "@/components/forms/TextInput";
import {useParams} from "next/navigation";
import Loader from "@/components/Loader";
import Button from "@/components/forms/Button";


const secondaryNavigation = [
  { name: 'Documents', href: '#', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const KycShow: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Documents');
  const [user, setUser] = useState({
    externalId: '',
    name: '',
    ghanaCardNumber: '',
    phoneNumber: '',
    type: '',
    status: '',
    kycStatus: '',
    actualBalance: 0,
    availableBalance: 0
  });
  const [hasError, setHasError] = useState<boolean | undefined>(false);
  const [loading, setLoading] = useState<boolean>(false);


  const userId = useParams()?.user


  const handleNavigationClick = (sectionName: string) => {
    setActiveSection(sectionName);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setUser({...user, [name]: value});
  };

  const handleUpdateCustomer = () => {

  }

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

  const documents = [
    {
      name: 'ghana-card-back',
      url:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      createdAt: "2024-02-20 22:09:20",
    },
    {
      name: 'ghana-card-front',
      url:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      createdAt: "2024-02-20 22:09:20",
    },
    {
      name: 'selfie',
      url:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
      createdAt: "2024-02-20 22:09:20",
    },
  ]

  const handleApproveKyc = () => {

  }

  const handleRejectKyc = () => {

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
                          {documents.map((document) => (
                              <li key={document.name}>
                                <img className="aspect-[3/2] w-full rounded-2xl object-cover" src={document.url}
                                     alt=""/>
                                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{resolveDocumentName(document.name)}</h3>
                               <p className="text-base leading-7 text-gray-600"> Uploaded Date: {document.createdAt}</p>
                              </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between mt-20 lg:gap-x-80">
                        <Button customStyles="bg-green-500 rounded border justify-center p-4 md:p-5 rounded-lg text-white"
                                buttonType="button" styleType=""
                                onClick={handleApproveKyc}
                        >
                          <span className="flex self-center">Approve</span>
                        </Button>

                        <Button customStyles="bg-red-500 rounded border justify-center p-4 md:p-5 rounded-lg"
                                buttonType="button" styleType=""
                                onClick={handleRejectKyc}
                        >
                          <span className="flex self-center">Reject</span>
                        </Button>
                      </div>

                    </div>
                  </div>
                </div>
          </main>
        </div>

    </>
  )
}

export default KycShow