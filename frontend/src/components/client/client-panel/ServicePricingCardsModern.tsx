"use client"

import { useState } from "react";
import {
    BriefcaseBusiness,
    Check,
    Sparkles,
    User,
    X,
} from "lucide-react";

function ServicesPricingCardModern() {
    const [isActiveOption, seIsActiveOption] = useState("monthly");
    const [isAnnually, setIsAnnually] = useState(false);

    return (
        <div className="pb-50 bg-white px-6 w-full pt-30 rounded-lg">
            <div className="flex flex-col px-18">
                <div className="border-t- border-gray-800 w-20 mx-auto mb-4" />

                {/* Service Title */}
                <div className="mx-auto max-w-lg flex items-center justify-center mb-7">
                    <span className="font-bold text-3xl text-center text-gray-800">
                        Các gói dịch vụ thiết kế riêng phù hợp với nhu
                        cầu của bạn!
                    </span>
                </div>

                {/* Services Option */}
                <div className="relative inline-flex mx-auto bg-gray-200 rounded-full z-1 p-1 mb-8">
                    <span
                        className={`absolute top-1/2 -z-1 h-11 w-30 -translate-y-1/2 rounded-full bg-white shadow-md duration-300 ease-linear ${isActiveOption === "monthly"
                            ? "translate-x-0"
                            : "translate-x-full"
                            }`}
                    />
                    <button
                        className={`flex h-11 w-30 items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-800 cursor-pointer ${isActiveOption === "monthly"
                            ? "text-gray-800 font-bold"
                            : ""
                            }`}
                        onClick={() => {
                            seIsActiveOption("monthly");
                            setIsAnnually(false);
                        }}
                    >
                        Tháng
                    </button>
                    <button
                        className={`flex h-11 w-30 items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-800 cursor-pointer ${isActiveOption === "annually"
                            ? "text-gray-800 font-bold"
                            : ""
                            }`}
                        onClick={() => {
                            seIsActiveOption("annually");
                            setIsAnnually(true);
                        }}
                    >
                        Năm
                    </button>
                </div>

                {/* Service Cards */}
                <div className="flex justify-between gap-8">
                    {/* Personal Card */}
                    <div className="flex flex-col gap-6 w-full ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-500 transition-colors duration-300  p-6 rounded-lg">
                        {/* Card Title */}
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-lg">
                                        Cơ bản
                                    </span>
                                    <div>
                                        <span className="font-bold text-3xl">
                                            {isAnnually
                                                ? "$99.00"
                                                : "$59.99"}
                                        </span>
                                        <span>/ Lifetime</span>
                                    </div>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-md">
                                    <User className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                            <div className="mt-1">
                                <span className="text-xs text-gray-600">
                                    Dành cho cá nhân và người mới bắt đầu
                                </span>
                            </div>
                        </div>

                        {/* Divide Horizontal */}
                        <div className="w-full border border-b-gray-300" />

                        {/* Benefit & Limitless Service */}
                        <div className="flex flex-col gap-4">
                            {/* B1 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    5 dịch vụ
                                </span>
                            </div>

                            {/* B2 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Hỗ trợ cơ bản
                                </span>
                            </div>

                            {/* B3 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Giá tiêu chuẩn
                                </span>
                            </div>

                            {/* B4 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Thanh toán linh hoạt
                                </span>
                            </div>

                            {/* L1 */}
                            <div className="flex items-center gap-2">
                                <X className="text-gray-400 w-4 h-4" />
                                <span className="font-semibold text-xs text-gray-400">
                                    Giảm giá đặc biệt
                                </span>
                            </div>

                            {/* L2 */}
                            <div className="flex items-center gap-2">
                                <X className="text-gray-400 w-4 h-4" />
                                <span className="font-semibold text-xs text-gray-400">
                                    Hỗ trợ VIP 24/7
                                </span>
                            </div>
                        </div>

                        {/* Choose Button */}
                        <button className="flex w-full items-center justify-center rounded-lg bg-[#0f172a] p-3.5 text-xs font-medium text-white shadow-sm transition-colors duration-300 hover:bg-blue-600 cursor-pointer">
                            Chọn gói này
                        </button>
                    </div>

                    {/* Professional Card */}
                    <div className="flex flex-col gap-6 w-full ring-2 ring-blue-500  p-6 rounded-lg">
                        {/* Card Title */}
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-lg">
                                        Chuyên nghiệp
                                    </span>
                                    <div>
                                        <span className="font-bold text-3xl">
                                            {isAnnually
                                                ? "$199.00"
                                                : "$99.99"}
                                        </span>
                                        <span>/ Lifetime</span>
                                    </div>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-md">
                                    <BriefcaseBusiness className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                            <div className="mt-1">
                                <span className="text-xs text-gray-600">
                                    Dành cho doanh nghiệp và nhóm
                                </span>
                            </div>
                        </div>

                        {/* Divide Horizontal */}
                        <div className="w-full border border-b-gray-300" />

                        {/* Benefit & Limitless Service */}
                        <div className="flex flex-col gap-4">
                            {/* B1 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    10 dịch vụ
                                </span>
                            </div>

                            {/* B2 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Hỗ trợ ưu tiên
                                </span>
                            </div>

                            {/* B3 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Giảm giá 10%
                                </span>
                            </div>

                            {/* B4 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Thanh toán linh hoạt
                                </span>
                            </div>

                            {/* B5 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Báo cáo chi tiết
                                </span>
                            </div>

                            {/* L1 */}
                            <div className="flex items-center gap-2">
                                <X className="text-gray-400 w-4 h-4" />
                                <span className="font-semibold text-xs text-gray-400">
                                    Hỗ trợ VIP 24/7
                                </span>
                            </div>
                        </div>

                        {/* Choose Button */}
                        <button className="flex w-full items-center justify-center rounded-lg bg-blue-600 p-3.5 text-xs font-medium text-white shadow-sm transition-colors duration-300 hover:bg-blue-800 cursor-pointer">
                            Chọn gói này
                        </button>
                    </div>

                    {/* Enterprise Card */}
                    <div className="flex flex-col gap-6 w-full ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-500 transition-colors duration-300  p-6 rounded-lg">
                        {/* Card Title */}
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-lg">
                                        Doanh nghiệp
                                    </span>
                                    <div>
                                        <span className="font-bold text-3xl">
                                            {isAnnually
                                                ? "$799.00"
                                                : "$599.99"}
                                        </span>
                                        <span>/ Lifetime</span>
                                    </div>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-md">
                                    <Sparkles className="w-6 h-6 text-blue-500" />
                                </div>
                            </div>
                            <div className="mt-1">
                                <span className="text-xs text-gray-600">
                                    Dành cho doanh nghiệp lớn
                                </span>
                            </div>
                        </div>

                        {/* Divide Horizontal */}
                        <div className="w-full border border-b-gray-300" />

                        {/* Benefit & Limitless Service */}
                        <div className="flex flex-col gap-4">
                            {/* B1 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Không giới hạn dịch vụ
                                </span>
                            </div>

                            {/* B2 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Hỗ trợ VIP 24/7
                                </span>
                            </div>

                            {/* B3 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Giảm giá 20%
                                </span>
                            </div>

                            {/* B4 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Thanh toán linh hoạt
                                </span>
                            </div>

                            {/* B5 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Báo cáo chi tiết
                                </span>
                            </div>

                            {/* B6 */}
                            <div className="flex items-center gap-2">
                                <Check className="text-green-500 w-4 h-4" />
                                <span className="font-semibold text-xs text-slate-600">
                                    Quản lý chuyên biệt
                                </span>
                            </div>
                        </div>

                        {/* Choose Button */}
                        <button className="flex w-full items-center justify-center rounded-lg bg-[#0f172a] p-3.5 text-xs font-medium text-white shadow-sm transition-colors duration-300 hover:bg-blue-600 cursor-pointer">
                            Chọn gói này
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicesPricingCardModern



// "use client"

// import { useState } from "react";
// import {
//     Award,
//     Check,
//     CircleCheck,
//     Crown,
//     Headset,
//     Info,
//     Star,
//     Tag,
//     Trophy,
//     User,
//     Wallet,
//     X,
// } from "lucide-react";

// function ServicesPricingCardModern() {
//     const [isActiveOption, setIsActiveOption] = useState("khach-le");

//     return (
//         <div className="pb-36 bg-white px-6 w-full pt-30 rounded-lg">
//             <div className="flex flex-col px-18">
//                 <div className="border-t-3 border-gray-800 w-20 mx-auto mb-4" />

//                 {/* Service Title */}
//                 <div className="mx-auto max-w-lg flex items-center justify-center mb-7">
//                     <span className="font-bold text-3xl text-center text-gray-800">
//                         Các gói dịch vụ thiết kế riêng phù hợp với nhu cầu độc đáo!
//                     </span>
//                 </div>

//                 {/* Services Option */}
//                 <div className="relative inline-flex mx-auto bg-gray-200 rounded-full z-1 p-1 mb-8 overflow-hidden">
//                     <span
//                         className={`absolute top-1/2 -z-1 h-11 -translate-y-1/2 rounded-full bg-white shadow-md duration-300 ease-linear ${isActiveOption === "khach-le"
//                             ? "translate-x-0 w-28"
//                             : isActiveOption === "cong-tac-vien"
//                                 ? "translate-x-28 w-36"
//                                 : isActiveOption === "dai-ly"
//                                     ? "translate-x-64 w-28"
//                                     : "translate-x-92 w-36"
//                             }`}
//                     />
//                     <button
//                         className={`flex h-11 w-28 items-center justify-center text-xs font-medium text-gray-500 hover:text-gray-800 cursor-pointer ${isActiveOption === "khach-le" ? "text-gray-800 font-bold" : ""
//                             }`}
//                         onClick={() => setIsActiveOption("khach-le")}
//                     >
//                         Khách lẻ
//                     </button>
//                     <button
//                         className={`flex h-11 w-36 items-center justify-center text-xs font-medium text-gray-500 hover:text-gray-800 cursor-pointer ${isActiveOption === "cong-tac-vien" ? "text-gray-800 font-bold" : ""
//                             }`}
//                         onClick={() => setIsActiveOption("cong-tac-vien")}
//                     >
//                         Cộng tác viên
//                     </button>
//                     <button
//                         className={`flex h-11 w-28 items-center justify-center text-xs font-medium text-gray-500 hover:text-gray-800 cursor-pointer ${isActiveOption === "dai-ly" ? "text-gray-800 font-bold" : ""
//                             }`}
//                         onClick={() => setIsActiveOption("dai-ly")}
//                     >
//                         Đại lý
//                     </button>
//                     <button
//                         className={`flex h-11 w-36 items-center justify-center text-xs font-medium text-gray-500 hover:text-gray-800 cursor-pointer ${isActiveOption === "nha-phan-phoi" ? "text-gray-800 font-bold" : ""
//                             }`}
//                         onClick={() => setIsActiveOption("nha-phan-phoi")}
//                     >
//                         Nhà phân phối
//                     </button>
//                 </div>

//                 {/* Service Cards */}
//                 <div className="flex justify-between gap-8">
//                     {/* Khách lẻ Card */}
//                     <div className={`flex flex-col gap-6 w-full p-6 rounded-lg transition-all duration-300 ${isActiveOption === "khach-le"
//                         ? "ring-2 ring-blue-500"
//                         : "ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-500"
//                         }`}>
//                         {/* Card Title */}
//                         <div>
//                             <div className="flex items-start justify-between">
//                                 <div className="flex flex-col gap-2">
//                                     <span className="font-bold text-lg">Khách lẻ</span>
//                                     <div className="flex items-center gap-2">
//                                         {isActiveOption === "khach-le" && (
//                                             <span className="bg-black text-white text-xs px-2 py-1 rounded-md font-bold">
//                                                 HIỆN TẠI
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-3 rounded-full">
//                                     <User className="w-6 h-6 text-white" />
//                                 </div>
//                             </div>
//                             <div className="mt-1">
//                                 <span className="text-xs text-gray-600">
//                                     Cấp bậc mặc định cho tất cả khách hàng
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Divide Horizontal */}
//                         <div className="w-full border border-b-gray-300" />

//                         {/* Benefit & Limitless Service */}
//                         <div className="flex flex-col gap-4">
//                             {/* B1 */}
//                             <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-md">
//                                 <div className="bg-cyan-500 p-2 rounded-md shrink-0">
//                                     <Tag className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Giá bán lẻ
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         Áp dụng giá tiêu chuẩn
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* B2 */}
//                             <div className="flex items-start gap-3 bg-blue-50 p-3 rounded-md">
//                                 <div className="bg-amber-500 p-2 rounded-md shrink-0">
//                                     <Wallet className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Không yêu cầu nạp tối thiểu
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         Dễ dàng bắt đầu
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Choose Button */}
//                         <button className={`flex w-full items-center justify-center rounded-lg p-3.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 cursor-pointer ${isActiveOption === "khach-le"
//                             ? "bg-blue-600 hover:bg-blue-800"
//                             : "bg-slate-800 hover:bg-blue-600"
//                             }`}>
//                             {isActiveOption === "khach-le" ? "Gói hiện tại" : "Chọn gói này"}
//                         </button>
//                     </div>

