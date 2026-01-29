"use client"

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const capitalizeFirst = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

function AdminSubHeader({
    titlePage,
    prevTitle,
    urlPrevTitle,
}: {
    titlePage: string,
    prevTitle?: string,
    urlPrevTitle?: string,
}) {
    const pathName = usePathname();

    const URL_BLACKLIST = ["/admin/dashboard"];
    const isBlocked = URL_BLACKLIST.includes(pathName);

    return (
        <div className="bg-white shadow-sm flex items-center justify-between z-50 px-6 py-2">
            <span className="font-bold text-slate-700 uppercase">
                {titlePage}
            </span>
            <div className="flex items-center justify-center gap-2">
                {!isBlocked && (
                    <>
                        <Link
                            href="/admin/dashboard"
                            className="hover:underline text-sm font-medium"
                        >
                            Trang chủ
                        </Link>
                        <ChevronRightIcon className="w-3.5 h-3.5 text-gray-500" />

                        {/* Sub link */}
                        {prevTitle && (
                            <>
                                <Link
                                    href={`${urlPrevTitle}`}
                                    className="hover:underline text-sm font-medium"
                                >
                                    {capitalizeFirst(prevTitle)}
                                </Link>
                                <ChevronRightIcon className="w-3.5 h-3.5 text-gray-500" />
                            </>
                        )}

                        <span className="first-letter:uppercase text-sm text-gray-500 font-medium">
                            {capitalizeFirst(titlePage)}
                        </span>
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminSubHeader