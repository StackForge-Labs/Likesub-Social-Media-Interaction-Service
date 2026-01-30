"use client"

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Faq() {
  const features = [
    {
      title: "Likesub là gì?",
      description:
        "Likesub là nền tảng tăng tương tác mạng xã hội tự động, giúp bạn tăng Like, Follow, View, Comment một cách nhanh chóng và hiệu quả.",
    },
    {
      title: "Likesub hỗ trợ những nền tảng nào?",
      description:
        "Chúng tôi hỗ trợ đầy đủ các nền tảng: Facebook, Instagram, TikTok, YouTube, Twitter và nhiều mạng xã hội khác.",
    },
    {
      title: "Dịch vụ có an toàn không?",
      description:
        "Hoàn toàn an toàn! Tất cả dịch vụ đều được kiểm duyệt kỹ lượng, đảm bảo tài khoản của bạn không bị ảnh hưởng.",
    },
    {
      title: "Đơn hàng hàng loạt hoạt động như thế nào?",
      description:
        "Bạn có thể tăng tương tác cho nhiều bài viết hoặc tài khoản cùng lúc với hệ thống đặt hàng hàng loạt của chúng tôi.",
    },
    {
      title: "Chế độ Drip-feed là gì?",
      description:
        "Drip-feed giúp tăng tương tác từ từ theo thời gian, tạo sự tự nhiên và tránh bị phát hiện là spam.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pb-28 px-2">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 py-6 items-center justify-between gap-8">
          {/* Left: Illustration */}
          <div className="flex flex-col h-full gap-2.5 max-w-xl">
            <p className="text-4xl font-extrabold">
              Câu hỏi thường gặp
            </p>
            <div className="space-y-0.5">
              <p>
                Không tìm thấy câu trả lời bạn cần?
              </p>
              <p>
                Liên hệ với chúng tôi để được hỗ trợ tư vấn chi tiết hơn.
              </p>
            </div>
          </div>

          {/* Right: FAQ List */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-600 transition-900 cursor-pointer group shadow-sm ${openIndex === index ? "border-blue-400" : ""}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium text-gray-800 group-hover:text-[#2563eb] text-base ${openIndex === index ? "text-blue-500" : ""}`}
                  >
                    {feature.title}
                  </span>
                  <ChevronRight
                    size={18}
                    className={`text-gray-400 group-hover:text-[#2563eb] transition shrink-0 ${openIndex === index ? "rotate-90 text-blue-400" : ""}`}
                  />
                </div>
                {openIndex === index && (
                  <div className="mt-2 text-gray-600 text-sm animate-fade-in">
                    {feature.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