//                     {/* Cộng tác viên Card */}
//                     <div className={`flex flex-col gap-6 w-full p-6 rounded-lg transition-all duration-300 ${isActiveOption === "cong-tac-vien"
//                         ? "ring-2 ring-blue-500"
//                         : "ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-500"
//                         }`}>
//                         {/* Card Title */}
//                         <div>
//                             <div className="flex items-start justify-between">
//                                 <div className="flex flex-col gap-2">
//                                     <span className="font-bold text-lg">Cộng tác viên</span>
//                                 </div>
//                                 <div className="bg-gray-100 p-3 rounded-full">
//                                     <Award className="w-6 h-6 text-gray-500" />
//                                 </div>
//                             </div>
//                             <div className="mt-1">
//                                 <span className="text-xs text-gray-600">
//                                     Cấp bậc đặc biệt với ưu đãi hấp dẫn
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Divide Horizontal */}
//                         <div className="w-full border border-b-gray-300" />

//                         {/* Benefit & Limitless Service */}
//                         <div className="flex flex-col gap-4">
//                             {/* B1 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-amber-500 p-2 rounded-md shrink-0">
//                                     <Tag className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Giá Cộng tác viên
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         Ưu đãi đặc biệt
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* B2 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-amber-500 p-2 rounded-md shrink-0">
//                                     <Wallet className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Nạp tối thiểu
//                                     </span>
//                                     <span className="text-xs text-gray-500">$19.23</span>
//                                 </div>
//                             </div>

