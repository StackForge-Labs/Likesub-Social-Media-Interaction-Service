"use client"

import type { ReactNode } from "react";
import Image from "next/image";

import BorderAnimatedContainer from "@/components/common/BorderAnimatedContainer";
import { useRouter } from "next/navigation";
interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen flex">
            <div className="w-full grid grid-cols-1 lg:grid-cols-[5fr_5fr]">
                {/* Left side - Branding */}
                <div className="hidden lg:flex flex-col items-center bg-[#0f172a] px-8">
                    <div className="w-full py-8">
                        <Image
                            onClick={() => router.push("/")}
                            src="/images/logo.png"
                            className="cursor-pointer"
                            alt=""
                            width={200}
                            height={150}
                        />
                    </div>

                    <div className="flex flex-col h-full justify-center pb-22 pt-8">
                        <div className="flex flex-col gap-6 px-29 pt-6">
                            <h2 className="text-4xl font-extrabold text-white text-center leading-tight">
                                Tăng trưởng mạng xã hội<br />dễ dàng
                            </h2>
                            <p className="text-gray-400 text-[13px] leading-relaxed text-center">
                                Dịch vụ seeding uy tín – tăng tương tác chất lượng, tạo độ tin cậy và thúc đẩy thương hiệu phát triển bền vững
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-5 pt-14 px-10">
                            <BorderAnimatedContainer>
                                <div className="rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#3b82f6] mb-1">
                                        1M+
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">
                                        Người dùng đang hoạt động
                                    </p>
                                </div>
                            </BorderAnimatedContainer>
                            <BorderAnimatedContainer>
                                <div className="rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#3b82f6] mb-1">
                                        99.9%
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">
                                        Thời gian hoạt động
                                    </p>
                                </div>
                            </BorderAnimatedContainer>
                            <BorderAnimatedContainer>
                                <div className="rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#3b82f6] mb-1">
                                        24/7
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">
                                        Hỗ trợ
                                    </p>
                                </div>
                            </BorderAnimatedContainer>
                            <BorderAnimatedContainer>
                                <div className="rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#3b82f6] mb-1">
                                        150+
                                    </div>
                                    <p className="text-slate-400 text-sm font-medium">
                                        Quốc gia
                                    </p>
                                </div>
                            </BorderAnimatedContainer>
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="bg-white min-h-screen">
                    {children}
                </div>
            </div>
        </div >
    );
}
