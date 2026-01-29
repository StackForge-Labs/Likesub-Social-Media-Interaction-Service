"use client";

import { DollarSign, TrendingUp, ShoppingCart } from "lucide-react";

interface HomeStatisticsCardsProps {
    totalOrders: number;
}

export default function HomeStatisticsCards({
    totalOrders,
}: HomeStatisticsCardsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bg-white rounded shadow-sm p-4 border">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">
                            Số dư khả dụng
                        </p>
                        <p className="mt-2 text-xl font-bold text-gray-900">
                            5.418.134đ
                        </p>
                    </div>
                    <div className="rounded-full bg-green-100 p-3">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded shadow-sm p-4 border">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">
                            Tổng nạp tháng
                        </p>
                        <p className="mt-2 text-xl font-bold text-gray-900">
                            0đ
                        </p>
                    </div>
                    <div className="rounded-full bg-red-100 p-3">
                        <TrendingUp className="w-6 h-6 text-red-600" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded shadow-sm p-4 border">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">
                            Tổng đơn hàng
                        </p>
                        <p className="mt-2 text-xl font-bold text-gray-900">
                            {totalOrders}
                        </p>
                    </div>
                    <div className="rounded-full bg-purple-100 p-3">
                        <ShoppingCart className="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>
        </div>
    );
}