//                             {/* Progress */}
//                             <div className="w-full bg-amber-50 flex flex-col items-start p-3 rounded-md gap-2">
//                                 <div className="flex items-center justify-between w-full">
//                                     <div className="flex items-center gap-2">
//                                         <Info className="w-4 h-4 text-amber-500" />
//                                         <span className="font-bold text-amber-600 text-xs">
//                                             Còn thiếu
//                                         </span>
//                                     </div>
//                                     <span className="font-bold text-amber-600 text-xs">
//                                         $19.23
//                                     </span>
//                                 </div>
//                                 <div className="w-full h-1.5 rounded-full bg-gray-200" />
//                             </div>
//                         </div>

//                         {/* Choose Button */}
//                         <button className={`flex w-full items-center justify-center rounded-lg p-3.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 cursor-pointer ${isActiveOption === "cong-tac-vien"
//                             ? "bg-blue-600 hover:bg-blue-800"
//                             : "bg-slate-800 hover:bg-blue-600"
//                             }`}>
//                             Chọn gói này
//                         </button>
//                     </div>

//                     {/* Đại lý Card */}
//                     <div className={`flex flex-col gap-6 w-full p-6 rounded-lg transition-all duration-300 ${isActiveOption === "dai-ly"
//                         ? "ring-2 ring-blue-500"
//                         : "ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-500"
//                         }`}>
//                         {/* Card Title */}
//                         <div>
//                             <div className="flex items-start justify-between">
//                                 <div className="flex flex-col gap-2">
//                                     <span className="font-bold text-lg">Giá Đại lý</span>
//                                 </div>
//                                 <div className="bg-gray-100 p-3 rounded-full">
//                                     <Trophy className="w-6 h-6 text-gray-500" />
//                                 </div>
//                             </div>
//                             <div className="mt-1">
//                                 <span className="text-xs text-gray-600">
//                                     Cấp bậc đặc biệt với ưu đãi hấp dẫn
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Divide Horizontal */}
//                         <div className="w-full border border-b-gray-300" />

