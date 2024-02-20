import React from 'react'
import Image from "next/image";
import {useRouter} from "next/navigation"
import {useDashboardStore} from "@/store/DashboardStore";
import {ISectionCard} from "@/utils/interfaces/ISectionCard";
import {capitalizeFirstLetter} from "@/utils/helpers";

const SectionCard: React.FC<ISectionCard> = ({item, customClasses}) => {
    const router = useRouter()
    const {setActiveSidebarMenu} = useDashboardStore();

    const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        if (setActiveSidebarMenu) setActiveSidebarMenu({
            name: item.name,
            href: item.href,
            label: capitalizeFirstLetter(item.name),
            icon: true,
            category: '',
        })
        return router.push(`${item.href}`)
    }

    return (
        <div key={item.id}
             className={`overflow-hidden rounded-xl shadow flex flex-col max-w-xs ${item.background} ${customClasses}`}>
            <div className="flex flex-grow items-center justify-center mt-5">
                <Image src={`/assets/illustrations/${item.image}`}
                       className="flex-none" height={100} width={200} alt={item.image} style={{height: "auto"}}/>
            </div>
            <div className="-my-3 px-6 mb-5 text-sm leading-6 mt-auto">
                <div className="flex flex-col gap-x-4 py-3 gap-y-4">
                    <dt className="text-gray-900 font-semibold">
                        {item.name}
                    </dt>
                    <dd className="text-gray-700">
                        {item.description}
                    </dd>

                    <button
                        onClick={handleButtonClick}
                        type="button"
                        className={`rounded px-2 py-3 text-sm max-w-xs
                        hover:bg-${item.color}-200 focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-offset-2 focus-visible:outline-${item.color}-600 border border-gray-700 rounded-lg`}
                    >
                        Go there
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SectionCard