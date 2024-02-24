import Image from "next/image";

export default function EmptyState() {
    return (
        <div
            className="relative grid place-items-center w-full rounded-lg border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            <div className="flex flex-col items-center">
                <Image src="/assets/images/empty.png" alt="empty state" width={500} height={500}/>
                <span className="mt-2 block text-lg font-semibold text-gray-900">No data available!</span>
            </div>
        </div>
    )
}