//                         {/* Benefit & Limitless Service */}
//                         <div className="flex flex-col gap-4">
//                             {/* B1 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-amber-500 p-2 rounded-md shrink-0">
//                                     <Tag className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Giá Đại lý
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         Ưu đãi đặc biệt
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* B2 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-orange-600 p-2 rounded-md shrink-0">
//                                     <CircleCheck className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Hỗ trợ tạo website con
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         Chi phí gia hạn 100.000đ / tháng
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* B3 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-amber-500 p-2 rounded-md shrink-0">
//                                     <Wallet className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Nạp tối thiểu
//                                     </span>
//                                     <span className="text-xs text-gray-500">$1.923.08</span>
//                                 </div>
//                             </div>

//                             {/* Progress */}
//                             <div className="w-full bg-amber-50 flex flex-col items-start p-3 rounded-md gap-2">
//                                 <div className="flex items-center justify-between w-full">
//                                     <div className="flex items-center gap-2">
//                                         <Info className="w-4 h-4 text-amber-500" />
//                                         <span className="font-bold text-amber-600 text-xs">
//                                             Còn thiếu
//                                         </span>
//                                     </div>
//                                     <span className="font-bold text-amber-600 text-xs">
//                                         $1.923.08
//                                     </span>
//                                 </div>
//                                 <div className="w-full h-1.5 rounded-full bg-gray-200" />
//                             </div>
//                         </div>

