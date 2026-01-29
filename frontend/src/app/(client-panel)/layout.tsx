"use client"

import { useState } from "react";

import UserSidebar from "../../layouts/client/client-panel/UserSidebar";
import UserHeader from "../../layouts/client/client-panel/UserHeader";
import UserFooter from "../../layouts/client/client-panel/UserFooter";
import SystemAlertModal from "@/components/client/client-panel/SystemAlertModal";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

function ClientLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [isShowFirstAlert, setIsShowFirstAlert] = useState(true);

    return (
        <div className="min-h-screen! lg:flex relative">
            {/* Overlay Alert */}
            {isShowFirstAlert &&
                <SystemAlertModal setIsShowFirstAlert={setIsShowFirstAlert} />}

            <UserSidebar />

            <main className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
                <UserHeader />

                {/* Main Content */}
                <div className="flex-1 bg-slate-100 min-h-screen! overflow-y-auto">
                    {children}
                </div>

                <UserFooter />
            </main>

            <ScrollToTopButton />
        </div>
    )
}

export default ClientLayout