//                         {/* Choose Button */}
//                         <button className={`flex w-full items-center justify-center rounded-lg p-3.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 cursor-pointer ${isActiveOption === "dai-ly"
//                             ? "bg-blue-600 hover:bg-blue-800"
//                             : "bg-slate-800 hover:bg-blue-600"
//                             }`}>
//                             Chọn gói này
//                         </button>
//                     </div>

//                     {/* Nhà phân phối Card */}
//                     <div className={`flex flex-col gap-6 w-full p-6 rounded-lg transition-all duration-300 ${isActiveOption === "nha-phan-phoi"
//                         ? "ring-2 ring-blue-500"
//                         : "ring-1 ring-gray-300 hover:ring-2 hover:ring-blue-500"
//                         }`}>
//                         {/* Card Title */}
//                         <div>
//                             <div className="flex items-start justify-between">
//                                 <div className="flex flex-col gap-2">
//                                     <span className="font-bold text-lg">Nhà phân phối</span>
//                                 </div>
//                                 <div className="bg-gray-100 p-3 rounded-full">
//                                     <Star className="w-6 h-6 text-gray-500" />
//                                 </div>
//                             </div>
//                             <div className="mt-1">
//                                 <span className="text-xs text-gray-600">
//                                     Cấp bậc đặc biệt với ưu đãi hấp dẫn
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Divide Horizontal */}
//                         <div className="w-full border border-b-gray-300" />

//                         {/* Benefit & Limitless Service */}
//                         <div className="flex flex-col gap-4">
//                             {/* B1 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-orange-600 p-2 rounded-md shrink-0">
//                                     <Tag className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Giá Nhà phân phối
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         Ưu đãi đặc biệt
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* B2 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-orange-600 p-2 rounded-md shrink-0">
//                                     <CircleCheck className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Hỗ trợ tạo website con
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         Chi phí gia hạn 100.000đ / tháng
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* B3 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-amber-500 p-2 rounded-md shrink-0">
//                                     <Crown className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Dịch vụ độc quyền
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         Dịch vụ độc quyền chỉ dành riêng cho khách hàng VIP
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* B4 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-indigo-700 p-2 rounded-md shrink-0">
//                                     <Headset className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Hỗ trợ riêng 24/7
//                                     </span>
//                                     <span className="text-xs text-gray-500">
//                                         Chúng tôi sẽ luôn sẵn sàng giúp đỡ bạn mọi lúc, mọi nơi
//                                     </span>
//                                 </div>
//                             </div>

//                             {/* B5 */}
//                             <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-md">
//                                 <div className="bg-orange-600 p-2 rounded-md shrink-0">
//                                     <Wallet className="w-4 h-4 text-white" />
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <span className="font-semibold text-sm text-slate-800">
//                                         Nạp tối thiểu
//                                     </span>
//                                     <span className="text-xs text-gray-500">$19.230.77</span>
//                                 </div>
//                             </div>

//                             {/* Progress */}
//                             <div className="w-full bg-amber-50 flex flex-col items-start p-3 rounded-md gap-2">
//                                 <div className="flex items-center justify-between w-full">
//                                     <div className="flex items-center gap-2">
//                                         <Info className="w-4 h-4 text-amber-500" />
//                                         <span className="font-bold text-amber-600 text-xs">
//                                             Còn thiếu
//                                         </span>
//                                     </div>
//                                     <span className="font-bold text-amber-600 text-xs">
//                                         $19.230.77
//                                     </span>
//                                 </div>
//                                 <div className="w-full h-1.5 rounded-full bg-gray-200" />
//                             </div>
//                         </div>

//                         {/* Choose Button */}
//                         <button className={`flex w-full items-center justify-center rounded-lg p-3.5 text-sm font-medium text-white shadow-sm transition-colors duration-300 cursor-pointer ${isActiveOption === "nha-phan-phoi"
//                             ? "bg-blue-600 hover:bg-blue-800"
//                             : "bg-slate-800 hover:bg-blue-600"
//                             }`}>
//                             Chọn gói này
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ServicesPricingCardModern;